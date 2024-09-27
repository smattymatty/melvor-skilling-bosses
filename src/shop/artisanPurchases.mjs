const { loadModule } = mod.getContext(import.meta);

const itemImagesHelper = await loadModule("src/helpers/itemImages.mjs");

export async function init(ctx) {
  try {
    addShopCategory(ctx);
    addArrowRollerPurchases(ctx);
    addIngotRollerPurchases(ctx);
    addLeatherRollerPurchases(ctx);
  } catch (error) {
    console.error("Error initializing artisan purchases:", error);
  }
}

function addShopCategory(ctx) {
  const skillingBossesGeneric = ctx.gameData.buildPackage((p) => {
    p.shopCategories.add({
      id: "SkillingBossesArtisan",
      name: "Artisan",
      media: "assets/items/souls/artisan-soul.svg",
    });
  });
  skillingBossesGeneric.add();
}
function addIngotRollerPurchases(ctx) {
  function generateDescription(nextTierChance, currentChance) {
    return `
        <div class="upgrade-card" data-upgrade="ingotRoller1">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Smithing Ability deals damage:</h4>
            <p class="effect-description">${nextTierChance}% chance to deal half your shield as damage.</p>
            <p class="current-upgrade-level-text">Or 5 damage, whichever is higher.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: ${currentChance} % chance</p>
          </div>
        </div>
      `;
  }
  try {
    const ingotRoller1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "ingotRoller1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/smithing/smithing.png",
        category: "smattyBosses:SkillingBossesArtisan",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:ingotRoller": 5,
          },
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 0,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorD:Mastery_Token_Smithing", quantity: 10 },
            { id: "smattyBosses:bossCoin", quantity: 1000 },
            { id: "smattyBosses:genericSoul", quantity: 10 },
            { id: "smattyBosses:artisanSoul", quantity: 10 },
            { id: "melvorD:Steel_Bar", quantity: 100 },
            { id: "melvorD:Silver_Bar", quantity: 100 },
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
        customName: "Ingot Roller I",
        customDescription: generateDescription(5, 0),
      });
    });
    ingotRoller1.add();

    const ingotRoller2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "ingotRoller2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/smithing/smithing.png",
        category: "smattyBosses:SkillingBossesArtisan",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:ingotRoller_2": 5,
          },
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 0,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorD:Mastery_Token_Smithing", quantity: 20 },
            { id: "smattyBosses:bossCoin", quantity: 3000 },
            { id: "smattyBosses:genericSoul", quantity: 20 },
            { id: "smattyBosses:artisanSoul", quantity: 30 },
            { id: "melvorD:Mithril_Bar", quantity: 250 },
            { id: "melvorD:Gold_Bar", quantity: 250 },
          ],
          raidCoins: {
            type: "Fixed",
            cost: 0,
          },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:ingotRoller1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Ingot Roller II",
        customDescription: generateDescription(10, 5),
      });
    });
    ingotRoller2.add();

    const ingotRoller3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "ingotRoller3",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/smithing/smithing.png",
        category: "smattyBosses:SkillingBossesArtisan",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:ingotRoller_3": 5,
          },
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 0,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorD:Mastery_Token_Smithing", quantity: 40 },
            { id: "smattyBosses:bossCoin", quantity: 9000 },
            { id: "smattyBosses:genericSoul", quantity: 40 },
            { id: "smattyBosses:artisanSoul", quantity: 80 },
            { id: "melvorD:Adamantite_Bar", quantity: 400 },
            { id: "melvorD:Runite_Bar", quantity: 400 },
          ],
          raidCoins: {
            type: "Fixed",
            cost: 0,
          },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:ingotRoller2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Ingot Roller III",
        customDescription: generateDescription(15, 10),
      });
    });
    ingotRoller3.add();

    const ingotRoller4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "ingotRoller4",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/smithing/smithing.png",
        category: "smattyBosses:SkillingBossesArtisan",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:ingotRoller_4": 5,
          },
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 0,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [{ id: "smattyBosses:impossibleItem", quantity: 1 }],
          raidCoins: {
            type: "Fixed",
            cost: 0,
          },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:ingotRoller3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Ingot Roller IV",
        customDescription: generateDescription(20, 15),
      });
    });
    ingotRoller4.add();
  } catch (error) {
    console.error("Error adding artisan purchases:", error);
  }
}

