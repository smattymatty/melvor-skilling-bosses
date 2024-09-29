export async function init(ctx) {
  try {
    addShopDisplayOrder(ctx);
    addBuildingDisplayOrder(ctx);
    addShopCategoryOrder(ctx);
    addShopUpgradeChains(ctx);
    addBankItemOrder(ctx);
  } catch (error) {
    console.error("Error initializing shop ordering:", error);
  }
}

function addShopDisplayOrder(ctx) {
  const shopPurchases = ctx.gameData.buildPackage((p) => {
    p.shopDisplayOrder.add({
      insertAt: "End",
      ids: [
        "smattyBosses:duckDefence1",
        "smattyBosses:duckDefence2",
        "smattyBosses:duckDefence3",
        "smattyBosses:duckDefence4",
        "smattyBosses:duckDefence5",
        "smattyBosses:duckDefence6",
        "smattyBosses:luckyLevels1",
        "smattyBosses:luckyLevels2",
        "smattyBosses:luckyLevels3",
        "smattyBosses:luckyLevels4",
        "smattyBosses:luckyLevels5",
        "smattyBosses:luckyLevels6",
        "smattyBosses:shieldCharger1",
        "smattyBosses:shieldCharger2",
        "smattyBosses:shieldCharger3",
        "smattyBosses:shieldCharger4",
        "smattyBosses:shieldCharger5",
        "smattyBosses:hater1",
        "smattyBosses:hater2",
        "smattyBosses:hater3",
        "smattyBosses:hater4",
        "smattyBosses:duckAttack1",
        "smattyBosses:duckAttack2",
        "smattyBosses:duckAttack3",
        "smattyBosses:duckAttack4",
        "smattyBosses:buffShielder1",
        "smattyBosses:buffShielder2",
        "smattyBosses:buffShielder3",
        "smattyBosses:buffShielder4",
        "smattyBosses:buffShielder5",
        // gatherer
        "smattyBosses:woodRoller1",
        "smattyBosses:woodRoller2",
        "smattyBosses:woodRoller3",
        "smattyBosses:woodRoller4",
        "smattyBosses:rockRoller1",
        "smattyBosses:rockRoller2",
        "smattyBosses:rockRoller3",
        "smattyBosses:rockRoller4",
        "smattyBosses:fishRoller1",
        "smattyBosses:fishRoller2",
        "smattyBosses:fishRoller3",
        "smattyBosses:fishRoller4",
        "smattyBosses:efficientSkillingGathering1",
        "smattyBosses:efficientSkillingGathering2",
        "smattyBosses:efficientBossingGathering1",
        "smattyBosses:efficientBossingGathering2",
        // refiner
        "smattyBosses:spiceRoller1",
        "smattyBosses:spiceRoller2",
        "smattyBosses:spiceRoller3",
        "smattyBosses:spiceRoller4",
        "smattyBosses:flameRoller1",
        "smattyBosses:flameRoller2",
        "smattyBosses:flameRoller3",
        "smattyBosses:flameRoller4",
        "smattyBosses:toxinRoller1",
        "smattyBosses:toxinRoller2",
        "smattyBosses:toxinRoller3",
        "smattyBosses:toxinRoller4",
        "smattyBosses:efficientSkillingRefiner1",
        "smattyBosses:efficientSkillingRefiner2",
        "smattyBosses:efficientBossingRefiner1",
        "smattyBosses:efficientBossingRefiner2",
        // artisan
        "smattyBosses:ingotRoller1",
        "smattyBosses:ingotRoller2",
        "smattyBosses:ingotRoller3",
        "smattyBosses:ingotRoller4",
        "smattyBosses:leatherRoller1",
        "smattyBosses:leatherRoller2",
        "smattyBosses:leatherRoller3",
        "smattyBosses:leatherRoller4",
        "smattyBosses:arrowRoller1",
        "smattyBosses:arrowRoller2",
        "smattyBosses:arrowRoller3",
        "smattyBosses:arrowRoller4",
        "smattyBosses:efficientSkillingArtisan1",
        "smattyBosses:efficientSkillingArtisan2",
        "smattyBosses:efficientBossingArtisan1",
        "smattyBosses:efficientBossingArtisan2",
        // mystic
        "smattyBosses:starRoller1",
        "smattyBosses:starRoller2",
        "smattyBosses:starRoller3",
        "smattyBosses:starRoller4",
        "smattyBosses:wardRoller1",
        "smattyBosses:wardRoller2",
        "smattyBosses:wardRoller3",
        "smattyBosses:wardRoller4",
        "smattyBosses:shardRoller1",
        "smattyBosses:shardRoller2",
        "smattyBosses:shardRoller3",
        "smattyBosses:shardRoller4",
        "smattyBosses:efficientSkillingMystic1",
        "smattyBosses:efficientSkillingMystic2",
        "smattyBosses:efficientBossingMystic1",
        "smattyBosses:efficientBossingMystic2",
        // shifty
        "smattyBosses:moneyRoller1",
        "smattyBosses:moneyRoller2",
        "smattyBosses:moneyRoller3",
        "smattyBosses:moneyRoller4",
        "smattyBosses:speedRoller1",
        "smattyBosses:speedRoller2",
        "smattyBosses:speedRoller3",
        "smattyBosses:speedRoller4",
        "smattyBosses:emptyShifty1",
        "smattyBosses:efficientSkillingShifty1",
        "smattyBosses:efficientSkillingShifty2",
        "smattyBosses:efficientBossingShifty1",
        "smattyBosses:efficientBossingShifty2",
      ],
    });
  });
  shopPurchases.add();
}

