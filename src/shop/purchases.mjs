export async function init(ctx) {
  try {
    addShopCategory(ctx);
    addGatheringPurchases(ctx);
    addGenericPurchases(ctx);
  } catch (error) {
    console.error("Error initializing shop purchases:", error);
  }
}

function addShopCategory(ctx) {
  const skillingBossesGeneric = ctx.gameData.buildPackage((p) => {
    p.shopCategories.add({
      id: "SkillingBossesGeneric",
      name: "Generic",
      media: "assets/items/souls/generic-soul.svg",
    });
  });
  skillingBossesGeneric.add();
  const skillingBossesGathering = ctx.gameData.buildPackage((p) => {
    p.shopCategories.add({
      id: "SkillingBossesGathering",
      name: "Gathering",
      media: "assets/items/souls/gatherer-soul.svg",
    });
  });
  skillingBossesGathering.add();
}

function addGenericPurchases(ctx) {
  try {
    // Duck Defence
    addDuckDefenceTiers(ctx);
    // Lucky Levels
    addLuckyLevelsTiers(ctx);
    // Shield Charger
    addShieldCharger(ctx);
  } catch (error) {
    console.error("Error adding generic purchases:", error);
  }
}

function addGatheringPurchases(ctx) {
  try {
    addTier1Rollers(ctx);
    addTier2Rollers(ctx);
    addTier3Rollers(ctx);
    addTier4Rollers(ctx);
  } catch (error) {
    console.error("Error adding gathering purchases:", error);
  }
}

function addTier1Rollers(ctx) {
  try {
    const rockRoller1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "rockRoller1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
        category: "smattyBosses:SkillingBossesGathering",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:rockRoller": 5,
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
            {
              id: "melvorD:Mastery_Token_Mining",
              quantity: 10,
            },
            {
              id: "smattyBosses:bossCoin",
              quantity: 1000,
            },
            { id: "smattyBosses:genericSoul", quantity: 10 },
            { id: "smattyBosses:gathererSoul", quantity: 10 },
            { id: "melvorD:Iron_Ore", quantity: 100 },
            { id: "melvorD:Coal_Ore", quantity: 100 },
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
        customName: "Rock Roller I",
        customDescription: `
        <div class="upgrade-card" data-upgrade="rockRoller1">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Mining Ability deals damage:</h4>
            <p class="effect-description">Randomly add 0-5% to the damage value.</p>
            <p class="current-upgrade-level-text">Applies before damage reduction.</p>
            </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 % damage increase</p>
          </div>
        </div>
        `,
      });
    });
    rockRoller1.add();
    const woodRoller1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "woodRoller1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
        category: "smattyBosses:SkillingBossesGathering",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:woodRoller": 5,
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
            { id: "melvorD:Mastery_Token_Woodcutting", quantity: 10 },
            { id: "smattyBosses:bossCoin", quantity: 1000 },
            { id: "smattyBosses:genericSoul", quantity: 10 },
            { id: "smattyBosses:gathererSoul", quantity: 10 },
            { id: "melvorD:Oak_Logs", quantity: 100 },
            { id: "melvorD:Willow_Logs", quantity: 100 },
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
        customName: "Wood Roller I",
        customDescription: `
        <div class="upgrade-card" data-upgrade="woodRoller1">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Woodcutting Ability deals damage:</h4>
            <p class="effect-description">Randomly add 0-5% to the damage value.</p>
            <p class="current-upgrade-level-text">Applies before damage reduction.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 % damage increase</p>
          </div>
        </div>
        `,
      });
    });
    woodRoller1.add();
    const fishRoller1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "fishRoller1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
        category: "smattyBosses:SkillingBossesGathering",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:fishRoller": 5,
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
            { id: "melvorD:Mastery_Token_Fishing", quantity: 10 },
            { id: "smattyBosses:bossCoin", quantity: 1000 },
            { id: "smattyBosses:genericSoul", quantity: 10 },
            { id: "smattyBosses:gathererSoul", quantity: 10 },
            { id: "melvorD:Raw_Herring", quantity: 100 },
            { id: "melvorD:Raw_Salmon", quantity: 100 },
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
        customName: "Fish Roller I",
        customDescription: `
        <div class="upgrade-card" data-upgrade="fishRoller1">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Fishing Ability deals damage:</h4>
            <p class="effect-description">Randomly add 0-5% to the damage value.</p>
            <p class="current-upgrade-level-text">Applies before damage reduction.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 % damage increase</p>
          </div>
        </div>
        `,
      });
    });
    fishRoller1.add();
  } catch (error) {
    console.error("Error adding gathering purchases:", error);
  }
}

