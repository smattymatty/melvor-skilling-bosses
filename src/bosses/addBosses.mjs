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
      legendary: new models.BossRewards([["melvorD:Diamond", 1, 1]]),
    };

    const fishingRewards = {
      always: new models.BossRewards([
        ["smattyBosses:bossCoin", 1, 200],
        ["melvorD:Mastery_Token_Fishing", 1, 1],
      ]),
      common: new models.BossRewards([
        ["smattyBosses:genericSoul", 1, 10],
        ["melvorD:Raw_Seahorse", 3, 20],
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
      legendary: new models.BossRewards([["melvorD:Diamond", 1, 1]]),
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
        ["melvorD:Mithril_Ore", 3, 20],
        ["melvorD:Adamantite_Ore", 3, 20],
      ]),
      rare: new models.BossRewards([
        ["smattyBosses:stoneHeart", 1, 1],
        ["melvorD:Runite_Ore", 3, 20],
        ["melvorD:Dragonite_Ore", 3, 20],
      ]),
      legendary: new models.BossRewards([["melvorD:Diamond", 1, 1]]),
    };
    // Define your bosses here
    const woodCuttingBoss = new models.Boss(
      0,
      "Forest Sentinel",
      "Woodcutting",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
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
        new models.BossAttack("Bark Shield", 0, 15),
      ],
      woodcuttingRewards
    );

    const fishingBoss = new models.Boss(
      1,
      "Aquatic Behemoth",
      "Fishing",
      "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
      new models.BossStats(
        BASE_MAX_HP,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack("Bite", 50, 10),
        new models.BossAttack("Bubble Blow", 30, 5),
        new models.BossAttack("Bubble Shield", 0, 15),
      ],
      fishingRewards
    );

    const miningBoss = new models.Boss(
      2,
      "Stone Colossus",
      "Mining",
      "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
      new models.BossStats(
        BASE_MAX_HP,
        BASE_ATTACK_POWER,
        BASE_PHYSICAL_DEFENSE,
        BASE_MAGIC_DEFENSE,
        BASE_REGEN_CHANCE,
        BASE_REGEN
      ),
      [
        new models.BossAttack("Dig", 50, 10),
        new models.BossAttack("Mine", 30, 5),
        new models.BossAttack("Mine Shield", 0, 15),
      ],
      miningRewards
    );

    // Add the bosses to the SkillingBosses instance
    game.skillingBosses.addBoss(woodCuttingBoss);
    game.skillingBosses.addBoss(fishingBoss);
    game.skillingBosses.addBoss(miningBoss);
  } catch (error) {
    console.error("Error initializing bosses:", error);
  }
}
