const { loadModule } = mod.getContext(import.meta);

const activationFuncs = await loadModule("src/abilities/activationFuncs.mjs");

export async function init(ctx) {
  try {
    addShopCategory(ctx);
    addBuildingPurchases(ctx);
    addSkillingSuppliesPurchases(ctx);
    addEnhanceCorePurchases(ctx);
    addHardenCorePurchases(ctx);
    // patch to update offline ticks
    ctx.patch(Shop, "onLoad").after(function () {
      updateUIForShopOfflineTicks(ctx);
    });
  } catch (error) {
    console.error("Error initializing buildings purchases:", error);
  }
}

function addShopCategory(ctx) {
  const skillingBossesGeneric = ctx.gameData.buildPackage((p) => {
    p.shopCategories.add({
      id: "SkillingBossesBuildings",
      name: "Skilling Bosses",
      media: "https://www.svgrepo.com/show/200452/skull.svg",
    });
  });
  skillingBossesGeneric.add();
}

function addBuildingPurchases(ctx) {
  try {
    addInnPurchases(ctx);
    addRepairShopPurchases(ctx);
    addShieldSmithPurchases(ctx);
    addShieldRegenPurchases(ctx);
  } catch (error) {
    console.error("Error adding building purchases:", error);
  }
}

function addInnPurchases(ctx) {
  try {
    const offlineTickInfo = `
    <p class="current-upgrade-level-text">
    While offline,  <span class="text-danger">not all</span> of Skilling Bosses ticks are fully processesed.
    </p>
    <p class="current-upgrade-level-text">
    The ticks that are discarded get thrown into the <span class="text-success">'offline ticks'</span> pool.
    </p>
    `;

    const innBuilding1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "inn",
        media: "https://www.svgrepo.com/show/435145/sleep.svg",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 10000,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorD:Oak_Logs", quantity: 100 },
            { id: "melvorD:Iron_Ore", quantity: 100 },
            { id: "melvorD:Raw_Herring", quantity: 100 },
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
        customName: "Build an Inn",
        customDescription: `
            <div class="upgrade-card" data-upgrade="inn">
              <div class="upgrade-effect">
                <h4 class="effect-title">You need a place to rest.</h4>
                <p class="effect-description">Fighting all those bosses can be tiring.</p>
                ${offlineTickInfo}
                 <div id="shop-offline-ticks"></div>
                </div>
            </div>
            `,
      });
    });
    innBuilding1.add();
    const innBuilding2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "inn2",
        media: "https://www.svgrepo.com/show/435145/sleep.svg",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
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
            { id: "smattyBosses:bossCoin", quantity: 3000 },
            { id: "melvorD:Maple_Logs", quantity: 200 },
            { id: "melvorD:Gold_Ore", quantity: 200 },
            { id: "melvorD:Raw_Lobster", quantity: 200 },
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
            purchaseID: "smattyBosses:inn",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Inn Tier 2",
        customDescription: `
            <div class="upgrade-card" data-upgrade="inn">
              <div class="upgrade-effect">
                <h4 class="effect-title">Upgrade the Inn</h4>
                <p class="effect-description">Your rest can be better.</p>
        ${offlineTickInfo}
                <div id="shop-offline-ticks"></div>
                </div>
            </div>
          `,
      });
    });
    innBuilding2.add();
    const innBuilding3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "inn3",
        media: "https://www.svgrepo.com/show/435145/sleep.svg",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
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
            //{ id: "smattyBosses:bossCoin", quantity: 9000 },
            //{ id: "melvorD:Magic_Logs", quantity: 300 },
            //{ id: "melvorD:Adamantite_Ore", quantity: 300 },
            //{ id: "melvorD:Raw_Crab", quantity: 300 },
            { id: "smattyBosses:impossibleItem", quantity: 1 },
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
            purchaseID: "smattyBosses:inn2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Inn Tier 3",
        customDescription: `
            <div class="upgrade-card" data-upgrade="inn">
              <div class="upgrade-effect">
                <h4 class="effect-title"The Inn is Perfect!</h4>
                <p class="effect-description">It can't get any better.</p>
${offlineTickInfo}
                <div id="shop-offline-ticks"></div>
                </div>
            </div>
          `,
      });
    });
    innBuilding3.add();
    const innBuilding4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "inn4",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/defence.png",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
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
            purchaseID: "smattyBosses:inn3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Inn Tier 2",
        customDescription: `
            <div class="upgrade-card" data-upgrade="inn">
              <div class="upgrade-effect">
                <h4 class="effect-title">Your Inn is Perfect!</h4>
                <p class="effect-description">It can't get any better.</p>
                ${offlineTickInfo}
                <div id="shop-offline-ticks"></div>
              </div>
            </div>
          `,
      });
    });
    innBuilding4.add();
    addGoodNightsRestPurchases(ctx);
    addWellFedPurchases(ctx);
  } catch (error) {
    console.error("Error adding inn purchases:", error);
  }
}