function addTier2Rollers(ctx) {
  try {
    const rockRoller2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "rockRoller2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
        category: "smattyBosses:SkillingBossesGathering",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:rockRoller_2": 5,
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
            {
              id: "melvorD:Mastery_Token_Mining",
              quantity: 20,
            },
            {
              id: "smattyBosses:bossCoin",
              quantity: 3000,
            },
            { id: "smattyBosses:genericSoul", quantity: 20 },
            { id: "smattyBosses:gathererSoul", quantity: 30 },
            { id: "melvorD:Mithril_Ore", quantity: 250 },
            { id: "melvorD:Adamantite_Ore", quantity: 250 },
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
            purchaseID: "smattyBosses:rockRoller1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Rock Roller II",
        customDescription: `
        <div class="upgrade-card" data-upgrade="rockRoller2">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Mining Ability deals damage:</h4>
            <p class="effect-description">Randomly add 0-10% to the damage value.</p>
            <p class="current-upgrade-level-text">Applies before damage reduction.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0-5 % damage increase</p>
          </div>
        </div>
        `,
      });
    });
    rockRoller2.add();
    const woodRoller2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "woodRoller2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
        category: "smattyBosses:SkillingBossesGathering",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:woodRoller_2": 5,
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
            { id: "melvorD:Mastery_Token_Woodcutting", quantity: 20 },
            { id: "smattyBosses:bossCoin", quantity: 3000 },
            { id: "smattyBosses:genericSoul", quantity: 20 },
            { id: "smattyBosses:gathererSoul", quantity: 30 },
            { id: "melvorD:Maple_Logs", quantity: 250 },
            { id: "melvorD:Yew_Logs", quantity: 250 },
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
            purchaseID: "smattyBosses:woodRoller1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Wood Roller II",
        customDescription: `
        <div class="upgrade-card" data-upgrade="woodRoller2">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Woodcutting Ability deals damage:</h4>
            <p class="effect-description">Randomly add 0-10% to the damage value.</p>
            <p class="current-upgrade-level-text">Applies before damage reduction.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0-5 % damage increase</p>
          </div>
        </div>
        `,
      });
    });
    woodRoller2.add();
    const fishRoller2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "fishRoller2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
        category: "smattyBosses:SkillingBossesGathering",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:fishRoller_2": 5,
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
            { id: "melvorD:Mastery_Token_Fishing", quantity: 20 },
            { id: "smattyBosses:bossCoin", quantity: 3000 },
            { id: "smattyBosses:genericSoul", quantity: 20 },
            { id: "smattyBosses:gathererSoul", quantity: 30 },
            { id: "melvorD:Raw_Lobster", quantity: 250 },
            { id: "melvorD:Raw_Swordfish", quantity: 250 },
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
            purchaseID: "smattyBosses:fishRoller1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Fish Roller II",
        customDescription: `
        <div class="upgrade-card" data-upgrade="fishRoller2">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Fishing Ability deals damage:</h4>
            <p class="effect-description">Randomly add 0-10% to the damage value.</p>
            <p class="current-upgrade-level-text">Applies before damage reduction.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 - 5 % damage increase</p>
          </div>
        </div>
        `,
      });
    });
    fishRoller2.add();
  } catch (error) {
    console.error("Error adding gathering purchases:", error);
  }
}

