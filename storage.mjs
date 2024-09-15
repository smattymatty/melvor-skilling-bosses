export function init(ctx) {
  fillMainQuestInfo(ctx);
  fillAbilitySlots(ctx);
  fillCurrentBoss(ctx);
  fillBattleInfo(ctx);
  console.log("Storage initialized");
  console.log(ctx.characterStorage);
}

export function fillMainQuestInfo(ctx) {
  console.log("Filling main quest info from storage");
  const mainQuestNumber = ctx.characterStorage.getItem("mqNum");
  if (mainQuestNumber === null || mainQuestNumber === undefined) {
    console.log("No main quest number found in storage");
    return;
  }
  game.skillingBosses.currentMainQuest = mainQuestNumber;
  console.log("Main quest number loaded from storage:", mainQuestNumber);
}

export function fillAbilitySlots(ctx) {
  const abilityIDsString = ctx.characterStorage.getItem("ASlts");
  const abilityIDs = abilityIDsString ? JSON.parse(abilityIDsString) : [];

  console.log("Filling ability slots from storage", abilityIDs);

  game.skillingBosses.equippedAbilities = abilityIDs.map((abilityID, index) => {
    if (abilityID !== null && abilityID !== undefined) {
      const ability = game.skillingBosses.getAbility(abilityID);
      if (ability) {
        return ability;
      } else {
        console.warn(`Ability with ID ${abilityID} not found`);
        return null;
      }
    } else {
      return null;
    }
  });

  console.log(
    "Ability slots loaded from storage:",
    game.skillingBosses.equippedAbilities
  );
}

function fillCurrentBoss(ctx) {
  const currentBossId = ctx.characterStorage.getItem("AcBss");
  if (currentBossId !== null && currentBossId !== undefined) {
    const boss = game.skillingBosses.getBossById(parseInt(currentBossId, 10));
    if (boss) {
      game.skillingBosses.setActiveBoss(boss.id);
      console.log("Current boss loaded from storage:", boss.name);
    } else {
      console.warn(`Boss with ID ${currentBossId} not found`);
    }
  } else {
    console.log("No current boss found in storage");
  }
}

function fillBattleInfo(ctx) {
  const currentBattleTicks = ctx.characterStorage.getItem("Crbt");
  const activeAbilitySlot = ctx.characterStorage.getItem("ASlt");
  const playerCoreHP = ctx.characterStorage.getItem("PcHP");
  const bossCurrHP = ctx.characterStorage.getItem("BcHP");
  const bossAttackTimer = ctx.characterStorage.getItem("Bcat");
  const activeAbilityTimer = ctx.characterStorage.getItem("Acat");
  if (currentBattleTicks) {
    game.skillingBosses.currentBattleTicks = currentBattleTicks;
    console.log(
      "Current battle ticks loaded from storage:",
      currentBattleTicks
    );
  } else {
    console.log("No current battle ticks found in storage");
  }
  if (activeAbilitySlot) {
    game.skillingBosses.activeAbilitySlot = activeAbilitySlot;
    console.log("Active ability slot loaded from storage:", activeAbilitySlot);
  } else {
    console.log("No active ability slot found in storage");
  }
  if (playerCoreHP) {
    game.skillingBosses.playerCoreHP = playerCoreHP;
    console.log("Player core HP loaded from storage:", playerCoreHP);
  } else {
    console.log("No player core HP found in storage");
  }
  if (bossCurrHP) {
    game.skillingBosses.bossCurrHP = bossCurrHP;
    console.log("Boss core HP loaded from storage:", bossCurrHP);
  } else {
    console.log("No boss core HP found in storage");
  }
  if (bossAttackTimer) {
    game.skillingBosses.bossAttackTimer = bossAttackTimer;
    console.log("Boss attack timer loaded from storage:", bossAttackTimer);
  } else {
    console.log("No boss attack timer found in storage");
  }
  if (activeAbilityTimer) {
    game.skillingBosses.activeAbilityTimer = activeAbilityTimer;
    console.log(
      "Active ability timer loaded from storage:",
      activeAbilityTimer
    );
  } else {
    console.log("No active ability timer found in storage");
  }
}
