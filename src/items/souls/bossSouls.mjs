export async function init(ctx) {
  try {
    addBossSouls(ctx);
  } catch (error) {
    console.error("Error initializing boss souls:", error);
  }
}

function addBossSouls(ctx) {
  try {
    const soul = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "genericSoul",
        name: "Generic Soul",
        category: "Souls",
        type: "Item",
        media: "assets/items/souls/generic-soul.svg",
        customDescription:
          "Used to purchase upgrades in the <span class='text-warning'>'Skilling Bosses'</span> shop tab.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 500,
      });
    });
    soul.add();
    const gathererSoul = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "gathererSoul",
        name: "Gatherer Soul",
        category: "Souls",
        type: "Item",
        media: "assets/items/souls/gatherer-soul.svg",
        customDescription:
          "Used to purchase upgrades in the <span class='text-warning'>'Skilling Bosses'</span> shop tab.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 1000,
      });
    });
    gathererSoul.add();
  } catch (error) {
    console.error("Error adding boss souls:", error);
  }
}
