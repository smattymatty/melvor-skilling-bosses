export async function init(ctx) {
  try {
    addBossCoins(ctx);
  } catch (error) {
    console.error("Error initializing boss coins:", error);
  }
}

function addBossCoins(ctx) {
  try {
    const coins = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "bossCoin",
        name: "Boss Coins",
        category: "Combat",
        type: "Item",
        media: "assets/items/currencies/boss-coin.svg",
        customDescription:
          "Used to purchase upgrades in the <span class='text-warning'>'Skilling Bosses'</span> shop tab.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 3,
      });
    });
    coins.add();
  } catch (error) {
    console.error("Error adding boss coins:", error);
  }
}
