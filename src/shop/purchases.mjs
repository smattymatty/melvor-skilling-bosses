export async function init(ctx) {
  try {
    addShopCategory(ctx);
    addGatheringPurchases(ctx);
  } catch (error) {
    console.error("Error initializing shop purchases:", error);
  }
}

function addShopCategory(ctx) {
  const skillingBossesGathering = ctx.gameData.buildPackage((p) => {
    p.shopCategories.add({
      id: "SkillingBossesGathering",
      name: "Skilling Bosses - Gathering",
      media: "assets/items/souls/gatherer-soul.svg",
    });
  });
  skillingBossesGathering.add();
}

function addGatheringPurchases(ctx) {
  try {
    const purchase1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "Wait_For_More_Content",
        media: "assets/items/souls/gatherer-soul.svg",
        category: "smattyBosses:SkillingBossesGathering",
        contains: {
          items: [],
          modifiers: {},
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 10000,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            {
              id: "melvorD:Mastery_Token_Woodcutting",
              quantity: 10,
            },
            {
              id: "smattyBosses:bossCoin",
              quantity: 1000,
            },
            { id: "smattyBosses:genericSoul", quantity: 10 },
            { id: "smattyBosses:gathererSoul", quantity: 10 },
            { id: "melvorD:Oak_Logs", quantity: 100 },
            { id: "melvorD:Willow_Logs", quantity: 100 },
          ],
          raidCoins: {
            type: "Fixed",
            cost: 0,
          },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Wait for More Content",
        customDescription: `Later, you will be able to purchase upgrades.`,
      });
    });
    purchase1.add();
  } catch (error) {
    console.error("Error adding gathering purchases:", error);
  }
}
