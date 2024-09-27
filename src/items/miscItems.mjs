export async function init(ctx) {
  try {
    addImpossibleItem(ctx);
    addSkillingSupplies(ctx);
  } catch (error) {
    console.error("Error initializing misc items:", error);
  }
}

function addImpossibleItem(ctx) {
  try {
    const impossibleItem = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "impossibleItem",
        name: "This skill is impossible to obtain ... For now.",
        category: "Misc",
        type: "Item",
        media: "https://www.svgrepo.com/show/177780/padlock-lock.svg",
        customDescription: "You will never find this item.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 1000,
      });
    });
    impossibleItem.add();
  } catch (error) {
    console.error("Error adding impossible item:", error);
  }
}

function addSkillingSupplies(ctx) {
  try {
    const skillingSupplies = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "skillingSupplies",
        name: "Skilling Supplies",
        category: "Misc",
        type: "Item",
        media: "assets/items/skilling-supplies.svg",
        customDescription:
          "Supplies for the <span class='text-warning'>'Skilling Bosses'</span> mod.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 50,
      });
    });
    skillingSupplies.add();
  } catch (error) {
    console.error("Error adding skilling supplies:", error);
  }
}
