const { loadModule } = mod.getContext(import.meta);

const battlesUIModule = await loadModule("src/ui/battle.mjs");

export class SkillingBosses {
  constructor(game) {
    this.game = game;
    // Bosses
    this.bosses = new Map();
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
        console.log(`Battle started against ${boss.name}`);

        // Initialize ability activation
        for (let i = 0; i < this.equippedAbilities.length; i++) {
          const ability = this.equippedAbilities[i];
          if (ability) {
            this.activeAbilitySlot = i;
            console.log("setting active ability timer to", ability);
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

      // Check for win/loss conditions
      if (this.playerCoreHP <= 0) {
        this.endBattle("loss");
        return;
      } else if (this.bossCurrHP <= 0) {
        this.endBattle("win");
        return;
      }

      // Any additional per-tick logic...
    } catch (error) {
      console.error("Error ticking battle:", error);
    }
  }
  activateCurrentAbility() {
    const ability = this.equippedAbilities[this.activeAbilitySlot];
    if (ability) {
      console.log(`Activating ability: ${ability.name}`);
      ability.activate(game); // Pass the game context if needed
    } else {
      console.log(`No ability equipped in slot ${this.activeAbilitySlot}`);
    }
  }

  tickAbility() {
    this.activeAbilityTimer--;

    if (this.activeAbilityTimer <= 0) {
      // Activate the ability
      this.activateCurrentAbility();

      // Move to the next ability slot
      this.advanceAbilitySlot();
    }
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
      console.log(
        `Next ability: ${nextAbility.name}, cooldown: ${this.activeAbilityTimer}`
      );
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
      console.log(bossHPContainer);
      if (bossHPContainer) {
        const classOptions = [
          "boss-damage-indicator",
          "boss-damage-indicator-2",
          "boss-damage-indicator-3",
        ];
        console.log(classOptions);
        const chosenClass =
          classOptions[Math.floor(Math.random() * classOptions.length)];
        const damageIndicator = document.createElement("div");
        damageIndicator.classList.add(chosenClass);
        damageIndicator.classList.add("animate-damage-indicator");
        damageIndicator.textContent = `-${amount}`;
        console.log(damageIndicator);
        bossHPContainer.appendChild(damageIndicator);
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

  healTarget(amount, target) {
    amount = Math.max(0, amount);
    amount = Math.floor(amount);
    if (target === "player") {
      this.playerCoreHP += amount;
    } else if (target === "boss") {
      this.bossCurrHP += amount;
    }
  }

  getBossAttack() {
    return this.currentBattle.boss.attacks[this.bossNextAttackIndex];
  }

  updateBossAttack() {
    // TODO implement boss attack update
  }

  endBattle(result) {
    if (result === "win") {
      this.battleCurrency += 1;
      this.activeBoss.kills++;
      this.activeBoss.tickRecord = this.currentBattleTicks;
      this.updatePlayerBossStats();
      // Grant other rewards, update quests, etc.
      // restart the battle
      this.startBattle();
    } else if (result === "loss") {
      this.currentBattleTicks = null;
      this.activeBoss = null;
      return;
    }
    this.currentBattleTicks = 0;
  }

  updatePlayerBossStats() {
    try {
      console.log("Updating player boss stats");
      const bossStatsElements = document.querySelectorAll(
        "#boss-player-tick-info"
      );
      if (bossStatsElements && this.activeBoss !== null) {
        console.log("Found boss stats eleme nts");
        for (const element of bossStatsElements) {
          console.log("Checking element", element);
          console.log("element.dataset.bossId:", element.dataset.bossId);
          console.log("this.activeBoss.id:", this.activeBoss.id);

          // Convert element.dataset.bossId to a number
          const bossId = Number(element.dataset.bossId);
          const boss = this.getBossById(bossId);
          console.log("Retrieved boss from Map:", boss);

          if (boss) {
            element.innerHTML = `<div>Total Kills: ${boss.kills}</div>
            <div>Fastest Kill: ${boss.tickRecord} ticks</div>`;
            console.log("Updated element:", element);
          } else {
            console.log(`Boss with ID ${bossId} not found.`);
          }
        }
      }
    } catch (error) {
      console.error("Error updating player boss stats:", error);
    }
  }
}
