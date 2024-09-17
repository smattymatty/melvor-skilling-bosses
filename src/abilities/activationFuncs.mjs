export function dealSkillLevelAsDamage(ability, game, multiplier = 1.0) {
  try {
    const skillRegistry = game.skills.registeredObjects;
    const skill = skillRegistry.get(ability.skill);
    if (!skill) {
      throw new Error(`Skill ${ability.skill} not found in registry`);
    }
    const skillLevel = skill.level;
    const baseDamage = skillLevel * multiplier;

    let finalDamage = baseDamage;
    let reduction = 0;

    const boss = game.skillingBosses.activeBoss;
    if (ability.tags.includes("Physical")) {
      const bossDefense = boss.stats.physicalDefense;
      reduction = calculateDamageReduction(bossDefense, baseDamage);
    } else if (ability.tags.includes("Magic")) {
      const bossDefense = boss.stats.magicDefense;
      reduction = calculateDamageReduction(bossDefense, baseDamage);
    } else {
      throw new Error("Invalid damage type");
    }

    finalDamage -= reduction;
    game.skillingBosses.currentBattleBossDamageReduced += reduction;
    game.skillingBosses.takeDamage(finalDamage, "boss");
  } catch (error) {
    console.error("Error dealing skill level as damage:", error);
  }
}

function calculateDamageReduction(defense, baseDamage) {
  // Calculate reduction percentage (1% per point of defense)
  let reductionPercentage = defense / 100;

  // Cap the reduction at 80%
  reductionPercentage = Math.min(reductionPercentage, 0.8);

  // Calculate the actual damage reduction
  let reduction = baseDamage * reductionPercentage;

  return Math.floor(reduction);
}
