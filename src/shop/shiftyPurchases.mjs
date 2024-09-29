export async function init(ctx) {
  try {
    addShopCategory(ctx);
    addShiftyPurchases(ctx);
  } catch (error) {
    console.error("Error initializing shifty purchases:", error);
  }
}

function addShopCategory(ctx) {
  const skillingBossesGeneric = ctx.gameData.buildPackage((p) => {
    p.shopCategories.add({
      id: "SkillingBossesShifty",
      name: "Shifty",
      media: "assets/items/souls/shifty-soul.svg",
    });
  });
  skillingBossesGeneric.add();
}

function addShiftyPurchases(ctx) {
  try {
    addMoneyRollerPurchases(ctx);
    addSpeedRollerPurchases(ctx);
    addEmptyPurchases(ctx);
    addEfficientSkillingPurchases(ctx);
    addEfficientBossingPurchases(ctx);
  } catch (error) {
    console.error("Error adding shifty purchases:", error);
  }
}
function addEmptyPurchases(ctx) {
  try {
    const empty1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "emptyShifty1",
        media: "assets/items/skilling-supplies.svg",
        category: "smattyBosses:SkillingBossesShifty",
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
          modifiers: {},
        },
        allowQuantityPurchase: false,
        unlockRequirements: [],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Empty I",
        customDescription: `
        <div class="upgrade-card" data-upgrade="emptyShifty1">
          <div class="upgrade-effect">
            <h4 class="effect-title"></h4>
            <p class="effect-description"></p>
            <p class="current-upgrade-level-text"></p>
          </div>
          <div class="current-upgrade-level">
            <p class="current-upgrade-level-text"></p>
          </div>`,
      });
    });
    empty1.add();
  } catch (error) {
    console.error("Error adding empty purchases:", error);
  }
}

function addMoneyRollerPurchases(ctx) {
  function generateDescription(nextTierChance, currentChance) {
    return `
            <div class="upgrade-card" data-upgrade="moneyRoller1">
              <div class="upgrade-effect">
                <h4 class="effect-title">When a Thieving Ability deals damage:</h4>
                <p class="effect-description">${nextTierChance}% to gain up to 1/6th of your thieving level as gold and deal that much damage to the boss.</p>
                <p class="current-upgrade-level-text"></p>
              </div>
              <div class="current-upgrade-level">
                <p class="current-upgrade-level-text">Current: ${currentChance} % chance</p>
              </div>
            </div>
          `;
  }
  try {
    //TODO: money roller
    const moneyRoller1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "moneyRoller1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/thieving/thieving.png",
        category: "smattyBosses:SkillingBossesShifty",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:moneyRoller": 5,
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
            { id: "melvorF:Mastery_Token_Thieving", quantity: 10 },
            { id: "smattyBosses:bossCoin", quantity: 1000 },
            { id: "smattyBosses:genericSoul", quantity: 10 },
            { id: "smattyBosses:shiftySoul", quantity: 10 },
            { id: "melvorF:Gentle_Hands_Potion_I", quantity: 100 },
            { id: "melvorF:Gentle_Hands_Potion_II", quantity: 100 },
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
        customName: "Money Roller I",
        customDescription: generateDescription(5, 0),
      });
    });
    moneyRoller1.add();

    const moneyRoller2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "moneyRoller2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/thieving/thieving.png",
        category: "smattyBosses:SkillingBossesShifty",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:moneyRoller_2": 5,
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
            { id: "melvorF:Mastery_Token_Thieving", quantity: 20 },
            { id: "smattyBosses:bossCoin", quantity: 3000 },
            { id: "smattyBosses:genericSoul", quantity: 20 },
            { id: "smattyBosses:shiftySoul", quantity: 30 },
            { id: "melvorF:Bobbys_Pocket", quantity: 100 },
            { id: "melvorF:Gentle_Hands_Potion_III", quantity: 250 },
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
            purchaseID: "smattyBosses:moneyRoller1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Money Roller II",
        customDescription: generateDescription(10, 5),
      });
    });
    moneyRoller2.add();

    const moneyRoller3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "moneyRoller3",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/thieving/thieving.png",
        category: "smattyBosses:SkillingBossesShifty",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:moneyRoller_3": 5,
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
            { id: "melvorF:Mastery_Token_Thieving", quantity: 40 },
            { id: "smattyBosses:bossCoin", quantity: 9000 },
            { id: "smattyBosses:genericSoul", quantity: 40 },
            { id: "smattyBosses:shiftySoul", quantity: 80 },
            { id: "melvorF:Boots_Of_Stealth", quantity: 2 },
            { id: "melvorF:Chapeau_Noir", quantity: 1 },
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
            purchaseID: "smattyBosses:moneyRoller2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Money Roller III",
        customDescription: generateDescription(15, 10),
      });
    });
    moneyRoller3.add();

    const moneyRoller4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "moneyRoller4",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/thieving/thieving.png",
        category: "smattyBosses:SkillingBossesShifty",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:moneyRoller_4": 5,
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
            purchaseID: "smattyBosses:moneyRoller3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Money Roller IV",
        customDescription: generateDescription(20, 15),
      });
    });
    moneyRoller4.add();
  } catch (error) {
    console.error("Error adding shifty purchases:", error);
  }
}