function addTier3Rollers(ctx) {
  try {
    const rockRoller3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "rockRoller3",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
        category: "smattyBosses:SkillingBossesGathering",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:rockRoller_3": 5,
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
            {
              id: "melvorD:Mastery_Token_Mining",
              quantity: 30,
            },
            {
              id: "smattyBosses:bossCoin",
              quantity: 9000,
            },
            { id: "smattyBosses:genericSoul", quantity: 40 },
            { id: "smattyBosses:gathererSoul", quantity: 80 },
            { id: "melvorD:Runite_Ore", quantity: 500 },
            { id: "melvorD:Dragonite_Ore", quantity: 500 },
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
            purchaseID: "smattyBosses:rockRoller2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Rock Roller III",
        customDescription: `
        <div class="upgrade-card" data-upgrade="rockRoller3">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Mining Ability deals damage:</h4>
            <p class="effect-description">Randomly add 0-15% to the damage value.</p>
            <p class="current-upgrade-level-text">Applies before damage reduction.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 - 10 % damage increase</p>
          </div>
        </div>
        `,
      });
    });
    rockRoller3.add();
    const woodRoller3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "woodRoller3",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
        category: "smattyBosses:SkillingBossesGathering",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:woodRoller_3": 5,
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
            { id: "melvorD:Mastery_Token_Woodcutting", quantity: 30 },
            { id: "smattyBosses:bossCoin", quantity: 9000 },
            { id: "smattyBosses:genericSoul", quantity: 40 },
            { id: "smattyBosses:gathererSoul", quantity: 80 },
            { id: "melvorD:Magic_Logs", quantity: 500 },
            { id: "melvorD:Redwood_Logs", quantity: 500 },
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
            purchaseID: "smattyBosses:woodRoller2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Wood Roller III",
        customDescription: `
        <div class="upgrade-card" data-upgrade="woodRoller3">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Woodcutting Ability deals damage:</h4>
            <p class="effect-description">Randomly add 0-15% to the damage value.</p>
            <p class="current-upgrade-level-text">Applies before damage reduction.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 - 10 % damage increase</p>
          </div>
        </div>
        `,
      });
    });
    woodRoller3.add();
    const fishRoller3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "fishRoller3",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
        category: "smattyBosses:SkillingBossesGathering",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:fishRoller_3": 5,
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
            { id: "melvorD:Mastery_Token_Fishing", quantity: 30 },
            { id: "smattyBosses:bossCoin", quantity: 9000 },
            { id: "smattyBosses:genericSoul", quantity: 40 },
            { id: "smattyBosses:gathererSoul", quantity: 80 },
            { id: "melvorD:Raw_Crab", quantity: 500 },
            { id: "melvorD:Raw_Carp", quantity: 500 },
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
            purchaseID: "smattyBosses:fishRoller2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Fish Roller III",
        customDescription: `
        <div class="upgrade-card" data-upgrade="fishRoller3">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Fishing Ability deals damage:</h4>
            <p class="effect-description">Randomly add 0-15% to the damage value.</p>
            <p class="current-upgrade-level-text">Applies before damage reduction.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 - 10 % damage increase</p>
          </div>
        </div>
        `,
      });
    });
    fishRoller3.add();
  } catch (error) {
    console.error("Error adding gathering purchases:", error);
  }
}

function addTier4Rollers(ctx) {
  try {
    const rockRoller4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "rockRoller4",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
        category: "smattyBosses:SkillingBossesGathering",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:rockRoller_4": 5,
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
            purchaseID: "smattyBosses:rockRoller3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Rock Roller IV",
        customDescription: `
        <div class="upgrade-card" data-upgrade="rockRoller4">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Mining Ability deals damage:</h4>
            <p class="effect-description">Randomly add 0-20% to the damage value.</p>
            <p class="current-upgrade-level-text">Applies before damage reduction.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 - 15 % damage increase</p>
          </div>
        </div>
        `,
      });
    });
    rockRoller4.add();
    const woodRoller4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "woodRoller4",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
        category: "smattyBosses:SkillingBossesGathering",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:woodRoller_4": 5,
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
            purchaseID: "smattyBosses:woodRoller3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Wood Roller IV",
        customDescription: `
        <div class="upgrade-card" data-upgrade="woodRoller4">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Woodcutting Ability deals damage:</h4>
            <p class="effect-description">Randomly add 0-20% to the damage value.</p>
            <p class="current-upgrade-level-text">Applies before damage reduction.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 - 15 % damage increase</p>
          </div>
        </div>
        `,
      });
    });
    woodRoller4.add();
    const fishRoller4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "fishRoller4",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
        category: "smattyBosses:SkillingBossesGathering",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:fishRoller_4": 5,
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
            purchaseID: "smattyBosses:fishRoller3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Fish Roller IV",
        customDescription: `
        <div class="upgrade-card" data-upgrade="fishRoller4">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Fishing Ability deals damage:</h4>
            <p class="effect-description">Randomly add 0-20% to the damage value.</p>
            <p class="current-upgrade-level-text">Applies before damage reduction.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 - 15 % damage increase</p>
          </div>
        </div>
        `,
      });
    });
    fishRoller4.add();
  } catch (error) {
    console.error("Error adding gathering purchases:", error);
  }
}

