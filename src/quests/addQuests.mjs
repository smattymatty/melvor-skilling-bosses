export async function init(ctx) {
  const progressCheckers = await ctx.loadModule(
    "src/quests/progressCheckers.mjs"
  );
  const rewardFuncs = await ctx.loadModule("src/quests/rewardFuncs.mjs");
  const models = await ctx.loadModule("src/quests/models.mjs");
  initializeMainQuests(ctx, models, progressCheckers, rewardFuncs);
}
function initializeMainQuests(ctx, questModels, progressCheckers, rewardFuncs) {
  // Define your main quests here
  const mainQuest1 = new questModels.Quest(
    "Wake Up, Skiller!",
    "Prepare yourself for the challenges ahead.",
    "Main",
    "https://www.svgrepo.com/show/449915/star.svg",
    [
      new questModels.Objective(
        "Reach level 20 in a Skill",
        "Reach level 20 in either Woodcutting, Fishing, or Mining",
        "https://cdn2-main.melvor.net/assets/media/main/statistics_header.png",
        (game) =>
          progressCheckers.checkSkillLevelsOr(
            game,
            ["melvorD:Woodcutting", "melvorD:Fishing", "melvorD:Mining"],
            20
          )
      ),
    ],
    [
      new questModels.Reward(
        "Unlock Abilities",
        "Gain access to Skilling Abilities. These will be your weapons against the Skilling Bosses.",
        "https://www.svgrepo.com/show/513272/book-closed.svg",
        (game) => rewardFuncs.nextMainQuest(game, ctx)
      ),
    ],
    [],
    true, // isMainQuest
    0 // mainQuestNumber
  );

  const mainQuest2 = new questModels.Quest(
    "Abilities aren't just for show!",
    "Abilities are used in battle against Skilling Bosses, their effects are based on the level of your skills",
    "Main",
    "https://www.svgrepo.com/show/513272/book-closed.svg",
    [
      new questModels.Objective(
        "Equip Three Abilities",
        "Visit the Abilities section in the Skilling Bosses mod to equip abilities",
        "https://www.svgrepo.com/show/274069/check-accept.svg",
        (game) => progressCheckers.playerHasAnyAbilityEquipped(game)
      ),
    ],
    [
      new questModels.Reward(
        "Unlock Battle Screen",
        "Gain access to the Battle Screen. This is where you will face off against Skilling Bosses.",
        "https://cdn2-main.melvor.net/assets/media/skills/combat/combat.png",
        (game) => rewardFuncs.nextMainQuest(game, ctx)
      ),
    ],
    [],
    true, // isMainQuest
    1 // mainQuestNumber
  );

  const mainQuest3 = new questModels.Quest(
    "Defeat a boss!",
    "Enter the Battle Screen to face off against your first boss.",
    "Main",
    "https://cdn2-main.melvor.net/assets/media/skills/combat/combat.png",
    [
      new questModels.Objective(
        "Defeat A Boss",
        "Face your first Skilling Boss",
        "https://www.svgrepo.com/show/200452/skull.svg",
        (game) => progressCheckers.checkTotalTypesOfBossesKilled(game, 1)
      ),
    ],
    [
      new questModels.Reward(
        "Bank Slot Token",
        "Enjoy an extra bank slot to store your loot.",
        "https://cdn2-main.melvor.net/assets/media/main/bank_header.png",
        (game) => rewardFuncs.nextMainQuest(game, ctx)
      ),
    ],
    [],
    true, // isMainQuest
    2 // mainQuestNumber
  );

  const mainQuest4 = new questModels.Quest(
    "Now, do it again!",
    "Defeat Three Different Bosses!",
    "Main",
    "https://cdn2-main.melvor.net/assets/media/skills/combat/combat.png",
    [
      new questModels.Objective(
        "Defeat Three Different Bosses",
        "Any three bosses need to be defeated at least once.",
        "https://www.svgrepo.com/show/200452/skull.svg",
        (game) => progressCheckers.checkTotalTypesOfBossesKilled(game, 3)
      ),
    ],
    [
      new questModels.Reward(
        "Mastery Token Bag (Tier 1)",
        "I hope you get the skill you want.",
        "https://www.svgrepo.com/show/252134/paper-bag.svg",
        (game) => rewardFuncs.nextMainQuest(game, ctx)
      ),
    ],
    [],
    true, // isMainQuest
    3 // mainQuestNumber
  );

  const mainQuest5 = new questModels.Quest(
    "Boss Decimator!",
    "Get a total of 10 kills on any single boss.",
    "Main",
    "https://cdn2-main.melvor.net/assets/media/skills/combat/combat.png",
    [
      new questModels.Objective(
        "Defeat a Boss 10 Times",
        "Defeat any single boss 10 times.",
        "https://www.svgrepo.com/show/200452/skull.svg",
        (game) => progressCheckers.checkAnyBossKills(game, 10)
      ),
    ],
    [
      new questModels.Reward(
        "Bank Slot Token",
        "Another one for the loot.",
        "https://cdn2-main.melvor.net/assets/media/main/bank_header.png",
        (game) => rewardFuncs.nextMainQuest(game, ctx)
      ),
    ],
    [],
    true, // isMainQuest
    4 // mainQuestNumber
  );
  const mainQuest6 = new questModels.Quest(
    "Decimate them even more!",
    "Get a total of 10 kills on three different bosses.",
    "Main",
    "https://cdn2-main.melvor.net/assets/media/skills/combat/combat.png",
    [
      new questModels.Objective(
        "Defeat Three Bosses 10 Times Each",
        "Defeat any three different bosses 10 times each.",
        "https://www.svgrepo.com/show/200452/skull.svg",
        (game) => progressCheckers.checkMultipleBossesWithKills(game, 3, 10)
      ),
    ],
    [
      new questModels.Reward(
        "2 Mastery Token Bags (Tier 1)",
        "In case you didn't get the skill you wanted last time.",
        "https://www.svgrepo.com/show/252134/paper-bag.svg",
        (game) => rewardFuncs.nextMainQuest(game, ctx)
      ),
    ],
    [],
    true, // isMainQuest
    5 // mainQuestNumber
  );
  const mainQuest7 = new questModels.Quest(
    "Wait for more content!",
    "Coming soon...",
    "Main",
    "https://cdn2-main.melvor.net/assets/media/skills/combat/combat.png",
    [
      new questModels.Objective(
        "Coming Soon",
        "Coming soon...",
        "https://www.svgrepo.com/show/200452/skull.svg",
        (game) => progressCheckers.checkTotalTypesOfBossesKilled(game, 5)
      ),
    ],
    [
      new questModels.Reward(
        "Coming Soon",
        "Coming soon...",
        "https://cdn2-main.melvor.net/assets/media/main/bank_header.png",
        (game) => rewardFuncs.nextMainQuest(game, ctx)
      ),
    ],
    [],
    true, // isMainQuest
    6 // mainQuestNumber
  );

  // Add the main quests to the SkillingBosses instance
  game.skillingBosses.addQuest(mainQuest1);
  game.skillingBosses.addQuest(mainQuest2);
  game.skillingBosses.addQuest(mainQuest3);
  game.skillingBosses.addQuest(mainQuest4);
  game.skillingBosses.addQuest(mainQuest5);
  game.skillingBosses.addQuest(mainQuest6);
  game.skillingBosses.addQuest(mainQuest7);

  // Start the first main quest
  game.skillingBosses.startQuest(0);
  // this is overwritten by storage if it exists
}
