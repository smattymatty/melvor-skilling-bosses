export async function init(ctx) {
  try {
    addShopCategory(ctx);
    addTier1Rollers(ctx);
    addTier2Rollers(ctx);
    addTier3Rollers(ctx);
    addTier4Rollers(ctx);
  } catch (error) {
    console.error("Error initializing refiner purchases:", error);
  }
}

function addShopCategory(ctx) {
  const skillingBossesRefining = ctx.gameData.buildPackage((p) => {
    p.shopCategories.add({
      id: "SkillingBossesRefining",
      name: "Refining",
      media: "assets/items/souls/refiner-soul.svg",
    });
  });
  skillingBossesRefining.add();
}

function addTier1Rollers(ctx) {
  try {
    const flameRoller1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "flameRoller1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png",
        category: "smattyBosses:SkillingBossesRefining",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:flameRoller": 5,
          },
        },
        cost: {
          gp: { type: "Fixed", cost: 0 },
          slayerCoins: { type: "Fixed", cost: 0 },
          items: [
            { id: "melvorD:Mastery_Token_Firemaking", quantity: 10 },
            { id: "smattyBosses:bossCoin", quantity: 1000 },
            { id: "smattyBosses:genericSoul", quantity: 10 },
            { id: "smattyBosses:refinerSoul", quantity: 10 },
            { id: "melvorD:Coal_Ore", quantity: 100 },
            { id: "melvorF:Ash", quantity: 100 },
          ],
          raidCoins: { type: "Fixed", cost: 0 },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Flame Roller I",
        customDescription: `
        <div class="upgrade-card" data-upgrade="flameRoller1">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Firemaking Ability deals damage:</h4>
            <p class="effect-description">5% chance to apply a Burn DoT effect.</p>
            <p class="current-upgrade-level-text">Burn is a Magical DoT that deals 2% of the initial damage per tick for 4 ticks.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 % chance</p>
          </div>
        </div>
        `,
      });
    });
    flameRoller1.add();

    const spiceRoller1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "spiceRoller1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/cooking/cooking.png",
        category: "smattyBosses:SkillingBossesRefining",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:spiceRoller": 5,
          },
        },
        cost: {
          gp: { type: "Fixed", cost: 0 },
          slayerCoins: { type: "Fixed", cost: 0 },
          items: [
            { id: "melvorD:Mastery_Token_Cooking", quantity: 10 },
            { id: "smattyBosses:bossCoin", quantity: 1000 },
            { id: "smattyBosses:genericSoul", quantity: 10 },
            { id: "smattyBosses:refinerSoul", quantity: 10 },
            { id: "melvorD:Strawberry_Cupcake", quantity: 100 },
            { id: "melvorD:Salmon", quantity: 100 },
          ],
          raidCoins: { type: "Fixed", cost: 0 },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Spice Roller I",
        customDescription: `
        <div class="upgrade-card" data-upgrade="spiceRoller1">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Cooking Ability deals damage:</h4>
            <p class="effect-description">5% chance to apply a Spiced debuff.</p>
            <p class="current-upgrade-level-text">Spiced debuff increases damage taken by 4% for 12 ticks.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 % chance</p>
          </div>
        </div>
        `,
      });
    });
    spiceRoller1.add();

    const toxinRoller1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "toxinRoller1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/herblore/herblore.png",
        category: "smattyBosses:SkillingBossesRefining",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:toxinRoller": 5,
          },
        },
        cost: {
          gp: { type: "Fixed", cost: 0 },
          slayerCoins: { type: "Fixed", cost: 0 },
          items: [
            { id: "melvorF:Mastery_Token_Herblore", quantity: 10 },
            { id: "smattyBosses:bossCoin", quantity: 1000 },
            { id: "smattyBosses:genericSoul", quantity: 10 },
            { id: "smattyBosses:refinerSoul", quantity: 10 },
            { id: "melvorD:Mantalyme_Herb", quantity: 100 },
            { id: "melvorD:Lemontyle_Herb", quantity: 100 },
          ],
          raidCoins: { type: "Fixed", cost: 0 },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Toxin Roller I",
        customDescription: `
        <div class="upgrade-card" data-upgrade="toxinRoller1">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Herblore Ability deals damage:</h4>
            <p class="effect-description">5% chance to apply a Poison DoT effect.</p>
            <p class="current-upgrade-level-text">Poison is a Physical DoT that deals 2% of the initial damage per tick for 4 ticks.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 0 % chance</p>
          </div>
        </div>
        `,
      });
    });
    toxinRoller1.add();
  } catch (error) {
    console.error("Error adding refiner purchases:", error);
  }
}

