export function init(ctx) {
  fillMainQuestInfo(ctx);
  fillSideQuestInfo(ctx);
  fillAbilitySlots(ctx);
  fillCurrentBoss(ctx);
  fillBattleInfo(ctx);
  fillBossKillsArray(ctx);
  fillPlayerLoot(ctx);
  fillBossAttackInfo(ctx);
  fillPlayerStats(ctx);
  fillSettings(ctx);
  //fillBossStats(ctx);
  fillExtraPlayerStats(ctx);
  console.log("Storage initialized");
  console.log(ctx.characterStorage);
}

export function fillMainQuestInfo(ctx) {
  const mainQuestNumber = ctx.characterStorage.getItem("mqNum");
  if (mainQuestNumber === null || mainQuestNumber === undefined) {
    return;
  }
  game.skillingBosses.currentMainQuest = mainQuestNumber;
}

export function fillSideQuestInfo(ctx) {
  const beginnerQuestCompleted = ctx.characterStorage.getItem("BQc");
  if (beginnerQuestCompleted) {
    game.skillingBosses.beginnerQuestsCompleted = beginnerQuestCompleted;
  }
  const averageQuestCompleted = ctx.characterStorage.getItem("AQc");
  if (averageQuestCompleted) {
    game.skillingBosses.averageQuestsCompleted = averageQuestCompleted;
  }
}

export function fillAbilitySlots(ctx) {
  const abilityIDsString = ctx.characterStorage.getItem("ASlts");
  const abilityIDs = abilityIDsString ? JSON.parse(abilityIDsString) : [];

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
}

function fillCurrentBoss(ctx) {
  const currentBossId = ctx.characterStorage.getItem("AcBss");
  if (currentBossId !== null && currentBossId !== undefined) {
    const boss = game.skillingBosses.getBossById(currentBossId);
    if (boss) {
      game.skillingBosses.activeBoss = boss;
      game.skillingBosses.bossMaxHP = boss.maxHP;
    } else {
      console.warn(`Boss with ID ${currentBossId} not found`);
    }
  }
}

