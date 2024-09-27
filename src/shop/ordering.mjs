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
        "smattyBosses:shieldCharger1",
        "smattyBosses:shieldCharger2",
        "smattyBosses:shieldCharger3",
        "smattyBosses:shieldCharger4",
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
        // shifty
        "smattyBosses:moneyRoller1",
        "smattyBosses:moneyRoller2",
        "smattyBosses:moneyRoller3",
        "smattyBosses:moneyRoller4",
        "smattyBosses:speedRoller1",
        "smattyBosses:speedRoller2",
        "smattyBosses:speedRoller3",
        "smattyBosses:speedRoller4",
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
