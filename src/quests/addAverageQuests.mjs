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
        "https://cdn2-main.melvor.net/assets/media/skills/combat/attack.png",
        (game) => progressCheckers.checkTotalDamageDealt(game, 40000)
      ),
    ],
    [
      new questModels.Reward(
        "1000 Boss Coins",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:bossCoin"),
        (game) => rewardFuncs.addBossCoins(game, ctx, 4000)
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
      new questModels.Objective(
        "Apply 200 Debuffs",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png",
        (game) => progressCheckers.checkTotalDebuffsApplied(game, 200)
      ),
    ],
    [
      new questModels.Reward(
        "50 Generic Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:genericSoul"),
        (game) => rewardFuncs.addGenericSouls(game, ctx, 50)
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
        ctx.getResourceUrl("assets/bosses/chef-god.png"),
        (game) => progressCheckers.checkThiefTheChef(game)
      ),
    ],
    [
      new questModels.Reward(
        "25 Refiner Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:refinerSoul"),
        (game) => rewardFuncs.addRefinerSouls(game, ctx, 25)
      ),
      new questModels.Reward(
        "25 Gathering Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:gathererSoul"),
        (game) => rewardFuncs.addGathererSouls(game, ctx, 25)
      ),
      new questModels.Reward(
        "50 Cherry Cup Cakes",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "melvorD:Cherry_Cupcake"),
        (game) => rewardFuncs.addCherryCupCakes(game, ctx, 50)
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
        ctx.getResourceUrl("assets/bosses/aquatic-behemoth.png"),
        (game) => progressCheckers.checkCookTheFish(game)
      ),
    ],
    [
      new questModels.Reward(
        "25 Gathering Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:gathererSoul"),
        (game) => rewardFuncs.addGathererSouls(game, ctx, 25)
      ),
      new questModels.Reward(
        "25 Refiner Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:refinerSoul"),
        (game) => rewardFuncs.addRefinerSouls(game, ctx, 25)
      ),
      new questModels.Reward(
        "50 Swordfish",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "melvorD:Swordfish"),
        (game) => rewardFuncs.addSwordfish(game, ctx, 50)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest4);

  const quest5 = new questModels.SideQuest(
    5,
    "Defeat The Forest Sentinel in under 150 ticks, using only Agility Abilities!",
    "average",
    [
      new questModels.Objective(
        "Defeat The Forest Sentinel in under 150 ticks, using only Agility Abilities",
        "",
        ctx.getResourceUrl("assets/bosses/forest-sentinel.png"),
        (game) => progressCheckers.getClimbTheTree(game)
      ),
    ],
    [
      new questModels.Reward(
        "25 Gathering Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:gathererSoul"),
        (game) => rewardFuncs.addGathererSouls(game, ctx, 25)
      ),
      new questModels.Reward(
        "25 Shifty Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:shiftySoul"),
        (game) => rewardFuncs.addShiftySouls(game, ctx, 25)
      ),
      new questModels.Reward(
        "50 Birds Nest",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "melvorD:Bird_Nest"),
        (game) => rewardFuncs.addBirdNest(game, ctx, 50)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest5);

  const quest6 = new questModels.SideQuest(
    6,
    "Defeat the Forge Titan in under 150 ticks, using only Mining Abilities!",
    "average",
    [
      new questModels.Objective(
        "Defeat the Forge Titan in under 150 ticks, using only Mining Abilities",
        "",
        ctx.getResourceUrl("assets/bosses/forge-titan.png"),
        (game) => progressCheckers.getMineTheForge(game)
      ),
    ],
    [
      new questModels.Reward(
        "25 Gathering Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:gathererSoul"),
        (game) => rewardFuncs.addGathererSouls(game, ctx, 25)
      ),
      new questModels.Reward(
        "25 Artisan Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:artisanSoul"),
        (game) => rewardFuncs.addArtisanSouls(game, ctx, 25)
      ),
      new questModels.Reward(
        "50 Mithril Shields",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "melvorD:Mithril_Shield"),
        (game) => rewardFuncs.addMithrilShields(game, ctx, 50)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest6);

  const quest7 = new questModels.SideQuest(
    7,
    "Defeat the Leather Golem in under 150 ticks, using only Smithing Abilities!",
    "average",
    [
      new questModels.Objective(
        "Defeat the Leather Golem in under 150 ticks, using only Smithing Abilities",
        "",
        ctx.getResourceUrl("assets/bosses/leather-golem.png"),
        (game) => progressCheckers.getSmithTheLeather(game)
      ),
    ],
    [
      new questModels.Reward(
        "50 Artisan Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:artisanSoul"),
        (game) => rewardFuncs.addArtisanSouls(game, ctx, 50)
      ),

      new questModels.Reward(
        "50 Gold Sapphire Necklaces",
        "",
        itemImagesHelper.getImageUrlByItemID(
          ctx,
          "melvorF:Gold_Sapphire_Necklace"
        ),
        (game) => rewardFuncs.addGoldSapphireNecklaces(game, ctx, 25)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest7);
}
