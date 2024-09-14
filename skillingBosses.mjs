
const { characterStorage } = mod.getContext(import.meta);

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
    this.activeBoss = null;
    this.battleCurrency = 0;
    this.currentBattleTicks = null;
  }

  // Methods for managing skilling bosses
  addBoss(boss) {
    this.bosses.set(boss.id, boss);
  }

  setActiveBoss(bossId) {
    console.log("Setting active boss to", bossId);
    this.activeBoss = this.bosses.get(bossId);
    console.log(this);
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
          console.log("Cannot start a new main quest while one is active");
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
        console.log(`Completed main quest: ${quest.name}`);
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
      console.log(`Started next main quest: ${nextQuest.name}`);
    } else {
      console.log("No more main quests available");
    }
  }

  canStartQuest(quest) {
    // Check if the quest requirements are met
    return quest.requirements.every((req) => this.checkRequirement(req));
  }

  addAbility(ability) {
    console.log("Adding ability", ability);
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
    characterStorage.setItem("ASlt", this.activeAbilitySlot);
    console.log(this);
  }
  tickBattle() {
    if (this.currentBattleTicks === null) {
      return;
    }
    this.currentBattleTicks++;
    // TODO: implement ability tickdown
    // TODO: implement boss tickdown
  }

  useAbility(abilityId) {
    const ability = this.getAbility(abilityId);
    if (ability && this.currentBattle) {
      if (ability.activate(this.currentBattle)) {
        console.log(`Used ability: ${ability.name}`);
      } else {
        console.log(`${ability.name} is on cooldown`);
      }
    }
  }
  startBattle() {
    const boss = this.activeBoss;
    if (boss && this.playerCoreHP > 0) {
      this.currentBattleTicks = 0;
      console.log(`Battle started against ${boss.name}`);
      characterStorage.setItem("Crbt", this.currentBattleTicks);
    } else {
      console.log(
        "Cannot start battle. Boss not found or player core HP not greater than 0."
      );
    }
  }

  endBattle(result) {
    if (result === "win") {
      this.battleCurrency += this.currentBattle.boss.currencyReward;
      // Grant other rewards, update quests, etc.
    } else if (result === "loss") {
      this.currentBattleTicks = null;
      this.activeBoss = null;
      return;
    }
    this.currentBattleTicks = 0;
    
  }

  tickBattle() {
    if (this.currentBattle) {
      const result = this.currentBattle.tick();
      if (result === "ongoing") {
        // Update UI, allow player actions, etc.
      } else {
        console.log(result === "win" ? "Victory!" : "Defeat!");
        this.endBattle(result);
      }
    }
  }

  endBattle(result) {
    if (result === "win") {
      this.battleCurrency += this.currentBattle.boss.currencyReward;
      // Grant other rewards, update quests, etc.
    }
    this.currentBattle = null;
    this.activeBoss = null;
  }

  repairCore(amount) {
    if (this.playerCore && this.battleCurrency >= amount * 10) {
      this.battleCurrency -= amount * 10;
      this.playerCore.heal(amount);
      console.log(
        `Core repaired for ${amount} HP. Remaining currency: ${this.battleCurrency}`
      );
    } else {
      console.log("Not enough currency to repair core.");
    }
  }

  useAbility(abilityId) {
    const ability = this.getAbility(abilityId);
    if (ability && this.currentBattle) {
      ability.activate(this.currentBattle);
      console.log(`Used ability: ${ability.name}`);
    }
  }
}