async function addGoodNightsRestPurchases(ctx) {
  try {
    const goodNightsRest1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "goodNightsRest1",
        media: "https://www.svgrepo.com/show/395870/bed.svg",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
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
          items: [{ id: "smattyBosses:bossCoin", quantity: 3000 }],
          raidCoins: {
            type: "Fixed",
            cost: 0,
          },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:inn",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 0,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Good Night's Rest",
        customDescription: `<br></br><div>
        <div id="shop-offline-ticks"></div>
              Gain 60 offline ticks to count towards the <span class="text-success">'Well Rested'</span> bonus.
              </div>
              <br></br>
              <span class="text-warning">This is an alternative to going offline. Do not waste your coins on this early.</span>
            `,
      });
    });
    goodNightsRest1.add();
    const goodNightsRest2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "goodNightsRest2",
        media: "https://www.svgrepo.com/show/395870/bed.svg",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
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
          items: [{ id: "smattyBosses:bossCoin", quantity: 9000 }],
          raidCoins: {
            type: "Fixed",
            cost: 0,
          },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:inn2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 0,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Great Night's Rest",
        customDescription: `<br></br>
        <div>
              Gain 200 offline ticks to count towards the <span class="text-success">'Well Rested'</span> bonus.
              </div>
              <br></br>
              <span class="text-warning">This is an alternative to going offline. Do not waste your coins on this early.</span>
            `,
      });
    });
    goodNightsRest2.add();
    // patch good nights rest purchase to add offline ticks
    ctx.patch(Shop, "buyItemOnClick").after(function (x, purchase, confirmed) {
      if (purchase.id === "smattyBosses:goodNightsRest1") {
        if (confirmed) {
          game.skillingBosses.discardedTicks += 60;
          ctx.characterStorage.setItem(
            "Dst",
            game.skillingBosses.discardedTicks
          );
        }
      } else if (purchase.id === "smattyBosses:goodNightsRest2") {
        if (confirmed) {
          game.skillingBosses.discardedTicks += 200;
          ctx.characterStorage.setItem(
            "Dst",
            game.skillingBosses.discardedTicks
          );
        }
      }
      activationFuncs.updateModifierCache(this.game);
      updateUIForShopOfflineTicks(ctx);
    });
  } catch (error) {
    console.error("Error adding good nights rest purchases:", error);
  }
}