function addDuckDefenceTiers(ctx) {
  try {
    const duckDefence1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "duckDefence1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/defence.png",
        category: "smattyBosses:SkillingBossesGeneric",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:duckDefence": 1,
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
            {
              id: "smattyBosses:bossCoin",
              quantity: 1000,
            },
            { id: "smattyBosses:genericSoul", quantity: 10 },
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
        customName: "Duck Defence I",
        customDescription: `
        <div class="upgrade-card" data-upgrade="duckDefence1">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a battle is initiated:</h4>
            <p class="effect-description">Reduce the boss's Physical and Magic Reduction by 1.</p>
            <p class="current-upgrade-level-text"></p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 defence ducked</p>
          </div>
        </div>
        `,
      });
    });
    duckDefence1.add();
    const duckDefence2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "duckDefence2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/defence.png",
        category: "smattyBosses:SkillingBossesGeneric",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:duckDefence_2": 1,
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
            {
              id: "smattyBosses:bossCoin",
              quantity: 3000,
            },
            { id: "smattyBosses:genericSoul", quantity: 30 },
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
            purchaseID: "smattyBosses:duckDefence1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Duck Defence II",
        customDescription: `
        <div class="upgrade-card" data-upgrade="duckDefence2">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a battle is initiated:</h4>
            <p class="effect-description">Reduce the boss's Physical and Magic Reduction by 2.</p>
            <p class="current-upgrade-level-text"></p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 1 defence ducked</p>
          </div>
        </div>
        `,
      });
    });
    duckDefence2.add();
    const duckDefence3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "duckDefence3",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/defence.png",
        category: "smattyBosses:SkillingBossesGeneric",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:duckDefence_3": 1,
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
            {
              id: "smattyBosses:bossCoin",
              quantity: 9000,
            },
            { id: "smattyBosses:genericSoul", quantity: 90 },
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
            purchaseID: "smattyBosses:duckDefence2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Duck Defence III",
        customDescription: `
        <div class="upgrade-card" data-upgrade="duckDefence3">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a battle is initiated:</h4>
            <p class="effect-description">Reduce the boss's Physical and Magic Reduction by 3.</p>
            <p class="current-upgrade-level-text"></p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 2 defence ducked</p>
          </div>
        </div>
        `,
      });
    });
    duckDefence3.add();
    const duckDefence4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "duckDefence4",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/defence.png",
        category: "smattyBosses:SkillingBossesGeneric",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:duckDefence_4": 1,
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
            {
              id: "smattyBosses:bossCoin",
              quantity: 27000,
            },
            { id: "smattyBosses:genericSoul", quantity: 270 },
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
            purchaseID: "smattyBosses:duckDefence3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Duck Defence IV",
        customDescription: `
        <div class="upgrade-card" data-upgrade="duckDefence4">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a battle is initiated:</h4>
            <p class="effect-description">Reduce the boss's Physical and Magic Reduction by 4.</p>
            <p class="current-upgrade-level-text"></p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 3 defence ducked</p>
          </div>
        </div>
        `,
      });
    });
    duckDefence4.add();
    const duckDefence5 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "duckDefence5",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/defence.png",
        category: "smattyBosses:SkillingBossesGeneric",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:duckDefence_5": 1,
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
            {
              id: "smattyBosses:bossCoin",
              quantity: 81000,
            },
            { id: "smattyBosses:genericSoul", quantity: 810 },
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
            purchaseID: "smattyBosses:duckDefence4",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Duck Defence V",
        customDescription: `
        <div class="upgrade-card" data-upgrade="duckDefence5">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a battle is initiated:</h4>
            <p class="effect-description">Reduce the boss's Physical and Magic Reduction by 5.</p>
            <p class="current-upgrade-level-text"></p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 4 defence ducked</p>
          </div>
        </div>
        `,
      });
    });
    duckDefence5.add();
    const duckDefence6 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "duckDefence6",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/defence.png",
        category: "smattyBosses:SkillingBossesGeneric",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:duckDefence_6": 1,
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
            {
              id: "smattyBosses:impossibleItem",
              quantity: 1,
            },
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
            purchaseID: "smattyBosses:duckDefence5",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Duck Defence VI",
        customDescription: `
        <div class="upgrade-card" data-upgrade="duckDefence6">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a battle is initiated:</h4>
            <p class="effect-description">Reduce the boss's Physical and Magic Reduction by 6.</p>
            <p class="current-upgrade-level-text"></p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 5 defence ducked</p>
          </div>
        </div>
        `,
      });
    });
    duckDefence6.add();
  } catch (error) {
    console.error("Error adding gathering purchases:", error);
  }
}

