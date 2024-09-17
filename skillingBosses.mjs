const { loadModule } = mod.getContext(import.meta);

const battlesUIModule = await loadModule("src/ui/battle.mjs");
const inventoryUIModule = await loadModule("src/ui/inventory.mjs");

export class SkillingBosses {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    // Bosses
    this.bosses = new Map();
    this.bossKillsArray = [];
    // Quests
    this.quests = new Map();
    this.mainQuests = new Map();
    this.activeQuests = new Set();
    this.completedQuests = new Set();
    this.currentMainQuest = null;
    // Abilities
    this.abilities = new Map();
    this.activeAbilitySlot = null;
    this.activeAbilityTimer = null;
    this.equippedAbilities = new Array(3).fill(null);
    // Battle-related properties
    this.playerCoreHP = 100;
    this.playerCoreMaxHP = 100;
    this.activeBoss = null;
    this.bossCurrHP = null;
    this.bossMaxHP = null;
    this.bossAttackTimer = null;
    this.bossNextAttackIndex = null;

    this.battleCurrency = 0;
    this.currentBattleTicks = null;
    this.currentBattleAbilitiesUsed = 0;
    this.currentBattleDamageDealt = 0;
    this.currentBattleBossHealed = 0;
    this.currentBattleBossDamageReduced = 0;
    // inventory
    this.playerLoot = []; // [["melvorD:itemName", quantity], ...]
    // player loot is an array of arrays, where each inner array is a pair of [itemName, quantity]
    this.maximumPlayerLoot = 32;
    this.lastLootDrop = null;
  }

  // Methods for managing skilling bosses
  addBoss(boss) {
    this.bosses.set(boss.id, boss);
  }

  setActiveBoss(bossId) {
    this.activeBoss = this.bosses.get(bossId);
    this.bossCurrHP = this.activeBoss.currentHP;
    this.bossMaxHP = this.activeBoss.maxHP;
  }

  getBossById(bossId) {
    return this.bosses.get(bossId);
  }

  // Methods for managing quests
  addQuest(quest) {
    if (quest.isMainQuest) {
      this.mainQuests.set(quest.mainQuestNumber, quest);
    } else {
      this.quests.set(quest.name, quest);
    }
  }

  startQuest(questName) {
    const quest = this.quests.get(questName) || this.mainQuests.get(questName);
    if (quest && this.canStartQuest(quest)) {
      if (quest.isMainQuest) {
        if (this.currentMainQuest === null) {
          this.currentMainQuest = quest.mainQuestNumber;
        } else {
          return;
        }
      } else {
        this.activeQuests.add(questName);
      }
    }
  }

  completeQuest(questName) {
    const quest =
      this.quests.get(questName) || this.mainQuests.get(this.currentMainQuest);
    if (quest) {
      if (quest.isMainQuest) {
        this.completedQuests.add(quest.name);
        this.grantQuestRewards(quest);
        this.currentMainQuest = null;
        this.startNextMainQuest();
      } else if (this.activeQuests.has(questName)) {
        this.activeQuests.delete(questName);
        this.completedQuests.add(questName);
        this.grantQuestRewards(quest);
      }
    }
  }

  startNextMainQuest() {
    const nextQuestNumber = (this.currentMainQuest || 0) + 1;
    const nextQuest = this.mainQuests.get(nextQuestNumber);
    if (nextQuest) {
      this.currentMainQuest = nextQuestNumber;
    } else {
      console.log("No more main quests available");
    }
  }

  canStartQuest(quest) {
    // Check if the quest requirements are met
    return quest.requirements.every((req) => this.checkRequirement(req));
  }
  // Methods for managing abilities
  addAbility(ability) {
    this.abilities.set(ability.name, ability);
  }

  getAbility(abilityID) {
    for (const ability of this.abilities.values()) {
      if (ability.id === abilityID) {
        return ability;
      }
    }
    return null;
  }
  setActiveAbilitySlot(slot) {
    this.activeAbilitySlot = slot;
  }
  // Methods for managing battles
  useAbility(slotIndex) {
    const ability = this.equippedAbilities[slotIndex];
    // TODO: implement ability activation
  }
  startBattle() {
    try {
      const boss = this.activeBoss;
      if (boss && this.playerCoreHP > 0) {
        this.currentBattleTicks = 0;
        this.currentBattleAbilitiesUsed = 0;
        this.currentBattleDamageDealt = 0;
        this.currentBattleBossHealed = 0;
        this.currentBattleBossDamageReduced = 0;

        // Initialize ability activation
        for (let i = 0; i < this.equippedAbilities.length; i++) {
          const ability = this.equippedAbilities[i];
          if (ability) {
            this.activeAbilitySlot = i;
            this.activeAbilityTimer = ability.cooldown;
            break;
          }
        }

        // Initialize boss HP
        this.bossCurrHP = boss.stats.maxHP;
        this.bossMaxHP = boss.stats.maxHP;
        // Initialize boss attack timer and index
        this.bossAttackTimer = boss.attacks[0].cooldown;
        this.bossNextAttackIndex = 0;
        battlesUIModule.updateCurrentCombatStatsUI();
      } else {
        console.log(
          "Cannot start battle. Boss not found or player core HP not greater than 0."
        );
      }
    } catch (error) {
      console.error("Error starting battle:", error);
    }
  }

  tickBattle() {
    try {
      if (this.currentBattleTicks === null) {
        return;
      }
      this.currentBattleTicks++;
      // Decrease active ability timer
      if (this.activeAbilityTimer !== null) {
        this.tickAbility();
      }

      // Handle boss attacks
      //this.bossAttackTimer--;
      //characterStorage.setItem("Bcat", this.bossAttackTimer);
      //if (this.bossAttackTimer <= 0) {
      //  this.executeBossAttack();
      //  this.updateBossAttack();
      //}
      this.checkforRegen("boss");
      battlesUIModule.updateCurrentCombatStatsUI();
      // Check for win/loss conditions
      if (this.playerCoreHP <= 0) {
        this.endBattle("loss");
        return;
      } else if (this.bossCurrHP <= 0) {
        this.endBattle("win");
        return;
      }
    } catch (error) {
      console.error("Error ticking battle:", error);
    }
  }
  activateCurrentAbility() {
    const ability = this.equippedAbilities[this.activeAbilitySlot];
    if (ability) {
      ability.activate(game); // Pass the game context if needed
      battlesUIModule.updateCurrentCombatStatsUI();
    } else {
      console.log(`No ability equipped in slot ${this.activeAbilitySlot}`);
    }
  }

  tickAbility() {
    this.activeAbilityTimer--;

    if (this.activeAbilityTimer <= 0) {
      // Activate the ability
      this.activateCurrentAbility();
      this.currentBattleAbilitiesUsed++;

      // Move to the next ability slot
      this.advanceAbilitySlot();
    }
    battlesUIModule.updateAbilityProgressUI();
  }

  advanceAbilitySlot() {
    // Move to the next slot
    this.activeAbilitySlot++;

    // If we've reached the end, reset to 0
    if (this.activeAbilitySlot >= this.equippedAbilities.length) {
      this.activeAbilitySlot = 0;
    }

    // Get the ability in the new slot
    const nextAbility = this.equippedAbilities[this.activeAbilitySlot];

    if (nextAbility) {
      // Set the active ability timer to the cooldown of the new ability
      this.activeAbilityTimer = nextAbility.cooldown;
    } else {
      // No ability in this slot, set timer to null or skip to the next slot
      this.activeAbilityTimer = null;
      console.log(`No ability equipped in slot ${this.activeAbilitySlot}`);
      // Optionally, immediately advance to the next slot
      this.advanceAbilitySlot();
    }
  }
  executeBossAttack() {
    const currentAttack = this.activeBoss.attacks[this.bossNextAttackIndex];
    const damage = currentAttack.damage;
    this.takeDamage(damage, "player");
    console.log(
      `${this.activeBoss.name} uses ${currentAttack.name}, dealing ${damage} damage.`
    );
  }

  updateBossAttack() {
    // Move to the next attack in the sequence
    this.bossNextAttackIndex =
      (this.bossNextAttackIndex + 1) % this.activeBoss.attacks.length;
    const nextAttack = this.activeBoss.attacks[this.bossNextAttackIndex];
    this.bossAttackTimer = nextAttack.cooldown;
    console.log(
      `${this.activeBoss.name}'s next attack: ${nextAttack.name}, in ${this.bossAttackTimer} ticks.`
    );
  }

  takeDamage(amount, target) {
    amount = Math.max(0, amount);
    amount = Math.floor(amount);
    if (target === "player") {
      this.playerCoreHP -= amount;
      if (this.playerCoreHP <= 0) {
        this.playerCoreHP = 0;
        this.endBattle("loss");
      }
    } else if (target === "boss") {
      this.bossCurrHP -= amount;
      const bossHPContainer = document.querySelector(".boss-hp-bar");
      if (bossHPContainer) {
        const classOptions = [
          "boss-damage-indicator",
          "boss-damage-indicator-2",
          "boss-damage-indicator-3",
        ];
        const chosenClass =
          classOptions[Math.floor(Math.random() * classOptions.length)];
        const damageIndicator = document.createElement("div");
        damageIndicator.classList.add(chosenClass);
        damageIndicator.classList.add("animate-damage-indicator");
        damageIndicator.textContent = `-${amount}`;
        bossHPContainer.appendChild(damageIndicator);
        this.currentBattleDamageDealt += amount;
        // remove the damage indicator after a few seconds
        setTimeout(() => {
          damageIndicator.remove();
        }, 3000);
      }
      if (this.bossCurrHP <= 0) {
        this.bossCurrHP = 0;
        this.endBattle("win");
      }
    }
    battlesUIModule.updateBattleStatsUI();
  }

  checkforRegen(target) {
    if (target === "player") {
      // TODO: implement player regen
    } else if (target === "boss") {
      let chanceToRegen = this.activeBoss.regenChance;
      let roll = Math.random();
      if (roll <= chanceToRegen) {
        this.healTarget(this.activeBoss.regen, target);
      }
    }
  }

  healTarget(amount, target) {
    amount = Math.max(0, amount);
    amount = Math.floor(amount);
    if (target === "player") {
      this.playerCoreHP += amount;
    } else if (target === "boss") {
      this.bossCurrHP += amount;
      if (this.bossCurrHP >= this.activeBoss.maxHP) {
        this.bossCurrHP = this.activeBoss.maxHP;
      }
      const classOptions = [
        "boss-heal-indicator",
        "boss-heal-indicator-2",
        "boss-heal-indicator-3",
      ];
      const chosenClass =
        classOptions[Math.floor(Math.random() * classOptions.length)];
      const healIndicator = document.createElement("div");
      healIndicator.classList.add(chosenClass);
      healIndicator.classList.add("animate-damage-indicator");
      healIndicator.textContent = `+${amount}`;
      const parentContainer = document.querySelector("#boss-heal-indicator");
      if (parentContainer) {
        parentContainer.appendChild(healIndicator);
      }
      this.currentBattleBossHealed += amount;
      battlesUIModule.updateBattleStatsUI();
      setTimeout(() => {
        healIndicator.remove();
      }, 3000);
    }
  }

  getBossAttack() {
    return this.currentBattle.boss.attacks[this.bossNextAttackIndex];
  }

  updateBossAttack() {
    // TODO implement boss attack update
  }

  endBattle(result) {
    console.log("Ending battle with result", result);
    if (result === "win") {
      // if the current ticks are lower than the boss tick record, update the tick record
      console.log("Current ticks:", this.currentBattleTicks);
      console.log("Boss tick record:", this.activeBoss.tickRecord);
      if (this.activeBoss.tickRecord === 0) {
        this.activeBoss.tickRecord = this.currentBattleTicks;
      } else if (this.currentBattleTicks < this.activeBoss.tickRecord) {
        this.activeBoss.tickRecord = this.currentBattleTicks;
      }
      this.battleCurrency += 1;
      this.activeBoss.kills++;
      this.bossKillsArray = battlesUIModule.createBossKillArrayAndSave();
      this.updatePlayerBossStats();
      console.log("Boss kills array:", this.bossKillsArray);
      console.log(game.skillingBosses);
      // Grant rewards
      this.grantBossRewards(this.activeBoss);

      // restart the battle
      this.startBattle();
    } else if (result === "loss") {
      this.currentBattleTicks = null;
      this.activeBoss = null;
      battlesUIModule.updateCurrentCombatStatsUI();
      battlesUIModule.actuallyUpdateBossDisplay();
    }
    this.currentBattleTicks = 0;
    this.currentBattleBossHealed = 0;
    this.currentBattleDamageDealt = 0;
    this.currentBattleBossDamageReduced = 0;
  }

  updatePlayerBossStats() {
    try {
      const bossStatsElements = document.querySelectorAll(
        "#boss-player-tick-info"
      );
      if (bossStatsElements && this.activeBoss !== null) {
        for (const element of bossStatsElements) {
          // Convert element.dataset.bossId to a number
          const bossId = Number(element.dataset.bossId);
          const boss = this.getBossById(bossId);

          if (boss) {
            element.innerHTML = `<div>Total Kills: ${boss.kills}</div>
            <div>Fastest Kill: ${boss.tickRecord} ticks</div>`;
          } else {
            console.log(`Boss with ID ${bossId} not found.`);
          }
        }
      }
    } catch (error) {
      console.error("Error updating player boss stats:", error);
    }
  }
  addItemToInventory(itemId, quantity) {
    // Check if the item already exists in the inventory
    const existingItemIndex = this.playerLoot.findIndex(
      (item) => item[0] === itemId
    );

    if (existingItemIndex !== -1) {
      // Item exists, update quantity
      this.playerLoot[existingItemIndex][1] += quantity;
    } else if (this.playerLoot.length < this.maximumPlayerLoot) {
      // Item doesn't exist and there's space, add new item
      this.playerLoot.push([itemId, quantity]);
    } else {
      console.log("Inventory is full!");
      // Here you could implement logic for what happens when inventory is full
    }

    // Update the inventory display
    inventoryUIModule.updateInventoryDisplay(this.ctx);
  }
  grantBossRewards(boss) {
    console.log("Granting rewards for defeating", boss.name);

    const rewards = [];

    // Always grant the items from the alwaysRewardTier
    if (boss.alwaysRewardTier && boss.alwaysRewardTier.items) {
      boss.alwaysRewardTier.items.forEach((item) => {
        const [itemId, minQuantity, maxQuantity] = item;
        const quantity =
          Math.floor(Math.random() * (maxQuantity - minQuantity + 1)) +
          minQuantity;
        this.addItemToInventory(itemId, quantity);
        rewards.push([itemId, quantity]);
        console.log(
          `Added ${quantity} of ${itemId} to inventory (Always reward)`
        );
      });
    }

    // Determine the reward tier
    const rewardTier = boss.determineRewardTier();

    // Grant a single random reward from the determined tier
    const tierReward = this.grantSingleRewardFromTier(boss, rewardTier);
    if (tierReward) {
      const [itemId, quantity] = tierReward;
      this.addItemToInventory(itemId, quantity);
      rewards.push(tierReward);
    }

    // Set the last loot drop
    this.setLastLootDrop(boss, rewardTier, rewards);

    // Update the inventory display
    inventoryUIModule.updateInventoryDisplay(this.ctx);
    inventoryUIModule.updateLastLootDropDisplay(this.ctx);
  }

  grantSingleRewardFromTier(boss, tier) {
    let rewardItems;
    switch (tier) {
      case "common":
        rewardItems = boss.commonRewardTier.items;
        break;
      case "uncommon":
        rewardItems = boss.uncommonRewardTier.items;
        break;
      case "rare":
        rewardItems = boss.rareRewardTier.items;
        break;
      case "legendary":
        rewardItems = boss.legendaryRewardTier.items;
        break;
      default:
        console.log(`Unknown reward tier: ${tier}`);
        return null;
    }

    if (rewardItems && rewardItems.length > 0) {
      const randomIndex = Math.floor(Math.random() * rewardItems.length);
      const [itemId, minQuantity, maxQuantity] = rewardItems[randomIndex];
      const quantity =
        Math.floor(Math.random() * (maxQuantity - minQuantity + 1)) +
        minQuantity;
      return [itemId, quantity];
    } else {
      console.log(`No rewards available for tier: ${tier}`);
      return null;
    }
  }
  setLastLootDrop(boss, tier, loot) {
    this.lastLootDrop = { boss, tier, loot };
  }
}
