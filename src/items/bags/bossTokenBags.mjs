export async function init(ctx) {
  try {
    addTier1GathererBag(ctx);
    addTier2GathererBag(ctx);
    addTier1RefinerBag(ctx);
    addTier2RefinerBag(ctx);
    addTier1ArtisanBag(ctx);
    addTier2ArtisanBag(ctx);
    addTier1MysticBag(ctx);
    addTier2MysticBag(ctx);
    addTier1ShiftyBag(ctx);
    addTier2ShiftyBag(ctx);
  } catch (error) {
    console.error("Error initializing boss token bags:", error);
  }
}

function addTier1GathererBag(ctx) {
  try {
    const bag = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Openable",
        id: "tier1GathererBag",
        name: "Tier 1 Gathering Mastery Bag",
        category: "Openable",
        type: "Chest",
        media: "assets/items/bags/tier1-gatherer-bag.svg",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 6000,
        dropTable: [
          {
            itemID: "melvorD:Mastery_Token_Woodcutting",
            minQuantity: 2,
            maxQuantity: 6,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Fishing",
            minQuantity: 2,
            maxQuantity: 2,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Mining",
            minQuantity: 2,
            maxQuantity: 6,
            weight: 4,
          },
        ],
      });
    });
    bag.add();
  } catch (error) {
    console.error("Error adding tier 1 gatherer bag:", error);
  }
}

function addTier1RefinerBag(ctx) {
  try {
    const bag = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Openable",
        id: "tier1RefinerBag",
        name: "Tier 1 Refining Mastery Bag",
        category: "Openable",
        type: "Chest",
        media: "assets/items/bags/tier1-refiner-bag.svg",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 6000,
        dropTable: [
          {
            itemID: "melvorD:Mastery_Token_Cooking",
            minQuantity: 2,
            maxQuantity: 6,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Firemaking",
            minQuantity: 2,
            maxQuantity: 6,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Herblore",
            minQuantity: 2,
            maxQuantity: 6,
            weight: 4,
          },
        ],
      });
    });
    bag.add();
  } catch (error) {
    console.error("Error adding tier 1 refiner bag:", error);
  }
}

function addTier1ArtisanBag(ctx) {
  try {
    const bag = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Openable",
        id: "tier1ArtisanBag",
        name: "Tier 1 Artisan Mastery Bag",
        category: "Openable",
        type: "Chest",
        media: "assets/items/bags/tier1-artisan-bag.svg",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 6000,
        dropTable: [
          {
            itemID: "melvorF:Mastery_Token_Crafting",
            minQuantity: 2,
            maxQuantity: 6,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Fletching",
            minQuantity: 2,
            maxQuantity: 6,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Smithing",
            minQuantity: 2,
            maxQuantity: 6,
            weight: 4,
          },
        ],
      });
    });
    bag.add();
  } catch (error) {
    console.error("Error adding tier 1 artisan bag:", error);
  }
}

function addTier1MysticBag(ctx) {
  try {
    const bag = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Openable",
        id: "tier1MysticBag",
        name: "Tier 1 Mystic Mastery Bag",
        category: "Openable",
        type: "Chest",
        media: "assets/items/bags/tier1-mystic-bag.svg",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 6000,
        dropTable: [
          {
            itemID: "melvorF:Mastery_Token_Runecrafting",
            minQuantity: 2,
            maxQuantity: 6,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Astrology",
            minQuantity: 2,
            maxQuantity: 6,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Summoning",
            minQuantity: 2,
            maxQuantity: 6,
            weight: 4,
          },
        ],
      });
    });
    bag.add();
  } catch (error) {
    console.error("Error adding tier 1 mystic bag:", error);
  }
}

function addTier1ShiftyBag(ctx) {
  try {
    const bag = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Openable",
        id: "tier1ShiftyBag",
        name: "Tier 1 Shifty Mastery Bag",
        category: "Openable",
        type: "Chest",
        media: "assets/items/bags/tier1-shifty-bag.svg",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 6000,
        dropTable: [
          {
            itemID: "melvorF:Mastery_Token_Agility",
            minQuantity: 2,
            maxQuantity: 6,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Thieving",
            minQuantity: 2,
            maxQuantity: 6,
            weight: 4,
          },
        ],
      });
    });
    bag.add();
  } catch (error) {
    console.error("Error adding tier 1 shifty bag:", error);
  }
}