function addLuckyLevelsTiers(ctx) {
  try {
    const luckyLevels1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "luckyLevels1",
        media:
          "https://cdn2-main.melvor.net/assets/media/main/statistics_header.png",
        category: "smattyBosses:SkillingBossesGeneric",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:luckyLevels": 5,
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
            { id: "smattyBosses:bossCoin", quantity: 3000 },
            { id: "smattyBosses:genericSoul", quantity: 30 },
            { id: "melvorD:Mastery_Token_Woodcutting", quantity: 10 },
            { id: "melvorD:Mastery_Token_Fishing", quantity: 10 },
            { id: "melvorD:Mastery_Token_Mining", quantity: 10 },
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
        customName: "Lucky Levels I",
        customDescription: `
        <div class="upgrade-card" data-upgrade="luckyLevels1">
          <div class="upgrade-effect">
            <h4 class="effect-title">When an ability checks your skill level:</h4>
            <p class="effect-description">Randomly add 0-5 to the check.</p>
            <p class="current-upgrade-level-text">Applies before percent damage boosts.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 added levels</p>
          </div>
        </div>
        `,
      });
    });
    luckyLevels1.add();
    const luckyLevels2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "luckyLevels2",
        media:
          "https://cdn2-main.melvor.net/assets/media/main/statistics_header.png",
        category: "smattyBosses:SkillingBossesGeneric",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:luckyLevels_2": 5,
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
            { id: "smattyBosses:bossCoin", quantity: 9000 },
            { id: "smattyBosses:genericSoul", quantity: 90 },
            { id: "melvorD:Mastery_Token_Cooking", quantity: 10 },
            { id: "melvorD:Mastery_Token_Firemaking", quantity: 10 },
            { id: "melvorF:Mastery_Token_Herblore", quantity: 10 },
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
            purchaseID: "smattyBosses:luckyLevels1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Lucky Levels II",
        customDescription: `
        <div class="upgrade-card" data-upgrade="luckyLevels2">
          <div class="upgrade-effect">
            <h4 class="effect-title">When an ability checks your skill level:</h4>
            <p class="effect-description">Randomly add 0-10 to the check.</p>
            <p class="current-upgrade-level-text">Applies before percent damage boosts.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 - 5 added levels</p>
          </div>
        </div>
        `,
      });
    });
    luckyLevels2.add();
    const luckyLevels3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "luckyLevels3",
        media:
          "https://cdn2-main.melvor.net/assets/media/main/statistics_header.png",
        category: "smattyBosses:SkillingBossesGeneric",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:luckyLevels_3": 5,
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
            { id: "smattyBosses:bossCoin", quantity: 27000 },
            { id: "smattyBosses:genericSoul", quantity: 270 },
            { id: "melvorF:Mastery_Token_Crafting", quantity: 10 },
            { id: "melvorD:Mastery_Token_Smithing", quantity: 10 },
            { id: "melvorF:Mastery_Token_Fletching", quantity: 10 },
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
            purchaseID: "smattyBosses:luckyLevels2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Lucky Levels III",
        customDescription: `
        <div class="upgrade-card" data-upgrade="luckyLevels1">
          <div class="upgrade-effect">
            <h4 class="effect-title">When an ability checks your skill level:</h4>
            <p class="effect-description">Randomly add 0-15 to the check.</p>
            <p class="current-upgrade-level-text">Applies before percent damage boosts.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 - 10 added levels</p>
          </div>
        </div>
        `,
      });
    });
    luckyLevels3.add();
    const luckyLevels4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "luckyLevels4",
        media:
          "https://cdn2-main.melvor.net/assets/media/main/statistics_header.png",
        category: "smattyBosses:SkillingBossesGeneric",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:luckyLevels_4": 20,
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
            purchaseID: "smattyBosses:luckyLevels3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Lucky Levels IV",
        customDescription: `
        <div class="upgrade-card" data-upgrade="luckyLevels3">
          <div class="upgrade-effect">
            <h4 class="effect-title">When an ability checks your skill level:</h4>
            <p class="effect-description">Randomly add 0-20 to the check.</p>
            <p class="current-upgrade-level-text">Applies before percent damage boosts.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 - 15 added levels</p>
          </div>
          `,
      });
    });
    luckyLevels4.add();
  } catch (error) {
    console.error("Error adding generic purchases:", error);
  }
}

