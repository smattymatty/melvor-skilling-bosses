const { loadModule } = mod.getContext(import.meta);

const activationFuncs = await loadModule("src/abilities/activationFuncs.mjs");

export function checkSkillLevel(game, skillID, requiredLevel) {
  try {
    const skillRegistry = game.skills.registeredObjects; // a map of skill IDs to skill objects
    const skill = skillRegistry.get(skillID);
    if (!skill) {
      throw new Error(`Skill ${skillID} not found in registry`);
    }
    const skillLevel = skill.level;
    if (skillLevel < requiredLevel) {
      // return a float between 0 and 1 indicating the progress of the skill
      return skillLevel / requiredLevel;
    } else {
      return 1;
    }
  } catch (error) {
    console.error("Error checking skill level:", error);
  }
}

/**
 * Check if the player has the required skill level or higher from a list of skill IDs.
 * Only needs one skill to be at the required level to succeed. */
export function checkSkillLevelsOr(game, skillIDs, requiredLevel) {
  try {
    let highestProgress = 0;
    skillIDs.forEach((skillID) => {
      const progress = checkSkillLevel(game, skillID, requiredLevel);
      if (progress === 1) {
        highestProgress = 1;
      } else {
        if (progress > highestProgress) {
          highestProgress = progress;
        }
      }
    });
    return highestProgress;
  } catch (error) {
    console.error("Error checking skill levels or:", error);
  }
}
export function hasPlayerKilledAmountOfBosses(game, amount) {
  try {
    let killedBosses = 0;
    // TODO: CHECK
    if (killedBosses >= amount) {
      return 1;
    } else {
      return killedBosses / amount;
    }
  } catch (error) {
    console.error("Error checking player killed bosses:", error);
  }
}
export function playerHasAnyAbilityEquipped(game) {
  try {
    let total = 0;
    for (const ability of game.skillingBosses.equippedAbilities) {
      if (ability) {
        total++;
      }
      if (total >= 3) {
        return 1; // Objective complete
      }
    }
    return 0.0; // Objective not started
  } catch (error) {
    console.error("Error checking player ability equipped:", error);
    return 0.0; // Return 0 in case of error
  }
}

/** Check for total different killed bosses */
export function checkTotalTypesOfBossesKilled(game, amount) {
  try {
    let killedBosses = 0;
    for (const boss of game.skillingBosses.bosses.values()) {
      if (boss.kills > 0) {
        killedBosses++;
      }
    }
    if (killedBosses >= amount) {
      return 1;
    } else {
      return killedBosses / amount;
    }
  } catch (error) {
    console.error("Error checking total bosses killed:", error);
  }
}

export function checkAnyBossKills(game, requiredKills) {
  try {
    let highestKills = 0;

    for (const boss of game.skillingBosses.bosses.values()) {
      if (boss.kills >= requiredKills) {
        return 1; // Objective complete
      }
      if (boss.kills > highestKills) {
        highestKills = boss.kills;
      }
    }

    // If we haven't found a boss with required kills, return the progress based on the highest kill count
    return Math.min(highestKills / requiredKills, 0.99); // Cap at 0.99 to ensure it's not marked complete
  } catch (error) {
    console.error(
      `Error checking for boss with ${requiredKills} kills:`,
      error
    );
    return 0; // Return 0 in case of error
  }
}

export function checkMultipleBossesWithKills(
  game,
  requiredBosses,
  requiredKills
) {
  try {
    let bossesWithRequiredKills = 0;
    let totalProgress = 0;

    for (const boss of game.skillingBosses.bosses.values()) {
      if (boss.kills >= requiredKills) {
        bossesWithRequiredKills++;
        totalProgress += 1;
      } else {
        totalProgress += boss.kills / requiredKills;
      }

      if (bossesWithRequiredKills >= requiredBosses) {
        return 1; // Objective complete
      }
    }

    // If we haven't found enough bosses with required kills, return the progress
    return Math.min(totalProgress / requiredBosses, 0.99); // Cap at 0.99 to ensure it's not marked complete
  } catch (error) {
    console.error(
      `Error checking for ${requiredBosses} bosses with ${requiredKills} kills:`,
      error
    );
    return 0; // Return 0 in case of error
  }
}

export function checkForGenericUpgrades(game, amount) {
  try {
    let totalProgress = 0;
    const genericUpgrades = ["duckDefence", "duckDefence", "luckyLevels"];
    for (const upgrade of genericUpgrades) {
      const value = activationFuncs.getModifierValue(
        game,
        `smattyBosses:${upgrade}`
      );
      if (value > 0) {
        totalProgress++;
      }
    }
    if (totalProgress >= amount) {
      return 1; // Objective complete
    } else {
      return totalProgress / amount;
    }
  } catch (error) {
    console.error("Error checking for generic upgrade:", error);
  }
}