function addLeatherRollerPurchases(ctx) {
  const leatherRollerImage =
    "https://cdn2-main.melvor.net/assets/media/skills/crafting/crafting.png";
  function generateDescription(nextTierChance, currentChance) {
    return `
        <div class="upgrade-card" data-upgrade="leatherRoller1">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Crafting Ability deals damage:</h4>
            <p class="effect-description">${nextTierChance}% chance to deal half your shield as damage.</p>
            <p class="current-upgrade-level-text">Or 5 damage, whichever is higher.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: ${currentChance} % chance</p>
          </div>
        </div>
      `;
  }
  try {
    const leatherRoller1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "leatherRoller1",
        media: leatherRollerImage,
        category: "smattyBosses:SkillingBossesArtisan",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:leatherRoller": 5,
          },
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 0,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorF:Mastery_Token_Crafting", quantity: 10 },
            { id: "smattyBosses:bossCoin", quantity: 1000 },
            { id: "smattyBosses:genericSoul", quantity: 10 },
            { id: "smattyBosses:artisanSoul", quantity: 10 },
            { id: "melvorD:Leather", quantity: 100 },
            { id: "melvorD:Sapphire", quantity: 25 },
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
        customName: "Leather Roller I",
        customDescription: generateDescription(5, 0),
      });
    });
    leatherRoller1.add();

    const leatherRoller2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "leatherRoller2",
        media: leatherRollerImage,
        category: "smattyBosses:SkillingBossesArtisan",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:leatherRoller_2": 5,
          },
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 0,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorF:Mastery_Token_Crafting", quantity: 20 },
            { id: "smattyBosses:bossCoin", quantity: 3000 },
            { id: "smattyBosses:genericSoul", quantity: 20 },
            { id: "smattyBosses:artisanSoul", quantity: 30 },
            { id: "melvorD:Green_Dragonhide", quantity: 250 },
            { id: "melvorD:Ruby", quantity: 50 },
          ],
          raidCoins: {
            type: "Fixed",
            cost: 0,
          },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:leatherRoller1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Leather Roller II",
        customDescription: generateDescription(10, 5),
      });
    });
    leatherRoller2.add();

    const leatherRoller3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "leatherRoller3",
        media: leatherRollerImage,
        category: "smattyBosses:SkillingBossesArtisan",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:leatherRoller_3": 5,
          },
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 0,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorF:Mastery_Token_Crafting", quantity: 40 },
            { id: "smattyBosses:bossCoin", quantity: 9000 },
            { id: "smattyBosses:genericSoul", quantity: 40 },
            { id: "smattyBosses:artisanSoul", quantity: 80 },
            { id: "melvorD:Blue_Dragonhide", quantity: 400 },
            { id: "melvorD:Red_Dragonhide", quantity: 400 },
          ],
          raidCoins: {
            type: "Fixed",
            cost: 0,
          },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:leatherRoller2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Leather Roller III",
        customDescription: generateDescription(15, 10),
      });
    });
    leatherRoller3.add();

    const leatherRoller4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "leatherRoller4",
        media: leatherRollerImage,
        category: "smattyBosses:SkillingBossesArtisan",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:leatherRoller_4": 5,
          },
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 0,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [{ id: "smattyBosses:impossibleItem", quantity: 1 }],
          raidCoins: {
            type: "Fixed",
            cost: 0,
          },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:leatherRoller3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Leather Roller IV",
        customDescription: generateDescription(20, 15),
      });
    });
    leatherRoller4.add();
  } catch (error) {
    console.error("Error adding artisan purchases:", error);
  }
}

function addArrowRollerPurchases(ctx) {
  function generateDescription(nextTierChance, currentChance) {
    return `
        <div class="upgrade-card" data-upgrade="arrowRoller1">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Fletching Ability deals damage:</h4>
            <p class="effect-description">${nextTierChance}% chance to apply a Stuck Arrow to the target for 6 ticks.</p>
            <p class="current-upgrade-level-text">Stuck Arrows deal 10% of the initial damage dealt on expiration.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: ${currentChance} % chance</p>
          </div>
        </div>
      `;
  }
  try {
    const arrowRoller1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "arrowRoller1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/fletching/fletching.png",
        category: "smattyBosses:SkillingBossesArtisan",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:arrowRoller": 5,
          },
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 0,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorF:Mastery_Token_Fletching", quantity: 10 },
            { id: "smattyBosses:bossCoin", quantity: 1000 },
            { id: "smattyBosses:genericSoul", quantity: 10 },
            { id: "smattyBosses:artisanSoul", quantity: 10 },
            { id: "melvorD:Headless_Arrows", quantity: 250 },
            { id: "melvorD:Headless_Bolts", quantity: 250 },
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
        customName: "Arrow Roller I",
        customDescription: generateDescription(5, 0),
      });
    });
    arrowRoller1.add();

    const arrowRoller2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "arrowRoller2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/fletching/fletching.png",
        category: "smattyBosses:SkillingBossesArtisan",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:arrowRoller_2": 5,
          },
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 0,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorF:Mastery_Token_Fletching", quantity: 20 },
            { id: "smattyBosses:bossCoin", quantity: 3000 },
            { id: "smattyBosses:genericSoul", quantity: 20 },
            { id: "smattyBosses:artisanSoul", quantity: 30 },
            { id: "melvorF:Maple_Longbow_U", quantity: 250 },
            { id: "melvorD:Maple_Longbow", quantity: 250 },
          ],
          raidCoins: {
            type: "Fixed",
            cost: 0,
          },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:arrowRoller1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Arrow Roller II",
        customDescription: generateDescription(10, 5),
      });
    });
    arrowRoller2.add();

    const arrowRoller3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "arrowRoller3",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/fletching/fletching.png",
        category: "smattyBosses:SkillingBossesArtisan",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:arrowRoller_3": 5,
          },
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 0,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorF:Mastery_Token_Fletching", quantity: 40 },
            { id: "smattyBosses:bossCoin", quantity: 9000 },
            { id: "smattyBosses:genericSoul", quantity: 40 },
            { id: "smattyBosses:artisanSoul", quantity: 80 },
            { id: "melvorF:Magic_Longbow_U", quantity: 500 },
            { id: "melvorD:Rune_Crossbow_Head", quantity: 500 },
          ],
          raidCoins: {
            type: "Fixed",
            cost: 0,
          },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:arrowRoller2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Arrow Roller III",
        customDescription: generateDescription(15, 10),
      });
    });
    arrowRoller3.add();

    const arrowRoller4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "arrowRoller4",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/fletching/fletching.png",
        category: "smattyBosses:SkillingBossesArtisan",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:arrowRoller_4": 5,
          },
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 0,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [{ id: "smattyBosses:impossibleItem", quantity: 1 }],
          raidCoins: {
            type: "Fixed",
            cost: 0,
          },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:arrowRoller3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Arrow Roller IV",
        customDescription: generateDescription(20, 15),
      });
    });
    arrowRoller4.add();
  } catch (error) {
    console.error("Error adding artisan purchases:", error);
  }
}
