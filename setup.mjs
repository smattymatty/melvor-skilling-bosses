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
  // items
  const bagsModule = await ctx.loadModule("src/items/bags/masterTokenBags.mjs");
  const coinsModule = await ctx.loadModule("src/items/currencies/bossCoin.mjs");
  const bossSoulsModule = await ctx.loadModule("src/items/souls/bossSouls.mjs");
  const bossHeartsModule = await ctx.loadModule(
    "src/items/hearts/bossHearts.mjs"
  );
  // shop
  const shopPurchasesModule = await ctx.loadModule("src/shop/purchases.mjs");
  const shopOrderingModule = await ctx.loadModule("src/shop/ordering.mjs");
  ctx.onModsLoaded(async () => {
    // add new items to the game
    bagsModule.init(ctx);
    coinsModule.init(ctx);
    bossSoulsModule.init(ctx);
    bossHeartsModule.init(ctx);
    // create shop purchases and ordering
    await shopPurchasesModule.init(ctx);
    await shopOrderingModule.init(ctx);
    // Define a global variable for the Skilling Bosses class
    game.skillingBosses = new skillingBossesModule.SkillingBosses(game, ctx);
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
