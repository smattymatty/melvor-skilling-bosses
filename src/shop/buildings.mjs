const { loadModule } = mod.getContext(import.meta);

const activationFuncs = await loadModule("src/abilities/activationFuncs.mjs");

export async function init(ctx) {
  try {
    addShopCategory(ctx);
    addBuildingPurchases(ctx);
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
  } catch (error) {
    console.error("Error adding building purchases:", error);
  }
}

function addInnPurchases(ctx) {
  try {
    const offlineTickInfo = `
    <p class="current-upgrade-level-text">
    While offline, only <span class="text-danger">1/6th</span> of Skilling Bosses ticks are fully processesed.
    </p>
    <p class="current-upgrade-level-text">
    The remainder are discarded and thrown into the <span class="text-success">'offline ticks'</span> pool.
    </p>
    `;

    const innBuilding1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "inn",
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
          items: [
            { id: "smattyBosses:bossCoin", quantity: 1000 },
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
