const { loadModule } = mod.getContext(import.meta);

const buildingsModule = await loadModule("src/shop/buildings.mjs");

export async function init(ctx, game) {
  await patchSkillTicks(ctx);
  patchloopOffline(ctx);
}

function saveBattleState(ctx) {
  const skillingBosses = game.skillingBosses;
  ctx.characterStorage.setItem("Crbt", skillingBosses.currentBattleTicks);
  ctx.characterStorage.setItem(
    "Cabu",
    skillingBosses.currentBattleAbilitiesUsed
  );
  ctx.characterStorage.setItem("Cdd", skillingBosses.currentBattleDamageDealt);
  ctx.characterStorage.setItem("Acat", skillingBosses.activeAbilityTimer);
  ctx.characterStorage.setItem("Bcat", skillingBosses.bossAttackTimer);
  ctx.characterStorage.setItem("BcHP", skillingBosses.bossCurrHP);
  ctx.characterStorage.setItem("PcHP", skillingBosses.playerCoreHP);
  ctx.characterStorage.setItem("BctH", skillingBosses.currentBattleBossHealed);
  ctx.characterStorage.setItem("BctD", skillingBosses.currentBattleDamageDealt);
  ctx.characterStorage.setItem(
    "BctB",
    skillingBosses.currentBattleBossDamageReduced
  );
  ctx.characterStorage.setItem("ASlt", skillingBosses.activeAbilitySlot);
  ctx.characterStorage.setItem("Dst", skillingBosses.discardedTicks);
}

function patchloopOffline(ctx) {
  ctx.patch(Game, "exitOfflineLoop").after(function () {
    try {
      game.skillingBosses.isOffline = false;
      game.skillingBosses.discardedTicks = Math.floor(
        game.skillingBosses.discardedTicks
      );
    } catch (e) {
      console.error("Error in SkillingBosses offline processing:", e);
    }
  });
}

async function patchSkillTicks(ctx) {
  const battlesUIModule = await ctx.loadModule("src/ui/battle.mjs");

  const combatAbilities = new Set([
    "Hitpoints",
    "Attack",
    "Defence",
    "Magic",
    "Strength",
    "Ranged",
    "Farming",
    "Township",
  ]);

  let lastProcessedTime = 0;
  const TICK_INTERVAL = 100; // 0.1 seconds in milliseconds

  ctx.patch(Skill, "addXP").before(function (amount, masteryAction) {
    try {
      const currentTime = Date.now();
      const skillingBosses = game.skillingBosses;

      if (
        skillingBosses.activeBoss === null ||
        combatAbilities.has(this.name)
      ) {
        return;
      }
      let multiTree = false;
      if (this.name === "Woodcutting") {
        // if multi tree
        if (this.activeTrees.size > 1) {
          multiTree = true;
        }
      }
      let forceTickInterval = 5;
      if (multiTree) {
        forceTickInterval *= 2;
      }
      let forceTick = false;
      // check if skippedTicks is above 5:
      if (game.skillingBosses.skippedTicks > 5) {
        forceTick = true;
        game.skillingBosses.skippedTicks = 0;
        // if the player has skipped the last 5 ticks, force the tick to process
      }
      // Check if enough time has passed since the last processed tick
      const timeSinceLastTick = currentTime - lastProcessedTime;
      if (timeSinceLastTick >= TICK_INTERVAL || forceTick) {
        processTick(this, amount, currentTime);
        lastProcessedTime = currentTime;
        forceTick = false;
      } else {
        game.skillingBosses.skippedTicks++;
        if (game.skillingBosses.isOffline) {
          game.skillingBosses.discardedTicks += 0.8;
        }
        // skippedTicks are used to force every 6 ticks to process, they get reset to 0 after 6 ticks
        // discardedTicks are used to track how many ticks have been thrown away, they are not reset
        // there will be some algorithm to apply discarded ticks to the battle on load
      }
    } catch (error) {
      console.error("Error ticking skill XP:", error);
    }
  });

  function processTick(skill, amount, tickTime) {
    const skillingBosses = game.skillingBosses;
    skillingBosses.lastTickTime = tickTime;

    let totalSkillTicks = 1; // Always increment by 1 for the main tick
    let needToUpdateUI = false;
    let needToSaveState = false;

    // Tick battle
    skillingBosses.tickBattle();
    needToUpdateUI = true;
    needToSaveState = true;

    // Check if current ability matches skill
    const currentAbility =
      skillingBosses.equippedAbilities[skillingBosses.activeAbilitySlot];
    let skillMatchesAbility = false;

    if (currentAbility && currentAbility.skill === skill.id) {
      skillMatchesAbility = true;
      skillingBosses.tickAbility();
      totalSkillTicks++;
      needToUpdateUI = true;
      needToSaveState = true;
    }

    // Check if skill matches boss
    let skillMatchesBoss = false;
    if (
      skillingBosses.activeBoss &&
      skillingBosses.activeBoss.skill === skill.name
    ) {
      skillMatchesBoss = true;
      skillingBosses.tickAbility();
      totalSkillTicks++;
      needToUpdateUI = true;
      needToSaveState = true;
    }
    // check for discarded ticks
    let restedBonus = 0;
    let RESTED_CAP = 3;
    // check for wellFed modifier
    if (
      !game.skillingBosses.isOffline &&
      game.skillingBosses.modCache.has("smattyBosses:wellFed")
    ) {
      const wellFed = game.skillingBosses.modCache.get("smattyBosses:wellFed");
      if (wellFed > 0) {
        RESTED_CAP += wellFed;
      }
    }

    if (skillingBosses.discardedTicks >= RESTED_CAP) {
      if (skillingBosses.discardedTicks > RESTED_CAP) {
        restedBonus = RESTED_CAP;
        skillingBosses.discardedTicks -= RESTED_CAP;
      } else {
        restedBonus = 1;
        skillingBosses.discardedTicks -= 1;
      }
      for (let i = 0; i < restedBonus; i++) {
        skillingBosses.tickAbility();
      }
      totalSkillTicks += restedBonus;
      needToUpdateUI = true;
      needToSaveState = true;
    }

    // Calculate xpBonus
    let xpBonus = Math.min(Math.floor(amount / 20), 7);

    if (xpBonus > 0) {
      for (let i = 0; i < xpBonus; i++) {
        skillingBosses.tickAbility();
      }
      totalSkillTicks += xpBonus;
      needToUpdateUI = true;
    }

    if (needToUpdateUI) {
      battlesUIModule.updateAbilityProgressUI();
      battlesUIModule.updateBattleStatsUI();
    }

    if (needToSaveState) {
      saveBattleState(ctx);
    }

    updatePlayerSkillTickInfo(
      ctx,
      skill,
      totalSkillTicks,
      amount,
      skillMatchesAbility,
      skillMatchesBoss,
      xpBonus,
      restedBonus
    );
  }
}

