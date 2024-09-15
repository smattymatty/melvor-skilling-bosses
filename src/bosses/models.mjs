export class Boss {
  constructor(id, name, skill, image, stats, attacks) {
    this.id = id;
    this.name = name;
    this.skill = skill;
    this.image = image;
    this.stats = stats;
    this.attacks = attacks; // array of BossAttack objects
    this.currentHP = stats.maxHP;
    this.maxHP = stats.maxHP;
    this.physicalDefense = stats.physicalDefense;
    this.magicDefense = stats.magicDefense;
    this.regenChance = stats.regenChance;
    this.regen = stats.regen;
    this.kills = 0;
    this.deaths = 0;
    this.tickRecord = 0;
  }
}
export class BossStats {
  constructor(
    maxHP,
    attackPower,
    physicalDefense,
    magicDefense,
    regenChance,
    regen
  ) {
    this.maxHP = maxHP;
    this.attackPower = attackPower;
    this.physicalDefense = physicalDefense;
    this.magicDefense = magicDefense;
    this.regenChance = regenChance;
    this.regen = regen;
  }
}

export class BossAttack {
  constructor(name, damage, cooldown) {
    this.name = name;
    this.damage = damage;
    this.cooldown = cooldown;
  }
}