function addWellFedPurchases(ctx) {
  try {
    const wellFed1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "wellFed1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/cooking/cooking.png",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:wellFed": 1,
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
            { id: "melvorD:Mastery_Token_Cooking", quantity: 20 },
            { id: "smattyBosses:bossCoin", quantity: 5000 },
            { id: "melvorD:Cherry_Cupcake", quantity: 250 },
            { id: "melvorD:Swordfish", quantity: 250 },
            { id: "smattyBosses:chefHeart", quantity: 1 },
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
            purchaseID: "smattyBosses:inn",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Well Fed",
        customDescription: `
            +1 skill-tick gained and consumed from offline ticks while <span class="text-success">Well Rested</span>.
            `,
      });
    });
    wellFed1.add();
    const wellFed2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "wellFed2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/cooking/cooking.png",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:wellFed_2": 1,
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
            { id: "melvorD:Mastery_Token_Cooking", quantity: 40 },
            { id: "smattyBosses:bossCoin", quantity: 10000 },
            { id: "melvorF:Apple_Pie", quantity: 500 },
            { id: "melvorD:Manta_Ray", quantity: 500 },
            { id: "smattyBosses:chefHeart", quantity: 3 },
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
            purchaseID: "smattyBosses:inn2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Really Well Fed",
        customDescription: `<br></br>
        <div>
              Gain 200 offline ticks to count towards the <span class="text-success">'Well Rested'</span> bonus.
\              </div>
            `,
      });
    });
    wellFed2.add();
  } catch (error) {
    console.error("Error adding well fed purchases:", error);
  }
}

export function updateUIForShopOfflineTicks() {
  const offlineElement = document.getElementById("shop-offline-ticks");
  const offlineElement2 = document.getElementById("shop-offline-ticks-2");
  if (!offlineElement && !offlineElement2) {
    console.warn("offline element not found");
    return;
  }

  const offlineTicks = game.skillingBosses.discardedTicks;
  let content = `<br></br>`;
  if (game.skillingBosses.modCache) {
    const wellFed = game.skillingBosses.modCache.get("smattyBosses:wellFed");
    if (wellFed > 0) {
      content += `
        <span class="current-upgrade-level-text">
          You gain and consume +${wellFed} offline ticks from the <span class="text-success">Well Fed</span> modifier.
        </span><br></br>`;
    }
  }

  content += `
              <span class="current-upgrade-level-text">
                You have <span class="text-warning" id="shop-offline-ticks-2">${offlineTicks}</span> offline ticks.
              </span>`;
  if (offlineElement) {
    offlineElement.innerHTML = content;
  }
  if (offlineElement2) {
    offlineElement2.innerHTML = content;
  }
}

function addSkillingSuppliesPurchases(ctx) {
  try {
    const skillingSuppliesPurchases = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "skillingSupplies",
        media: "assets/items/skilling-supplies.svg",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [
            {
              id: "smattyBosses:skillingSupplies",
              quantity: 1,
            },
          ],
          modifiers: {},
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 100,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [],
          raidCoins: {
            type: "Fixed",
            cost: 0,
          },
        },
        allowQuantityPurchase: true,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:repairShop",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 0,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Skilling Supplies",
        customDescription: `
        Skilling Supplies are used to repair your core!`,
      });
    });
    skillingSuppliesPurchases.add();
  } catch (error) {
    console.error("Error adding skilling supplies purchases:", error);
  }
}

function addRepairShopPurchases(ctx) {
  try {
    function generateDescription(title, description, extra) {
      return `
        <div class="upgrade-card" data-upgrade="repair">
          <div class="upgrade-effect">
            <h4 class="effect-title">${title}</h4>
            <p class="effect-description">${description}</p>
            <p class="current-upgrade-level-text">${extra}</p>
          </div>
        </div>
      `;
    }
    const repairShop1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "repairShop",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/crafting/crafting.png",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 1000,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [],
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
        customName: "Build a Repair Shop",
        customDescription: generateDescription(
          "You can repair your core!",
          "Buy skilling supplies at the Repair Shop",
          "You can also upgrade your core's stats."
        ),
      });
    });
    repairShop1.add();
    const repairShop2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "repairShop2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/crafting/crafting.png",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 5000,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorD:Mithril_Bar", quantity: 50 },
            { id: "melvorD:Green_Dragonhide", quantity: 50 },
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
            purchaseID: "smattyBosses:repairShop",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Repair Shop II",
        customDescription: generateDescription(
          "Upgrade your Repair Shop",
          "You can further upgrade your core's stats.",
          ""
        ),
      });
    });
    repairShop2.add();
    const repairShop3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "repairShop3",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/crafting/crafting.png",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 1000,
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
            purchaseID: "smattyBosses:repairShop2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Repair Shop III",
        customDescription: generateDescription(
          "Repair Shop III",
          "Not YET",
          ":)"
        ),
      });
    });
    repairShop3.add();
  } catch (error) {
    console.error("Error adding repair shop purchases:", error);
  }
}