function addBuildingDisplayOrder(ctx) {
  const shopPurchases = ctx.gameData.buildPackage((p) => {
    p.shopDisplayOrder.add({
      insertAt: "End",
      ids: [
        "smattyBosses:repairShop",
        "smattyBosses:repairShop2",
        "smattyBosses:repairShop3",
        "smattyBosses:skillingSupplies",
        "smattyBosses:enhanceCore",
        "smattyBosses:enhanceCore2",
        "smattyBosses:HardenCore",
        "smattyBosses:HardenCore2",
        "smattyBosses:shieldSmith",
        "smattyBosses:shieldSmith2",
        "smattyBosses:shieldSmith3",
        "smattyBosses:enchanceShields",
        "smattyBosses:enchanceShields2",
        "smattyBosses:shieldRegen1",
        "smattyBosses:shieldRegen2",
        "smattyBosses:inn",
        "smattyBosses:inn2",
        "smattyBosses:inn3",
        "smattyBosses:inn4",
        "smattyBosses:goodNightsRest1",
        "smattyBosses:wellFed1",
        "smattyBosses:goodNightsRest2",
        "smattyBosses:wellFed2",
      ],
    });
  });
  shopPurchases.add();
}

function addShopCategoryOrder(ctx) {
  const shopCategory = ctx.gameData.buildPackage((p) => {
    p.shopCategoryOrder.add({
      insertAt: "After",
      afterID: "melvorF:Township",
      ids: [
        "smattyBosses:SkillingBossesBuildings",
        "smattyBosses:SkillingBossesGeneric",
        "smattyBosses:SkillingBossesGathering",
        "smattyBosses:SkillingBossesRefining",
        "smattyBosses:SkillingBossesArtisan",
        "smattyBosses:SkillingBossesMystic",
        "smattyBosses:SkillingBossesShifty",
      ],
    });
  });
  shopCategory.add();
}

function addShopUpgradeChains(ctx) {
  try {
    const luckyLevelsUpgradeChain = ctx.gameData.buildPackage((p) => {
      p.shopUpgradeChains.add({
        id: "luckyLevelsUpgradeChain",
        chainName: "Lucky Levels",
        rootUpgradeID: "smattyBosses:luckyLevels4",
        defaultName: "Lucky Levels",
        defaultDescription: "No Bonus",
      });
    });
    luckyLevelsUpgradeChain.add();
  } catch (error) {
    console.error("Error adding shop upgrade chains:", error);
  }
}

function addBankItemOrder(ctx) {
  try {
    const bankOrder = ctx.gameData.buildPackage((p) => {
      p.bankSortOrder.add({
        insertAt: "Before",
        beforeID: "melvorD:Bones",
        ids: [
          "smattyBosses:bossCoin",
          "smattyBosses:genericSoul",
          "smattyBosses:gathererSoul",
          "smattyBosses:refinerSoul",
          "smattyBosses:artisanSoul",
          "smattyBosses:chefHeart",
          "smattyBosses:plagueHeart",
          "smattyBosses:forestHeart",
          "smattyBosses:aquaticHeart",
          "smattyBosses:stoneHeart",
          "smattyBosses:blazingHeart",
          "smattyBosses:arrowHeart",
          "smattyBosses:leatherHeart",
          "smattyBosses:forgeHeart",
          "smattyBosses:arrowHeart",
          "smattyBosses:tier1MasteryBag",
          "smattyBosses:tier2MasteryBag",
          "smattyBosses:tier1GathererBag",
          "smattyBosses:tier1RefinerBag",
          "smattyBosses:tier1ArtisanBag",
        ],
      });
    });
    bankOrder.add();
  } catch (error) {
    console.error("Error adding bank item order:", error);
  }
}