function addTier2Rollers(ctx) {
  try {
    const flameRoller2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "flameRoller2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png",
        category: "smattyBosses:SkillingBossesRefining",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:flameRoller_2": 5,
          },
        },
        cost: {
          gp: { type: "Fixed", cost: 0 },
          slayerCoins: { type: "Fixed", cost: 0 },
          items: [
            { id: "melvorD:Mastery_Token_Firemaking", quantity: 20 },
            { id: "smattyBosses:bossCoin", quantity: 5000 },
            { id: "smattyBosses:genericSoul", quantity: 20 },
            { id: "smattyBosses:refinerSoul", quantity: 30 },
            { id: "melvorD:Willow_Logs", quantity: 250 },
            { id: "melvorF:Ash", quantity: 250 },
          ],
          raidCoins: { type: "Fixed", cost: 0 },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:flameRoller1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Flame Roller II",
        customDescription: `
        <div class="upgrade-card" data-upgrade="flameRoller2">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Firemaking Ability deals damage:</h4>
            <p class="effect-description">10% chance to apply a Burn DoT effect.</p>
            <p class="current-upgrade-level-text">Burn is a Magical DoT that deals 2% of the initial damage per tick for 4 ticks.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 5 % chance</p>
          </div>
        </div>
        `,
      });
    });
    flameRoller2.add();
    const spiceRoller2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "spiceRoller2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/cooking/cooking.png",
        category: "smattyBosses:SkillingBossesRefining",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:spiceRoller_2": 5,
          },
        },
        cost: {
          gp: { type: "Fixed", cost: 0 },
          slayerCoins: { type: "Fixed", cost: 0 },
          items: [
            { id: "melvorD:Mastery_Token_Cooking", quantity: 20 },
            { id: "smattyBosses:bossCoin", quantity: 3000 },
            { id: "smattyBosses:genericSoul", quantity: 20 },
            { id: "smattyBosses:refinerSoul", quantity: 30 },
            { id: "melvorD:Cherry_Cupcake", quantity: 250 },
            { id: "melvorD:Swordfish", quantity: 250 },
          ],
          raidCoins: { type: "Fixed", cost: 0 },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:spiceRoller1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Spice Roller II",
        customDescription: `
        <div class="upgrade-card" data-upgrade="spiceRoller2">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Cooking Ability deals damage:</h4>
            <p class="effect-description">10% chance to apply a Spiced debuff.</p>
            <p class="current-upgrade-level-text">Spiced debuff increases damage taken by 4% for 12 ticks.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 5 % chance</p>
          </div>
        </div>
        `,
      });
    });
    spiceRoller2.add();
    const toxinRoller2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "toxinRoller2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/herblore/herblore.png",
        category: "smattyBosses:SkillingBossesRefining",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:toxinRoller_2": 5,
          },
        },
        cost: {
          gp: { type: "Fixed", cost: 0 },
          slayerCoins: { type: "Fixed", cost: 0 },
          items: [
            { id: "melvorF:Mastery_Token_Herblore", quantity: 20 },
            { id: "smattyBosses:bossCoin", quantity: 5000 },
            { id: "smattyBosses:genericSoul", quantity: 20 },
            { id: "smattyBosses:refinerSoul", quantity: 30 },
            { id: "melvorD:Oxilyme_Herb", quantity: 250 },
            { id: "melvorF:Lucky_Herb_Potion_II", quantity: 100 },
          ],
          raidCoins: { type: "Fixed", cost: 0 },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:toxinRoller1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Toxin Roller II",
        customDescription: `
        <div class="upgrade-card" data-upgrade="toxinRoller2">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Herblore Ability deals damage:</h4>
            <p class="effect-description">10% chance to apply a Poison DoT effect.</p>
            <p class="current-upgrade-level-text">Poison is a Physical DoT that deals 2% of the initial damage per tick for 4 ticks.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 5 % chance</p>
          </div>
        </div>
        `,
      });
    });
    toxinRoller2.add();
  } catch (error) {
    console.error("Error adding refiner purchases:", error);
  }
}

