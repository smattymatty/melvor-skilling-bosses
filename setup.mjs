export async function setup(ctx) {
  const skillingBossesModule = await ctx.loadModule("skillingBosses.mjs");
  // ui
  const pagesModule = await ctx.loadModule("src/ui/pages.mjs");
  await ctx.loadTemplates("templates.html");
  // quests
  const questsModule = await ctx.loadModule("src/quests/addQuests.mjs");
  // abilities
  const abilitiesModule = await ctx.loadModule(
    "src/abilities/addAbilities.mjs"
  );
  // bosses
  const addBossesModule = await ctx.loadModule("src/bosses/addBosses.mjs");
  const bossPatchesModule = await ctx.loadModule("src/bosses/patches.mjs");
  ctx.onModsLoaded(async () => {
    // Define a global variable for the Skilling Bosses class
    game.skillingBosses = new skillingBossesModule.SkillingBosses(ctx, game);
    // bosses
    await addBossesModule.init(ctx);
    await bossPatchesModule.init(ctx);
    // quests
    await questsModule.init(ctx);
    // abilities
    await abilitiesModule.init(ctx);
    console.log("Skilling Bosses mod initialized successfully.");
    console.log(game);
  });

  ctx.onCharacterSelectionLoaded(async () => {});

  ctx.onCharacterLoaded(async () => {
    // fill the game.skillingBosses object from storage
    const storageModule = await ctx.loadModule("storage.mjs");
    storageModule.init(ctx);
  });

  ctx.onInterfaceReady(async () => {
    await pagesModule.init(ctx);
  });
}
