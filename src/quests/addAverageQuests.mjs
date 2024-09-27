export async function init(ctx) {
  const progressCheckers = await ctx.loadModule(
    "src/quests/progressCheckers.mjs"
  );
  const rewardFuncs = await ctx.loadModule("src/quests/rewardFuncs.mjs");
  const models = await ctx.loadModule("src/quests/models.mjs");
  initializeAverageQuests(ctx, models, progressCheckers, rewardFuncs);
}
async function initializeAverageQuests(
  ctx,
  questModels,
  progressCheckers,
  rewardFuncs
) {
  const itemImagesHelper = await ctx.loadModule("src/helpers/itemImages.mjs");
  const quest0 = new questModels.SideQuest(
    0,
    "Deal a total of 40000 Damage!",

    "average",
    [
      new questModels.Objective(
        "Deal a total of 40000 Damage",
        "",
        "",
        (game) => progressCheckers.checkTotalDamageDealt(game, 40000)
      ),
    ],
    [
      new questModels.Reward("1000 Boss Coins", "", "", (game) =>
        rewardFuncs.addBossCoins(game, ctx, 4000)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest0);

  const quest1 = new questModels.SideQuest(
    1,
    "Take a total of 10000 Damage!",
    "average",
    [
      new questModels.Objective(
        "Take a total of 10000 Damage",
        "",
        "https://www.svgrepo.com/show/200452/skull.svg",
        (game) => progressCheckers.checkTotalDamageTaken(game, 10000)
      ),
    ],
    [
      new questModels.Reward(
        "1000 Skilling Supplies",
        "",
        itemImagesHelper.getImageUrlByItemID(
          ctx,
          "smattyBosses:skillingSupplies"
        ),
        (game) => rewardFuncs.addSkillingSupplies(game, ctx, 1000)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest1);

  const quest2 = new questModels.SideQuest(
    2,
    "Apply 200 Debuffs!",
    "average",
    [
      new questModels.Objective("Apply 200 Debuffs", "", "", (game) =>
        progressCheckers.checkTotalDebuffsApplied(game, 200)
      ),
    ],
    [
      new questModels.Reward("50 Generic Souls", "", "", (game) =>
        rewardFuncs.addGenericSouls(game, ctx, 50)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest2);

  const quest3 = new questModels.SideQuest(
    3,
    "Defeat the Chef God in under 150 ticks, using only Thieving Abilities!",
    "average",
    [
      new questModels.Objective(
        "Defeat the Chef God in under 150 ticks, using only Thieving Abilities",
        "",
        "",
        (game) => progressCheckers.checkThiefTheChef(game)
      ),
    ],
    [
      new questModels.Reward("25 Refiner Souls", "", "", (game) =>
        rewardFuncs.addRefinerSouls(game, ctx, 25)
      ),
      new questModels.Reward("25 Gathering Souls", "", "", (game) =>
        rewardFuncs.addGathererSouls(game, ctx, 25)
      ),
      new questModels.Reward("50 Cherry Cup Cakes", "", "", (game) =>
        rewardFuncs.addCherryCupCakes(game, ctx, 50)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest3);

  const quest4 = new questModels.SideQuest(
    4,
    "Defeat the Aquatic Behemoth in under 150 ticks, using only Cooking Abilities!",
    "average",
    [
      new questModels.Objective(
        "Defeat the Aquatic Behemoth in under 150 ticks, using only Cooking Abilities",
        "",
        "",
        (game) => progressCheckers.checkCookTheFish(game)
      ),
    ],
    [
      new questModels.Reward("25 Gathering Souls", "", "", (game) =>
        rewardFuncs.addGathererSouls(game, ctx, 25)
      ),
      new questModels.Reward("25 Refiner Souls", "", "", (game) =>
        rewardFuncs.addRefinerSouls(game, ctx, 25)
      ),
      new questModels.Reward("50 Swordfish", "", "", (game) =>
        rewardFuncs.addSwordfish(game, ctx, 50)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest4);
}