function addTier3Rollers(ctx) {
  try {
    const flameRoller3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "flameRoller3",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png",
        category: "smattyBosses:SkillingBossesRefining",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:flameRoller_3": 5,
          },
        },
        cost: {
          gp: { type: "Fixed", cost: 0 },
          slayerCoins: { type: "Fixed", cost: 0 },
          items: [
            { id: "melvorD:Mastery_Token_Firemaking", quantity: 40 },
            { id: "smattyBosses:bossCoin", quantity: 12000 },
            { id: "smattyBosses:genericSoul", quantity: 40 },
            { id: "smattyBosses:refinerSoul", quantity: 80 },
            { id: "melvorD:Generous_Fire_Spirit", quantity: 25 },
            { id: "melvorF:Ash", quantity: 500 },
          ],
          raidCoins: { type: "Fixed", cost: 0 },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:flameRoller2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Flame Roller III",
        customDescription: `
        <div class="upgrade-card" data-upgrade="flameRoller3">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Firemaking Ability deals damage:</h4>
            <p class="effect-description">15% chance to apply a Burn DoT effect.</p>
            <p class="current-upgrade-level-text">Burn is a Magical DoT that deals 2% of the initial damage per tick for 4 ticks.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 10 % chance</p>
          </div>
        </div>
        `,
      });
    });
    flameRoller3.add();
    const spiceRoller3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "spiceRoller3",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/cooking/cooking.png",
        category: "smattyBosses:SkillingBossesRefining",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:spiceRoller_3": 5,
          },
        },
        cost: {
          gp: { type: "Fixed", cost: 0 },
          slayerCoins: { type: "Fixed", cost: 0 },
          items: [
            { id: "melvorD:Mastery_Token_Cooking", quantity: 40 },
            { id: "smattyBosses:bossCoin", quantity: 9000 },
            { id: "smattyBosses:genericSoul", quantity: 40 },
            { id: "smattyBosses:refinerSoul", quantity: 80 },
            { id: "melvorF:Apple_Pie", quantity: 500 },
            { id: "melvorD:Manta_Ray", quantity: 500 },
          ],
          raidCoins: { type: "Fixed", cost: 0 },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:spiceRoller2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Spice Roller III",
        customDescription: `
        <div class="upgrade-card" data-upgrade="spiceRoller3">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Cooking Ability deals damage:</h4>
            <p class="effect-description">15% chance to apply a Spiced debuff.</p>
            <p class="current-upgrade-level-text">Spiced debuff increases damage taken by 4% for 12 ticks.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 10 % chance</p>
          </div>
        </div>
        `,
      });
    });
    spiceRoller3.add();
    const toxinRoller3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "toxinRoller3",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/herblore/herblore.png",
        category: "smattyBosses:SkillingBossesRefining",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:toxinRoller_3": 5,
          },
        },
        cost: {
          gp: { type: "Fixed", cost: 0 },
          slayerCoins: { type: "Fixed", cost: 0 },
          items: [
            { id: "melvorF:Mastery_Token_Herblore", quantity: 40 },
            { id: "smattyBosses:bossCoin", quantity: 9000 },
            { id: "smattyBosses:genericSoul", quantity: 40 },
            { id: "smattyBosses:refinerSoul", quantity: 80 },
            { id: "melvorF:Poraxx_Herb", quantity: 500 },
            { id: "melvorF:Pigtayle_Herb", quantity: 500 },
          ],
          raidCoins: { type: "Fixed", cost: 0 },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:toxinRoller2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Toxin Roller III",
        customDescription: `
        <div class="upgrade-card" data-upgrade="toxinRoller3">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Herblore Ability deals damage:</h4>
            <p class="effect-description">15% chance to apply a Poison DoT effect.</p>
            <p class="current-upgrade-level-text">Poison is a Physical DoT that deals 2% of the initial damage per tick for 4 ticks.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 10 % chance</p>
          </div>
        </div>
        `,
      });
    });
    toxinRoller3.add();
  } catch (error) {
    console.error("Error adding refiner purchases:", error);
  }
}

