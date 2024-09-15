export class Ability {
  constructor(
    id,
    name,
    description,
    icon,
    skill,
    tags,
    cooldown,
    level,
    activationFuncs
  ) {
    this.id = id; // unique int id for the ability
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.skill = skill;
    this.tags = tags;
    this.cooldown = cooldown; // Cooldown duration
    this.level = level;
    this.activationFuncs = activationFuncs; // Array of functions
    // No current cooldown here
  }

  activate(game) {
    for (const func of this.activationFuncs) {
      func(this, game);
    }
  }
}
