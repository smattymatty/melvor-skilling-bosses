export async function init(ctx) {
  try {
    addShopCategory(ctx);
    addMysticRollers(ctx);
    addEfficientSkillingPurchases(ctx);
    addEfficientBossingPurchases(ctx);
  } catch (error) {
    console.error("Error initializing mystic purchases:", error);
  }
}

function addShopCategory(ctx) {
  const skillingBossesMystic = ctx.gameData.buildPackage((p) => {
    p.shopCategories.add({
      id: "SkillingBossesMystic",
      name: "Mystic",
      media: "assets/items/souls/mystic-soul.svg",
    });
  });
  skillingBossesMystic.add();
}

function addMysticRollers(ctx) {
  try {
    addStarRollerPurchases(ctx);
    addWardRollerPurchases(ctx);
    addShardRollerPurchases(ctx);
  } catch (error) {
    console.error("Error adding mystic rollers:", error);
  }
}

function addShardRollerPurchases(ctx) {
  function generateDescription(nextTierChance, currentChance) {
    return `
        <div class="upgrade-card" data-upgrade="shardRoller">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Mystic Skill matches your Ability:</h4>
            <p class="effect-description">${nextTierChance}% chance to definitely do something.</p>
            <p class="current-upgrade-level-text">Will be implemented in the future.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: ${currentChance} % chance</p>
          </div>
        </div>
      `;
  }
  try {
    const shardRoller1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "shardRoller1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/summoning/summoning.png",
        category: "smattyBosses:SkillingBossesMystic",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:shardRoller": 5,
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
            //{ id: "melvorD:Mastery_Token_Summoning", quantity: 10 },
            { id: "smattyBosses:bossCoin", quantity: 1000 },
            // { id: "smattyBosses:genericSoul", quantity: 10 },
            //{ id: "smattyBosses:mysticSoul", quantity: 10 },
            //{ id: "melvorD:Shard", quantity: 100 },
            //{ id: "melvorD:Shard", quantity: 100 },
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
        customName: "Shard Roller I",
        customDescription: generateDescription(5, 0),
      });
    });
    shardRoller1.add();
    const shardRoller2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "shardRoller2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/summoning/summoning.png",
        category: "smattyBosses:SkillingBossesMystic",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:shardRoller_2": 5,
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
            // { id: "melvorD:Mastery_Token_Summoning", quantity: 20 },
            { id: "smattyBosses:impossibleItem", quantity: 1 },
            // { id: "smattyBosses:genericSoul", quantity: 20 },
            //{ id: "smattyBosses:mysticSoul", quantity: 30 },
            //{ id: "melvorD:Shard", quantity: 250 },
            //{ id: "melvorD:Shard", quantity: 250 },
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
            purchaseID: "smattyBosses:shardRoller1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Shard Roller II",
        customDescription: generateDescription(10, 5),
      });
    });
    shardRoller2.add();
    const shardRoller3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "shardRoller3",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/summoning/summoning.png",
        category: "smattyBosses:SkillingBossesMystic",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:shardRoller_3": 5,
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
            //  { id: "melvorD:Mastery_Token_Summoning", quantity: 40 },
            { id: "smattyBosses:bossCoin", quantity: 9000 },
            // { id: "smattyBosses:genericSoul", quantity: 40 },
            //{ id: "smattyBosses:mysticSoul", quantity: 80 },
            //{ id: "melvorD:Shard", quantity: 500 },
            //{ id: "melvorD:Shard", quantity: 500 },
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
            purchaseID: "smattyBosses:shardRoller1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Shard Roller III",
        customDescription: generateDescription(15, 10),
      });
    });
    shardRoller3.add();
    const shardRoller4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "shardRoller4",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/summoning/summoning.png",
        category: "smattyBosses:SkillingBossesMystic",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:shardRoller_4": 5,
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
            purchaseID: "smattyBosses:shardRoller3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Shard Roller IV",
        customDescription: generateDescription(20, 15),
      });
    });
    shardRoller4.add();
  } catch (error) {
    console.error("Error adding mystic rollers:", error);
  }
}

