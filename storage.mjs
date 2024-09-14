export function init(ctx) {
  fillMainQuestInfo(ctx);
  fillAbilitySlots(ctx);
  fillCurrentBoss(ctx);
  fillBattleInfo(ctx);
}

export function fillMainQuestInfo(ctx) {
  console.log("Filling main quest info from storage");
  console.log(ctx.characterStorage);
  const mainQuestNumber = ctx.characterStorage.getItem("mqNum");
  if (mainQuestNumber === null || mainQuestNumber === undefined) {
    console.log("No main quest number found in storage");
    return;
  }
  game.skillingBosses.currentMainQuest = mainQuestNumber;
  console.log("Main quest number loaded from storage:", mainQuestNumber);
}

function fillAbilitySlots(ctx) {
  const abilityIDs = ctx.characterStorage.getItem("ASlts");
  console.log("Filling ability slots from storage", abilityIDs);
  console.log(ctx.characterStorage);
  console.log(abilityIDs);

  if (!abilityIDs || !Array.isArray(abilityIDs)) {
    console.log("No valid ability IDs found in storage");
    return;
  }

  abilityIDs.forEach((abilityID, index) => {
    if (abilityID) {
      const ability = game.skillingBosses.getAbility(abilityID);
      if (ability) {
        game.skillingBosses.equippedAbilities[index] = {
          ability: ability,
          slot: index + 1,
        };
      } else {
        console.warn(`Ability with ID ${abilityID} not found`);
      }
    } else {
      // Clear the slot if abilityID is null
      game.skillingBosses.equippedAbilities[index] = null;
    }
  });
  console.log("Ability slots loaded from storage:", game.skillingBosses);
}

function fillCurrentBoss(ctx) {
  const currentBossId = ctx.characterStorage.getItem("AcBss");
  if (currentBossId) {
    game.skillingBosses.setActiveBoss(currentBossId);
    console.log("Current boss loaded from storage:", currentBossId);
  } else {
    console.log("No current boss found in storage");
  }
}

function fillBattleInfo(ctx) {
  const currentBattleTicks = ctx.characterStorage.getItem("Crbt");
  if (currentBattleTicks) {
    game.skillingBosses.currentBattleTicks = currentBattleTicks;
    console.log("Current battle ticks loaded from storage:", currentBattleTicks);
  } else {
    console.log("No current battle ticks found in storage");
  }
}