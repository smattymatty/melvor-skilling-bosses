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
    const chefHeart = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "chefHeart",
        name: "Chef Heart",
        category: "Hearts",
        type: "Item",
        media: "assets/items/hearts/chef-heart.svg",
        customDescription:
          "Used to purchase upgrades in the <span class='text-warning'>'Skilling Bosses'</span> shop tab.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 30000,
      });
    });
    chefHeart.add();
    const plagueHeart = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "plagueHeart",
        name: "Plague Heart",
        category: "Hearts",
        type: "Item",
        media: "assets/items/hearts/plague-heart.svg",
        customDescription:
          "Used to purchase upgrades in the <span class='text-warning'>'Skilling Bosses'</span> shop tab.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 30000,
      });
    });
    plagueHeart.add();
    const blazingHeart = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "blazingHeart",
        name: "Blazing Heart",
        category: "Hearts",
        type: "Item",
        media: "assets/items/hearts/blazing-heart.svg",
        customDescription:
          "Used to purchase upgrades in the <span class='text-warning'>'Skilling Bosses'</span> shop tab.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 30000,
      });
    });
    blazingHeart.add();
    const leatherHeart = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "leatherHeart",
        name: "Leather Heart",
        category: "Hearts",
        type: "Item",
        media: "assets/items/hearts/leather-heart.svg",
        customDescription:
          "Used to purchase upgrades in the <span class='text-warning'>'Skilling Bosses'</span> shop tab.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 30000,
      });
    });
    leatherHeart.add();
    const arrowHeart = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "arrowHeart",
        name: "Arrow Heart",
        category: "Hearts",
        type: "Item",
        media: "assets/items/hearts/arrow-heart.svg",
        customDescription:
          "Used to purchase upgrades in the <span class='text-warning'>'Skilling Bosses'</span> shop tab.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 30000,
      });
    });
    arrowHeart.add();
    const forgeHeart = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "forgeHeart",
        name: "Forge Heart",
        category: "Hearts",
        type: "Item",
        media: "assets/items/hearts/forge-heart.svg",
        customDescription:
          "Used to purchase upgrades in the <span class='text-warning'>'Skilling Bosses'</span> shop tab.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 30000,
      });
    });
    forgeHeart.add();
    const celestialHeart = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "celestialHeart",
        name: "Celestial Heart",
        category: "Hearts",
        type: "Item",
        media: "assets/items/hearts/celestial-heart.svg",
        customDescription:
          "Used to purchase upgrades in the <span class='text-warning'>'Skilling Bosses'</span> shop tab.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 30000,
      });
    });
    celestialHeart.add();
    const ancientHeart = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "ancientHeart",
        name: "Ancient Heart",
        category: "Hearts",
        type: "Item",
        media: "assets/items/hearts/ancient-heart.svg",
        customDescription:
          "Used to purchase upgrades in the <span class='text-warning'>'Skilling Bosses'</span> shop tab.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 30000,
      });
    });
    ancientHeart.add();
    const runicHeart = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "runicHeart",
        name: "Runic Heart",
        category: "Hearts",
        type: "Item",
        media: "assets/items/hearts/runic-heart.svg",
        customDescription:
          "Used to purchase upgrades in the <span class='text-warning'>'Skilling Bosses'</span> shop tab.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 30000,
      });
    });
    runicHeart.add();
    const ninjaHeart = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "ninjaHeart",
        name: "Ninja Heart",
        category: "Hearts",
        type: "Item",
        media: "assets/items/hearts/ninja-heart.svg",
        customDescription:
          "Used to purchase upgrades in the <span class='text-warning'>'Skilling Bosses'</span> shop tab.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 30000,
      });
    });
    ninjaHeart.add();
    const shadowHeart = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Item",
        id: "shadowHeart",
        name: "Shadow Heart",
        category: "Hearts",
        type: "Item",
        media: "assets/items/hearts/shadow-heart.svg",
        customDescription:
          "Used to purchase upgrades in the <span class='text-warning'>'Skilling Bosses'</span> shop tab.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 30000,
      });
    });
    shadowHeart.add();
  } catch (error) {
    console.error("Error adding boss hearts:", error);
  }
}
