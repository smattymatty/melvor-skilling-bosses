const { loadModule } = mod.getContext(import.meta);

const buildingsModule = await loadModule("src/shop/buildings.mjs");
const activationFuncs = await loadModule("src/abilities/activationFuncs.mjs");

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
  ctx.characterStorage.setItem("Psh", skillingBosses.playerShield);
  ctx.characterStorage.setItem("Bat", game.skillingBosses.bossAttackTimer);
  // resistance
  ctx.characterStorage.setItem("PcPD", skillingBosses.playerPhysicalResistance);
  ctx.characterStorage.setItem("PccMD", skillingBosses.playerMagicResistance);
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

  let combatAbilities = new Set([
    "Hitpoints",
    "Attack",
    "Defence",
    "Magic",
    "Strength",
    "Ranged",
    "Farming",
    "Township",
    "Prayer",
    "Slayer",
    "Necromancy",
    "Profile",
  ]);

  let lastProcessedTime = 0;
  const TICK_INTERVAL = 100; // 0.1 seconds in milliseconds
  let forcedTicks = 0; // amount of ticks that have been forces
  let forceTickInterval = 5;
  let summoningTicks = 0;

  ctx.patch(Skill, "addXP").before(function (amount, masteryAction) {
    try {
      const skillingBosses = game.skillingBosses;

      if (
        skillingBosses.activeBoss === null ||
        combatAbilities.has(this.name)
      ) {
        return;
      }
      const lastSkill = game.skillingBosses.currentlyTrainingSkill;
      if (game.skillingBosses.currentlyTrainingSkill !== this.id) {
        game.skillingBosses.currentlyTrainingSkill = this.id;
      }
      if (
        lastSkill !== "melvorD:Summoning" &&
        this.id === "melvorD:Summoning" &&
        summoningTicks <= 2 &&
        game.skillingBosses.ignoreSummoningWhileSkilling
      ) {
        game.skillingBosses.currentlyTrainingSkill = lastSkill;

        summoningTicks++;
        return;
      }
      if (summoningTicks > 2) {
        summoningTicks = 0;
      }
      const currentTime = Date.now();

      let multiTree = false;
      if (this.name === "Woodcutting") {
        // if multi tree
        if (this.activeTrees.size > 1) {
          multiTree = true;
        }
      }
      if (multiTree) {
        forceTickInterval *= 2;
      }

      function getForceTickInterval(forcedTicks) {
        if (forcedTicks >= 500) {
          return 99999; // stop processing at 500
        }
        let N = Math.floor((Math.sqrt(8 * forcedTicks + 1) - 1) / 2);
        let totalIncrement = (N * (N + 1)) / 2;
        return 6 + totalIncrement;
      }

      forceTickInterval = getForceTickInterval(forcedTicks);

      let forceTick = false;
      if (game.skillingBosses.skippedTicks > forceTickInterval) {
        forceTick = true;
        game.skillingBosses.skippedTicks = 0;
        forcedTicks += 1;
        // if the player has skipped the last 7 ticks, force the tick to process
      }
      const timeSinceLastTick = currentTime - lastProcessedTime;
      if (timeSinceLastTick >= TICK_INTERVAL || forceTick) {
        processTick(this, amount, currentTime);
        lastProcessedTime = currentTime;
        forceTick = false;
      } else {
        game.skillingBosses.skippedTicks++;
        if (game.skillingBosses.isOffline) {
          game.skillingBosses.discardedTicks += 0.4;
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

    let totalSkillTicks = 1; // always increment by 1 for the default tick
    let needToUpdateUI = false;
    let needToSaveState = false;

    // tick battle
    skillingBosses.tickBattle();
    needToUpdateUI = true;
    needToSaveState = true;

    // check if current ability matches skill
    const currentAbility =
      skillingBosses.equippedAbilities[skillingBosses.activeAbilitySlot];
    let skillMatchesAbility = false;

    if (currentAbility && currentAbility.skill === skill.id) {
      skillMatchesAbility = true;
      skillingBosses.tickAbility();
      totalSkillTicks++;
      for (
        let i = 0;
        i < checkEfficientSkilling(game, currentAbility, skill.name);
        i++
      ) {
        skillingBosses.tickAbility();
        totalSkillTicks++;
      }
      needToUpdateUI = true;
      needToSaveState = true;
    }

    // check if skill matches boss
    let skillMatchesBoss = false;
    if (
      skillingBosses.activeBoss &&
      skillingBosses.activeBoss.skill === skill.name
    ) {
      skillMatchesBoss = true;
      skillingBosses.tickAbility();
      totalSkillTicks++;
      for (
        let i = 0;
        i < checkEfficientBossing(game, currentAbility, skill.name);
        i++
      ) {
        skillingBosses.tickAbility();
        totalSkillTicks++;
      }
      needToUpdateUI = true;
      needToSaveState = true;
    }
    // check for discarded ticks
    let restedBonus = 0;
    let RESTED_CAP = 1;
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

    // calculate xpBonus
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
    let bonusSkillTicks =
      1 + checkEfficientSkilling(game, currentAbility, skill.name);
    let s = "";
    if (bonusSkillTicks > 1) {
      s = "s";
    }
    htmlContent += `<div class="text-success">${currentAbility.name} Matches Skill! +${bonusSkillTicks} skill-tick${s}</div>`;
  } else {
    htmlContent += `<div class="text-warning">${currentAbility.name} Doesn't Match Skill! +0 skill-ticks</div>`;
  }

  if (skillMatchesBoss) {
    let bonusSkillTicks =
      1 + checkEfficientBossing(game, currentAbility, skill.name);
    let s = "";
    if (bonusSkillTicks > 1) {
      s = "s";
    }
    htmlContent += `<div class="text-success">${game.skillingBosses.activeBoss.name} Matches Skill! +${bonusSkillTicks} skill-tick${s}</div>`;
  } else {
    htmlContent += `<div class="text-warning">${game.skillingBosses.activeBoss.name} Doesn't Match Skill! +0 skill-ticks</div>`;
  }

  if (xpBonus === 0) {
    htmlContent += `<div class="text-warning">Gained <span class="text-muted">${Math.floor(
      amount
    )}</span> XP from Skilling Action! +0 skill-ticks</div>`;
  } else {
    htmlContent += `<div class="text-success">Gained <span class="text-muted">${Math.floor(
      amount
    )}</span> XP from Skilling Action! +${xpBonus} skill-ticks</div>`;
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

function checkEfficientSkilling(game, ability, skill) {
  if (!game.skillingBosses.activeBoss) return 0;
  if (!game.skillingBosses.activeBoss.isTier2()) {
    return 0;
  }
  // Return the amount of extra skill-ticks gained from Efficient Skilling
  let extraSkillTicks = 0;
  const gathererSkills = ["Woodcutting", "Fishing", "Mining"];
  const refinerSkills = ["Cooking", "Firemaking", "Herblore"];
  const artisanSkills = ["Crafting", "Fletching", "Smithing"];
  const mysticSkills = ["Runecrafting", "Astrology", "Summoning"];
  const shiftySkills = ["Thieving", "Agility"];
  if (gathererSkills.includes(skill)) {
    const gathererModValue = activationFuncs.getModifierValue(
      game,
      "smattyBosses:efficientSkillingGatherer"
    );
    if (gathererModValue > 0 && ability.skill === `melvorD:${skill}`) {
      extraSkillTicks += gathererModValue;
      return extraSkillTicks;
    }
  } else if (refinerSkills.includes(skill)) {
    const refinerModValue = activationFuncs.getModifierValue(
      game,
      "smattyBosses:efficientSkillingRefiner"
    );
    if (refinerModValue > 0 && ability.skill === `melvorD:${skill}`) {
      extraSkillTicks += refinerModValue;
      return extraSkillTicks;
    }
  } else if (artisanSkills.includes(skill)) {
    const artisanModValue = activationFuncs.getModifierValue(
      game,
      "smattyBosses:efficientSkillingArtisan"
    );
    if (artisanModValue > 0 && ability.skill === `melvorD:${skill}`) {
      extraSkillTicks += artisanModValue;
      return extraSkillTicks;
    }
  } else if (mysticSkills.includes(skill)) {
    const mysticModValue = activationFuncs.getModifierValue(
      game,
      "smattyBosses:efficientSkillingMystic"
    );
    if (mysticModValue > 0 && ability.skill === `melvorD:${skill}`) {
      extraSkillTicks += mysticModValue;
      return extraSkillTicks;
    }
  } else if (shiftySkills.includes(skill)) {
    const shiftyModValue = activationFuncs.getModifierValue(
      game,
      "smattyBosses:efficientSkillingShifty"
    );
    if (shiftyModValue > 0 && ability.skill === `melvorD:${skill}`) {
      extraSkillTicks += shiftyModValue;
      return extraSkillTicks;
    }
  }
  return 0;
}

function checkEfficientBossing(game, ability, skill) {
  if (!game.skillingBosses.activeBoss) return 0;
  if (!game.skillingBosses.activeBoss.isTier2()) {
    return 0;
  }
  // Return the amount of extra skill-ticks gained from Efficient Bossing
  let extraSkillTicks = 0;
  const gathererSkills = ["Woodcutting", "Fishing", "Mining"];
  const refinerSkills = ["Cooking", "Firemaking", "Herblore"];
  const artisanSkills = ["Crafting", "Fletching", "Smithing"];
  const mysticSkills = ["Runecrafting", "Astrology", "Summoning"];
  const shiftySkills = ["Thieving", "Agility"];
  if (gathererSkills.includes(skill)) {
    const gathererModValue = activationFuncs.getModifierValue(
      game,
      "smattyBosses:efficientBossingGatherer"
    );
    if (
      gathererModValue > 0 &&
      game.skillingBosses.activeBoss.skill === skill
    ) {
      extraSkillTicks += gathererModValue;
      return extraSkillTicks;
    }
  } else if (refinerSkills.includes(skill)) {
    const refinerModValue = activationFuncs.getModifierValue(
      game,
      "smattyBosses:efficientBossingRefiner"
    );
    if (refinerModValue > 0 && game.skillingBosses.activeBoss.skill === skill) {
      extraSkillTicks += refinerModValue;
      return extraSkillTicks;
    }
  } else if (artisanSkills.includes(skill)) {
    const artisanModValue = activationFuncs.getModifierValue(
      game,
      "smattyBosses:efficientBossingArtisan"
    );
    if (artisanModValue > 0 && game.skillingBosses.activeBoss.skill === skill) {
      extraSkillTicks += artisanModValue;
      return extraSkillTicks;
    }
  } else if (mysticSkills.includes(skill)) {
    const mysticModValue = activationFuncs.getModifierValue(
      game,
      "smattyBosses:efficientBossingMystic"
    );
    if (mysticModValue > 0 && game.skillingBosses.activeBoss.skill === skill) {
      extraSkillTicks += mysticModValue;
      return extraSkillTicks;
    }
  } else if (shiftySkills.includes(skill)) {
    const shiftyModValue = activationFuncs.getModifierValue(
      game,
      "smattyBosses:efficientBossingShifty"
    );
    if (shiftyModValue > 0 && game.skillingBosses.activeBoss.skill === skill) {
      extraSkillTicks += shiftyModValue;
      return extraSkillTicks;
    }
  }
  return 0;
}
