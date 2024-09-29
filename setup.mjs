export async function setup(ctx) {
  const skillingBossesModule = await ctx.loadModule("skillingBosses.mjs");
  // ui
  const pagesModule = await ctx.loadModule("src/ui/pages.mjs");
  await ctx.loadTemplates("templates.html");
  const settingsModule = await ctx.loadModule("src/ui/settings.mjs");
  // quests
  const questsModule = await ctx.loadModule("src/quests/addQuests.mjs");
  const beginnerQuestsModule = await ctx.loadModule(
    "src/quests/addBeginnerQuests.mjs"
  );
  const averageQuestsModule = await ctx.loadModule(
    "src/quests/addAverageQuests.mjs"
  );
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
  const artisanModifiersModule = await ctx.loadModule(
    "src/modifiers/artisanModifiers.mjs"
  );
  const mysticModifiersModule = await ctx.loadModule(
    "src/modifiers/mysticModifiers.mjs"
  );
  const shiftyModifiersModule = await ctx.loadModule(
    "src/modifiers/shiftyModifiers.mjs"
  );
  // battle effects
  const effectsModule = await ctx.loadModule("src/effects/addEffects.mjs");
  // bosses
  const addBossesModule = await ctx.loadModule("src/bosses/addBosses.mjs");
  const addBosses2Module = await ctx.loadModule("src/bosses/addBosses2.mjs");
  const bossPatchesModule = await ctx.loadModule("src/bosses/patches.mjs");
  // items
  const bagsModule = await ctx.loadModule("src/items/bags/masterTokenBags.mjs");
  const bagsBossModule = await ctx.loadModule(
    "src/items/bags/bossTokenBags.mjs"
  );
  const thievingCratesModule = await ctx.loadModule(
    "src/items/crates/thievingCrates.mjs"
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
  const shopArtisanPurchasesModule = await ctx.loadModule(
    "src/shop/artisanPurchases.mjs"
  );
  const shopShiftyPurchasesModule = await ctx.loadModule(
    "src/shop/shiftyPurchases.mjs"
  );
  const shopMysticPurchasesModule = await ctx.loadModule(
    "src/shop/mysticPurchases.mjs"
  );
  const shopOrderingModule = await ctx.loadModule("src/shop/ordering.mjs");
  ctx.onModsLoaded(async () => {
    // add new modifiers to the game
    buildingModifiersModule.init(ctx);
    genericModifiersModule.init(ctx);
    gathererModifiersModule.init(ctx);
    refinerModifiersModule.init(ctx);
    artisanModifiersModule.init(ctx);
    mysticModifiersModule.init(ctx);
    shiftyModifiersModule.init(ctx);
    // new items
    bagsModule.init(ctx);
    bagsBossModule.init(ctx);
    coinsModule.init(ctx);
    bossSoulsModule.init(ctx);
    bossHeartsModule.init(ctx);
    miscItemsModule.init(ctx);
    thievingCratesModule.init(ctx);
    // create shop purchases and ordering
    await shopBuildingsModule.init(ctx);
    await shopPurchasesModule.init(ctx);
    await shopRefinerPurchasesModule.init(ctx);
    await shopArtisanPurchasesModule.init(ctx);
    await shopShiftyPurchasesModule.init(ctx);
    await shopMysticPurchasesModule.init(ctx);
    await shopOrderingModule.init(ctx);
    // global variable for the Skilling Bosses class
    game.skillingBosses = new skillingBossesModule.SkillingBosses(game, ctx);
    // effects
    await effectsModule.init(ctx);
    // bosses
    await addBossesModule.init(ctx);
    await addBosses2Module.init(ctx);
    await bossPatchesModule.init(ctx);
    // quests
    await questsModule.init(ctx);
    await beginnerQuestsModule.init(ctx);
    await averageQuestsModule.init(ctx);
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
    // update the settings
    settingsModule.init(ctx);
    console.log("characterStorage:", ctx.characterStorage);
  });

  ctx.onInterfaceReady(async () => {
    await pagesModule.init(ctx);
  });
}
