const BASE_MAX_HP = 1000;
const BASE_ATTACK_POWER = 10;
const BASE_PHYSICAL_DEFENSE = 10;
const BASE_MAGIC_DEFENSE = 10;
const BASE_REGEN_CHANCE = 0.1;
const BASE_REGEN = 1;

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
        ["melvorD:Oak_Logs", 3, 20],
        ["melvorD:Willow_Logs", 3, 20],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:gathererSoul", 1, 10],
        ["melvorD:Maple_Logs", 3, 20],
        ["melvorD:Yew_Logs", 3, 20],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:forestHeart", 1, 1],
        ["melvorD:Magic_Logs", 3, 20],
        ["melvorD:Redwood_Logs", 3, 20],
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
        ["melvorD:Raw_Herring", 3, 20],
        ["melvorD:Raw_Salmon", 3, 20],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:gathererSoul", 1, 10],
        ["melvorD:Raw_Lobster", 3, 20],
        ["melvorD:Raw_Swordfish", 3, 20],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:aquaticHeart", 1, 1],
        ["melvorD:Raw_Crab", 3, 20],
        ["melvorD:Raw_Carp", 3, 20],
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
        ["melvorD:Iron_Ore", 3, 20],
        ["melvorD:Coal_Ore", 3, 20],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:gathererSoul", 1, 10],
        ["melvorD:Gold_Ore", 3, 20],
        ["melvorD:Mithril_Ore", 3, 20],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:stoneHeart", 1, 1],
        ["melvorD:Adamantite_Ore", 3, 20],
        ["melvorD:Runite_Ore", 3, 20],
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
        ["melvorD:Coal_Ore", 3, 20],
        ["melvorD:Willow_Logs", 3, 20],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:refinerSoul", 1, 10],
        ["melvorF:Quick_Burner", 3, 20],
        ["smattyBosses:tier1MasteryBag", 1, 1],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:blazingHeart", 1, 1],
        ["melvorF:Quick_Burner_II", 3, 20],
        ["smattyBosses:tier2MasteryBag", 1, 1],
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
        ["melvorD:Leather", 3, 20],
        ["melvorD:Sapphire", 2, 7],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:artisanSoul", 1, 10],
        ["melvorD:Green_Dragonhide", 3, 20],
        ["melvorD:Ruby", 2, 7],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:leatherHeart", 1, 1],
        ["melvorD:Blue_Dragonhide", 3, 20],
        ["melvorD:Red_Dragonhide", 3, 20],
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
        ["melvorD:Steel_Bar", 3, 20],
        ["melvorD:Silver_Bar", 3, 20],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:artisanSoul", 1, 10],
        ["melvorD:Mithril_Bar", 3, 20],
        ["melvorD:Gold_Bar", 3, 20],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:forgeHeart", 1, 1],
        ["melvorD:Adamantite_Bar", 3, 20],
        ["melvorD:Runite_Bar", 3, 20],
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
        ["melvorD:Headless_Arrows", 3, 200],
        ["melvorD:Headless_Bolts", 3, 200],
      ]),
      uncommon: new models.BossRewards([
        ["smattyBosses:artisanSoul", 1, 10],
        ["melvorD:Bowstring", 3, 100],
        ["melvorF:Maple_Longbow_U", 3, 20],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:arrowHeart", 1, 1],
        ["melvorF:Magic_Longbow_U", 3, 20],
        ["melvorD:Rune_Crossbow_Head", 3, 20],
      ]),
      legendary: new models.BossRewards([
        ["smattyBosses:tier1ArtisanBag", 1, 1],
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
        new models.BossAttack("Root Slam", 50, 10),
        new models.BossAttack("Leaf Storm", 30, 5),
        new models.BossAttack("Bark Armor", 0, 15),
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
        new models.BossAttack("Tidal Crush", 50, 10),
        new models.BossAttack("Bubble Blow", 30, 5),
        new models.BossAttack("Bubble Shield", 0, 15),
        // unique effect whirlpool
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
        new models.BossAttack("Boulder Throw", 50, 10),
        new models.BossAttack("Seismic Slam", 30, 5),
        new models.BossAttack("Mine Shield", 0, 15),
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
        new models.BossAttack("Flambé Blast", 50, 10),
        new models.BossAttack("Culinary Crush", 30, 5),
        new models.BossAttack("Pan Shield", 0, 15),
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
        new models.BossAttack("Toxic Spore", 50, 10),
        new models.BossAttack("Venomous Vine", 30, 5),
        new models.BossAttack("Plant Shield", 0, 15),
      ],
      herbloreRewards
    );
    // unique mechanic plague cloud
    const firemakingBoss = new models.Boss(
      5,
      "Blazing Phoenix",
      "Firemaking",
      "https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png",
      new models.BossStats(
        BASE_MAX_HP,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack("Inferno Blast", 50, 10),
        new models.BossAttack("Phoenix Dive", 30, 5),
        new models.BossAttack("Fire Shield", 0, 15),
      ],
      firemakingRewards
    );
    const craftingBoss = new models.Boss(
      6,
      "Leather Golem",
      "Crafting",
      "https://cdn2-main.melvor.net/assets/media/skills/crafting/crafting.png",
      new models.BossStats(
        BASE_MAX_HP,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack("Needle Strike", 50, 10),
        new models.BossAttack("Leather Lash", 30, 5),
        new models.BossAttack("Gem Barrier", 0, 15),
      ],
      craftingRewards
    );

    const smithingBoss = new models.Boss(
      7,
      "Forge Titan",
      "Smithing",
      "https://cdn2-main.melvor.net/assets/media/skills/smithing/smithing.png",
      new models.BossStats(
        BASE_MAX_HP,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack("Hammer Slam", 50, 10),
        new models.BossAttack("Molten Spray", 30, 5),
        new models.BossAttack("Steel Skin", 0, 15),
      ],
      smithingRewards
    );

    const fletchingBoss = new models.Boss(
      8,
      "Arrow Elemental",
      "Fletching",
      "https://cdn2-main.melvor.net/assets/media/skills/fletching/fletching.png",
      new models.BossStats(
        BASE_MAX_HP,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack("Arrow Barrage", 50, 10),
        new models.BossAttack("Bowstring Slice", 30, 5),
        new models.BossAttack("Quiver Shield", 0, 15),
      ],
      fletchingRewards
    );
    // unique mechanic rebirth
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
  } catch (error) {
    console.error("Error initializing bosses:", error);
  }
}
