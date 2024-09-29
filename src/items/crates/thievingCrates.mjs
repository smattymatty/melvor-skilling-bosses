export async function init(ctx) {
  try {
    addThievingCrates(ctx);
  } catch (error) {
    console.error("Error initializing thieving crates:", error);
  }
}

function addThievingCrates(ctx) {
  try {
    const golbinCrate = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Openable",
        id: "golbinCrate",
        name: "Golbin Crate",
        category: "Openable",
        type: "Chest",
        media: "assets/items/crates/golbinCrate.svg",
        customDescription:
          "A crate with the same loot of the 'Golbin Chief' thieving NPC.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 125,
        dropTable: [
          {
            itemID: "melvorD:Coal_Ore",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 10,
          },
          {
            itemID: "melvorD:Gold_Ore",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 8,
          },
          {
            itemID: "melvorD:Maple_Logs",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 7,
          },
          {
            itemID: "melvorD:Gold_Bar",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 7,
          },
          {
            itemID: "melvorD:Adamantite_Bar",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 6,
          },
          {
            itemID: "melvorD:Yew_Logs",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 8,
          },
          {
            itemID: "melvorF:Crate_Of_Basic_Supplies",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 5,
          },
        ],
      });
    });
    golbinCrate.add();

    const farmerCrate = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Openable",
        id: "farmerCrate",
        name: "Farmer Crate",
        category: "Openable",
        type: "Chest",
        media: "assets/items/crates/farmerCrate.svg",
        customDescription:
          "A crate with the same loot of 'Bob the Farmer', the thieving NPC.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 200,
        dropTable: [
          {
            itemID: "melvorD:Potato_Seed",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 12,
          },
          {
            itemID: "melvorD:Onion_Seed",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 11,
          },
          {
            itemID: "melvorF:Herb_Sack",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 10,
          },
          {
            itemID: "melvorD:Cabbage_Seed",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 10,
          },
          {
            itemID: "melvorD:Tomato_Seed",
            minQuantity: 1,
            maxQuantity: 3,
            weight: 9,
          },
          {
            itemID: "melvorD:Sweetcorn_Seed",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 8,
          },
          {
            itemID: "melvorD:Oak_Tree_Seed",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 8,
          },
          {
            itemID: "melvorD:Strawberry_Seed",
            minQuantity: 1,
            maxQuantity: 1,
            weight: 7,
          },
          {
            itemID: "melvorD:Cherry_Seeds",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 6,
          },
          {
            itemID: "melvorD:Willow_Tree_Seed",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 5,
          },
          {
            itemID: "melvorD:Watermelon_Seed",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 4,
          },
          {
            itemID: "melvorD:Snape_Grass_Seed",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 4,
          },
          {
            itemID: "melvorD:Carrot_Seeds",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 3,
          },
          {
            itemID: "melvorD:Maple_Tree_Seed",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 3,
          },
          {
            itemID: "melvorD:Yew_Tree_Seed",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 2,
          },
          {
            itemID: "melvorD:Magic_Tree_Seed",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 1,
          },
        ],
      });
    });
    farmerCrate.add();

    const cyclopsCrate = ctx.gameData.buildPackage((p) => {
      p.items.add({
        itemType: "Openable",
        id: "cyclopsCrate",
        name: "Cyclops Crate",
        category: "Openable",
        type: "Chest",
        media: "assets/items/crates/cyclopsCrate.svg",
        customDescription:
          "A crate with the same loot of the 'Cyclops' thieving NPC.",
        ignoreCompletion: false,
        obtainFromItemLog: false,
        goblinRaidExclusive: false,
        sellsFor: 255,
        dropTable: [
          {
            itemID: "melvorD:Maple_Logs",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 12,
          },
          {
            itemID: "melvorD:Adamantite_Bar",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 11,
          },
          {
            itemID: "melvorD:Adamantite_Ore",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 10,
          },
          {
            itemID: "melvorD:Runite_Bar",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 10,
          },
          {
            itemID: "melvorD:Magic_Logs",
            minQuantity: 1,
            maxQuantity: 3,
            weight: 9,
          },
          {
            itemID: "melvorD:Runite_Ore",
            minQuantity: 1,
            maxQuantity: 2,
            weight: 8,
          },
          {
            itemID: "melvorF:Giant_Club",
            minQuantity: 1,
            maxQuantity: 1,
            weight: 2,
          },
          {
            itemID: "melvorF:Eyeball",
            minQuantity: 100,
            maxQuantity: 100,
            weight: 4,
          },
          {
            itemID: "melvorF:Stack_Of_Bones",
            minQuantity: 1,
            maxQuantity: 1,
            weight: 3,
          },
        ],
      });
    });
    cyclopsCrate.add();
  } catch (error) {
    console.error("Error adding thieving crates:", error);
  }
}