function fillBattleInfo(ctx) {
  const currentBossAttackPower = ctx.characterStorage.getItem("Batp");
  const currentBattleTicks = ctx.characterStorage.getItem("Crbt");
  const activeAbilitySlot = ctx.characterStorage.getItem("ASlt");
  const playerCoreHP = ctx.characterStorage.getItem("PcHP");
  const bossCurrHP = ctx.characterStorage.getItem("BcHP");
  const activeAbilityTimer = ctx.characterStorage.getItem("Acat");
  const currentBattleAbilitiesUsed = ctx.characterStorage.getItem("Cabu");
  const currentBattleDamageDealt = ctx.characterStorage.getItem("Cdd");
  const currentBattleBossHealed = ctx.characterStorage.getItem("BctH");
  const currentBattleBossDamageDealt = ctx.characterStorage.getItem("BctD");
  const currentBattleBossDamageReduced = ctx.characterStorage.getItem("BctB");
  const lastSkillTickAmounts = ctx.characterStorage.getItem("SltA");
  const discardedTicks = ctx.characterStorage.getItem("Dst");
  const bossCurrentDebuffs = ctx.characterStorage.getItem("BsDb");
  const bossCurrentBuffs = ctx.characterStorage.getItem("BsBb");
  const currentBattleDebuffDamageDealt = ctx.characterStorage.getItem("BctDb");
  const bossStatChanges = ctx.characterStorage.getItem("BstC");
  const abilitySkillsThisBattle = ctx.characterStorage.getItem("AsTb");
  if (bossCurrentBuffs) {
    game.skillingBosses.bossCurrentBuffs = bossCurrentBuffs;
    console.log("Boss current buffs loaded from storage:", bossCurrentBuffs);
  } else {
    console.log("No boss current buffs found in storage");
  }
  if (currentBossAttackPower !== null && currentBossAttackPower !== undefined) {
    game.skillingBosses.activeBoss.attackPower = currentBossAttackPower;
    console.log(
      "Current boss attack power loaded from storage:",
      currentBossAttackPower
    );
  } else {
    console.log("No current boss attack power found in storage");
  }
  if (
    abilitySkillsThisBattle !== null &&
    abilitySkillsThisBattle !== undefined
  ) {
    game.skillingBosses.abilitySkillsThisBattle = abilitySkillsThisBattle;
    console.log(
      "Ability skills this battle loaded from storage:",
      abilitySkillsThisBattle
    );
  } else {
    console.log("No ability skills this battle found in storage");
  }
  if (bossStatChanges) {
    game.skillingBosses.bossStatChanges = bossStatChanges;
    console.log("Boss stat changes loaded from storage:", bossStatChanges);
  } else {
    console.log("No boss stat changes found in storage");
  }
  if (currentBattleDebuffDamageDealt) {
    game.skillingBosses.currentBattleDebuffDamageDealt =
      currentBattleDebuffDamageDealt;
    console.log(
      "Current battle debuff damage dealt loaded from storage:",
      currentBattleDebuffDamageDealt
    );
  }
  if (bossCurrentDebuffs) {
    game.skillingBosses.bossCurrentDebuffs = bossCurrentDebuffs;
    console.log(
      "Boss current debuffs loaded from storage:",
      bossCurrentDebuffs
    );
  } else {
    console.log("No boss current debuffs found in storage");
  }
  if (discardedTicks) {
    game.skillingBosses.discardedTicks = discardedTicks;
    console.log("Discarded ticks loaded from storage:", discardedTicks);
  } else {
    console.log("No discarded ticks found in storage");
  }
  if (lastSkillTickAmounts) {
    game.skillingBosses.lastSkillTickAmounts = lastSkillTickAmounts;
    console.log(
      "Last skill tick amounts loaded from storage:",
      lastSkillTickAmounts
    );
  }
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
  const pauseBattleTicks = ctx.characterStorage.getItem("Pbt");
  if (pauseBattleTicks) {
    game.skillingBosses.pauseBattleTicks = pauseBattleTicks;
    console.log("Paused battle ticks loaded from storage:", pauseBattleTicks);
  } else {
    console.log("No paused battle ticks found in storage");
  }
  const playerShield = ctx.characterStorage.getItem("Psh");
  if (playerShield !== null && playerShield !== undefined) {
    game.skillingBosses.playerShield = playerShield;
    console.log("Player shield loaded from storage:", playerShield);
  } else {
    console.log("No player shield found in storage");
  }
  const playerShieldLost = ctx.characterStorage.getItem("PshL");
  if (playerShieldLost) {
    game.skillingBosses.playerShieldLost = playerShieldLost;
    console.log("Player shield lost loaded from storage:", playerShieldLost);
  } else {
    console.log("No player shield lost found in storage");
  }
  const playerHPLost = ctx.characterStorage.getItem("PhL");
  if (playerHPLost) {
    game.skillingBosses.playerHPLost = playerHPLost;
    console.log("Player HP lost loaded from storage:", playerHPLost);
  } else {
    console.log("No player HP lost found in storage");
  }
  const playerShieldGained = ctx.characterStorage.getItem("PshG");
  if (playerShieldGained) {
    game.skillingBosses.playerShieldGained = playerShieldGained;
    console.log(
      "Player shield gained loaded from storage:",
      playerShieldGained
    );
  } else {
    console.log("No player shield gained found in storage");
  }
  const playerHPGained = ctx.characterStorage.getItem("PhG");
  if (playerHPGained) {
    game.skillingBosses.playerHPGained = playerHPGained;
    console.log("Player HP gained loaded from storage:", playerHPGained);
  } else {
    console.log("No player HP gained found in storage");
  }
}

function fillBossKillsArray(ctx) {
  try {
    const bossKillsArray = ctx.characterStorage.getItem("BctR");
    if (bossKillsArray) {
      // bossKillsArray is an array of arrays where each sub-array contains [totalKills, fastestKill]
      bossKillsArray.forEach((bossData, index) => {
        const boss = game.skillingBosses.getBossById(index); // Get boss by its index (ID)
        if (boss) {
          const [totalKills, fastestKill] = bossData;

          boss.kills = totalKills || 0;
          boss.tickRecord = fastestKill || 0;
        } else {
          console.warn(`No boss found for ID ${index}`);
        }
      });

      game.skillingBosses.bossKillsArray = bossKillsArray;
    }
  } catch (error) {
    console.error("Error filling boss kills array from storage:", error);
  }
}