function addSpeedRollerPurchases(ctx) {
  function generateDescription(nextTierChance, currentChance) {
    return `
            <div class="upgrade-card" data-upgrade="speedRoller1">
              <div class="upgrade-effect">
                <h4 class="effect-title">When an Agility Ability deals damage:</h4>
                <p class="effect-description">${nextTierChance}% chance to increase the boss's attack timer by 1.</p>
                <p class="current-upgrade-level-text"></p>
              </div>
              <div class="current-upgrade-level">
                <p class="current-upgrade-level-text">Current: ${currentChance} % chance</p>
              </div>
            </div>
          `;
  }
  try {
    const speedRoller1 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "speedRoller1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/agility/agility.png",
        category: "smattyBosses:SkillingBossesShifty",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:speedRoller": 5,
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
            { id: "melvorF:Mastery_Token_Agility", quantity: 10 },
            { id: "smattyBosses:bossCoin", quantity: 1000 },
            { id: "smattyBosses:genericSoul", quantity: 10 },
            { id: "smattyBosses:shiftySoul", quantity: 10 },
            { id: "melvorF:Performance_Enhancing_Potion_I", quantity: 100 },
            { id: "melvorF:Performance_Enhancing_Potion_II", quantity: 100 },
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
        customName: "Speed Roller I",
        customDescription: generateDescription(5, 0),
      });
    });
    speedRoller1.add();

    const speedRoller2 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "speedRoller2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/agility/agility.png",
        category: "smattyBosses:SkillingBossesShifty",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:speedRoller_2": 5,
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
            { id: "melvorF:Mastery_Token_Agility", quantity: 20 },
            { id: "smattyBosses:bossCoin", quantity: 3000 },
            { id: "smattyBosses:genericSoul", quantity: 20 },
            { id: "smattyBosses:shiftySoul", quantity: 30 },
            { id: "melvorF:Performance_Enhancing_Potion_III", quantity: 250 },
            { id: "smattyBosses:skillingSupplies", quantity: 250 },
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
            purchaseID: "smattyBosses:speedRoller1",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Speed Roller II",
        customDescription: generateDescription(10, 5),
      });
    });
    speedRoller2.add();

    const speedRoller3 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "speedRoller3",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/agility/agility.png",
        category: "smattyBosses:SkillingBossesShifty",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:speedRoller_3": 5,
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
            { id: "melvorF:Mastery_Token_Agility", quantity: 40 },
            { id: "smattyBosses:bossCoin", quantity: 9000 },
            { id: "smattyBosses:genericSoul", quantity: 40 },
            { id: "smattyBosses:shiftySoul", quantity: 80 },
            { id: "melvorF:Performance_Enhancing_Potion_IV", quantity: 400 },
            { id: "smattyBosses:skillingSupplies", quantity: 400 },
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
            purchaseID: "smattyBosses:speedRoller2",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Speed Roller III",
        customDescription: generateDescription(15, 10),
      });
    });
    speedRoller3.add();

    const speedRoller4 = ctx.gameData.buildPackage((p) => {
      p.shopPurchases.add({
        id: "speedRoller4",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/agility/agility.png",
        category: "smattyBosses:SkillingBossesShifty",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:speedRoller_4": 5,
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
            purchaseID: "smattyBosses:speedRoller3",
            count: 1,
          },
        ],
        purchaseRequirements: [],
        defaultBuyLimit: 1,
        buyLimitOverrides: [],
        showBuyLimit: false,
        customName: "Speed Roller IV",
        customDescription: generateDescription(20, 15),
      });
    });
    speedRoller4.add();
  } catch (error) {
    console.error("Error adding shifty purchases:", error);
  }
}

function addEfficientSkillingPurchases(ctx) {
  function buildDescription(current, next) {
    return `
        <div class="upgrade-card shop-tier-2-upgrade-card" data-upgrade="efficientSkillingShifty">
          <div class="upgrade-effect">
            <h4 class="effect-title">When training a Shifty Skill that matches the Ability:</h4>
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
        id: "efficientSkillingShifty1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/attack.png",
        category: "smattyBosses:SkillingBossesShifty",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:efficientSkillingShifty": 1,
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
            { id: "smattyBosses:bossCoin", quantity: 12000 },
            { id: "smattyBosses:shiftySoul", quantity: 100 },
            { id: "melvorF:Mastery_Token_Thieving", quantity: 45 },
            { id: "melvorF:Mastery_Token_Agility", quantity: 45 },
            { id: "smattyBosses:ninjaHeart", quantity: 4 },
            { id: "smattyBosses:shadowHeart", quantity: 5 },
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
        id: "efficientSkillingShifty2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/attack.png",
        category: "smattyBosses:SkillingBossesShifty",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:efficientSkillingShifty_2": 1,
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
            purchaseID: "smattyBosses:efficientSkillingShifty1",
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
        <div class="upgrade-card shop-tier-2-upgrade-card" data-upgrade="efficientBossingShifty">
          <div class="upgrade-effect">
            <h4 class="effect-title">When training a Shifty Skill that matches the Boss:</h4>
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
        id: "efficientBossingShifty1",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/strength.png",
        category: "smattyBosses:SkillingBossesShifty",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:efficientBossingShifty": 1,
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
            { id: "smattyBosses:bossCoin", quantity: 12000 },
            { id: "smattyBosses:shiftySoul", quantity: 100 },
            { id: "melvorF:Mastery_Token_Thieving", quantity: 45 },
            { id: "melvorF:Mastery_Token_Agility", quantity: 45 },
            { id: "smattyBosses:ninjaHeart", quantity: 5 },
            { id: "smattyBosses:shadowHeart", quantity: 4 },
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
        id: "efficientBossingShifty2",
        media:
          "https://cdn2-main.melvor.net/assets/media/skills/combat/strength.png",
        category: "smattyBosses:SkillingBossesShifty",
        contains: {
          items: [],
          modifiers: {
            "smattyBosses:efficientBossingShifty_2": 1,
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
            purchaseID: "smattyBosses:efficientBossingShifty1",
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
