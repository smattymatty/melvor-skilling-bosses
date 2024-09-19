export async function init(ctx) {
  await patchSkillTicks(ctx);
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

  ctx.patch(Skill, "addXP").before(function (amount, masteryAction) {
    const functionStartTime = performance.now();
    try {
      // Only proceed if there is an active boss and the skill is not a combat ability
      const skillingBosses = game.skillingBosses;
      if (
        skillingBosses.activeBoss === null ||
        combatAbilities.has(this.name)
      ) {
        return;
      }

      let totalSkillTicks = 0;
      let needToUpdateUI = false;
      let needToSaveState = false;

      // Tick battle and increment totalSkillTicks
      const tickBattleStart = performance.now();
      skillingBosses.tickBattle();
      const tickBattleEnd = performance.now();
      totalSkillTicks++;
      needToUpdateUI = true;
      needToSaveState = true;

      // Check if current ability matches skill
      const currentAbility =
        skillingBosses.equippedAbilities[skillingBosses.activeAbilitySlot];
      let skillMatchesAbility = false;

      let totalTickAbilityTime = 0;

      if (currentAbility && currentAbility.skill === this.id) {
        skillMatchesAbility = true;
        const tickAbilityStart = performance.now();
        skillingBosses.tickAbility();
        const tickAbilityEnd = performance.now();
        const tickAbilityTime = tickAbilityEnd - tickAbilityStart;
        totalTickAbilityTime += tickAbilityTime;

        totalSkillTicks++;
        needToUpdateUI = true;
        needToSaveState = true;
      }

      // Check if skill matches boss
      let skillMatchesBoss = false;
      if (
        skillingBosses.activeBoss &&
        skillingBosses.activeBoss.skill === this.name
      ) {
        skillMatchesBoss = true;
        const tickAbilityStart = performance.now();
        skillingBosses.tickAbility();
        const tickAbilityEnd = performance.now();
        const tickAbilityTime = tickAbilityEnd - tickAbilityStart;
        totalTickAbilityTime += tickAbilityTime;

        totalSkillTicks++;
        needToUpdateUI = true;
        needToSaveState = true;
      }

      // Calculate xpBonus
      let xpBonus = Math.min(Math.floor(amount / 20), 7);

      if (xpBonus > 0) {
        const xpBonusTickAbilityStart = performance.now();
        for (let i = 0; i < xpBonus; i++) {
          skillingBosses.tickAbility();
        }
        const xpBonusTickAbilityEnd = performance.now();
        const xpBonusTickAbilityTime =
          xpBonusTickAbilityEnd - xpBonusTickAbilityStart;
        totalTickAbilityTime += xpBonusTickAbilityTime;

        totalSkillTicks += xpBonus;
        needToUpdateUI = true;
      }

      if (needToUpdateUI) {
        const uiUpdateStart = performance.now();
        battlesUIModule.updateAbilityProgressUI();
        battlesUIModule.updateBattleStatsUI();
        const uiUpdateEnd = performance.now();
      }

      if (needToSaveState) {
        const saveStateStart = performance.now();
        saveBattleState(ctx);
        const saveStateEnd = performance.now();
      }

      const updateInfoStart = performance.now();
      updatePlayerSkillTickInfo(
        ctx,
        this,
        totalSkillTicks,
        amount,
        skillMatchesAbility,
        skillMatchesBoss,
        xpBonus
      );
      const updateInfoEnd = performance.now();
    } catch (error) {
      console.error("Error ticking skill XP:", error);
    }
  });

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

    htmlContent += `<div>Skill-ticks from Skilling Action: ${totalSkillTicks}</div>`;

    playerSkillTickInfo.innerHTML = htmlContent;
  }
}