function fillPlayerLoot(ctx) {
  try {
    const playerLoot = ctx.characterStorage.getItem("Plt");
    if (playerLoot) {
      game.skillingBosses.playerLoot = playerLoot;
    }
  } catch (error) {
    console.error("Error filling player loot from storage:", error);
  }
}

function fillBossAttackInfo(ctx) {
  try {
    const bossNextAttackIndex = ctx.characterStorage.getItem("Bna");
    const bossAttackTimer = ctx.characterStorage.getItem("Bat");
    const bossAbilitiesUsed = ctx.characterStorage.getItem("BaU");

    if (bossAbilitiesUsed) {
      game.skillingBosses.bossAbilitiesUsed = bossAbilitiesUsed;
    }

    if (bossNextAttackIndex !== null && bossNextAttackIndex !== undefined) {
      game.skillingBosses.bossNextAttackIndex = bossNextAttackIndex;
      console.log(
        "Boss next attack index loaded from storage:",
        bossNextAttackIndex
      );
    } else {
      console.log("No boss next attack index found in storage");
    }
    if (bossAttackTimer !== null && bossAttackTimer !== undefined) {
      game.skillingBosses.bossAttackTimer = bossAttackTimer;
    }
  } catch (error) {
    console.error("Error filling boss attack info from storage:", error);
  }
}

function fillPlayerStats(ctx) {
  try {
    const playerCoreMaxHP = ctx.characterStorage.getItem("PcMH");
    const playerHPRegen = ctx.characterStorage.getItem("PhR");
    const playerShieldMax = ctx.characterStorage.getItem("PshM");
    const playerShieldRegen = ctx.characterStorage.getItem("PshR");
    const playerHPRegenAmount = ctx.characterStorage.getItem("PhRA");
    const playerShieldRegenAmount = ctx.characterStorage.getItem("PshRA");
    const playerPhysicalResistance = ctx.characterStorage.getItem("PcPD");
    const playerMagicResistance = ctx.characterStorage.getItem("PccMD");
    if (playerPhysicalResistance) {
      game.skillingBosses.playerPhysicalResistance = playerPhysicalResistance;
    }
    if (playerMagicResistance) {
      game.skillingBosses.playerMagicResistance = playerMagicResistance;
    }
    if (playerShieldMax) {
      game.skillingBosses.playerShieldMax = playerShieldMax;
    }
    if (playerCoreMaxHP) {
      game.skillingBosses.playerCoreMaxHP = playerCoreMaxHP;
    }
    if (playerHPRegen) {
      game.skillingBosses.playerHPRegen = playerHPRegen;
    }
    if (playerShieldRegen) {
      game.skillingBosses.playerShieldRegen = playerShieldRegen;
    }
    if (playerHPRegenAmount) {
      game.skillingBosses.playerHPRegenAmount = playerHPRegenAmount;
    }
    if (playerShieldRegenAmount) {
      game.skillingBosses.playerShieldRegenAmount = playerShieldRegenAmount;
    }
  } catch (error) {
    console.error("Error filling player stats from storage:", error);
  }
}

function fillBossStats(ctx) {
  try {
    const bossPhysicalDefence = ctx.characterStorage.getItem("Bpd");
    const bossMagicDefence = ctx.characterStorage.getItem("Bmd");
    if (bossPhysicalDefence) {
      game.skillingBosses.activeBoss.physicalDefense = bossPhysicalDefence;
    }
    if (bossMagicDefence) {
      game.skillingBosses.activeBoss.magicDefense = bossMagicDefence;
    }
  } catch (error) {
    console.error("Error filling boss stats from storage:", error);
  }
}

