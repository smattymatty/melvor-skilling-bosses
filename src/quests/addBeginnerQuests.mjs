export async function init(ctx) {
  const progressCheckers = await ctx.loadModule(
    "src/quests/progressCheckers.mjs"
  );
  const rewardFuncs = await ctx.loadModule("src/quests/rewardFuncs.mjs");
  const models = await ctx.loadModule("src/quests/models.mjs");
  initializeBeginnerQuests(ctx, models, progressCheckers, rewardFuncs);
}
async function initializeBeginnerQuests(
  ctx,
  questModels,
  progressCheckers,
  rewardFuncs
) {
  const itemImagesHelper = await ctx.loadModule("src/helpers/itemImages.mjs");
  const quest0 = new questModels.SideQuest(
    -1,
    "Use 200 Skilling Supplies!",
    "beginner",
    [
      new questModels.Objective(
        "Use 200 Skilling Supplies",
        "",
        itemImagesHelper.getImageUrlByItemID(
          ctx,
          "smattyBosses:skillingSupplies"
        ),
        (game) => progressCheckers.checkSkillingSuppliesUsed(game, 200)
      ),
    ],
    [
      new questModels.Reward(
        "200 Skilling Supplies",
        "",
        itemImagesHelper.getImageUrlByItemID(
          ctx,
          "smattyBosses:skillingSupplies"
        ),
        rewardFuncs.addSkillingSupplies(game, ctx, 200)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest0);

  const quest1 = new questModels.SideQuest(
    0,
    "Deal a total of 5000 Damage!",
    "beginner",
    [
      new questModels.Objective(
        "Deal a total of 5000 Damage",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/combat/attack.png",
        (game) => progressCheckers.checkTotalDamageDealt(game, 5000)
      ),
    ],
    [
      new questModels.Reward(
        "1000 Boss Coins",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:bossCoin"),
        rewardFuncs.addBossCoins(game, ctx, 1000)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest1);

  const quest2 = new questModels.SideQuest(
    1,
    "Take a total of 1000 Damage!",
    "beginner",
    [
      new questModels.Objective(
        "Take a total of 1000 Damage",
        "",
        "https://www.svgrepo.com/show/200452/skull.svg",
        (game) => progressCheckers.checkTotalDamageTaken(game, 1000)
      ),
    ],
    [
      new questModels.Reward(
        "100 Skilling Supplies",
        "",
        itemImagesHelper.getImageUrlByItemID(
          ctx,
          "smattyBosses:skillingSupplies"
        ),
        (game) => rewardFuncs.addSkillingSupplies(game, ctx, 100)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest2);

  const quest3 = new questModels.SideQuest(
    2,
    "Apply 20 Debuffs!",
    "beginner",
    [
      new questModels.Objective(
        "Apply 20 Debuffs",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png",
        (game) => progressCheckers.checkTotalDebuffsApplied(game, 20)
      ),
    ],
    [
      new questModels.Reward(
        "50 Generic Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:genericSoul"),
        (game) => rewardFuncs.addGenericSouls(game, ctx, 25)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest3);

  const quest4 = new questModels.SideQuest(
    3,
    "Hit the Common Reward Pool 10 times!",
    "beginner",
    [
      new questModels.Objective(
        "Hit the Common Reward Pool 10 times",
        "",
        itemImagesHelper.getImageUrlByItemID(
          ctx,
          "smattyBosses:tier1MasteryBag"
        ),
        (game) => progressCheckers.checkCommonRewardHits(game, 10)
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
  game.skillingBosses.addSideQuest(quest4);

  const quest5 = new questModels.SideQuest(
    4,
    "Defeat the Forest Sentinel in under 200 ticks!",
    "beginner",
    [
      new questModels.Objective(
        "Defeat the Forest Sentinel in under 200 ticks",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
        (game) => progressCheckers.checkFastestKillOnBossByID(game, 0, 200)
      ),
    ],
    [
      new questModels.Reward(
        "25 Gatherer Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:gathererSoul"),
        (game) => rewardFuncs.addGathererSouls(game, ctx, 25)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest5);

  const quest6 = new questModels.SideQuest(
    5,
    "Defeat the Aquatic Behemoth in under 200 ticks!",
    "beginner",
    [
      new questModels.Objective(
        "Defeat the Aquatic Behemoth in under 200 ticks",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
        (game) => progressCheckers.checkFastestKillOnBossByID(game, 1, 200)
      ),
    ],
    [
      new questModels.Reward(
        "25 Gatherer Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:gathererSoul"),
        (game) => rewardFuncs.addGathererSouls(game, ctx, 25)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest6);

  const quest7 = new questModels.SideQuest(
    6,
    "Defeat the Stone Colossus in under 200 ticks!",
    "beginner",
    [
      new questModels.Objective(
        "Defeat the Stone Colossus in under 200 ticks",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
        (game) => progressCheckers.checkFastestKillOnBossByID(game, 2, 200)
      ),
    ],
    [
      new questModels.Reward(
        "25 Gatherer Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:gathererSoul"),
        (game) => rewardFuncs.addGathererSouls(game, ctx, 25)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest7);

  const quest8 = new questModels.SideQuest(
    7,
    "Defeat the Chef God in under 200 ticks!",
    "beginner",
    [
      new questModels.Objective(
        "Defeat the Chef God in under 200 ticks",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/cooking/cooking.png",
        (game) => progressCheckers.checkFastestKillOnBossByID(game, 3, 200)
      ),
    ],
    [
      new questModels.Reward(
        "25 Refiner Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:refinerSoul"),
        (game) => rewardFuncs.addRefinerSouls(game, ctx, 25)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest8);

  const quest9 = new questModels.SideQuest(
    8,
    "Defeat the Plague Monster in under 200 ticks!",
    "beginner",
    [
      new questModels.Objective(
        "Defeat the Plague Monster in under 200 ticks",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/herblore/herblore.png",
        (game) => progressCheckers.checkFastestKillOnBossByID(game, 4, 200)
      ),
    ],
    [
      new questModels.Reward(
        "25 Refiner Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:refinerSoul"),
        (game) => rewardFuncs.addRefinerSouls(game, ctx, 25)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest9);

  const quest10 = new questModels.SideQuest(
    9,
    "Defeat the Blazing Phoenix in under 200 ticks!",
    "beginner",
    [
      new questModels.Objective(
        "Defeat the Blazing Phoenix in under 200 ticks",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png",
        (game) => progressCheckers.checkFastestKillOnBossByID(game, 5, 200)
      ),
    ],
    [
      new questModels.Reward(
        "25 Refiner Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:refinerSoul"),
        (game) => rewardFuncs.addRefinerSouls(game, ctx, 25)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest10);

  const quest11 = new questModels.SideQuest(
    10,
    "Defeat the Leather Golem in under 200 ticks!",
    "beginner",
    [
      new questModels.Objective(
        "Defeat the Leather Golem in under 200 ticks",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/crafting/crafting.png",
        (game) => progressCheckers.checkFastestKillOnBossByID(game, 6, 200)
      ),
    ],
    [
      new questModels.Reward(
        "25 Artisan Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:artisanSoul"),
        (game) => rewardFuncs.addArtisanSouls(game, ctx, 25)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest11);

  const quest12 = new questModels.SideQuest(
    11,
    "Defeat the Forge Titan in under 200 ticks!",
    "beginner",
    [
      new questModels.Objective(
        "Defeat the Forge Titan in under 200 ticks",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/smithing/smithing.png",
        (game) => progressCheckers.checkFastestKillOnBossByID(game, 7, 200)
      ),
    ],
    [
      new questModels.Reward(
        "25 Artisan Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:artisanSoul"),
        (game) => rewardFuncs.addArtisanSouls(game, ctx, 25)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest12);

  const quest13 = new questModels.SideQuest(
    12,
    "Defeat the Arrow Elemental in under 200 ticks!",
    "beginner",
    [
      new questModels.Objective(
        "Defeat the Arrow Elemental in under 200 ticks",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/fletching/fletching.png",
        (game) => progressCheckers.checkFastestKillOnBossByID(game, 8, 200)
      ),
    ],
    [
      new questModels.Reward(
        "25 Artisan Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:artisanSoul"),
        (game) => rewardFuncs.addArtisanSouls(game, ctx, 25)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest13);

  const quest14 = new questModels.SideQuest(
    13,
    "Defeat the Runic Guardian in under 200 ticks!",
    "beginner",
    [
      new questModels.Objective(
        "Defeat the Runic Guardian in under 200 ticks",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/runecrafting/runecrafting.png",
        (game) => progressCheckers.checkFastestKillOnBossByID(game, 9, 200)
      ),
    ],
    [
      new questModels.Reward(
        "25 Mystic Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:mysticSoul"),
        (game) => rewardFuncs.addMysticSouls(game, ctx, 25)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest14);

  const quest15 = new questModels.SideQuest(
    14,
    "Defeat the Celestial Dragon in under 200 ticks!",
    "beginner",
    [
      new questModels.Objective(
        "Defeat the Celestial Dragon in under 200 ticks",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/astrology/astrology.png",
        (game) => progressCheckers.checkFastestKillOnBossByID(game, 10, 200)
      ),
    ],
    [
      new questModels.Reward(
        "25 Mystic Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:mysticSoul"),
        (game) => rewardFuncs.addMysticSouls(game, ctx, 25)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest15);

  const quest16 = new questModels.SideQuest(
    15,
    "Defeat the Ancient Wolf in under 200 ticks!",
    "beginner",
    [
      new questModels.Objective(
        "Defeat the Ancient Wolf in under 200 ticks",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/summoning/summoning.png",
        (game) => progressCheckers.checkFastestKillOnBossByID(game, 11, 200)
      ),
    ],
    [
      new questModels.Reward(
        "25 Mystic Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:mysticSoul"),
        (game) => rewardFuncs.addMysticSouls(game, ctx, 25)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest16);

  const quest17 = new questModels.SideQuest(
    16,
    "Defeat the Ninja Master in under 200 ticks!",
    "beginner",
    [
      new questModels.Objective(
        "Defeat the Ninja Master in under 200 ticks",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/agility/agility.png",
        (game) => progressCheckers.checkFastestKillOnBossByID(game, 12, 200)
      ),
    ],
    [
      new questModels.Reward(
        "25 Shifty Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:shiftySoul"),
        rewardFuncs.addShiftySouls(game, ctx, 25)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest17);

  const quest18 = new questModels.SideQuest(
    17,
    "Defeat the Shadow Stalker in under 200 ticks!",
    "beginner",
    [
      new questModels.Objective(
        "Defeat the Shadow Stalker in under 200 ticks",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/thieving/thieving.png",
        (game) => progressCheckers.checkFastestKillOnBossByID(game, 13, 200)
      ),
    ],
    [
      new questModels.Reward(
        "25 Shifty Souls",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:shiftySoul"),
        (game) => rewardFuncs.addShiftySouls(game, ctx, 25)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest18);

  const quest19 = new questModels.SideQuest(
    18,
    "Deal 100 damage or higher in a single attack!",
    "beginner",
    [
      new questModels.Objective(
        "Deal 100 damage or higher in a single attack",
        "",
        "https://cdn2-main.melvor.net/assets/media/skills/combat/attack.png",
        (game) => progressCheckers.checkSingleAttackDamage(game, 100)
      ),
    ],
    [
      new questModels.Reward(
        "1000 Boss Coins",
        "",
        itemImagesHelper.getImageUrlByItemID(ctx, "smattyBosses:bossCoin"),
        (game) => rewardFuncs.addBossCoins(game, ctx, 1000)
      ),
    ]
  );
  game.skillingBosses.addSideQuest(quest19);
}
