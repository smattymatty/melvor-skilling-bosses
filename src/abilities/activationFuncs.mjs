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
  modifierCache.set(
    "smattyBosses:shieldCharger",
    getModifierValue(game, "smattyBosses:shieldCharger")
  );
  modifierCache.set(
    "smattyBosses:ingotRoller",
    getModifierValue(game, "smattyBosses:ingotRoller")
  );
  modifierCache.set(
    "smattyBosses:leatherRoller",
    getModifierValue(game, "smattyBosses:leatherRoller")
  );
  modifierCache.set(
    "smattyBosses:arrowRoller",
    getModifierValue(game, "smattyBosses:arrowRoller")
  );
  modifierCache.set(
    "smattyBosses:starRoller",
    getModifierValue(game, "smattyBosses:starRoller")
  );
  modifierCache.set(
    "smattyBosses:wardRoller",
    getModifierValue(game, "smattyBosses:wardRoller")
  );
  modifierCache.set(
    "smattyBosses:shardRoller",
    getModifierValue(game, "smattyBosses:shardRoller")
  );
  modifierCache.set(
    "smattyBosses:moneyRoller",
    getModifierValue(game, "smattyBosses:moneyRoller")
  );
  modifierCache.set(
    "smattyBosses:speedRoller",
    getModifierValue(game, "smattyBosses:speedRoller")
  );
  modifierCache.set(
    "smattyBosses:efficientSkillingShifty",
    getModifierValue(game, "smattyBosses:efficientSkillingShifty")
  );
  modifierCache.set(
    "smattyBosses:efficientBossingShifty",
    getModifierValue(game, "smattyBosses:efficientBossingShifty")
  );
  modifierCache.set(
    "smattyBosses:efficientSkillingRefiner",
    getModifierValue(game, "smattyBosses:efficientSkillingRefiner")
  );
  modifierCache.set(
    "smattyBosses:efficientBossingRefiner",
    getModifierValue(game, "smattyBosses:efficientBossingRefiner")
  );
  modifierCache.set(
    "smattyBosses:efficientSkillingArtisan",
    getModifierValue(game, "smattyBosses:efficientSkillingArtisan")
  );
  modifierCache.set(
    "smattyBosses:efficientBossingArtisan",
    getModifierValue(game, "smattyBosses:efficientBossingArtisan")
  );
  modifierCache.set(
    "smattyBosses:efficientSkillingMystic",
    getModifierValue(game, "smattyBosses:efficientSkillingMystic")
  );
  modifierCache.set(
    "smattyBosses:efficientBossingMystic",
    getModifierValue(game, "smattyBosses:efficientBossingMystic")
  );
  modifierCache.set(
    "smattyBosses:efficientSkillingGatherer",
    getModifierValue(game, "smattyBosses:efficientSkillingGatherer")
  );
  modifierCache.set(
    "smattyBosses:efficientBossingGatherer",
    getModifierValue(game, "smattyBosses:efficientBossingGatherer")
  );
  modifierCache.set(
    "smattyBosses:duckAttack",
    getModifierValue(game, "smattyBosses:duckAttack")
  );
  modifierCache.set(
    "smattyBosses:hater",
    getModifierValue(game, "smattyBosses:hater")
  );
  modifierCache.set(
    "smattyBosses:buffShielder",
    getModifierValue(game, "smattyBosses:buffShielder")
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
  "melvorD:Smithing": "smattyBosses:ingotRoller",
  "melvorD:Crafting": "smattyBosses:leatherRoller",
  "melvorD:Fletching": "smattyBosses:arrowRoller",
  "melvorD:Astrology": "smattyBosses:starRoller",
  "melvorD:Runecrafting": "smattyBosses:wardRoller",
  "melvorD:Summoning": "smattyBosses:shardRoller",
  "melvorD:Thieving": "smattyBosses:moneyRoller",
  "melvorD:Agility": "smattyBosses:speedRoller",
};

