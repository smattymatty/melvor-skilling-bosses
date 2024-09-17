export async function init(ctx) {
  try {
    addShopDisplayOrder(ctx);
    addShopCategoryOrder(ctx);
  } catch (error) {
    console.error("Error initializing shop ordering:", error);
  }
}

function addShopDisplayOrder(ctx) {
  const shopPurchases = ctx.gameData.buildPackage((p) => {
    p.shopDisplayOrder.add({
      insertAt: "End",
      ids: ["smattyBosses:Wait_For_More_Content"],
    });
  });
  shopPurchases.add();
}

function addShopCategoryOrder(ctx) {
  const shopCategory = ctx.gameData.buildPackage((p) => {
    p.shopCategoryOrder.add({
      insertAt: "After",
      afterID: "melvorF:Township",
      ids: ["smattyBosses:SkillingBossesGathering"],
    });
  });
  shopCategory.add();
}