function addStarRollerPurchases(ctx) {
  function generateDescription(nextTierChance, currentChance) {
    return `
        <div class="upgrade-card" data-upgrade="starRoller">
          <div class="upgrade-effect">
            <h4 class="effect-title">When an Astrology Ability deals damage:</h4>
            <p class="effect-description">${nextTierChance}% chance to definitely do something.</p>
            <p class="current-upgrade-level-text">Will be implemented in the future.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: ${currentChance} % chance</p>
          </div>
        </div>
      `;
  }
  try {
    const starRoller1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "starRoller1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/astrology/astrology.png",
        category: "smattyBosses:SkillingBossesMystic",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:starRoller": 5,
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
            // { id: "melvorD:Mastery_Token_Astrology", quantity: 10 },
            { id: "smattyBosses:impossibleItem", quantity: 1 },
            // { id: "smattyBosses:genericSoul", quantity: 10 },
            // { id: "smattyBosses:mysticSoul", quantity: 10 },
            // { id: "melvorD:Stardust", quantity: 100 },
            // { id: "melvorD:Golden_Star", quantity: 100 },
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
        customName: "Star Roller I",
        customDescription: generateDescription(5, 0),
      });
    });
    starRoller1.add();
    const starRoller2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "starRoller2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/astrology/astrology.png",
        category: "smattyBosses:SkillingBossesMystic",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:starRoller_2": 5,
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
            // { id: "melvorD:Mastery_Token_Astrology", quantity: 20 },
            { id: "smattyBosses:bossCoin", quantity: 3000 },
            // { id: "smattyBosses:genericSoul", quantity: 20 },
            // { id: "smattyBosses:mysticSoul", quantity: 30 },
            // { id: "melvorD:Stardust", quantity: 250 },
            // { id: "melvorD:Golden_Star", quantity: 250 },
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
            purchaseID: "smattyBosses:starRoller1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Star Roller II",
        customDescription: generateDescription(10, 5),
      });
    });
    starRoller2.add();
    const starRoller3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "starRoller3",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/astrology/astrology.png",
        category: "smattyBosses:SkillingBossesMystic",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:starRoller_3": 5,
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
            //{ id: "melvorD:Mastery_Token_Astrology", quantity: 40 },
            { id: "smattyBosses:bossCoin", quantity: 9000 },
            // { id: "smattyBosses:genericSoul", quantity: 40 },
            // { id: "smattyBosses:mysticSoul", quantity: 80 },
            //{ id: "melvorD:Stardust", quantity: 500 },
            //{ id: "melvorD:Golden_Star", quantity: 500 },
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
            purchaseID: "smattyBosses:starRoller2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Star Roller III",
        customDescription: generateDescription(15, 10),
      });
    });
    starRoller3.add();
    const starRoller4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "starRoller4",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/astrology/astrology.png",
        category: "smattyBosses:SkillingBossesMystic",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:starRoller_4": 5,
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
            purchaseID: "smattyBosses:starRoller3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Star Roller IV",
        customDescription: generateDescription(20, 15),
      });
    });
    starRoller4.add();
  } catch (error) {
    console.error("Error adding mystic rollers:", error);
  }
}

function addWardRollerPurchases(ctx) {
  function generateDescription(nextTierChance, currentChance) {
    return `
        <div class="upgrade-card" data-upgrade="wardRoller">
          <div class="upgrade-effect">
            <h4 class="effect-title">When a Mystic Skill matches your Ability:</h4>
            <p class="effect-description">${nextTierChance}% chance to definitely do something.</p>
            <p class="current-upgrade-level-text">Will be implemented in the future.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: ${currentChance} % chance</p>
          </div>
        </div>
      `;
  }
  try {
    const wardRoller1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "wardRoller1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/runecrafting/runecrafting.png",
        category: "smattyBosses:SkillingBossesMystic",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:wardRoller": 5,
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
            //  { id: "melvorD:Mastery_Token_Combat", quantity: 10 },
            { id: "smattyBosses:impossibleItem", quantity: 1 },
            // { id: "smattyBosses:genericSoul", quantity: 10 },
            // { id: "smattyBosses:mysticSoul", quantity: 10 },
            //  { id: "melvorD:Iron_Platebody", quantity: 100 },
            // { id: "melvorD:Mithril_Platebody", quantity: 100 },
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
        customName: "Ward Roller I",
        customDescription: generateDescription(5, 0),
      });
    });
    wardRoller1.add();
    const wardRoller2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "wardRoller2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/runecrafting/runecrafting.png",
        category: "smattyBosses:SkillingBossesMystic",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:wardRoller_2": 5,
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
            // { id: "melvorD:Mastery_Token_Combat", quantity: 20 },
            { id: "smattyBosses:bossCoin", quantity: 3000 },
            //{ id: "smattyBosses:genericSoul", quantity: 20 },
            // { id: "smattyBosses:mysticSoul", quantity: 30 },
            //{ id: "melvorD:Iron_Platebody", quantity: 250 },
            //{ id: "melvorD:Mithril_Platebody", quantity: 250 },
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
            purchaseID: "smattyBosses:wardRoller1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Ward Roller II",
        customDescription: generateDescription(10, 5),
      });
    });
    wardRoller2.add();
    const wardRoller3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "wardRoller3",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/runecrafting/runecrafting.png",
        category: "smattyBosses:SkillingBossesMystic",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:wardRoller_3": 5,
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
            //  { id: "melvorD:Mastery_Token_Combat", quantity: 40 },
            { id: "smattyBosses:bossCoin", quantity: 9000 },
            // { id: "smattyBosses:genericSoul", quantity: 40 },
            // { id: "smattyBosses:mysticSoul", quantity: 80 },
            //  { id: "melvorD:Iron_Platebody", quantity: 500 },
            //  { id: "melvorD:Mithril_Platebody", quantity: 500 },
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
            purchaseID: "smattyBosses:wardRoller1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Ward Roller III",
        customDescription: generateDescription(15, 10),
      });
    });
    wardRoller3.add();
    const wardRoller4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "wardRoller4",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/runecrafting/runecrafting.png",
        category: "smattyBosses:SkillingBossesMystic",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:wardRoller_4": 5,
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
            purchaseID: "smattyBosses:wardRoller3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Ward Roller IV",
        customDescription: generateDescription(20, 15),
      });
    });
    wardRoller4.add();
  } catch (error) {
    console.error("Error adding mystic rollers:", error);
  }
}