export function checkTotalDamageDealt(game, amount) {
  // return 0 to 1 indicating the progress of the objective
  try {
    let totalProgress = 0;
    const totalDamageDealt = game.skillingBosses.ExtraPlayerStats.damageDealt;
    if (totalDamageDealt > amount) {
      return 1;
    } else {
      return totalDamageDealt / amount;
    }
    return 0;
  } catch (error) {
    console.error("Error checking for total damage dealt:", error);
  }
}

export function checkTotalDamageTaken(game, amount) {
  // return 0 to 1 indicating the progress of the objective
  try {
    let totalProgress = 0;
    const totalDamageTaken = game.skillingBosses.ExtraPlayerStats.damageTaken;
    if (totalDamageTaken > amount) {
      return 1;
    } else {
      return totalDamageTaken / amount;
    }
    return 0;
  } catch (error) {
    console.error("Error checking for total damage taken:", error);
  }
}

export function checkCommonRewardHits(game, amount) {
  // return 0 to 1 indicating the progress of the objective
  try {
    let totalProgress = 0;
    const commonRewardHits =
      game.skillingBosses.ExtraPlayerStats.commonRewardHits;
    if (commonRewardHits > amount) {
      return 1;
    } else {
      return commonRewardHits / amount;
    }
    return 0;
  } catch (error) {
    console.error("Error checking for common reward hits:", error);
  }
}

export function checkUncommonRewardHits(game, amount) {
  // return 0 to 1 indicating the progress of the objective
  try {
    let totalProgress = 0;
    const uncommonRewardHits =
      game.skillingBosses.ExtraPlayerStats.uncommonRewardHits;
    if (uncommonRewardHits > amount) {
      return 1;
    } else {
      return uncommonRewardHits / amount;
    }
    return 0;
  } catch (error) {
    console.error("Error checking for uncommon reward hits:", error);
  }
}

export function checkRareRewardHits(game, amount) {
  // return 0 to 1 indicating the progress of the objective
  try {
    let totalProgress = 0;
    const rareRewardHits = game.skillingBosses.ExtraPlayerStats.rareRewardHits;
    if (rareRewardHits > amount) {
      return 1;
    } else {
      return rareRewardHits / amount;
    }
    return 0;
  } catch (error) {
    console.error("Error checking for rare reward hits:", error);
  }
}

export function checkLegendaryRewardHits(game, amount) {
  // return 0 to 1 indicating the progress of the objective
  try {
    let totalProgress = 0;
    const legendaryRewardHits =
      game.skillingBosses.ExtraPlayerStats.legendaryRewardHits;
    if (legendaryRewardHits > amount) {
      return 1;
    } else {
      return legendaryRewardHits / amount;
    }
    return 0;
  } catch (error) {
    console.error("Error checking for legendary reward hits:", error);
  }
}

export function checkTotalDebuffsApplied(game, amount) {
  // return 0 to 1 indicating the progress of the objective
  try {
    let totalProgress = 0;
    const totalDebuffsApplied =
      game.skillingBosses.ExtraPlayerStats.debuffsApplied;
    if (totalDebuffsApplied > amount) {
      return 1;
    } else {
      return totalDebuffsApplied / amount;
    }
    return 0;
  } catch (error) {
    console.error("Error checking for total debuffs applied:", error);
  }
}

export function checkFastestKillOnBossByID(game, bossID, amount) {
  try {
    const bossKillsArray = game.skillingBosses.bossKillsArray;
    if (bossKillsArray) {
      // bosskillsarray is an array of arrays where each sub-array contains [totalKills, fastestKill]
      for (let i = 0; i < bossKillsArray.length; i++) {
        const bossKills = bossKillsArray[i];
        if (i === bossID) {
          const fastestKill = bossKills[1];
          if (fastestKill < amount && fastestKill > 0) {
            return 1;
          } else {
            // return a percentage of the completed objective
            if (fastestKill === 0) {
              return 0;
            }
            return amount / fastestKill;
          }
        }
      }
    }
    return 0;
  } catch (error) {
    console.error("Error checking for fastest kill on boss:", error);
  }
}

export function checkSkillingSuppliesUsed(game, amount) {
  try {
    const suppliesUsed = game.skillingBosses.ExtraPlayerStats.suppliesUsed;
    if (suppliesUsed > amount) {
      return 1;
    } else {
      return suppliesUsed / amount;
    }
    return 0;
  } catch (error) {
    console.error("Error checking for skilling supplies used:", error);
  }
}

export function checkSingleAttackDamage(game, amount) {
  // return 0 to 1 indicating the progress of the objective
  try {
    const highestDamage =
      game.skillingBosses.ExtraPlayerStats.highestDamageDealt;
    if (highestDamage > amount) {
      return 1;
    } else {
      return highestDamage / amount;
    }
    return 0;
  } catch (error) {
    console.error("Error checking for single attack damage:", error);
  }
}

export function checkCookTheFish(game, amount) {
  if (game.skillingBosses.ExtraPlayerStats.cookTheFish > 0) {
    return 1;
  } else {
    return 0;
  }
}

export function checkThiefTheChef(game, amount) {
  if (game.skillingBosses.ExtraPlayerStats.thiefTheChef > 0) {
    return 1;
  } else {
    return 0;
  }
}