function addShieldSmithPurchases(ctx) {
  try {
    function generateDescription(title, description, extra) {
      return `
        <div class="upgrade-card" data-upgrade="shieldSmith">
          <div class="upgrade-effect">
            <h4 class="effect-title">${title}</h4>
            <p class="effect-description">${description}</p>
            <p class="current-upgrade-level-text">${extra}</p>
          </div>
        </div>
      `;
    }
    const shieldSmith1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "shieldSmith",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/smithing/smithing.png",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 5000,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorD:Steel_Shield", quantity: 25 },
            { id: "melvorF:Ash", quantity: 25 },
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
        customName: "Build a Shield Smith",
        customDescription: generateDescription(
          "Your Shields are important!",
          "They protect your core from attacks!",
          "You can upgrade your Shield Stats here."
        ),
      });
    });
    shieldSmith1.add();
    const shieldSmith2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "shieldSmith2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/smithing/smithing.png",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 15000,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorD:Mithril_Shield", quantity: 50 },
            { id: "melvorF:Ash", quantity: 50 },
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
            purchaseID: "smattyBosses:shieldSmith",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Shield Smith II",
        customDescription: generateDescription(
          "Upgrade your Shield Smith",
          "You can further upgrade your Shield Stats.",
          ""
        ),
      });
    });
    shieldSmith2.add();
    const shieldSmith3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "shieldSmith3",
        media: "https://cdn2-main.melvor.net/assets/media/combat/defence.png",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 25000,
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
            purchaseID: "smattyBosses:shieldSmith2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Shield Smith III",
        customDescription: generateDescription(
          "Shield Smith III",
          "Not YET",
          ":)"
        ),
      });
    });
    shieldSmith3.add();
    addEnchanceShieldsPurchases(ctx);
  } catch (error) {
    console.error("Error adding shield smith purchases:", error);
  }
}

function addEnchanceShieldsPurchases(ctx) {
  try {
    function generateDescription(title, description, extra) {
      return `
        <div class="upgrade-card" data-upgrade="enchanceShields">
          <div class="upgrade-effect">
            <h4 class="effect-title">${title}</h4>
            <p class="effect-description">${description}</p>
            <p class="current-upgrade-level-text">${extra}</p>
          </div>
        </div>
      `;
    }
    const enchanceShields1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "enchanceShields",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/defence/defence.png",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 10000,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorD:Steel_Platebody", quantity: 50 },
            { id: "melvorF:Ash", quantity: 50 },
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
            purchaseID: "smattyBosses:shieldSmith",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Enchance Shields",
        customDescription: generateDescription(
          "Enhance Shields I",
          "Increase your maximum shield by +10.",
          ""
        ),
      });
    });
    enchanceShields1.add();
    const enchanceShields2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "enchanceShields2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/defence/defence.png",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 20000,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorD:Mithril_Platebody", quantity: 100 },
            { id: "melvorF:Ash", quantity: 100 },
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
            purchaseID: "smattyBosses:shieldSmith2",
            count: 1,
          },
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:enchanceShields",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Enchance Shields II",
        customDescription: generateDescription(
          "Enhance Shields II",
          "Increase your maximum shield by +10.",
          ""
        ),
      });
    });
    enchanceShields2.add();
    function giveShields(ctx, game) {
      game.skillingBosses.playerShieldMax += 10;
      ctx.characterStorage.setItem("PshM", game.skillingBosses.playerShieldMax);
      game.skillingBosses.needsCombatStatsUIUpdate = true;
      game.skillingBosses.needsPlayerHealthBarUpdate = true;
      game.skillingBosses.updateUIIfNeeded();
    }

    // patch enhance shields purchases to add shield
    ctx.patch(Shop, "buyItemOnClick").after(function (x, purchase, confirmed) {
      if (purchase.id === "smattyBosses:enchanceShields") {
        if (confirmed) {
          giveShields(ctx, game);
        }
      } else if (purchase.id === "smattyBosses:enchanceShields2") {
        if (confirmed) {
          giveShields(ctx, game);
        }
      }
    });
  } catch (error) {
    console.error("Error adding enchance shields purchases:", error);
  }
}