function addEfficientSkillingPurchases(ctx) {
  function buildDescription(current, next) {
    return `
        <div class="upgrade-card shop-tier-2-upgrade-card" data-upgrade="efficientSkillingMystic">
          <div class="upgrade-effect">
            <h4 class="effect-title">When training a Mystic Skill that matches the Ability:</h4>
            <p class="effect-description">Gain +${next} skill-ticks.</p>
            <p class="current-upgrade-level-text">Applies only to tier-2+ Bosses.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: +${current} skill-ticks</p>
          </div>
        </div>

      `;
  }
  try {
    const efficientSkilling1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "efficientSkillingMystic1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/attack.png",
        category: "smattyBosses:SkillingBossesMystic",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:efficientSkillingMystic": 1,
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
            { id: "smattyBosses:mysticSoul", quantity: 100 },
            { id: "melvorF:Mastery_Token_Summoning", quantity: 30 },
            { id: "melvorF:Mastery_Token_Astrology", quantity: 30 },
            { id: "melvorF:Mastery_Token_Runecrafting", quantity: 30 },
            { id: "smattyBosses:celestialHeart", quantity: 3 },
            { id: "smattyBosses:ancientHeart", quantity: 3 },
            { id: "smattyBosses:runicHeart", quantity: 3 },
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
        customName: "Efficient Skilling I",
        customDescription: buildDescription(1, 2),
      });
    });
    efficientSkilling1.add();

    const efficientSkilling2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "efficientSkillingMystic2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/attack.png",
        category: "smattyBosses:SkillingBossesMystic",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:efficientSkillingMystic_2": 1,
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
            purchaseID: "smattyBosses:efficientSkillingMystic1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Efficient Skilling II",
        customDescription: buildDescription(2, 3),
      });
    });
    efficientSkilling2.add();
  } catch (error) {
    console.error("Error adding efficient skilling purchases:", error);
  }
}

function addEfficientBossingPurchases(ctx) {
  function buildDescription(current, next) {
    return `
        <div class="upgrade-card shop-tier-2-upgrade-card" data-upgrade="efficientBossingMystic">
          <div class="upgrade-effect">
            <h4 class="effect-title">When training a Mystic Skill that matches the Boss:</h4>
            <p class="effect-description">Gain +${next} skill-ticks.</p>
            <p class="current-upgrade-level-text">Applies only to tier-2+ Bosses.</p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text">Current: +${current} skill-ticks</p>
          </div>
        </div>
      `;
  }

  try {
    const efficientBossing1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "efficientBossingMystic1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/strength.png",
        category: "smattyBosses:SkillingBossesMystic",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:efficientBossingMystic": 1,
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
            { id: "smattyBosses:mysticSoul", quantity: 100 },
            { id: "melvorF:Mastery_Token_Summoning", quantity: 30 },
            { id: "melvorF:Mastery_Token_Astrology", quantity: 30 },
            { id: "melvorF:Mastery_Token_Runecrafting", quantity: 30 },
            { id: "smattyBosses:celestialHeart", quantity: 3 },
            { id: "smattyBosses:ancientHeart", quantity: 3 },
            { id: "smattyBosses:runicHeart", quantity: 3 },
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
        customName: "Efficient Bossing I",
        customDescription: buildDescription(1, 2),
      });
    });
    efficientBossing1.add();

    const efficientBossing2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "efficientBossingMystic2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/strength.png",
        category: "smattyBosses:SkillingBossesMystic",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:efficientBossingMystic_2": 1,
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
            purchaseID: "smattyBosses:efficientBossingMystic1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Efficient Bossing II",
        customDescription: buildDescription(2, 3),
      });
    });
    efficientBossing2.add();
  } catch (error) {
    console.error("Error adding efficient bossing purchases:", error);
  }
}
