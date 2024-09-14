export async function init(ctx) {
  const progressCheckers = await ctx.loadModule(
    "src/quests/progressCheckers.mjs"
  );
  const rewardFuncs = await ctx.loadModule("src/quests/rewardFuncs.mjs");
  const models = await ctx.loadModule("src/quests/models.mjs");
  initializeMainQuests(ctx, models, progressCheckers, rewardFuncs);
}
function initializeMainQuests(ctx, questModels, progressCheckers, rewardFuncs) {
  console.log("Initializing quests...");

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
        "Equip an Ability",
        "Visit the Abilities section in the Skilling Bosses mod to equip an ability",
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
    "https://www.svgrepo.com/show/200452/skull.svg",
    [
      new questModels.Objective(
        "Defeat A Boss",
        "Face your first Skilling Boss",
        "https://www.svgrepo.com/show/200452/skull.svg",
        (game) => progressCheckers.checkTotalBossKills(game, 1)
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
    2 // mainQuestNumber
  );

  // Add the main quests to the SkillingBosses instance
  game.skillingBosses.addQuest(mainQuest1);
  game.skillingBosses.addQuest(mainQuest2);
  game.skillingBosses.addQuest(mainQuest3);

  // Start the first main quest
  game.skillingBosses.startQuest(0);

  console.log("Main quests initialized and first quest started.");
  console.log(game.skillingBosses);
}