function fillExtraPlayerStats(ctx) {
  try {
    const highestDamageDealt =
      ctx.characterStorage.getItem("highestDamageDealt");
    const debuffsApplied = ctx.characterStorage.getItem("debuffsApplied");
    const damageTaken = ctx.characterStorage.getItem("damageTaken");
    const highestDamageTaken =
      ctx.characterStorage.getItem("highestDamageTaken");
    const damageDealt = ctx.characterStorage.getItem("damageDealt");
    if (damageDealt) {
      game.skillingBosses.ExtraPlayerStats.damageDealt = damageDealt;
    }
    if (highestDamageTaken) {
      game.skillingBosses.ExtraPlayerStats.highestDamageTaken =
        highestDamageTaken;
    }
    if (highestDamageDealt) {
      game.skillingBosses.ExtraPlayerStats.highestDamageDealt =
        highestDamageDealt;
    }
    if (debuffsApplied) {
      game.skillingBosses.ExtraPlayerStats.debuffsApplied = debuffsApplied;
    }
    if (damageTaken) {
      game.skillingBosses.ExtraPlayerStats.damageTaken = damageTaken;
    }
    const debuffDamageDealt = ctx.characterStorage.getItem("debuffDamageDealt");
    const highestDebuffDamageDealt = ctx.characterStorage.getItem(
      "highestDebuffDamageDealt"
    );
    if (debuffDamageDealt) {
      game.skillingBosses.ExtraPlayerStats.debuffDamageDealt =
        debuffDamageDealt;
    }
    if (highestDebuffDamageDealt) {
      game.skillingBosses.ExtraPlayerStats.highestDebuffDamageDealt =
        highestDebuffDamageDealt;
    }
    const physicalResistReduced = ctx.characterStorage.getItem(
      "physicalResistReduced"
    );
    if (physicalResistReduced) {
      game.skillingBosses.ExtraPlayerStats.physicalResistReduced =
        physicalResistReduced;
    }
    const magicResistReduced =
      ctx.characterStorage.getItem("magicResistReduced");
    if (magicResistReduced) {
      game.skillingBosses.ExtraPlayerStats.magicResistReduced =
        magicResistReduced;
    }
    const totalBossKills = getTotalBossKills(ctx);
    if (totalBossKills) {
      game.skillingBosses.ExtraPlayerStats.totalBossKills = totalBossKills;
    }
    const fastestBossKill = getFastestBossKill(ctx);
    if (fastestBossKill) {
      game.skillingBosses.ExtraPlayerStats.fastestBossKill = fastestBossKill;
    }
    const commonRewardHits = ctx.characterStorage.getItem("commonRewardHits");
    if (commonRewardHits) {
      game.skillingBosses.ExtraPlayerStats.commonRewardHits = commonRewardHits;
    }
    const uncommonRewardHits =
      ctx.characterStorage.getItem("uncommonRewardHits");
    if (uncommonRewardHits) {
      game.skillingBosses.ExtraPlayerStats.uncommonRewardHits =
        uncommonRewardHits;
    }
    const rareRewardHits = ctx.characterStorage.getItem("rareRewardHits");
    if (rareRewardHits) {
      game.skillingBosses.ExtraPlayerStats.rareRewardHits = rareRewardHits;
    }
    const legendaryRewardHits = ctx.characterStorage.getItem(
      "legendaryRewardHits"
    );
    if (legendaryRewardHits) {
      game.skillingBosses.ExtraPlayerStats.legendaryRewardHits =
        legendaryRewardHits;
    }
  } catch (error) {
    console.error("Error filling extra player stats from storage:", error);
  }
}

function getTotalBossKills(ctx) {
  const bossKillsArray = ctx.characterStorage.getItem("BctR");
  if (bossKillsArray) {
    let totalBossKills = 0;
    bossKillsArray.forEach((bossData, index) => {
      const boss = game.skillingBosses.getBossById(index); // Get boss by its index (ID)
      if (boss) {
        totalBossKills += bossData[0];
      }
    });
    return totalBossKills;
  } else {
    return 0;
  }
}

function getFastestBossKill(ctx) {
  const bossKillsArray = ctx.characterStorage.getItem("BctR");
  if (bossKillsArray) {
    let fastestBossKill = 9999999999;
    bossKillsArray.forEach((bossData, index) => {
      const boss = game.skillingBosses.getBossById(index); // Get boss by its index (ID)
      if (boss) {
        if (bossData[1] < fastestBossKill) {
          fastestBossKill = bossData[1];
        }
      }
    });
    return fastestBossKill;
  } else {
    return 0;
  }
}

function fillSettings(ctx) {
  const ignoreSummoningWhileSkilling =
    ctx.characterStorage.getItem("IsSummoningIgnored");
  if (ignoreSummoningWhileSkilling) {
    game.skillingBosses.ignoreSummoningWhileSkilling =
      ignoreSummoningWhileSkilling;
  }
}
