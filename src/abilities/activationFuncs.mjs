// Cache for modifier values
const modifierCache = new Map();

// Initialize or update cache
export function updateModifierCache(game) {
  modifierCache.set(
    "smattyBosses:luckyLevels",
    getModifierValue(game, "smattyBosses:luckyLevels")
  );
  modifierCache.set(
    "smattyBosses:rockRoller",
    getModifierValue(game, "smattyBosses:rockRoller")
  );
  modifierCache.set(
    "smattyBosses:woodRoller",
    getModifierValue(game, "smattyBosses:woodRoller")
  );
  modifierCache.set(
    "smattyBosses:fishRoller",
    getModifierValue(game, "smattyBosses:fishRoller")
  );
  modifierCache.set(
    "smattyBosses:spiceRoller",
    getModifierValue(game, "smattyBosses:spiceRoller")
  );
  modifierCache.set(
    "smattyBosses:flameRoller",
    getModifierValue(game, "smattyBosses:flameRoller")
  );
  modifierCache.set(
    "smattyBosses:toxinRoller",
    getModifierValue(game, "smattyBosses:toxinRoller")
  );
  game.skillingBosses.modCache = modifierCache;
}

const skillRollerMap = {
  "melvorD:Mining": "smattyBosses:rockRoller",
  "melvorD:Woodcutting": "smattyBosses:woodRoller",
  "melvorD:Fishing": "smattyBosses:fishRoller",
  "melvorD:Firemaking": "smattyBosses:flameRoller",
  "melvorD:Cooking": "smattyBosses:spiceRoller",
  "melvorF:Herblore": "smattyBosses:toxinRoller",
};

export function dealSkillLevelAsDamage(ability, game, multiplier = 1.0) {
  try {
    const skillRegistry = game.skills.registeredObjects;
    const skill = skillRegistry.get(ability.skill);
    if (!skill) {
      throw new Error(`Skill ${ability.skill} not found in registry`);
    }

    // Check for flat level boosts
    let flatBoost = checkFlatLevelBoosts(game);
    const skillLevel = skill.level + flatBoost;

    let baseDamage = skillLevel * multiplier;

    // Check for percent damage boosts
    let percentBoost = checkPercentDamageBoosts(game, ability);

    // Apply the percent boost
    if (percentBoost > 0) {
      baseDamage *= 1 + percentBoost / 100;
    }

    // Calculate damage reduction
    const boss = game.skillingBosses.activeBoss;
    const defenseType = ability.tags.includes("Physical")
      ? "physicalDefense"
      : "magicDefense";
    const reduction = calculateDamageReduction(
      boss.stats[defenseType],
      baseDamage
    );

    const finalDamage = Math.floor(baseDamage - reduction);
    game.skillingBosses.currentBattleBossDamageReduced += reduction;
    game.skillingBosses.takeDamage(finalDamage, "boss");
    // check if the ability applies a debuff effect
    checkDebuffOnDamage(game, ability, finalDamage);
  } catch (error) {
    console.error("Error dealing skill level as damage:", error);
  }
}

function checkFlatLevelBoosts(game) {
  const luckyLevel = game.skillingBosses.modCache.get(
    "smattyBosses:luckyLevels"
  );
  if (luckyLevel > 0) {
    return Math.floor(Math.random() * (luckyLevel + 1));
  }
  return 0;
}

function checkPercentDamageBoosts(game, ability) {
  let percentBoost = 0;
  const rollerModifier = skillRollerMap[ability.skill];
  if (rollerModifier) {
    const rollerValue = game.skillingBosses.modCache.get(rollerModifier);
    if (rollerValue > 0) {
      percentBoost += Math.random() * rollerValue;
    }
  }
  // Add checks for any other percent damage boosts here
  return percentBoost;
}

function calculateDamageReduction(defense, baseDamage) {
  const reductionPercentage = Math.min(defense / 100, 0.8);
  return Math.floor(baseDamage * reductionPercentage);
}

// The getModifierValue function remains unchanged
export function getModifierValue(game, modifierID) {
  try {
    let totalValue = 0;
    game.combat.player.modifiers.entriesByID.forEach((modEntry, key) => {
      if (key.startsWith(modifierID)) {
        if (modEntry && modEntry.length > 0) {
          const modValue = modEntry[0].modValue.value;
          totalValue += modValue > 0 ? modValue : 0;
        }
      }
    });
    return totalValue;
  } catch (error) {
    console.error(`Error getting modifier value for ${modifierID}:`, error);
  }
  return 0;
}

function checkDebuffOnDamage(game, ability, initialDamage) {
  checkRefinementRollers(game, ability, initialDamage);
}

function checkRefinementRollers(game, ability, initialDamage) {
  console.log("Checking refinement rollers for", ability.name);
  const rollerModifier = skillRollerMap[ability.skill];
  console.log(rollerModifier);
  if (rollerModifier) {
    const rollerValue = game.skillingBosses.modCache.get(rollerModifier);
    console.log(" rollerValue:", rollerValue);
    if (rollerValue > 0) {
      const randomChance = Math.random() * 100; // Random number between 0 and 100
      console.log("randomChance:", randomChance);
      if (randomChance <= rollerValue + 70) {
        // The effect is triggered
        console.log("Triggering effect");
        switch (ability.skill) {
          case "melvorD:Firemaking":
            applyBurnEffect(game, initialDamage, ability);
            break;
          case "melvorD:Cooking":
            applySpicedEffect(game, initialDamage, ability);
            break;
          case "melvorF:Herblore":
            applyPoisonEffect(game, initialDamage, ability);
            break;
        }
      }
    }
  }
}

function applyBurnEffect(
  game,
  ability,
  initialDamage,
  burnDuration = 3,
  burnDamagePercent = 0.05
) {
  const burnDamagePerTick = Math.floor(initialDamage * burnDamagePercent);
  const totalBurnDamage = burnDamagePerTick * burnDuration;

  game.skillingBosses.applyEffectToBoss(
    "burn", // Assuming "burn" is the ID for the burn effect
    burnDuration,
    burnDamagePerTick,
    totalBurnDamage
  );

  console.log(
    `Applied Burn effect: ${burnDamagePerTick} damage per tick for ${burnDuration} ticks`
  );
}

function applySpicedEffect(
  game,
  ability,
  initialDamage,
  spiceDuration = 16,
  spiceDamagePercent = 0.05
) {
  const spiceDamagePerTick = Math.floor(initialDamage * spiceDamagePercent);
  const totalSpiceDamage = spiceDamagePerTick * spiceDuration;

  game.skillingBosses.applyEffectToBoss(
    "spice", // Assuming "spice" is the ID for the spice effect
    spiceDuration,
    spiceDamagePerTick,
    totalSpiceDamage
  );

  console.log(
    `Applied Spice effect: damage per tick for ${spiceDuration} ticks`
  );
}

function applyPoisonEffect(
  game,
  ability,
  initialDamage,
  toxinDuration = 3,
  toxinDamagePercent = 0.05
) {
  const toxinDamagePerTick = Math.floor(initialDamage * toxinDamagePercent);
  const totalToxinDamage = toxinDamagePerTick * toxinDuration;

  game.skillingBosses.applyEffectToBoss(
    "toxin", // Assuming "toxin" is the ID for the toxin effect
    toxinDuration,
    toxinDamagePerTick,
    totalToxinDamage
  );

  console.log(
    `Applied Toxin effect: ${toxinDamagePerTick} damage per tick for ${toxinDuration} ticks`
  );
}
