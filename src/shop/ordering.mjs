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
