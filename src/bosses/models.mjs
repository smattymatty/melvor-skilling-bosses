export class Boss {
  constructor(
    id,
    name,
    skill,
    image,
    stats,
    attacks,
    rewards,
    rewardProbabilities,
    levelRequirement = 20
  ) {
    this.id = id;
    this.name = name;
    this.skill = skill;
    this.image = image;
    this.stats = stats;
    this.attacks = attacks; // array of BossAttack objects
    this.attackPower = stats.attackPower;
    this.currentHP = stats.maxHP;
    this.maxHP = stats.maxHP;
    this.physicalDefense = stats.physicalDefense;
    this.magicDefense = stats.magicDefense;
    this.regenChance = stats.regenChance;
    this.regen = stats.regen;
    this.kills = 0;
    this.deaths = 0;
    this.tickRecord = 0;
    // Reward tiers
    this.alwaysRewardTier = rewards.always;
    this.commonRewardTier = rewards.common;
    this.uncommonRewardTier = rewards.uncommon;
    this.rareRewardTier = rewards.rare;
    this.legendaryRewardTier = rewards.legendary;
    this.rewardProbabilities = rewardProbabilities || {
      common: 0.5,
      uncommon: 0.3,
      rare: 0.15,
      legendary: 0.05,
    };
    this.levelRequirement = levelRequirement;
  }

  determineRewardTier() {
    const roll = Math.random();
    let cumulativeProbability = 0;

    for (const [tier, probability] of Object.entries(
      this.rewardProbabilities
    )) {
      cumulativeProbability += probability;
      if (roll < cumulativeProbability) {
        return tier;
      }
    }

    // If we somehow didn't hit any tier (shouldn't happen if probabilities sum to 1)
    return "common";
  }

  getRewards() {
    const rewards = [...this.alwaysRewardTier.items]; // Always give the "always" rewards

    const tier = this.determineRewardTier();
    switch (tier) {
      case "common":
        rewards.push(...this.commonRewardTier.items);
        break;
      case "uncommon":
        rewards.push(...this.uncommonRewardTier.items);
        break;
      case "rare":
        rewards.push(...this.rareRewardTier.items);
        break;
      case "legendary":
        rewards.push(...this.legendaryRewardTier.items);
        break;
    }

    return rewards.map(([itemId, min, max]) => {
      const quantity = Math.floor(Math.random() * (max - min + 1)) + min;
      return [itemId, quantity];
    });
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
  constructor(
    name,
    damageModifier,
    cooldown,
    description,
    type,
    usageCondition = "always"
  ) {
    this.name = name;
    this.damageModifier = damageModifier;
    this.cooldown = cooldown;
    this.description = description;
    this.type = type; // Magic or Physical
    this.usageCondition = usageCondition;
  }
}

export class BossRewards {
  constructor(items, currencies, xp) {
    this.items = items; // [id, min, max]
    // [["melvorD:itemName", 1, 20], ["melvorD:itemName", 2, 40]]
  }
}