function addTier2GathererBag(ctx) {
  try {
    const bag = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Openable",
        id: "tier2GathererBag",
        name: "Tier 2 Gathering Mastery Bag",
        category: "Openable",
        type: "Chest",
        media: "assets/items/bags/tier1-gatherer-bag.svg",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 10000,
        dropTable: [
          {
            itemID: "melvorD:Mastery_Token_Woodcutting",
            minQuantity: 6,
            maxQuantity: 12,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Fishing",
            minQuantity: 6,
            maxQuantity: 12,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Mining",
            minQuantity: 6,
            maxQuantity: 12,
            weight: 4,
          },
        ],
      });
    });
    bag.add();
  } catch (error) {
    console.error("Error adding tier 2 gatherer bag:", error);
  }
}

function addTier2RefinerBag(ctx) {
  try {
    const bag = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Openable",
        id: "tier2RefinerBag",
        name: "Tier 2 Refining Mastery Bag",
        category: "Openable",
        type: "Chest",
        media: "assets/items/bags/tier1-refiner-bag.svg",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 10000,
        dropTable: [
          {
            itemID: "melvorD:Mastery_Token_Cooking",
            minQuantity: 6,
            maxQuantity: 12,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Firemaking",
            minQuantity: 6,
            maxQuantity: 12,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Herblore",
            minQuantity: 6,
            maxQuantity: 12,
            weight: 4,
          },
        ],
      });
    });
    bag.add();
  } catch (error) {
    console.error("Error adding tier 2 refiner bag:", error);
  }
}

function addTier2ArtisanBag(ctx) {
  try {
    const bag = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Openable",
        id: "tier2ArtisanBag",
        name: "Tier 2 Artisan Mastery Bag",
        category: "Openable",
        type: "Chest",
        media: "assets/items/bags/tier1-artisan-bag.svg",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 10000,
        dropTable: [
          {
            itemID: "melvorF:Mastery_Token_Crafting",
            minQuantity: 6,
            maxQuantity: 12,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Fletching",
            minQuantity: 6,
            maxQuantity: 12,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Smithing",
            minQuantity: 6,
            maxQuantity: 12,
            weight: 4,
          },
        ],
      });
    });
    bag.add();
  } catch (error) {
    console.error("Error adding tier 2 artisan bag:", error);
  }
}

function addTier2MysticBag(ctx) {
  try {
    const bag = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Openable",
        id: "tier2MysticBag",
        name: "Tier 2 Mystic Mastery Bag",
        category: "Openable",
        type: "Chest",
        media: "assets/items/bags/tier1-mystic-bag.svg",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 10000,
        dropTable: [
          {
            itemID: "melvorF:Mastery_Token_Runecrafting",
            minQuantity: 6,
            maxQuantity: 12,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Astrology",
            minQuantity: 6,
            maxQuantity: 12,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Summoning",
            minQuantity: 6,
            maxQuantity: 12,
            weight: 4,
          },
        ],
      });
    });
    bag.add();
  } catch (error) {
    console.error("Error adding tier 2 mystic bag:", error);
  }
}

function addTier2ShiftyBag(ctx) {
  try {
    const bag = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Openable",
        id: "tier2ShiftyBag",
        name: "Tier 2 Shifty Mastery Bag",
        category: "Openable",
        type: "Chest",
        media: "assets/items/bags/tier1-shifty-bag.svg",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 10000,
        dropTable: [
          {
            itemID: "melvorF:Mastery_Token_Thieving",
            minQuantity: 6,
            maxQuantity: 12,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Agility",
            minQuantity: 6,
            maxQuantity: 12,
            weight: 4,
          },
        ],
      });
    });
    bag.add();
  } catch (error) {
    console.error("Error adding tier 2 shifty bag:", error);
  }
}