function updatePlayerSkillTickInfo(
  ctx,
  skill,
  totalSkillTicks,
  amount,
  skillMatchesAbility,
  skillMatchesBoss,
  xpBonus,
  restedBonus
) {
  // this is for UI updating only, the logic is in the processTick function
  // DO NOT ADD ANY GAME LOGIC HERE
  const playerSkillTickInfo = document.getElementById("player-skill-tick-info");
  // early return if player skill tick info is not found
  if (!playerSkillTickInfo) {
    return;
  }
  // grab the current ability
  const currentAbility =
    game.skillingBosses.equippedAbilities[
      game.skillingBosses.activeAbilitySlot
    ];
  if (!currentAbility) {
    return;
  }
  // begin building the html content
  let htmlContent = `<div>Training Skill: ${skill.name}</div>`;

  if (skillMatchesAbility && currentAbility) {
    htmlContent += `<div class="text-success">${currentAbility.name} Matches Skill! +1 skill-tick</div>`;
  } else {
    htmlContent += `<div class="text-warning">${currentAbility.name} Doesn't Match Skill! +0 skill-ticks</div>`;
  }

  if (skillMatchesBoss) {
    htmlContent += `<div class="text-success">${game.skillingBosses.activeBoss.name} Matches Skill! +1 skill-tick</div>`;
  } else {
    htmlContent += `<div class="text-warning">${game.skillingBosses.activeBoss.name} Doesn't Match Skill! +0 skill-ticks</div>`;
  }

  if (xpBonus === 0) {
    htmlContent += `<div class="text-warning">Gained <span class="text-muted">${amount}</span> XP from Skilling Action! +0 skill-ticks</div>`;
  } else {
    htmlContent += `<div class="text-success">Gained <span class="text-muted">${amount}</span> XP from Skilling Action! +${xpBonus} skill-ticks</div>`;
  }
  if (restedBonus > 0) {
    htmlContent += `<div class="text-success">
    You are well rested! +${restedBonus} skill-ticks 
    <span class="text-muted"> from </span>
    <span class="text-warning">${game.skillingBosses.discardedTicks}</span>
    <span class="text-muted"> offline ticks</span>
    </div>`;
  }
  htmlContent += `<div>Skill-ticks from Skilling Action: ${totalSkillTicks}</div>`;
  game.skillingBosses.lastAbilityTickText = htmlContent;
  playerSkillTickInfo.innerHTML = htmlContent;
  buildingsModule.updateUIForShopOfflineTicks();
}
