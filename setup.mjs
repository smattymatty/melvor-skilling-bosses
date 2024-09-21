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
  const abilitiesModule2 = await ctx.loadModule(
    "src/abilities/addAbilities2.mjs"
  );
  // modifiers
  const buildingModifiersModule = await ctx.loadModule(
    "src/modifiers/buildingModifiers.mjs"
  );
  const gathererModifiersModule = await ctx.loadModule(
    "src/modifiers/gathererModifiers.mjs"
  );
  const genericModifiersModule = await ctx.loadModule(
    "src/modifiers/genericModifiers.mjs"
  );
  const refinerModifiersModule = await ctx.loadModule(
    "src/modifiers/refinerModifiers.mjs"
  );
  // battle effects
  const effectsModule = await ctx.loadModule("src/effects/addEffects.mjs");
  // bosses
  const addBossesModule = await ctx.loadModule("src/bosses/addBosses.mjs");
  const bossPatchesModule = await ctx.loadModule("src/bosses/patches.mjs");
  // items
  const bagsModule = await ctx.loadModule("src/items/bags/masterTokenBags.mjs");
  const bagsBossModule = await ctx.loadModule(
    "src/items/bags/bossTokenBags.mjs"
  );
  const coinsModule = await ctx.loadModule("src/items/currencies/bossCoin.mjs");
  const bossSoulsModule = await ctx.loadModule("src/items/souls/bossSouls.mjs");
  const bossHeartsModule = await ctx.loadModule(
    "src/items/hearts/bossHearts.mjs"
  );
  const miscItemsModule = await ctx.loadModule("src/items/miscItems.mjs");
  // shop
  const shopBuildingsModule = await ctx.loadModule("src/shop/buildings.mjs");
  const shopPurchasesModule = await ctx.loadModule("src/shop/purchases.mjs");
  const shopRefinerPurchasesModule = await ctx.loadModule(
    "src/shop/refinerPurchases.mjs"
  );
  const shopOrderingModule = await ctx.loadModule("src/shop/ordering.mjs");
  ctx.onModsLoaded(async () => {
    // add new modifiers to the game
    buildingModifiersModule.init(ctx);
    genericModifiersModule.init(ctx);
    gathererModifiersModule.init(ctx);
    refinerModifiersModule.init(ctx);
    // add new items to the game
    bagsModule.init(ctx);
    bagsBossModule.init(ctx);
    coinsModule.init(ctx);
    bossSoulsModule.init(ctx);
    bossHeartsModule.init(ctx);
    miscItemsModule.init(ctx);
    // create shop purchases and ordering
    await shopBuildingsModule.init(ctx);
    await shopPurchasesModule.init(ctx);
    await shopRefinerPurchasesModule.init(ctx);
    await shopOrderingModule.init(ctx);
    // Alright, the base game stuff is loaded
    // This is where my mod stuff starts
    // Define a global variable for the Skilling Bosses class
    game.skillingBosses = new skillingBossesModule.SkillingBosses(game, ctx);
    // effects
    await effectsModule.init(ctx);
    // bosses
    await addBossesModule.init(ctx);
    await bossPatchesModule.init(ctx);
    // quests
    await questsModule.init(ctx);
    // abilities
    await abilitiesModule.init(ctx);
    await abilitiesModule2.init(ctx);
    console.log("Skilling Bosses mod initialized successfully.");
    console.log(game);
  });

  ctx.onCharacterSelectionLoaded(async () => {});

  ctx.onCharacterLoaded(async () => {
    // fill the game.skillingBosses object from storage
    const storageModule = await ctx.loadModule("storage.mjs");
    storageModule.init(ctx);
    // update the modifier cache
    const activationFuncs = await ctx.loadModule(
      "src/abilities/activationFuncs.mjs"
    );
    activationFuncs.updateModifierCache(game);
    console.log("Mod Cache Updated", game.skillingBosses.modCache);
    console.log("Discarded ticks:", game.skillingBosses.discardedTicks);
  });

  ctx.onInterfaceReady(async () => {
    await pagesModule.init(ctx);
  });
}
