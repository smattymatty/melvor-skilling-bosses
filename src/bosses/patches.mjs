export async function init(ctx) {
  await patchSkillTicks(ctx);
}

async function patchSkillTicks(ctx) {
  const battlesUIModule = await ctx.loadModule("src/ui/battle.mjs");
  const abilitiesUIModule = await ctx.loadModule("src/ui/abilities.mjs");

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
      let needToUpdateUI = false;
      let needToSaveState = false;

      // Only proceed if there is an active boss
      if (game.skillingBosses.activeBoss !== null) {
        // Check if the skill is not a combat ability
        if (combatAbilities.includes(this.name)) {
          return;
        }
        if (!combatAbilities.includes(this.name)) {
          game.skillingBosses.tickBattle();
          totalSkillTicks++;
          needToUpdateUI = true;
          needToSaveState = true;
        }

        const currentAbility =
          game.skillingBosses.equippedAbilities[
            game.skillingBosses.activeAbilitySlot
          ];
        let skillMatchesAbility = false;

        if (currentAbility && currentAbility.skill === this.id) {
          skillMatchesAbility = true;
          game.skillingBosses.tickAbility();
          totalSkillTicks++;
          needToUpdateUI = true;
          needToSaveState = true;
        }

        let skillMatchesBoss = false;
        if (
          game.skillingBosses.activeBoss &&
          game.skillingBosses.activeBoss.skill === this.name
        ) {
          skillMatchesBoss = true;
          game.skillingBosses.tickAbility();
          totalSkillTicks++;
          needToUpdateUI = true;
          needToSaveState = true;
        }

        let xpBonus = Math.floor(amount / 20);
        if (xpBonus > 7) {
          xpBonus = 7;
        }
        if (xpBonus > 0) {
          for (let i = 0; i < xpBonus; i++) {
            game.skillingBosses.tickAbility();
            totalSkillTicks++;
          }
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
          this,
          totalSkillTicks,
          amount,
          skillMatchesAbility,
          skillMatchesBoss,
          xpBonus
        );
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
    ctx.characterStorage.setItem(
      "Cabu",
      game.skillingBosses.currentBattleAbilitiesUsed
    );
    ctx.characterStorage.setItem(
      "Cdd",
      game.skillingBosses.currentBattleDamageDealt
    );
    ctx.characterStorage.setItem("ASlt", game.skillingBosses.activeAbilitySlot);
    ctx.characterStorage.setItem(
      "Acat",
      game.skillingBosses.activeAbilityTimer
    );
    ctx.characterStorage.setItem("Bcat", game.skillingBosses.bossAttackTimer);
    ctx.characterStorage.setItem("BcHP", game.skillingBosses.bossCurrHP);
    ctx.characterStorage.setItem("PcHP", game.skillingBosses.playerCoreHP);
    ctx.characterStorage.setItem("BctR", game.skillingBosses.bossKillsArray);
    ctx.characterStorage.setItem(
      "BctH",
      game.skillingBosses.currentBattleBossHealed
    );
    ctx.characterStorage.setItem(
      "BctD",
      game.skillingBosses.currentBattleDamageDealt
    );
    ctx.characterStorage.setItem(
      "BctB",
      game.skillingBosses.currentBattleBossDamageReduced
    );
    // loot
    ctx.characterStorage.setItem("Plt", game.skillingBosses.playerLoot);
  }

  function updatePlayerSkillTickInfo(
    ctx,
    skill,
    totalSkillTicks,
    amount,
    skillMatchesAbility,
    skillMatchesBoss,
    xpBonus
  ) {
    const playerSkillTickInfo = document.getElementById(
      "player-skill-tick-info"
    );
    if (!playerSkillTickInfo) return;

    const currentAbility =
      game.skillingBosses.equippedAbilities[
        game.skillingBosses.activeAbilitySlot
      ];

    let htmlContent = `<div>Training Skill: ${skill.name}</div>`;

    if (skillMatchesAbility) {
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

    htmlContent += `<div>Skill-ticks from Skilling Action: ${totalSkillTicks}</div>`;

    playerSkillTickInfo.innerHTML = htmlContent;
  }
}
