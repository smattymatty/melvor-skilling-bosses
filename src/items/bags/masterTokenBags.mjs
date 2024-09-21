export async function init(ctx) {
  try {
    addMasteryTokenBags(ctx);
  } catch (error) {
    console.error("Error initializing mastery token bags:", error);
  }
}

function addMasteryTokenBags(ctx) {
  try {
    addTier1MasteryBag(ctx);
    addTier2MasteryBag(ctx);
  } catch (error) {
    console.error("Error adding mastery token bags:", error);
  }
}

function addTier1MasteryBag(ctx) {
  try {
    const bag = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Openable",
        id: "tier1MasteryBag",
        name: "Tier 1 Mastery Bag",
        category: "Openable",
        type: "Chest",
        media: "assets/items/bags/tier1-mastery-bag.svg",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 3000,
        dropTable: [
          {
            itemID: "melvorD:Mastery_Token_Woodcutting",
            minQuantity: 1,
            maxQuantity: 3,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Fishing",
            minQuantity: 1,
            maxQuantity: 3,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Mining",
            minQuantity: 1,
            maxQuantity: 3,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Firemaking",
            minQuantity: 1,
            maxQuantity: 3,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Smithing",
            minQuantity: 1,
            maxQuantity: 3,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Crafting",
            minQuantity: 1,
            maxQuantity: 3,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Runecrafting",
            minQuantity: 1,
            maxQuantity: 3,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Fletching",
            minQuantity: 1,
            maxQuantity: 3,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Agility",
            minQuantity: 1,
            maxQuantity: 3,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Herblore",
            minQuantity: 1,
            maxQuantity: 3,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Cooking",
            minQuantity: 1,
            maxQuantity: 3,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Thieving",
            minQuantity: 1,
            maxQuantity: 3,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Summoning",
            minQuantity: 1,
            maxQuantity: 3,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Astrology",
            minQuantity: 1,
            maxQuantity: 3,
            weight: 4,
          },
        ],
      });
    });
    bag.add();
  } catch (error) {
    console.error("Error adding tier 1 mastery bag:", error);
  }
}

function addTier2MasteryBag(ctx) {
  try {
    const bag = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Openable",
        id: "tier2MasteryBag",
        name: "Tier 2 Mastery Bag",
        category: "Openable",
        type: "Chest",
        media: "assets/items/bags/tier2-mastery-bag.svg",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 9000,
        dropTable: [
          {
            itemID: "melvorD:Mastery_Token_Woodcutting",
            minQuantity: 3,
            maxQuantity: 8,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Fishing",
            minQuantity: 3,
            maxQuantity: 8,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Mining",
            minQuantity: 3,
            maxQuantity: 8,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Firemaking",
            minQuantity: 3,
            maxQuantity: 8,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Smithing",
            minQuantity: 3,
            maxQuantity: 8,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Crafting",
            minQuantity: 3,
            maxQuantity: 8,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Runecrafting",
            minQuantity: 3,
            maxQuantity: 8,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Fletching",
            minQuantity: 3,
            maxQuantity: 8,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Agility",
            minQuantity: 3,
            maxQuantity: 8,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Herblore",
            minQuantity: 3,
            maxQuantity: 8,
            weight: 4,
          },
          {
            itemID: "melvorD:Mastery_Token_Cooking",
            minQuantity: 3,
            maxQuantity: 8,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Thieving",
            minQuantity: 3,
            maxQuantity: 8,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Summoning",
            minQuantity: 3,
            maxQuantity: 8,
            weight: 4,
          },
          {
            itemID: "melvorF:Mastery_Token_Astrology",
            minQuantity: 3,
            maxQuantity: 8,
            weight: 4,
          },
        ],
      });
    });
    bag.add();
  } catch (error) {
    console.error("Error adding tier 2 mastery bag:", error);
  }
}
