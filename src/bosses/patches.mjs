export async function init(ctx) {
  await patchSkillTicks(ctx);
}

async function patchSkillTicks(ctx) {
  const battlesUIModule = await ctx.loadModule("src/ui/battle.mjs");
  const abilitiesUIModule = await ctx.loadModule("src/ui/abilities.mjs");
  // In patchSkillTicks
  ctx.patch(Skill, "addXP").before(function (amount, masteryAction) {
    try {
      const combatAbilities = [
        "Hitpoints",
        "Attack",
        "Defense",
        "Magic",
        "Strength",
        "Ranged",
      ];
      let totalSkillTicks = 0;
      // Only tick the battle if there is an active boss
      if (game.skillingBosses.activeBoss !== null) {
        // check if the skill is a combat ability
        if (!combatAbilities.includes(this.name)) {
          game.skillingBosses.tickBattle();
          totalSkillTicks++;
          battlesUIModule.updateAbilityProgressUI();
          battlesUIModule.updateBattleStatsUI();

          // Save battle state after ticking
          saveBattleState(ctx);
          updatePlayerSkillTickInfo(ctx, this, totalSkillTicks, amount);
        }
      }
    } catch (error) {
      console.error("Error ticking skill XP:", error);
    }
  });

  function saveBattleState(ctx) {
    ctx.characterStorage.setItem(
      "Crbt",
      game.skillingBosses.currentBattleTicks
    );
    ctx.characterStorage.setItem("ASlt", game.skillingBosses.activeAbilitySlot);
    ctx.characterStorage.setItem(
      "Acat",
      game.skillingBosses.activeAbilityTimer
    );
    ctx.characterStorage.setItem("Bcat", game.skillingBosses.bossAttackTimer);
    ctx.characterStorage.setItem("BcHP", game.skillingBosses.bossCurrHP);
    ctx.characterStorage.setItem("PcHP", game.skillingBosses.playerCoreHP);
  }

  function updatePlayerSkillTickInfo(ctx, skill, totalSkillTicks, amount) {
    const playerSkillTickInfo = document.getElementById(
      "player-skill-tick-info"
    );
    const currentAbility =
      game.skillingBosses.equippedAbilities[
        game.skillingBosses.activeAbilitySlot
      ];
    let skillMatchesAbility = false;
    console.log(currentAbility);
    if (currentAbility.skill === skill.id) {
      skillMatchesAbility = true;
      // Only tick the battle if there is an active boss
      if (game.skillingBosses.activeBoss !== null) {
        game.skillingBosses.tickAbility();
        totalSkillTicks++;
        battlesUIModule.updateAbilityProgressUI();
        battlesUIModule.updateBattleStatsUI();

        // Save battle state after ticking
        saveBattleState(ctx);
      }
    }
    let skillMatchesBoss = false;
    if (game.skillingBosses.activeBoss) {
      if (game.skillingBosses.activeBoss.skill === skill.name) {
        skillMatchesBoss = true;
        // Only tick the battle if there is an active boss
        if (game.skillingBosses.activeBoss !== null) {
          game.skillingBosses.tickAbility();
          totalSkillTicks++;
          battlesUIModule.updateAbilityProgressUI();
          battlesUIModule.updateBattleStatsUI();

          // Save battle state after ticking
          saveBattleState(ctx);
        }
      }
    }
    const xpBonus = Math.floor(amount / 20);
    for (let i = 0; i < xpBonus; i++) {
      game.skillingBosses.tickAbility();
      totalSkillTicks++;
    }
    if (playerSkillTickInfo) {
      playerSkillTickInfo.innerHTML = `<div>Training Skill: ${skill.name}</div>`;
      if (skillMatchesAbility) {
        playerSkillTickInfo.innerHTML += `<div class="text-success">${currentAbility.name} Matches Skill! +1 skill-tick</div>`;
      } else {
        playerSkillTickInfo.innerHTML += `
        <div class="text-warning">${currentAbility.name} Doesn't Match Skill! +0 skill-ticks</div>`;
      }
      if (skillMatchesBoss) {
        playerSkillTickInfo.innerHTML += `<div class="text-success">${game.skillingBosses.activeBoss.name} Matches Skill! +1 skill-tick</div>`;
      } else {
        playerSkillTickInfo.innerHTML += `<div class="text-warning">${game.skillingBosses.activeBoss.name} Doesn't Match Skill! +0 skill-ticks</div>`;
      }
      if (xpBonus === 0) {
        playerSkillTickInfo.innerHTML += `<div class="text-warning">Gained <span class="text-muted">${amount}</span> XP from Skilling Action! +0 skill-ticks</div>`;
      } else if (xpBonus === 1) {
        playerSkillTickInfo.innerHTML += `<div class="text-success">Gained <span class="text-muted">${amount}</span> XP from Skilling Action! +1 skill-tick</div>`;
      } else if (xpBonus > 1) {
        playerSkillTickInfo.innerHTML += `<div class="text-success">Gained <span class="text-muted">${amount}</span> XP from Skilling Action! +${xpBonus} skill-ticks</div>`;
      }
      playerSkillTickInfo.innerHTML += `
      <div>skill-ticks from Skilling Action: ${totalSkillTicks}</div>`;
    }
  }
}
