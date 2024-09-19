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