function addEnhanceCorePurchases(ctx) {
  try {
    function generateDescription(title, description, extra) {
      return `
        <div class="upgrade-card" data-upgrade="enhanceCore">
          <div class="upgrade-effect">
            <h4 class="effect-title">${title}</h4>
            <p class="effect-description">${description}</p>
            <p class="current-upgrade-level-text">${extra}</p>
          </div>
        </div>
      `;
    }
    const enhanceCore1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "enhanceCore",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/crafting/crafting.png",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 10000,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorF:Silver_Topaz_Ring", quantity: 25 },
            { id: "melvorD:Gold_Topaz_Ring", quantity: 25 },
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
            purchaseID: "smattyBosses:repairShop",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Enhance Core I",
        customDescription: generateDescription(
          "Enhance Core I",
          "Gain +10 core max HP",
          ""
        ),
      });
    });
    enhanceCore1.add();
    const enhanceCore2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "enhanceCore2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/crafting/crafting.png",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 20000,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorF:Silver_Sapphire_Ring", quantity: 50 },
            { id: "melvorF:Gold_Sapphire_Ring", quantity: 50 },
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
            purchaseID: "smattyBosses:repairShop2",
            count: 1,
          },
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:enhanceCore",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Enhance Core II",
        customDescription: generateDescription(
          "Enhance Core II",
          "Gain +10 core max HP",
          ""
        ),
      });
    });
    enhanceCore2.add();
    function giveCoreHP(ctx, game) {
      game.skillingBosses.playerCoreMaxHP += 10;
      ctx.characterStorage.setItem("PcMH", game.skillingBosses.playerCoreMaxHP);
      game.skillingBosses.needsCombatStatsUIUpdate = true;
      game.skillingBosses.needsPlayerHealthBarUpdate = true;
      game.skillingBosses.updateUIIfNeeded();
    }
    ctx.patch(Shop, "buyItemOnClick").after(function (x, purchase, confirmed) {
      if (purchase.id === "smattyBosses:enhanceCore") {
        if (confirmed) {
          giveCoreHP(ctx, game);
        }
      } else if (purchase.id === "smattyBosses:enhanceCore2") {
        if (confirmed) {
          giveCoreHP(ctx, game);
        }
      }
    });
  } catch (error) {
    console.error("Error adding enhance core purchases:", error);
  }
}

