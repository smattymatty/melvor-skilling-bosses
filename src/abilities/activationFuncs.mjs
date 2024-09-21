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
  modifierCache.set(
    "smattyBosses:wellFed",
    getModifierValue(game, "smattyBosses:wellFed")
  );
  game.skillingBosses.modCache = modifierCache;
}

const skillRollerMap = {
  "melvorD:Mining": "smattyBosses:rockRoller",
  "melvorD:Woodcutting": "smattyBosses:woodRoller",
  "melvorD:Fishing": "smattyBosses:fishRoller",
  "melvorD:Firemaking": "smattyBosses:flameRoller",
  "melvorD:Cooking": "smattyBosses:spiceRoller",
  "melvorD:Herblore": "smattyBosses:toxinRoller",
};

export function dealSkillLevelAsDamage(
  ability,
  game,
  multiplier = 1.0,
  flatBonus = 0
) {
  try {
    game.skillingBosses.lastSkillExtraText = [];
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
    // Calculate damage reduction
    const boss = game.skillingBosses.activeBoss;
    const defenseType = ability.tags.includes("Physical")
      ? "physicalDefense"
      : "magicDefense";

    const reduction = calculateDamageReduction(
      boss.stats[defenseType],
      baseDamage
    );
    // Check for the 'spice' debuff
    const spiceDebuffCount = game.skillingBosses.checkDebuffsForID("spice");
    for (let i = 0; i < spiceDebuffCount; i++) {
      // takes 8 percent damage per stack
      percentBoost += 8;
      //
      game.skillingBosses.currentBattleDebuffDamageDealt += Math.floor(
        (baseDamage - reduction) * (8 / 100)
      );
    }
    // Apply the percent boost
    if (percentBoost > 0) {
      baseDamage *= 1 + percentBoost / 100;
    }
    const realBaseDamage = baseDamage + flatBonus;
    const finalDamage = Math.floor(realBaseDamage - reduction);
    game.skillingBosses.currentBattleBossDamageReduced += reduction;
    game.skillingBosses.takeDamage(finalDamage, "boss");
    // check if it has a debuff effect
    checkDebuffOnDamage(game, ability, finalDamage);
    // update info for the UI
    game.skillingBosses.lastSkillDamageDealt = finalDamage;
    game.skillingBosses.updateLastAttackInfoUI();
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
  // TODO : more percent bonuses
  return percentBoost;
}

function calculateDamageReduction(defense, baseDamage) {
  const reductionPercentage = Math.min(defense / 100, 0.8);
  return Math.floor(baseDamage * reductionPercentage);
}

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
  const rollerModifier = skillRollerMap[ability.skill];
  if (rollerModifier) {
    const rollerValue = game.skillingBosses.modCache.get(rollerModifier);
    if (rollerValue > 0) {
      const randomChance = Math.random() * 100; // Random number between 0 and 100
      if (randomChance <= rollerValue) {
        // The effect is triggered
        switch (ability.skill) {
          case "melvorD:Firemaking":
            applyBurnEffect(game, ability, initialDamage, 4);
            break;
          case "melvorD:Cooking":
            applySpicedEffect(game, ability, 12);
            break;
          case "melvorD:Herblore":
            applyPoisonEffect(game, ability, initialDamage, 4);
            break;
        }
      }
    }
  }
}

export function applyBurnEffect(
  game,
  ability,
  initialDamage,
  burnDuration = 8,
  burnDamagePercent = 0.02
) {
  const burnDamagePerTick = Math.floor(initialDamage * burnDamagePercent);
  const totalBurnDamage = burnDamagePerTick * burnDuration;

  game.skillingBosses.applyEffectToBoss(
    "burn",
    burnDuration,
    burnDamagePerTick,
    totalBurnDamage
  );
  game.skillingBosses.lastSkillExtraText.push(
    `applied a burn of ${burnDamagePerTick} damage per tick for ${burnDuration} ticks`
  );
  game.skillingBosses.updateLastAttackInfoUI();
}

export function applySpicedEffect(game, ability, spiceDuration = 16) {
  game.skillingBosses.applyEffectToBoss("spice", spiceDuration, 0, 0);
  game.skillingBosses.lastSkillExtraText.push(
    `applied a spice for ${spiceDuration} ticks`
  );
  game.skillingBosses.updateLastAttackInfoUI();
}

export function applyPoisonEffect(
  game,
  ability,
  initialDamage,
  toxinDuration = 8,
  toxinDamagePercent = 0.02
) {
  const toxinDamagePerTick = Math.floor(initialDamage * toxinDamagePercent);
  const totalToxinDamage = toxinDamagePerTick * toxinDuration;

  game.skillingBosses.applyEffectToBoss(
    "poison",
    toxinDuration,
    toxinDamagePerTick,
    totalToxinDamage
  );
  game.skillingBosses.lastSkillExtraText.push(
    `applied a poison of ${Math.max(
      1, // takeDamage has a .max of 1 as well
      toxinDamagePerTick
    )} damage per tick for ${toxinDuration} ticks`
  );
  game.skillingBosses.updateLastAttackInfoUI();
}