function addTier4Rollers(ctx) {
  try {
    const flameRoller4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "flameRoller4",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png",
        category: "smattyBosses:SkillingBossesRefining",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:flameRoller_4": 5,
          },
        },
        cost: {
          gp: { type: "Fixed", cost: 0 },
          slayerCoins: { type: "Fixed", cost: 0 },
          items: [{ id: "smattyBosses:impossibleItem", quantity: 1 }],
          raidCoins: { type: "Fixed", cost: 0 },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:flameRoller3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Flame Roller IV",
        customDescription: `
        <div class="upgrade-card" data-upgrade="flameRoller4">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Firemaking Ability deals damage:</h4>
            <p class="effect-description">20% chance to apply a Burn DoT effect.</p>
            <p class="current-upgrade-level-text">Burn is a Magical DoT that deals 2% of the initial damage per tick for 4 ticks.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 15 % chance</p>
          </div>
        </div>
        `,
      });
    });
    flameRoller4.add();
    const spiceRoller4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "spiceRoller4",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/cooking/cooking.png",
        category: "smattyBosses:SkillingBossesRefining",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:spiceRoller_4": 5,
          },
        },
        cost: {
          gp: { type: "Fixed", cost: 0 },
          slayerCoins: { type: "Fixed", cost: 0 },
          items: [{ id: "smattyBosses:impossibleItem", quantity: 1 }],
          raidCoins: { type: "Fixed", cost: 0 },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:spiceRoller3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Spice Roller IV",
        customDescription: `
        <div class="upgrade-card" data-upgrade="spiceRoller4">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Cooking Ability deals damage:</h4>
            <p class="effect-description">20% chance to apply a Spiced debuff.</p>
            <p class="current-upgrade-level-text">Spiced debuff increases damage taken by 4% for 12 ticks.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 15 % chance</p>
          </div>
        </div>
        `,
      });
    });
    spiceRoller4.add();
    const toxinRoller4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "toxinRoller4",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/herblore/herblore.png",
        category: "smattyBosses:SkillingBossesRefining",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:toxinRoller_4": 5,
          },
        },
        cost: {
          gp: { type: "Fixed", cost: 0 },
          slayerCoins: { type: "Fixed", cost: 0 },
          items: [{ id: "smattyBosses:impossibleItem", quantity: 1 }],
          raidCoins: { type: "Fixed", cost: 0 },
        },
        allowQuantityPurchase: false,
        unlockRequirements: [
          {
            type: "ShopPurchase",
            purchaseID: "smattyBosses:toxinRoller3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Toxin Roller IV",
        customDescription: `
        <div class="upgrade-card" data-upgrade="toxinRoller4">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Herblore Ability deals damage:</h4>
            <p class="effect-description">20% chance to apply a Poison DoT effect.</p>
            <p class="current-upgrade-level-text">Poison is a Physical DoT that deals 2% of the initial damage per tick for 4 ticks.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: 15 % chance</p>
          </div>
        </div>
        `,
      });
    });
    toxinRoller4.add();
  } catch (error) {
    console.error("Error adding refiner purchases:", error);
  }
}
