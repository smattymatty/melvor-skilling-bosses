export async function init(ctx) {
  try {
    addBossHearts(ctx);
  } catch (error) {
    console.error("Error initializing boss hearts:", error);
  }
}

function addBossHearts(ctx) {
  try {
    const forestHeart = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "forestHeart",
        name: "Forest Heart",
        category: "Hearts",
        type: "Item",
        media: "assets/items/hearts/forest-heart.svg",
        customDescription:
          "Used to purchase upgrades in the <span class='text-warning'>'Skilling Bosses'</span> shop tab.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 30000,
      });
    });
    forestHeart.add();

    const aquaticHeart = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "aquaticHeart",
        name: "Aquatic Heart",
        category: "Hearts",
        type: "Item",
        media: "assets/items/hearts/aquatic-heart.svg",
        customDescription:
          "Used to purchase upgrades in the <span class='text-warning'>'Skilling Bosses'</span> shop tab.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 30000,
      });
    });
    aquaticHeart.add();

    const stoneHeart = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "stoneHeart",
        name: "Stone Heart",
        category: "Hearts",
        type: "Item",
        media: "assets/items/hearts/stone-heart.svg",
        customDescription:
          "Used to purchase upgrades in the <span class='text-warning'>'Skilling Bosses'</span> shop tab.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 30000,
      });
    });
    stoneHeart.add();
  } catch (error) {
    console.error("Error adding boss hearts:", error);
  }
}
