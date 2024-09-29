const BASE_MAX_HP = 3300;
const BASE_ATTACK_POWER = 10;
const BASE_PHYSICAL_DEFENSE = 20;
const BASE_MAGIC_DEFENSE = 20;
const BASE_REGEN_CHANCE = 0.2;
const BASE_REGEN = 2;
// boss attacks
const BASE_COOLDOWN = 6;

export async function init(ctx) {
  const models = await ctx.loadModule("src/bosses/models.mjs");
  initializeBosses(ctx, models);
}

function initializeBosses(ctx, models) {
  try {
    // Define reward tiers
    const woodcuttingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 200, 600],
        ["melvorD:Mastery_Token_Woodcutting", 2, 3],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 4, 30],
        ["melvorD:Bird_Nest", 3, 15],
        ["melvorD:Yew_Logs", 15, 125],
        ["smattyBosses:skillingSupplies", 5, 40],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:gathererSoul", 4, 30],
        ["melvorD:Magic_Logs", 15, 125],
        ["melvorD:Redwood_Logs", 15, 125],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:forestHeart", 1, 1],
        ["melvorD:Magic_Logs", 30, 200],
        ["melvorD:Redwood_Logs", 30, 200],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier2GathererBag", 1, 1],
      ]),
    };

    const fishingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 200, 600],
        ["melvorD:Mastery_Token_Fishing", 2, 3],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 4, 30],
        ["melvorD:Raw_Crab", 15, 125],
        ["melvorD:Raw_Carp", 15, 125],
        ["smattyBosses:skillingSupplies", 5, 40],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:gathererSoul", 4, 30],
        ["melvorD:Raw_Shark", 15, 125],
        ["melvorD:Raw_Cave_Fish", 15, 125],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:aquaticHeart", 1, 1],
        ["melvorD:Raw_Manta_Ray", 15, 125],
        ["melvorD:Raw_Whale", 15, 125],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier2GathererBag", 1, 1],
      ]),
    };

    const miningRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 200, 600],
        ["melvorD:Mastery_Token_Mining", 2, 3],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 4, 30],
        ["melvorD:Coal_Ore", 15, 125],
        ["melvorD:Mithril_Ore", 15, 125],
        ["smattyBosses:skillingSupplies", 5, 40],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:gathererSoul", 4, 30],
        ["melvorD:Adamantite_Ore", 15, 125],
        ["melvorD:Coal_Ore", 30, 200],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:stoneHeart", 1, 1],
        ["melvorD:Runite_Ore", 15, 125],
        ["melvorD:Dragonite_Ore", 15, 125],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier2GathererBag", 1, 1],
      ]),
    };

    const cookingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 200, 600],
        ["melvorD:Mastery_Token_Cooking", 2, 3],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 4, 30],
        ["melvorD:Strawberry_Cake", 10, 100],
        ["melvorD:Shark", 10, 100],
        ["smattyBosses:skillingSupplies", 5, 40],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:refinerSoul", 4, 30],
        ["melvorD:Carrot_Cake", 10, 100],
        ["melvorD:Cave_Fish", 10, 100],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:chefHeart", 1, 1],
        ["melvorD:Manta_Ray", 10, 100],
        ["melvorD:Whale", 10, 100],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier2RefinerBag", 1, 1],
      ]),
    };

    const herbloreRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 200, 600],
        ["melvorF:Mastery_Token_Herblore", 2, 3],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 4, 30],
        ["melvorD:Mantalyme_Herb", 10, 100],
        ["melvorD:Lemontyle_Herb", 10, 100],
        ["smattyBosses:skillingSupplies", 5, 40],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:refinerSoul", 4, 30],
        ["melvorD:Oxilyme_Herb", 10, 100],
        ["melvorF:Poraxx_Herb", 10, 100],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:plagueHeart", 1, 1],
        ["melvorF:Pigtayle_Herb", 10, 100],
        ["melvorF:Barrentoe_Herb", 10, 100],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier2RefinerBag", 1, 1],
      ]),
    };

    const firemakingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 200, 600],
        ["melvorD:Mastery_Token_Firemaking", 2, 3],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 4, 30],
        ["melvorD:Coal_Ore", 15, 125],
        ["melvorD:Willow_Logs", 15, 125],
        ["smattyBosses:skillingSupplies", 2, 10],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:refinerSoul", 4, 30],
        ["melvorF:Quick_Burner", 8, 160],
        ["smattyBosses:tier2MasteryBag", 2, 5],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:blazingHeart", 1, 1],
        ["melvorF:Quick_Burner_II", 8, 160],
        ["smattyBosses:tier2MasteryBag", 5, 10],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier2RefinerBag", 1, 1],
      ]),
    };

    const craftingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 200, 600],
        ["melvorF:Mastery_Token_Crafting", 2, 3],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 4, 30],
        ["melvorD:Blue_Dragonhide", 8, 160],
        ["melvorD:Emerald", 8, 32],
        ["smattyBosses:skillingSupplies", 2, 10],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:artisanSoul", 1, 10],
        ["melvorD:Red_Dragonhide", 8, 160],
        ["melvorD:Diamond", 8, 32],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:leatherHeart", 1, 1],
        ["melvorD:Black_Dragonhide", 8, 160],
        ["melvorF:Chest_Of_Gems", 1, 1],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier2ArtisanBag", 1, 1],
      ]),
    };

    const smithingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 200, 600],
        ["melvorD:Mastery_Token_Smithing", 2, 3],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 4, 30],
        ["melvorD:Gold_Bar", 10, 100],
        ["melvorD:Silver_Bar", 10, 100],
        ["smattyBosses:skillingSupplies", 4, 20],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:artisanSoul", 4, 30],
        ["melvorD:Mithril_Bar", 3, 22],
        ["melvorD:Adamantite_Bar", 10, 100],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:forgeHeart", 1, 1],
        ["melvorD:Runite_Bar", 10, 100],
        ["melvorD:Dragonite_Bar", 10, 100],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier2ArtisanBag", 1, 1],
      ]),
    };

    const fletchingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 200, 600],
        ["melvorF:Mastery_Token_Fletching", 2, 3],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 4, 30],
        ["melvorD:Adamant_Arrows", 10, 200],
        ["melvorF:Magic_Longbow_U", 8, 160],
        ["smattyBosses:skillingSupplies", 4, 20],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:artisanSoul", 4, 30],
        ["melvorD:Rune_Arrows", 10, 200],
        ["melvorF:Redwood_Shortbow_U", 8, 160],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:arrowHeart", 1, 1],
        ["melvorF:Redwood_Longbow_U", 8, 160],
        ["melvorD:Dragon_Arrows", 10, 200],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier2ArtisanBag", 1, 1],
      ]),
    };

    const runecraftingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 200, 600],
        ["melvorF:Mastery_Token_Runecrafting", 2, 3],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 4, 30],
        ["melvorD:Air_Rune", 100, 400],
        ["melvorD:Water_Rune", 100, 400],
        ["smattyBosses:skillingSupplies", 4, 20],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:mysticSoul", 4, 30],
        ["melvorD:Earth_Rune", 100, 400],
        ["melvorD:Blood_Rune", 100, 400],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:runicHeart", 1, 1],
        ["melvorD:Fire_Rune", 100, 400],
        ["melvorD:Ancient_Rune", 100, 400],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier2MysticBag", 1, 1],
      ]),
    };

    const astrologyRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 200, 600],
        ["melvorF:Mastery_Token_Astrology", 2, 3],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 4, 30],
        ["melvorF:Stardust", 4, 40],
        ["melvorF:Golden_Star", 10, 100],
        ["smattyBosses:skillingSupplies", 4, 20],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:mysticSoul", 4, 30],
        ["melvorF:Stardust", 8, 80],
        ["melvorF:Golden_Star_II", 10, 100],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:celestialHeart", 1, 1],
        ["melvorF:Stardust", 15, 150],
        ["melvorF:Golden_Stardust", 6, 60],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier2MysticBag", 1, 1],
      ]),
    };

    const summoningRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 200, 600],
        ["melvorF:Mastery_Token_Summoning", 2, 3],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 4, 30],
        ["melvorF:Summoning_Shard_Red", 15, 150],
        ["melvorF:Summoning_Shard_Green", 15, 150],
        ["smattyBosses:skillingSupplies", 4, 20],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:mysticSoul", 4, 30],
        ["melvorF:Summoning_Shard_Blue", 15, 150],
        ["melvorF:Summoning_Shard_Silver", 15, 150],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:ancientHeart", 1, 1],
        ["melvorF:Summoning_Shard_Gold", 15, 150],
        ["melvorF:Summoning_Shard_Black", 15, 150],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier2MysticBag", 1, 1],
      ]),
    };
    const agilityRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 200, 600],
        ["melvorF:Mastery_Token_Agility", 2, 3],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 4, 30],
        ["melvorF:Performance_Enhancing_Potion_II", 4, 40],
        ["melvorF:Performance_Enhancing_Potion_III", 4, 40],
        ["smattyBosses:skillingSupplies", 4, 20],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:shiftySoul", 4, 30],
        ["melvorF:Performance_Enhancing_Potion_IV", 4, 40],
        ["smattyBosses:skillingSupplies", 8, 40],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:ninjaHeart", 1, 1],
        ["melvorF:Performance_Enhancing_Potion_IV", 6, 60],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier2ShiftyBag", 1, 1],
      ]),
    };

    const thievingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 200, 600],
        ["melvorF:Mastery_Token_Thieving", 2, 3],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 4, 30],
        ["melvorF:Gentle_Hands_Potion_III", 5, 50],
        ["smattyBosses:golbinCrate", 10, 120],
        ["smattyBosses:skillingSupplies", 4, 40],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:shiftySoul", 4, 30],
        ["melvorF:Bobbys_Pocket", 3, 30],
        ["smattyBosses:farmerCrate", 10, 120],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:shadowHeart", 1, 1],
        ["smattyBosses:cyclopsCrate", 10, 120],
        ["melvorF:Chapeau_Noir", 1, 1],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier2ShiftyBag", 1, 1],
      ]),
    };
    const bossBuffAttack = new models.BossAttack(
      "Bolster",
      0,
      2,
      `
      Heal for 30 HP, gain either +2 attack power or +2 resistance.  
      `,
      "Magic"
    );
    const woodCuttingBoss = new models.Boss(
      14,
      "<span class='text-warning'>Elite</span> Forest Sentinel",
      "Woodcutting",
      ctx.getResourceUrl("assets/bosses/forest-sentinel.png"),
      new models.BossStats(
        BASE_MAX_HP,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack("Vine Whip", 1, BASE_COOLDOWN, "", "Physical"),
        new models.BossAttack(
          "Root Slam",
          2,
          BASE_COOLDOWN * 2,
          "",
          "Physical"
        ),
        bossBuffAttack,
      ],
      woodcuttingRewards,
      50
    );

    const fishingBoss = new models.Boss(
      15,
      "<span class='text-warning'>Elite</span> Aquatic Behemoth",
      "Fishing",
      ctx.getResourceUrl("assets/bosses/aquatic-behemoth.png"),
      new models.BossStats(
        BASE_MAX_HP,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack("Bubble Blow", 1, BASE_COOLDOWN, "", "Physical"),
        new models.BossAttack(
          "Tidal Crush",
          2,
          BASE_COOLDOWN * 2,
          "",
          "Physical"
        ),
        bossBuffAttack,
      ],
      fishingRewards,
      50
    );

    const miningBoss = new models.Boss(
      16,
      "<span class='text-warning'>Elite</span> Stone Colossus",
      "Mining",
      ctx.getResourceUrl("assets/bosses/stone-colossus.png"),
      new models.BossStats(
        BASE_MAX_HP,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack(
          "Boulder Throw",
          1,
          BASE_COOLDOWN,
          "Boulder Throw",
          "Physical"
        ),
        new models.BossAttack(
          "Seismic Slam",
          2,
          BASE_COOLDOWN * 2,
          "Seismic Slam",
          "Physical"
        ),
        bossBuffAttack,
      ],
      miningRewards,
      50
    );
    const cookingBoss = new models.Boss(
      17,
      "<span class='text-warning'>Elite</span> Chef God",
      "Cooking",
      ctx.getResourceUrl("assets/bosses/chef-god.png"),
      new models.BossStats(
        BASE_MAX_HP,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack("Flambé Blast", 1, BASE_COOLDOWN, "", "Magic"),
        new models.BossAttack(
          "Culinary Crush",
          2,
          BASE_COOLDOWN * 2,
          "",
          "Magic"
        ),
        bossBuffAttack,
      ],
      cookingRewards,
      50
    );
    const herbloreBoss = new models.Boss(
      18,
      "<span class='text-warning'>Elite</span> Plague Monster",
      "Herblore",
      ctx.getResourceUrl("assets/bosses/plague-monster.png"),
      new models.BossStats(
        BASE_MAX_HP,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack(
          "Toxic Spore",
          1,
          BASE_COOLDOWN,
          "Toxic Spore",
          "Magic"
        ),
        new models.BossAttack(
          "Venomous Vine",
          2,
          BASE_COOLDOWN * 2,
          "Venomous Vine",
          "Magic"
        ),
        bossBuffAttack,
      ],
      herbloreRewards,
      50
    );
    // unique mechanic plague cloud
    const firemakingBoss = new models.Boss(
      19,
      "<span class='text-warning'>Elite</span> Blazing Phoenix",
      "Firemaking",
      ctx.getResourceUrl("assets/bosses/blazing-phoenix.png"),
      new models.BossStats(
        BASE_MAX_HP,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack(
          "Inferno Blast",
          1,
          BASE_COOLDOWN,
          "Inferno Blast",
          "Magic"
        ),
        new models.BossAttack(
          "Phoenix Dive",
          2,
          BASE_COOLDOWN * 2,
          "Phoenix Dive",
          "Magic"
        ),
        bossBuffAttack,
      ],
      firemakingRewards,
      50
    );
    const craftingBoss = new models.Boss(
      20,
      "<span class='text-warning'>Elite</span> Leather Golem",
      "Crafting",
      ctx.getResourceUrl("assets/bosses/leather-golem.png"),
      new models.BossStats(
        BASE_MAX_HP,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack(
          "Needle Strike",
          1,
          BASE_COOLDOWN,
          "Needle Strike",
          "Magic"
        ),
        new models.BossAttack(
          "Leather Lash",
          2,
          BASE_COOLDOWN * 2,
          "Leather Lash",
          "Magic"
        ),
        bossBuffAttack,
      ],
      craftingRewards,
      50
    );

    const smithingBoss = new models.Boss(
      21,
      "<span class='text-warning'>Elite</span> Forge Titan",
      "Smithing",
      ctx.getResourceUrl("assets/bosses/forge-titan.png"),
      new models.BossStats(
        BASE_MAX_HP + 300,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack(
          "Hammer Slam",
          1,
          BASE_COOLDOWN,
          "Hammer Slam",
          "Physical"
        ),
        new models.BossAttack(
          "Molten Spray",
          2,
          BASE_COOLDOWN * 2,
          "Molten Spray",
          "Physical"
        ),
        bossBuffAttack,
      ],
      smithingRewards,
      50
    );

    const fletchingBoss = new models.Boss(
      22,
      "<span class='text-warning'>Elite</span> Arrow Elemental",
      "Fletching",
      ctx.getResourceUrl("assets/bosses/arrow-elemental.png"),
      new models.BossStats(
        BASE_MAX_HP,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack(
          "Arrow Barrage",
          1,
          BASE_COOLDOWN,
          "Arrow Barrage",
          "Physical"
        ),
        new models.BossAttack(
          "Bowstring Slice",
          2,
          BASE_COOLDOWN * 2,
          "Bowstring Slice",
          "Physical"
        ),
        bossBuffAttack,
      ],
      fletchingRewards,
      50
    );

    const runecraftingBoss = new models.Boss(
      23,
      "<span class='text-warning'>Elite</span> Runic Guardian",
      "Runecrafting",
      ctx.getResourceUrl("assets/bosses/runic-guardian.png"),
      new models.BossStats(
        BASE_MAX_HP,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack(
          "Rune Blast",
          1,
          BASE_COOLDOWN,
          "Rune Blast",
          "Magic"
        ),
        new models.BossAttack(
          "Rune Crush",
          2,
          BASE_COOLDOWN * 2,
          "Rune Crush",
          "Magic"
        ),
        bossBuffAttack,
      ],
      runecraftingRewards,
      50
    );

    const astrologyBoss = new models.Boss(
      24,
      "<span class='text-warning'>Elite</span> Celestial Dragon",
      "Astrology",
      "https://cdn2-main.melvor.net/assets/media/skills/astrology/astrology.png",
      new models.BossStats(
        BASE_MAX_HP,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack(
          "Stardust",
          1,
          BASE_COOLDOWN,
          "Stardust",
          "Magic"
        ),
        new models.BossAttack(
          "Golden Star",
          2,
          BASE_COOLDOWN * 2,
          "Golden Star",
          "Magic"
        ),
        bossBuffAttack,
      ],
      astrologyRewards,
      50
    );

    const summoningBoss = new models.Boss(
      25,
      "<span class='text-warning'>Elite</span> Ancient Wolf",
      "Summoning",
      "https://cdn2-main.melvor.net/assets/media/skills/summoning/summoning.png",
      new models.BossStats(
        BASE_MAX_HP - 200,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack(
          "Wolf Bite",
          1,
          BASE_COOLDOWN,
          "Wolf Bite",
          "Magic"
        ),
        new models.BossAttack(
          "Summoning Shard",
          2,
          BASE_COOLDOWN * 2,
          "Summoning Shard",
          "Magic"
        ),
        bossBuffAttack,
      ],
      summoningRewards,
      50
    );

    const agilityBoss = new models.Boss(
      26,
      "<span class='text-warning'>Elite</span> Ninja Master",
      "Agility",
      "https://cdn2-main.melvor.net/assets/media/skills/agility/agility.png",
      new models.BossStats(
        BASE_MAX_HP,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack(
          "Ninja Dash",
          1,
          BASE_COOLDOWN,
          "Ninja Strike",
          "Physical"
        ),
        new models.BossAttack(
          "Ninja Strike",
          2,
          BASE_COOLDOWN * 2,
          "Ninja Strike",
          "Physical"
        ),
        bossBuffAttack,
      ],
      agilityRewards,
      50
    );

    const thievingBoss = new models.Boss(
      27,
      "<span class='text-warning'>Elite</span> Shadow Stalker",
      "Thieving",
      "https://cdn2-main.melvor.net/assets/media/skills/thieving/thieving.png",
      new models.BossStats(
        BASE_MAX_HP - 200,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack(
          "Shadow Strike",
          1,
          BASE_COOLDOWN,
          "Shadow Strike",
          "Physical"
        ),
        new models.BossAttack(
          "Shadow Pounce",
          2,
          BASE_COOLDOWN * 2,
          "Shadow Strike",
          "Physical"
        ),
        bossBuffAttack,
      ],
      thievingRewards,
      50
    );
    // Add the bosses to the SkillingBosses instance
    game.skillingBosses.addBoss(woodCuttingBoss);
    game.skillingBosses.addBoss(fishingBoss);
    game.skillingBosses.addBoss(miningBoss);
    game.skillingBosses.addBoss(cookingBoss);
    game.skillingBosses.addBoss(herbloreBoss);
    game.skillingBosses.addBoss(firemakingBoss);
    game.skillingBosses.addBoss(craftingBoss);
    game.skillingBosses.addBoss(smithingBoss);
    game.skillingBosses.addBoss(fletchingBoss);
    game.skillingBosses.addBoss(runecraftingBoss);
    game.skillingBosses.addBoss(astrologyBoss);
    game.skillingBosses.addBoss(summoningBoss);
    game.skillingBosses.addBoss(agilityBoss);
    game.skillingBosses.addBoss(thievingBoss);
  } catch (error) {
    console.error("Error initializing bosses:", error);
  }
}
