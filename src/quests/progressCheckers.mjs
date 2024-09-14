export function checkSkillLevel(game, skillID, requiredLevel) {
  try {
    console.log(
      `checking skill level for ${skillID} , required level ${requiredLevel}`
    );
    const skillRegistry = game.skills.registeredObjects; // a map of skill IDs to skill objects
    const skill = skillRegistry.get(skillID);
    if (!skill) {
      throw new Error(`Skill ${skillID} not found in registry`);
    }
    const skillLevel = skill.level;
    console.log("skill level is", skillLevel);
    if (skillLevel < requiredLevel) {
      // return a float between 0 and 1 indicating the progress of the skill
      console.log("skill level is less than required level");
      return skillLevel / requiredLevel;
    } else {
      console.log("skill level is greater than or equal to required level");
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
    console.log("checking skill levels or");
    let highestProgress = 0;
    skillIDs.forEach((skillID) => {
      const progress = checkSkillLevel(game, skillID, requiredLevel);
      console.log("progress is", progress);
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
    console.log("checking player killed bosses");
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
    console.log("checking player ability equipped");
    for (const ability of game.skillingBosses.equippedAbilities) {
      if (ability) {
        return 1;
      }
    }
    console.log("No equipped ability found");
    return 0;
  } catch (error) {
    console.error("Error checking player ability equipped:", error);
  }
}

export function checkTotalBossKills(game, amount) {
  try {
    console.log("checking total boss kills");
    let killedBosses = 0;
    // TODO: CHECK FOR KILLS
    if (killedBosses >= amount) {
      return 1;
    } else {
      return killedBosses / amount;
    }
  } catch (error) {
    console.error("Error checking total boss kills:", error);
  }
}