// Harden Core increases the physical and magical defence of the player's shield by 2.
function addHardenCorePurchases(ctx) {
  try {
    function generateDescription(title, description, extra) {
      return `
        <div class="upgrade-card" data-upgrade="HardenCore">
          <div class="upgrade-effect">
            <h4 class="effect-title">${title}</h4>
            <p class="effect-description">${description}</p>
            <p class="current-upgrade-level-text">${extra}</p>
          </div>
        </div>
      `;
    }
    const HardenCore1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "HardenCore",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/defence/defence.png",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 10000,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorD:Steel_Platebody", quantity: 25 },
            { id: "melvorF:Leather_Body", quantity: 50 },
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
            purchaseID: "smattyBosses:repairShop",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Harden Core I",
        customDescription: generateDescription(
          "Harden Core I",
          "Increase your core's physical and magical defence by +2.",
          ""
        ),
      });
    });
    HardenCore1.add();
    const HardenCore2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "HardenCore2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/defence/defence.png",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 20000,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorD:Mithril_Platebody", quantity: 50 },
            { id: "melvorF:Hard_Leather_Body", quantity: 100 },
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
            purchaseID: "smattyBosses:shieldSmith2",
            count: 1,
          },
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:HardenCore",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Harden Core II",
        customDescription: generateDescription(
          "Harden Core II",
          "Increase your core's physical and magical defence by +2.",
          ""
        ),
      });
    });
    HardenCore2.add();
    function giveCoreDefence(ctx, game) {
      game.skillingBosses.playerPhysicalResistance += 2;
      game.skillingBosses.playerMagicResistance += 2;
      ctx.characterStorage.setItem(
        "PcPD",
        game.skillingBosses.playerPhysicalResistance
      );
      ctx.characterStorage.setItem(
        "PccMD",
        game.skillingBosses.playerMagicResistance
      );
      game.skillingBosses.needsCombatStatsUIUpdate = true;
      game.skillingBosses.needsPlayerHealthBarUpdate = true;
      game.skillingBosses.updateUIIfNeeded();
    }
    ctx.patch(Shop, "buyItemOnClick").after(function (x, purchase, confirmed) {
      if (purchase.id === "smattyBosses:HardenCore") {
        if (confirmed) {
          giveCoreDefence(ctx, game);
        }
      } else if (purchase.id === "smattyBosses:HardenCore2") {
        if (confirmed) {
          giveCoreDefence(ctx, game);
        }
      }
    });
  } catch (error) {
    console.error("Error adding harden shield purchases:", error);
  }
}

function addShieldRegenPurchases(ctx) {
  function buildDescription() {
    return `
        <div class="upgrade-card" data-upgrade="shieldRegen">
          <div class="upgrade-effect">
            <h4 class="effect-title">Shield Regen I</h4>
            <p class="effect-description">+5% shield regen chance.</p>
            </div>
        </div>
      `;
  }
  try {
    const shieldRegen1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "shieldRegen1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/hitpoints.png",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 25000,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorF:Silver_Sapphire_Necklace", quantity: 50 },
            { id: "melvorF:Gold_Sapphire_Necklace", quantity: 50 },
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
            purchaseID: "smattyBosses:shieldSmith",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Shield Regen I",
        customDescription: buildDescription(),
      });
    });
    shieldRegen1.add();

    const shieldRegen2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "shieldRegen2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/hitpoints.png",
        category: "smattyBosses:SkillingBossesBuildings",
        contains: {
          items: [],
          modifiers: {},
        },
        cost: {
          gp: {
            type: "Fixed",
            cost: 50000,
          },
          slayerCoins: {
            type: "Fixed",
            cost: 0,
          },
          items: [
            { id: "melvorF:Silver_Ruby_Necklace", quantity: 100 },
            { id: "melvorF:Gold_Ruby_Necklace", quantity: 100 },
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
            purchaseID: "smattyBosses:shieldSmith2",
            count: 1,
          },
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:shieldRegen1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Shield Regen II",
        customDescription: buildDescription(),
      });
    });
    shieldRegen2.add();

    function giveShieldRegen(ctx, game) {
      // this.playerShieldRegen = [0.1, 1]; // [regenChance, regenAmount]
      game.skillingBosses.playerShieldRegen[0] += 0.05;
      ctx.characterStorage.setItem(
        "PshR",
        game.skillingBosses.playerShieldRegen
      );
      game.skillingBosses.needsCombatStatsUIUpdate = true;
      game.skillingBosses.updateUIIfNeeded();
    }

    ctx.patch(Shop, "buyItemOnClick").after(function (x, purchase, confirmed) {
      if (purchase.id === "smattyBosses:shieldRegen1") {
        if (confirmed) {
          giveShieldRegen(ctx, game);
        }
      } else if (purchase.id === "smattyBosses:shieldRegen2") {
        if (confirmed) {
          giveShieldRegen(ctx, game);
        }
      }
    });
  } catch (error) {
    console.error("Error adding shield regen purchases:", error);
  }
}
