export class Boss {
    constructor(id, name, image, stats, attacks) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.stats = stats;
        this.attacks = attacks; // array of BossAttack objects
        this.currentHP = stats.maxHP;
        this.maxHP = stats.maxHP;
        this.defense = stats.defense;
        this.regen = stats.regen;
    }
}
export class BossStats {
    constructor(maxHP, attackPower, physicalDefense, magicDefense, regen) {
        this.maxHP = maxHP;
        this.attackPower = attackPower;
        this.physicalDefense = physicalDefense;
        this.magicDefense = magicDefense;
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