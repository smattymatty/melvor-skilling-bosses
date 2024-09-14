export async function init(ctx) {
  const models = await ctx.loadModule("src/bosses/models.mjs");
  initializeBosses(ctx, models);
}

function initializeBosses(ctx, models) {
  try {
    console.log("Initializing bosses...");
    // Define your bosses here
    const woodCuttingBoss = new models.Boss(
        0,
      "Forest Sentinel",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      new models.BossStats(1000, 100, 20, 30, 0.1, 50),
      [
        new models.BossAttack("Root Slam", 50, 10),
        new models.BossAttack("Leaf Storm", 30, 5),
        new models.BossAttack("Bark Shield", 0, 15),
      ]
    );

    const fishingBoss = new models.Boss(
        1,
        "Aquatic Behemoth",
        "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
        new models.BossStats(1000, 100, 20, 30, 0.1, 50),
        [
            new models.BossAttack("Bite", 50, 10),
            new models.BossAttack("Bubble Blow", 30, 5),
            new models.BossAttack("Bubble Shield", 0, 15),
        ]
    )

    const miningBoss = new models.Boss(
        2,
        "Stone Colossus",
        "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
        new models.BossStats(1000, 100, 20, 30, 0.1, 50),
        [
            new models.BossAttack("Dig", 50, 10),
            new models.BossAttack("Mine", 30, 5),
            new models.BossAttack("Mine Shield", 0, 15),
        ]
    )

    // Add the bosses to the SkillingBosses instance
    game.skillingBosses.addBoss(woodCuttingBoss);
    game.skillingBosses.addBoss(fishingBoss);
    game.skillingBosses.addBoss(miningBoss);

    console.log("Bosses initialized");
    console.log(game.skillingBosses);
  } catch (error) {
    console.error("Error initializing bosses:", error);
  }
}