export function dealSkillLevelAsDamage(
  ability,
  game,
  multiplier = 1.0,
  flatBonus = 0,
  updateUI = true
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
    let finalDamage = Math.floor(realBaseDamage - reduction);

    game.skillingBosses.currentBattleBossDamageReduced += reduction;
    game.skillingBosses.takeDamage(finalDamage, "boss");
    // check if it has a debuff effect
    checkDebuffOnDamage(game, ability, finalDamage);
    // update info for the UI
    game.skillingBosses.lastSkillDamageDealt = finalDamage;
    if (updateUI) {
      game.skillingBosses.updateLastAttackInfoUI();
    }
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
  const haterModifier = getModifierValue(game, "smattyBosses:hater");
  if (haterModifier > 0 && game.skillingBosses.activeBoss.isTier2()) {
    percentBoost += haterModifier * 5;
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
  checkArtisanRollers(game, ability, initialDamage);
  checkShiftyRollers(game, ability, initialDamage);
  checkMysticRollers(game, ability, initialDamage);
}

function checkShiftyRollers(game, ability, initialDamage) {
  const validSkills = ["melvorD:Thieving", "melvorD:Agility"];
  if (!validSkills.includes(ability.skill)) {
    return;
  }
  const rollerModifier = skillRollerMap[ability.skill];
  if (rollerModifier) {
    const rollerValue = game.skillingBosses.modCache.get(rollerModifier);
    if (rollerValue > 0) {
      const randomChance = Math.random() * 100;
      if (randomChance <= rollerValue) {
        switch (ability.skill) {
          case "melvorD:Thieving":
            gainUpToGoldAndDealThatMuchDamage(
              ability,
              game,
              game.thieving.level / 6,
              1,
              0
            );
            break;
          case "melvorD:Agility":
            addTimeToBossAttackTimer(ability, game, 1);
            break;
        }
      }
    }
  }
}

function checkRefinementRollers(game, ability, initialDamage) {
  const validSkills = [
    "melvorD:Firemaking",
    "melvorD:Cooking",
    "melvorD:Herblore",
  ];
  if (!validSkills.includes(ability.skill)) {
    return;
  }
  const rollerModifier = skillRollerMap[ability.skill];
  if (rollerModifier) {
    const rollerValue = game.skillingBosses.modCache.get(rollerModifier);
    if (rollerValue > 0) {
      const randomChance = Math.random() * 100;
      if (randomChance <= rollerValue) {
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

function checkArtisanRollers(game, ability, initialDamage) {
  const validSkills = [
    "melvorD:Fletching",
    "melvorD:Smithing",
    "melvorD:Crafting",
  ];
  if (!validSkills.includes(ability.skill)) {
    return;
  }
  const rollerModifier = skillRollerMap[ability.skill];
  if (rollerModifier) {
    const rollerValue = game.skillingBosses.modCache.get(rollerModifier);
    if (rollerValue > 0) {
      const randomChance = Math.random() * 100;
      if (randomChance <= rollerValue) {
        switch (ability.skill) {
          case "melvorD:Fletching":
            applyStuckArrowEffect(game, ability, initialDamage, 6, 0.1);
            break;
          case "melvorD:Smithing":
            dealDamagePerShield(ability, game, 0.5, 5);
            break;
          case "melvorD:Crafting":
            dealDamagePerShield(ability, game, 0.5, 5);
            break;
        }
      }
    }
  }
}

function checkMysticRollers(game, ability, initialDamage) {
  const validSkills = [
    "melvorD:Astrology",
    "melvorD:Runecrafting",
    "melvorD:Summoning",
  ];
  if (!validSkills.includes(ability.skill)) {
    return;
  }
  const rollerModifier = skillRollerMap[ability.skill];
  if (rollerModifier) {
    const rollerValue = game.skillingBosses.modCache.get(rollerModifier);
    if (rollerValue > 0) {
      const randomChance = Math.random() * 100;
      if (randomChance <= rollerValue) {
        switch (ability.skill) {
          case "melvorD:Astrology":
            applyStarEffect(game, ability, initialDamage, 6);
            break;
          case "melvorD:Runecrafting":
            applyWardEffect(game, ability, initialDamage, 6);
            break;
          case "melvorD:Summoning":
            applyShardEffect(game, ability, initialDamage, 6);
            break;
        }
      }
    }
  }
}

function applyStarEffect(
  game,
  ability,
  initialDamage,
  starDuration = 6,
  starDamagePercent = 0.02
) {
  console.log("Applying star effect");
}

function applyWardEffect(game, ability, value, wardDuration = 6) {
  console.log("Applying ward effect");
  game.skillingBosses.applyEffectToBoss("ward", wardDuration, value);
  game.skillingBosses.lastSkillExtraText.push(
    `applied a ward of ${value} shield for ${wardDuration} ticks`
  );
  game.skillingBosses.updateLastAttackInfoUI();
}

function applyShardEffect(
  game,
  ability,
  initialDamage,
  shardDuration = 6,
  shardDamagePercent = 0.02
) {
  console.log("Applying shard effect");
}

export function applyBurnEffect(
  game,
  ability,
  initialDamage,
  burnDuration = 8,
  burnDamagePercent = 0.02
) {
  const burnDamagePerTick = Math.floor(initialDamage * burnDamagePercent);
  if (burnDamagePerTick <= 0) {
    burnDamagePerTick = 1;
  }
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

export function applySpicedEffect(game, ability, spiceDuration = 12) {
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
  if (toxinDamagePerTick <= 0) {
    toxinDamagePerTick = 1;
  }
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

export function applyBleedEffect(
  game,
  ability,
  initialDamage,
  bleedDuration = 8,
  bleedDamagePercent = 0.02
) {
  const bleedDamagePerTick = Math.max(
    1,
    Math.floor(initialDamage * bleedDamagePercent)
  );

  const totalBleedDamage = bleedDamagePerTick * bleedDuration;

  game.skillingBosses.applyEffectToBoss(
    "bleed",
    bleedDuration,
    bleedDamagePerTick,
    totalBleedDamage
  );
  game.skillingBosses.lastSkillExtraText.push(
    `applied a bleed of ${bleedDamagePerTick} damage per tick for ${bleedDuration} ticks`
  );
  game.skillingBosses.updateLastAttackInfoUI();
}

export function applyStuckArrowEffect(
  game,
  ability,
  initialDamage,
  stuckArrowDuration = 6,
  stuckArrowDamagePercent = 0.08
) {
  // arrows deal damage on removal
  const stuckArrowDamagePerTick = Math.max(
    1,
    Math.floor(initialDamage * stuckArrowDamagePercent)
  );

  game.skillingBosses.applyEffectToBoss(
    "stuckArrow",
    stuckArrowDuration,
    stuckArrowDamagePerTick,
    stuckArrowDamagePerTick
  );
  game.skillingBosses.lastSkillExtraText.push(
    `applied a stuck arrow of ${stuckArrowDamagePerTick} damage for ${stuckArrowDuration} ticks`
  );
  game.skillingBosses.updateLastAttackInfoUI();
}

export function applyArmorReductionEffect(
  game,
  ability,
  duration,
  reductionPercent
) {
  for (let i = 0; i < game.skillingBosses.bossCurrentDebuffs.length; i++) {
    if (game.skillingBosses.bossCurrentDebuffs[i][0] === "armorReduction") {
      // increase the duration of the existing effect
      game.skillingBosses.bossCurrentDebuffs[i][1] = duration;
      game.skillingBosses.bossCurrentDebuffs[i][2] = reductionPercent;
      game.skillingBosses.needsBossEffectsUIUpdate = true;
      game.skillingBosses.updateUIIfNeeded();
      return;
    }
  }
  game.skillingBosses.applyEffectToBoss(
    "armorReduction",
    duration,
    reductionPercent,
    0
  );
  game.skillingBosses.ExtraPlayerStats.physicalResistReduced +=
    reductionPercent;
  game.skillingBosses.ctx.characterStorage.setItem(
    "physicalResistReduced",
    game.skillingBosses.ExtraPlayerStats.physicalResistReduced
  );

  game.skillingBosses.lastSkillExtraText.push(
    `reduced the armor of the target by ${reductionPercent}% for ${duration} ticks`
  );
  game.skillingBosses.updateLastAttackInfoUI();
}

export function applyMagicResistReductionEffect(
  game,
  ability,
  duration,
  reductionPercent
) {
  for (let i = 0; i < game.skillingBosses.bossCurrentDebuffs.length; i++) {
    if (
      game.skillingBosses.bossCurrentDebuffs[i][0] === "magicResistReduction"
    ) {
      // increase the duration of the existing effect
      game.skillingBosses.bossCurrentDebuffs[i][1] = duration;
      game.skillingBosses.bossCurrentDebuffs[i][2] = reductionPercent;
      game.skillingBosses.needsBossEffectsUIUpdate = true;
      game.skillingBosses.updateUIIfNeeded();
      return;
    }
  }
  game.skillingBosses.applyEffectToBoss("magicResistReduction", duration);
  game.skillingBosses.ExtraPlayerStats.magicResistReduced += reductionPercent;
  game.skillingBosses.ctx.characterStorage.setItem(
    "magicResistReduced",
    game.skillingBosses.ExtraPlayerStats.magicResistReduced
  );
  game.skillingBosses.applyEffectToBoss(
    "magicResistReduction",
    duration,
    reductionPercent,
    0
  );

  game.skillingBosses.lastSkillExtraText.push(
    `reduced the magic resist of the target by ${reductionPercent}% for ${duration} ticks`
  );
  game.skillingBosses.updateLastAttackInfoUI();
}

export function chanceToStun(game, ability, chance, duration) {
  const roll = Math.random();

  if (roll <= chance) {
    stunBoss(game, ability, duration);
  }
}

export function chanceToBleed(
  game,
  ability,
  chance,
  duration,
  bleedPercent = 0.02
) {
  const roll = Math.random();

  if (roll <= chance) {
    applyBleedEffect(
      game,
      ability,
      game.skillingBosses.lastSkillDamageDealt,
      duration,
      bleedPercent
    );
    return true;
  }
  return false;
}

export function stunBoss(game, ability, stunDuration) {
  if (game.skillingBosses.bossStunDuration <= 0) {
    // apply stun normally
    game.skillingBosses.bossStunDuration += stunDuration;
  } else if (game.skillingBosses.bossStunDuration > stunDuration) {
    return;
  } else if (game.skillingBosses.bossStunDuration < stunDuration) {
    // Replace with this stun
    game.skillingBosses.bossStunDuration = stunDuration;
  }
  game.skillingBosses.lastSkillExtraText.push(
    `applied a stun for ${stunDuration} ticks`
  );
  game.skillingBosses.bossAttackNeedsUIUpdate = true;
  game.skillingBosses.updateUIIfNeeded();
  game.skillingBosses.updateLastAttackInfoUI();
}

export function gainShield(ability, game, amount) {
  game.skillingBosses.restoreShield(amount, "player");
  game.skillingBosses.needsCombatStatsUIUpdate = true;
  game.skillingBosses.updateUIIfNeeded();
}

export function dealDamageMultipleTimesAndChanceToBleed(
  ability,
  game,
  damageMulti,
  hitAmount,
  chance,
  duration,
  bleedPercent = 0.02
) {
  let totalDamage = 0;
  let bleedsApplied = 0;
  for (let i = 0; i < hitAmount; i++) {
    dealSkillLevelAsDamage(ability, game, damageMulti, 0, false);
    totalDamage += game.skillingBosses.lastSkillDamageDealt;
    if (chanceToBleed(game, ability, chance, duration, bleedPercent)) {
      bleedsApplied++;
    }
  }
  game.skillingBosses.lastSkillDamageDealt = totalDamage;
  game.skillingBosses.lastSkillExtraText.push(
    `applied a total of ${bleedsApplied} bleed effect(s)`
  );
  game.skillingBosses.updateLastAttackInfoUI();
}

export function multiAttack(
  ability,
  game,
  hits,
  damageMultiplier = 1,
  flatBonus = 0
) {
  let totalDamage = 0;
  for (let i = 0; i < hits; i++) {
    dealSkillLevelAsDamage(ability, game, damageMultiplier, flatBonus);
    totalDamage += game.skillingBosses.lastSkillDamageDealt;
  }
  game.skillingBosses.lastSkillDamageDealt = totalDamage;
  game.skillingBosses.updateLastAttackInfoUI();
}

export function attackWithChanceToGainGoldAndDealThatMuchDamage(
  ability,
  game,
  goldGain,
  damageMultiplier = 1,
  flatBonus = 0
) {
  let totalDamage = 0;
  dealSkillLevelAsDamage(ability, game, damageMultiplier, flatBonus);
  totalDamage += game.skillingBosses.lastSkillDamageDealt;
  const roll = Math.random();
  const goldGained = Math.floor(goldGain * roll);
  if (goldGained > 0) {
    game.gp.add(goldGained);
    game.skillingBosses.takeDamage(goldGained, "boss");
    totalDamage += goldGained;
  }
  game.skillingBosses.lastSkillDamageDealt = totalDamage;
  game.skillingBosses.updateLastAttackInfoUI();
}

export function gainUpToGoldAndDealThatMuchDamage(
  ability,
  game,
  maxGold,
  damageMultiplier = 1,
  flatBonus = 0
) {
  const roll = Math.random();
  const goldGained = Math.floor(maxGold * roll);
  if (goldGained > 0) {
    game.gp.add(goldGained);
    game.skillingBosses.takeDamage(
      goldGained * damageMultiplier + flatBonus,
      "boss"
    );
  }
}

export function attackWithFlatBonusPerDebuff(
  ability,
  game,
  bonusPerDebuff,
  damageMultiplier = 1,
  flatBonus = 0
) {
  let totalDebuffs = 0;
  for (let i = 0; i < game.skillingBosses.bossCurrentDebuffs.length; i++) {
    totalDebuffs++;
  }
  const totalExtraDamage = totalDebuffs * bonusPerDebuff;
  dealSkillLevelAsDamage(
    ability,
    game,
    damageMultiplier,
    flatBonus + totalExtraDamage
  );
}

export function dealDamagePerShield(
  ability,
  game,
  damageMultiplier = 1,
  minDamage = 5
) {
  const shield = game.skillingBosses.playerShield;
  const damage = Math.floor(shield * damageMultiplier);
  if (damage > minDamage) {
    game.skillingBosses.takeDamage(damage, "boss");
  } else {
    game.skillingBosses.takeDamage(minDamage, "boss");
  }
}

export function addTimeToBossAttackTimer(ability, game, duration) {
  game.skillingBosses.bossAttackTimer += duration;
  game.skillingBosses.bossAttackNeedsUIUpdate = true;
  game.skillingBosses.updateUIIfNeeded();
}
