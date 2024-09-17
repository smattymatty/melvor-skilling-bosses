export function init(ctx) {
  fillMainQuestInfo(ctx);
  fillAbilitySlots(ctx);
  fillCurrentBoss(ctx);
  fillBattleInfo(ctx);
  fillBossKillsArray(ctx);
  fillPlayerLoot(ctx);
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
  const currentBattleAbilitiesUsed = ctx.characterStorage.getItem("Cabu");
  const currentBattleDamageDealt = ctx.characterStorage.getItem("Cdd");
  const currentBattleBossHealed = ctx.characterStorage.getItem("BctH");
  const currentBattleBossDamageDealt = ctx.characterStorage.getItem("BctD");
  const currentBattleBossDamageReduced = ctx.characterStorage.getItem("BctB");
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
  if (currentBattleAbilitiesUsed) {
    game.skillingBosses.currentBattleAbilitiesUsed = currentBattleAbilitiesUsed;
    console.log(
      "Current battle abilities used loaded from storage:",
      currentBattleAbilitiesUsed
    );
  } else {
    console.log("No current battle abilities used found in storage");
  }
  if (currentBattleDamageDealt) {
    game.skillingBosses.currentBattleDamageDealt = currentBattleDamageDealt;
    console.log(
      "Current battle damage dealt loaded from storage:",
      currentBattleDamageDealt
    );
  } else {
    console.log("No current battle damage dealt found in storage");
  }
  if (currentBattleBossHealed) {
    game.skillingBosses.currentBattleBossHealed = currentBattleBossHealed;
    console.log(
      "Current battle boss healed loaded from storage:",
      currentBattleBossHealed
    );
  } else {
    console.log("No current battle boss healed found in storage");
  }
  if (currentBattleBossDamageDealt) {
    game.skillingBosses.currentBattleBossDamageDealt =
      currentBattleBossDamageDealt;
    console.log(
      "Current battle boss damage dealt loaded from storage:",
      currentBattleBossDamageDealt
    );
  } else {
    console.log("No current battle boss damage dealt found in storage");
  }
  if (currentBattleBossDamageReduced) {
    game.skillingBosses.currentBattleBossDamageReduced =
      currentBattleBossDamageReduced;
    console.log(
      "Current battle boss damage reduced loaded from storage:",
      currentBattleBossDamageReduced
    );
  } else {
    console.log("No current battle boss damage reduced found in storage");
  }
}

function fillBossKillsArray(ctx) {
  try {
    const bossKillsArray = ctx.characterStorage.getItem("BctR");
    console.log("Filling boss kills array from storage");
    console.log(bossKillsArray);
    if (bossKillsArray) {
      // Assuming bossKillsArray is an array of arrays where each sub-array contains [totalKills, fastestKill]

      // Loop through each entry in the bossKillsArray and map it to the respective boss
      bossKillsArray.forEach((bossData, index) => {
        const boss = game.skillingBosses.getBossById(index); // Get boss by its index (ID)
        console.log("boss,", boss);
        console.log("bossData,", bossData);
        console.log("index,", index);
        if (boss) {
          const [totalKills, fastestKill] = bossData;

          // Apply the loaded data to the boss
          boss.kills = totalKills || 0;
          boss.tickRecord = fastestKill || 0;

          console.log(
            `Boss ID ${boss.id} - Kills: ${boss.kills}, Fastest Kill: ${boss.tickRecord}`
          );
        } else {
          console.warn(`No boss found for ID ${index}`);
        }
      });

      // Update game state with the filled array
      game.skillingBosses.bossKillsArray = bossKillsArray;
      console.log("Boss kills array loaded from storage:", bossKillsArray);
    } else {
      console.log("No boss kills array found in storage");
    }
  } catch (error) {
    console.error("Error filling boss kills array from storage:", error);
  }
}

function fillPlayerLoot(ctx) {
  try {
    const playerLoot = ctx.characterStorage.getItem("Plt");
    console.log("Filling player loot from storage");
    console.log(playerLoot);
    if (playerLoot) {
      // Assuming playerLoot is an array of arrays where each sub-array contains [itemId, quantity]

      game.skillingBosses.playerLoot = playerLoot;
      console.log("Player loot loaded from storage:", playerLoot);
    } else {
      console.log("No player loot found in storage");
    }
  } catch (error) {
    console.error("Error filling player loot from storage:", error);
  }
}
