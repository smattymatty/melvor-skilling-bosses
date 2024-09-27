const BASE_MAX_HP = 1000;
const BASE_ATTACK_POWER = 5;
const BASE_PHYSICAL_DEFENSE = 10;
const BASE_MAGIC_DEFENSE = 10;
const BASE_REGEN_CHANCE = 0.1;
const BASE_REGEN = 1;
// boss attacks
const BASE_COOLDOWN = 7;

export async function init(ctx) {
  const models = await ctx.loadModule("src/bosses/models.mjs");
  initializeBosses(ctx, models);
}

function initializeBosses(ctx, models) {
  try {
    // Define reward tiers
    const woodcuttingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 1, 200],
        ["melvorD:Mastery_Token_Woodcutting", 1, 1],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 1, 10],
        ["melvorD:Oak_Logs", 4, 25],
        ["melvorD:Willow_Logs", 4, 25],
        ["smattyBosses:skillingSupplies", 2, 10],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:gathererSoul", 1, 10],
        ["melvorD:Maple_Logs", 4, 25],
        ["melvorD:Yew_Logs", 4, 25],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:forestHeart", 1, 1],
        ["melvorD:Magic_Logs", 4, 25],
        ["melvorD:Redwood_Logs", 4, 25],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier1GathererBag", 1, 1],
      ]),
    };

    const fishingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 1, 200],
        ["melvorD:Mastery_Token_Fishing", 1, 1],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 1, 10],
        ["melvorD:Raw_Herring", 4, 25],
        ["melvorD:Raw_Salmon", 4, 25],
        ["smattyBosses:skillingSupplies", 2, 10],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:gathererSoul", 1, 10],
        ["melvorD:Raw_Lobster", 4, 25],
        ["melvorD:Raw_Swordfish", 4, 25],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:aquaticHeart", 1, 1],
        ["melvorD:Raw_Crab", 4, 25],
        ["melvorD:Raw_Carp", 4, 25],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier1GathererBag", 1, 1],
      ]),
    };

    const miningRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 1, 200],
        ["melvorD:Mastery_Token_Mining", 1, 1],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 1, 10],
        ["melvorD:Iron_Ore", 4, 25],
        ["melvorD:Coal_Ore", 4, 25],
        ["smattyBosses:skillingSupplies", 2, 10],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:gathererSoul", 1, 10],
        ["melvorD:Gold_Ore", 4, 25],
        ["melvorD:Mithril_Ore", 4, 25],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:stoneHeart", 1, 1],
        ["melvorD:Adamantite_Ore", 4, 25],
        ["melvorD:Runite_Ore", 4, 25],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier1GathererBag", 1, 1],
      ]),
    };

    const cookingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 1, 200],
        ["melvorD:Mastery_Token_Cooking", 1, 1],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 1, 10],
        ["melvorD:Strawberry_Cupcake", 3, 20],
        ["melvorD:Salmon", 3, 20],
        ["smattyBosses:skillingSupplies", 2, 10],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:refinerSoul", 1, 10],
        ["melvorD:Cherry_Cupcake", 3, 20],
        ["melvorD:Swordfish", 3, 20],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:chefHeart", 1, 1],
        ["melvorF:Apple_Pie", 3, 20],
        ["melvorD:Manta_Ray", 3, 20],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier1RefinerBag", 1, 1],
      ]),
    };

    const herbloreRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 1, 200],
        ["melvorF:Mastery_Token_Herblore", 1, 1],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 1, 10],
        ["melvorD:Mantalyme_Herb", 3, 20],
        ["melvorD:Lemontyle_Herb", 3, 20],
        ["smattyBosses:skillingSupplies", 2, 10],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:refinerSoul", 1, 10],
        ["melvorD:Oxilyme_Herb", 3, 20],
        ["melvorF:Lucky_Herb_Potion_II", 3, 20],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:plagueHeart", 1, 1],
        ["melvorF:Poraxx_Herb", 3, 20],
        ["melvorF:Pigtayle_Herb", 3, 20],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier1RefinerBag", 1, 1],
      ]),
    };

    const firemakingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 1, 200],
        ["melvorD:Mastery_Token_Firemaking", 1, 1],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 1, 10],
        ["melvorD:Coal_Ore", 4, 25],
        ["melvorD:Willow_Logs", 4, 25],
        ["smattyBosses:skillingSupplies", 2, 10],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:refinerSoul", 1, 10],
        ["melvorF:Quick_Burner", 4, 25],
        ["smattyBosses:tier1MasteryBag", 1, 2],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:blazingHeart", 1, 1],
        ["melvorF:Quick_Burner_II", 3, 20],
        ["smattyBosses:tier2MasteryBag", 1, 2],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier1RefinerBag", 1, 1],
      ]),
    };

    const craftingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 1, 200],
        ["melvorF:Mastery_Token_Crafting", 1, 1],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 1, 10],
        ["melvorD:Leather", 4, 25],
        ["melvorD:Sapphire", 3, 8],
        ["smattyBosses:skillingSupplies", 2, 10],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:artisanSoul", 1, 10],
        ["melvorD:Green_Dragonhide", 4, 25],
        ["melvorD:Ruby", 3, 8],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:leatherHeart", 1, 1],
        ["melvorD:Blue_Dragonhide", 4, 25],
        ["melvorD:Red_Dragonhide", 4, 25],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier1ArtisanBag", 1, 1],
      ]),
    };

    const smithingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 1, 200],
        ["melvorD:Mastery_Token_Smithing", 1, 1],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 1, 10],
        ["melvorD:Steel_Bar", 3, 22],
        ["melvorD:Silver_Bar", 3, 22],
        ["smattyBosses:skillingSupplies", 2, 10],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:artisanSoul", 1, 10],
        ["melvorD:Mithril_Bar", 3, 22],
        ["melvorD:Gold_Bar", 3, 22],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:forgeHeart", 1, 1],
        ["melvorD:Adamantite_Bar", 3, 22],
        ["melvorD:Runite_Bar", 3, 22],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier1ArtisanBag", 1, 1],
      ]),
    };

    const fletchingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 1, 200],
        ["melvorF:Mastery_Token_Fletching", 1, 1],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 1, 10],
        ["melvorD:Headless_Arrows", 4, 250],
        ["melvorD:Headless_Bolts", 4, 250],
        ["smattyBosses:skillingSupplies", 2, 10],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:artisanSoul", 1, 10],
        ["melvorD:Bowstring", 3, 100],
        ["melvorF:Maple_Longbow_U", 4, 25],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:arrowHeart", 1, 1],
        ["melvorF:Magic_Longbow_U", 4, 25],
        ["melvorD:Rune_Crossbow_Head", 4, 25],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier1ArtisanBag", 1, 1],
      ]),
    };

    const runecraftingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 1, 200],
        ["melvorF:Mastery_Token_Runecrafting", 1, 1],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 1, 10],
        ["melvorD:Air_Rune", 25, 150],
        ["melvorD:Water_Rune", 25, 150],
        ["smattyBosses:skillingSupplies", 2, 10],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:mysticSoul", 1, 10],
        ["melvorD:Earth_Rune", 25, 150],
        ["melvorD:Chaos_Rune", 25, 150],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:runicHeart", 1, 1],
        ["melvorD:Fire_Rune", 25, 150],
        ["melvorD:Death_Rune", 25, 150],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier1MysticBag", 1, 1],
      ]),
    };

    const astrologyRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 1, 200],
        ["melvorF:Mastery_Token_Astrology", 1, 1],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 1, 10],
        ["melvorF:Stardust", 1, 10],
        ["melvorF:Golden_Star", 5, 40],
        ["smattyBosses:skillingSupplies", 2, 10],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:mysticSoul", 1, 10],
        ["melvorF:Stardust", 2, 20],
        ["melvorF:Golden_Star_II", 8, 40],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:celestialHeart", 1, 1],
        ["melvorF:Stardust", 3, 30],
        ["melvorF:Golden_Stardust", 1, 20],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier1MysticBag", 1, 1],
      ]),
    };

    const summoningRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 1, 200],
        ["melvorF:Mastery_Token_Summoning", 1, 1],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 1, 10],
        ["melvorF:Summoning_Shard_Red", 5, 50],
        ["melvorF:Summoning_Shard_Green", 5, 50],
        ["smattyBosses:skillingSupplies", 2, 10],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:mysticSoul", 1, 10],
        ["melvorF:Summoning_Shard_Blue", 5, 50],
        ["melvorF:Summoning_Shard_Silver", 5, 50],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:ancientHeart", 1, 1],
        ["melvorF:Summoning_Shard_Gold", 5, 50],
        ["melvorF:Summoning_Shard_Black", 5, 50],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier1MysticBag", 1, 1],
      ]),
    };
    const agilityRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 1, 200],
        ["melvorF:Mastery_Token_Agility", 1, 1],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 1, 10],
        ["melvorF:Performance_Enhancing_Potion_I", 3, 20],
        ["melvorF:Performance_Enhancing_Potion_II", 3, 20],
        ["smattyBosses:skillingSupplies", 2, 10],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:shiftySoul", 1, 10],
        ["melvorF:Performance_Enhancing_Potion_III", 3, 20],
        ["smattyBosses:skillingSupplies", 4, 20],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:ninjaHeart", 1, 1],
        ["melvorF:Performance_Enhancing_Potion_IV", 3, 20],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier1ShiftyBag", 1, 1],
      ]),
    };

    const thievingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 1, 200],
        ["melvorF:Mastery_Token_Thieving", 1, 1],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 1, 10],
        ["melvorF:Gentle_Hands_Potion_I", 3, 20],
        ["smattyBosses:golbinCrate", 3, 20],
        ["smattyBosses:skillingSupplies", 2, 10],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:shiftySoul", 1, 10],
        ["melvorF:Bobbys_Pocket", 1, 10],
        ["smattyBosses:farmerCrate", 3, 20],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:shadowHeart", 1, 1],
        ["smattyBosses:cyclopsCrate", 3, 20],
        ["melvorF:Boots_Of_Stealth", 1, 1],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier1ShiftyBag", 1, 1],
      ]),
    };

    const woodCuttingBoss = new models.Boss(
      0,
      "Forest Sentinel",
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
        // unique effect entangle
      ],
      woodcuttingRewards
    );

    const fishingBoss = new models.Boss(
      1,
      "Aquatic Behemoth",
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
      ],
      fishingRewards
    );

    const miningBoss = new models.Boss(
      2,
      "Stone Colossus",
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
        // unique effect crystal armor
      ],
      miningRewards
    );
    const cookingBoss = new models.Boss(
      3,
      "Chef God",
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
      ],
      cookingRewards
    );
    // unique mechanic spice cloud
    const herbloreBoss = new models.Boss(
      4,
      "Plague Monster",
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
      ],
      herbloreRewards
    );
    // unique mechanic plague cloud
    const firemakingBoss = new models.Boss(
      5,
      "Blazing Phoenix",
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
      ],
      firemakingRewards
    );
    const craftingBoss = new models.Boss(
      6,
      "Leather Golem",
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
      ],
      craftingRewards
    );

    const smithingBoss = new models.Boss(
      7,
      "Forge Titan",
      "Smithing",
      ctx.getResourceUrl("assets/bosses/forge-titan.png"),
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
      ],
      smithingRewards
    );

    const fletchingBoss = new models.Boss(
      8,
      "Arrow Elemental",
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
      ],
      fletchingRewards
    );

    const runecraftingBoss = new models.Boss(
      9,
      "Runic Guardian",
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
      ],
      runecraftingRewards
    );

    const astrologyBoss = new models.Boss(
      10,
      "Celestial Dragon",
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
      ],
      astrologyRewards
    );

    const summoningBoss = new models.Boss(
      11,
      "Ancient Wolf",
      "Summoning",
      "https://cdn2-main.melvor.net/assets/media/skills/summoning/summoning.png",
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
      ],
      summoningRewards
    );

    const agilityBoss = new models.Boss(
      12,
      "Ninja Master",
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
      ],
      agilityRewards
    );

    const thievingBoss = new models.Boss(
      13,
      "Shadow Stalker",
      "Thieving",
      "https://cdn2-main.melvor.net/assets/media/skills/thieving/thieving.png",
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
      ],
      thievingRewards
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
