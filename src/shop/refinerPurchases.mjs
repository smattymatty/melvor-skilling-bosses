export async function init(ctx) {
  try {
    addShopCategory(ctx);
    addTier1Rollers(ctx);
  } catch (error) {
    console.error("Error initializing refiner purchases:", error);
  }
}

function addShopCategory(ctx) {
  const skillingBossesRefining = ctx.gameData.buildPackage((p) => {
    p.shopCategories.add({
      id: "SkillingBossesRefining",
      name: "Skilling Bosses - Refining",
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
          items: [{ id: "smattyBosses:impossibleItem", quantity: 1 }],
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
            <p class="effect-description">5% chance to apply a Burn DoT effect (Magical damage).</p>
            <p class="current-upgrade-level-text">Burn DoT deals 2% of the initial damage per tick for 8 ticks.</p>
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
          items: [{ id: "smattyBosses:bossCoin", quantity: 1 }],
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
            <p class="effect-description">5% chance to apply a Spiced debuff (increases damage taken).</p>
            <p class="current-upgrade-level-text">Spiced debuff increases damage taken by 5% for 16 ticks.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: % chance</p>
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
          items: [{ id: "smattyBosses:impossibleItem", quantity: 1 }],
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
            <p class="effect-description">5% chance to apply a Poison DoT effect (Physical damage).</p>
            <p class="current-upgrade-level-text">Poison DoT deals 2% of the initial damage per tick for 8 ticks.</p>
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