function addShieldCharger(ctx) {
  try {
    function generateDescription(tier) {
      switch (tier) {
        case "1":
          return buildDescription(tier, 1, 0);
        case "2":
          return buildDescription(tier, 2, 1);
        case "3":
          return buildDescription(tier, 3, 2);
        case "4":
          return buildDescription(tier, 4, 3);
        case "5":
          return buildDescription(tier, 5, 4);
        case "6":
          return buildDescription(tier, 6, 5);
          function buildDescription(tier, upgradeAmmount, currentAmount) {
            return `
        <div class="upgrade-card" data-upgrade="shieldCharger${tier}">
          <div class="upgrade-effect">
            <h4 class="effect-title">When your third ability is used:</h4>
            <p class="effect-description">Regnerate ${upgradeAmmount} shield.</p>
          
            </div><div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: ${currentAmount} shield</p>
          </div>
            </div>
            `;
          }
      }
    }

    const shieldCharger1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "shieldCharger1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/defence.png",
        category: "smattyBosses:SkillingBossesGeneric",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:shieldCharger": 1,
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
            { id: "smattyBosses:bossCoin", quantity: 5000 },
            { id: "smattyBosses:skillingSupplies", quantity: 100 },
            { id: "melvorF:Leather_Gloves", quantity: 100 },
            { id: "melvorD:Steel_Gloves", quantity: 100 },
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
        customName: "Shield Charger I",
        customDescription: generateDescription("1"),
      });
    });
    shieldCharger1.add();
    const shieldCharger2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "shieldCharger2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/defence.png",
        category: "smattyBosses:SkillingBossesGeneric",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:shieldCharger_2": 1,
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
            { id: "smattyBosses:bossCoin", quantity: 10000 },
            { id: "smattyBosses:skillingSupplies", quantity: 200 },
            { id: "melvorF:Hard_Leather_Gloves", quantity: 200 },
            { id: "melvorD:Mithril_Gloves", quantity: 200 },
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
            purchaseID: "smattyBosses:shieldCharger1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Shield Charger II",
        customDescription: generateDescription("2"),
      });
    });
    shieldCharger2.add();
    const shieldCharger3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "shieldCharger3",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/defence.png",
        category: "smattyBosses:SkillingBossesGeneric",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:shieldCharger_3": 1,
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
            { id: "smattyBosses:bossCoin", quantity: 15000 },
            { id: "smattyBosses:skillingSupplies", quantity: 300 },
            { id: "melvorD:Green_Dhide_Vambraces", quantity: 300 },
            { id: "melvorD:Adamant_Gloves", quantity: 300 },
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
            purchaseID: "smattyBosses:shieldCharger2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Shield Charger III",
        customDescription: generateDescription("3"),
      });
    });
    shieldCharger3.add();
    const shieldCharger4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "shieldCharger4",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/defence.png",
        category: "smattyBosses:SkillingBossesGeneric",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:shieldCharger_4": 1,
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
            purchaseID: "smattyBosses:shieldCharger3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Shield Charger IV",
        customDescription: generateDescription("4"),
      });
    });
    shieldCharger4.add();
  } catch (error) {
    console.error("Error adding shield charger purchases:", error);
  }
}
