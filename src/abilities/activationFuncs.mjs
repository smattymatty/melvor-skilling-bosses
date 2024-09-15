export function dealSkillLevelAsDamage(ability, game, multiplier = 1.0) {
  try {
    console.log("Dealing skill level as damage");
    console.log(game);
    const skillRegistry = game.skills.registeredObjects;
    const skill = skillRegistry.get(ability.skill);
    if (!skill) {
      throw new Error(`Skill ${ability.skill} not found in registry`);
    }
    const skillLevel = skill.level;
    const baseDamage = skillLevel * multiplier;

    if (ability.tags.includes("Physical")) {
      const boss = game.skillingBosses.activeBoss;
      const bossDefense = boss.stats.physicalDefense;
      const finalDamage = Math.max(0, baseDamage - bossDefense);
      game.skillingBosses.takeDamage(finalDamage, "boss");
      console.log(`${skill.name} deals ${finalDamage} damage to ${boss.name}.`);
    } else if (ability.tags.includes("Magic")) {
      const boss = game.skillingBosses.activeBoss;
      const bossDefense = boss.stats.magicDefense;
      const finalDamage = Math.max(0, baseDamage - bossDefense);
      game.skillingBosses.takeDamage(finalDamage, "boss");
      console.log(`${skill.name} deals ${finalDamage} damage to ${boss.name}.`);
    } else {
      throw new Error("Invalid damage type");
    }
  } catch (error) {
    console.error("Error dealing skill level as damage:", error);
  }
}
