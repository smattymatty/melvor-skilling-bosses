const { loadModule } = mod.getContext(import.meta);

const battlesUIModule = await loadModule("src/ui/battle.mjs");
const questUIModule = await loadModule("src/ui/quest.mjs");
const inventoryUIModule = await loadModule("src/ui/inventory.mjs");
const activationFuncs = await loadModule("src/abilities/activationFuncs.mjs");

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
    this.beginnerQuestsCompleted = []; // array of beginner quest IDs
    this.beginnerQuests = new Map();
    this.averageQuests = new Map();
    this.averageQuestsCompleted = []; // array of average quest IDs
    // Abilities
    this.abilities = new Map();
    this.activeAbilitySlot = null;
    this.activeAbilityTimer = null;
    this.equippedAbilities = new Array(3).fill(null);
    this.lastSkillDamageDealt = 0;
    this.lastSkillExtraText = []; // array of strings
    // Battle-related properties
    this.pauseBattleTicks = 0; // pauses the battle for a certain amount of ticks
    this.playerCoreHP = 100;
    this.playerCoreMaxHP = 100;
    this.playerHPRegen = [0.1, 1]; // [regenChance, regenAmount]
    this.playerShield = 50;
    this.playerShieldMax = 50;
    this.playerShieldRegen = [0.1, 1]; // [regenChance, regenAmount]
    this.playerPhysicalResistance = 10;
    this.playerMagicResistance = 10;
    this.playerShieldLost = 0;
    this.playerHPLost = 0;
    this.playerShieldGained = 0;
    this.playerHPGained = 0;
    this.activeBoss = null;
    this.bossCurrHP = null;
    this.bossMaxHP = null;
    this.bossAttackTimer = null;
    this.bossNextAttackIndex = null;
    this.currentBattleTicks = null;
    this.currentBattleAbilitiesUsed = 0;
    this.currentBattleDamageDealt = 0;
    this.currentBattleBossHealed = 0;
    this.currentBattleBossDamageReduced = 0;
    this.currentBattleDebuffDamageDealt = 0;
    this.lastAbilityTickText = "";
    this.bossAbilitiesUsed = 0;
    // for offline processing
    this.lastTickTime = Date.now();
    this.skippedTicks = 0;
    this.discardedTicks = 0;
    this.isOffline = true; // automatically set to false when the game is loaded
    // inventory
    this.playerLoot = []; // [["melvorD:itemName", quantity], ...]
    // player loot is an array of arrays, where each inner array is a pair of [itemName, quantity]
    this.maximumPlayerLoot = 32;
    this.lastLootDrop = null;
    // effects
    this.effects = new Map();
    this.bossStatChanges = []; // [[stat, change, duration], ...]
    // Format: [effectId, remainingDuration, damagePerTick, totalDamage]
    this.bossCurrentBuffs = new Array(); // [[id, duration, damage, totalDamage], [id, duration, damage, totalDamage], ...]
    this.bossCurrentDebuffs = new Array(); // [[id, duration, stacks, damage, totalDamage], [id, duration, stacks, damage, totalDamage], ...]
    this.currentlyTrainingSkill = null;
    this.bossStunDuration = 0; // if above 1, attacks won't tick and this will decrement
    // extra, for quest tracking
    this.ExtraPlayerStats = new ExtraPlayerStats();
    this.abilitySkillsThisBattle = [];
  }
  addEffect(effect) {
    this.effects.set(effect.id, effect);
  }
  getEffectById(effectId) {
    return this.effects.get(effectId);
  }

  // Methods for managing skilling bosses
  addBoss(boss) {
    this.bosses.set(boss.id, boss);
  }

  addBossStatChange(stat, change, duration) {
    this.bossStatChanges.push([stat, change, duration]);
    this.ctx.characterStorage.setItem("BstC", this.bossStatChanges);
  }

  removeBossStatChange(stat, change) {
    // removes the first stat change that matches the stat and change and also has a duration of 0
    const index = this.bossStatChanges.findIndex(
      (statChange) =>
        statChange[0] === stat &&
        statChange[1] === change &&
        statChange[2] === 0
    );

    if (index !== -1) {
      this.bossStatChanges.splice(index, 1);
      this.ctx.characterStorage.setItem("BstC", this.bossStatChanges);
    } else {
      console.warn(
        `No stat change found for stat ${stat} and change ${change}`
      );
    }
  }

  setActiveBoss(bossId) {
    this.activeBoss = this.bosses.get(bossId);
    // reset the global battle stats
    this.bossCurrHP = this.activeBoss.currentHP;
    this.bossMaxHP = this.activeBoss.maxHP;
    this.currentBattleTicks = 0;
    this.currentBattleAbilitiesUsed = 0;
    this.currentBattleDamageDealt = 0;
    this.currentBattleBossDamageDamageDealt = 0;
    this.currentBattleBossHealed = 0;
    this.currentBattleBossDamageReduced = 0;
    this.currentBattleDebuffDamageDealt = 0;
    this.lastSkillDamageDealt = 0;
    this.bossAbilitiesUsed = 0;
    this.clearEffects();
    this.ctx.characterStorage.setItem("AcBss", this.activeBoss.id);
    // reset player ability
    this.activeAbilitySlot = 0;
    this.activeAbilityTimer = this.equippedAbilities[0].cooldown;
    this.ctx.characterStorage.setItem("Aslt", this.activeAbilitySlot);
    this.ctx.characterStorage.setItem("Acat", this.activeAbilityTimer);
    this.abilitySkillsThisBattle = [];
    this.ctx.characterStorage.setItem("AsTb", this.abilitySkillsThisBattle);
    // check modifiers for stat changes
    const duckDefence = activationFuncs.getModifierValue(
      this.game,
      "smattyBosses:duckDefence"
    );
    if (duckDefence > 0) {
      this.activeBoss.physicalDefense = Math.max(
        0,
        this.activeBoss.stats.physicalDefense - duckDefence
      );
      this.activeBoss.magicDefense = Math.max(
        0,
        this.activeBoss.stats.magicDefense - duckDefence
      );
    }
    this.needsCombatStatsUIUpdate = true;
    this.needsAbilityUIUpdate = true;
    this.needsBossEffectsUIUpdate = true;
    this.bossAttackNeedsUIUpdate = true;
    this.updateUIIfNeeded();
  }

  getBossById(bossId) {
    return this.bosses.get(bossId);
  }

  // Methods for managing effects
  applyEffectToBoss(effectId, duration, damagePerTick = 0, totalDamage = 0) {
    const effect = this.getEffectById(effectId);
    if (effect) {
      const effectData = [effectId, duration, damagePerTick, totalDamage];
      this.bossCurrentDebuffs.push(effectData);
      this.ExtraPlayerStats.debuffsApplied++;
      this.ctx.characterStorage.setItem(
        "debuffsApplied",
        this.ExtraPlayerStats.debuffsApplied
      );
      effect.activationFunc(this.activeBoss, effectData);
    }
    this.needsBossEffectsUIUpdate = true;
    this.updateUIIfNeeded();
    this.ctx.characterStorage.setItem("BsDb", this.bossCurrentDebuffs);
  }

  tickEffects() {
    const effectsToRemove = [];

    this.bossCurrentDebuffs.forEach((effectData, index) => {
      const [effectId, duration] = effectData;
      const effect = this.effects.get(effectId);

      if (effect) {
        if (effect.tickEvent === "onTick") {
          effect.tickFunc(this.activeBoss, effectData);
        }
        effectData[1]--; // Decrease duration

        if (effectData[1] <= 0) {
          effect.clearFunc(this.activeBoss, effectData);
          effectsToRemove.push(index);
        } else {
          this.needsBossEffectsUIUpdate = true; // Effect tick may affect combat stats
        }
      }
    });
    // Remove effects after iteration to avoid modifying the array during iteration
    for (let i = effectsToRemove.length - 1; i >= 0; i--) {
      this.bossCurrentDebuffs.splice(effectsToRemove[i], 1);
    }
    this.ctx.characterStorage.setItem("BsDb", this.bossCurrentDebuffs);
    this.updateUIIfNeeded();
  }

  checkDebuffsForID(effectID) {
    // returns how many times the effectID shows up in the current debuffs
    let count = 0;
    for (let i = 0; i < this.bossCurrentDebuffs.length; i++) {
      if (this.bossCurrentDebuffs[i][0] === effectID) {
        count++;
      }
    }
    return count;
  }
  // Methods for managing quests
  addQuest(quest) {
    if (quest.isMainQuest) {
      this.mainQuests.set(quest.mainQuestNumber, quest);
    } else {
      this.quests.set(quest.name, quest);
    }
  }

  addSideQuest(quest) {
    if (quest.category === "beginner") {
      this.beginnerQuests.set(quest.id, quest);
    } else if (quest.category === "average") {
      this.averageQuests.set(quest.id, quest);
    }
  }

  completeSideQuest(questID, type) {
    if (type === "beginner") {
      this.beginnerQuestsCompleted.push(questID);
      this.ctx.characterStorage.setItem("BQc", this.beginnerQuestsCompleted);
    } else if (type === "average") {
      this.averageQuestsCompleted.push(questID);
      this.ctx.characterStorage.setItem("AQc", this.averageQuestsCompleted);
    }
    this.updateUIIfNeeded();
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
      console.warn("No more main quests available");
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
    this.ctx.characterStorage.setItem("ASlt", this.activeAbilitySlot);
  }
  // Methods for managing battles

  startBattle() {
    try {
      const boss = this.activeBoss;
      this.resetPlayerDefensiveTrackers();
      // setActiveBoss makes sure the stats are reset (hp, buffs, etc )
      this.setActiveBoss(this.activeBoss.id);
      if (boss && this.playerCoreHP > 0) {
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
        // Regenerate Player Shield
        this.restoreShield(this.playerShieldMax * 10, "player", true);
        this.playerShieldGained = 0;
        this.playerHPGained = 0;
        this.ctx.characterStorage.setItem("PhG", this.playerHPGained);
        this.ctx.characterStorage.setItem("PshG", this.playerShieldGained);
        // cache players modifiers
        activationFuncs.updateModifierCache(this.game);
        battlesUIModule.updateCurrentCombatStatsUI();
      } else {
        console.warn(
          "Cannot start battle. Boss not found or player core HP not greater than 0."
        );
      }
    } catch (error) {
      console.error("Error starting battle:", error);
    }
  }

  tickBattle() {
    if (this.activeBoss === null) {
      console.warn("Active boss is null, cannot tick battle");
      return;
    }
    if (this.currentBattleTicks === null) {
      console.warn("BattleTicks is null!");
      // Try to retrieve from storage or initialize to 0
      this.currentBattleTicks = this.ctx.characterStorage.getItem("Crbt") || 0;
    }
    this.currentBattleTicks++;

    // Tick abilities if timer is active
    if (this.activeAbilityTimer !== null) {
      this.tickAbility();
    }

    // Check for regeneration
    let regenOccurred = false;
    if (this.checkforRegen("boss")) {
      this.needsCombatStatsUIUpdate = true;
      regenOccurred = true;
    }
    if (this.checkforRegen("player")) {
      this.needsCombatStatsUIUpdate = true;
      regenOccurred = true;
    }

    // Only update UI if regeneration occurred
    if (regenOccurred) {
      this.updateUIIfNeeded();
    }

    // Tick effects
    this.tickEffects();

    // Check for win/loss conditions
    if (this.playerCoreHP <= 0) {
      this.endBattle("loss");
      return; // Exit early since battle has ended
    } else if (this.bossCurrHP <= 0) {
      this.endBattle("win");
      return; // Exit early since battle has ended
    }

    // Initialize boss attack if not set
    if (!this.bossNextAttack) {
      this.bossNextAttack = this.activeBoss.attacks[0];
      this.bossAttackTimer = this.bossNextAttack.cooldown;
    }
    if (this.bossStunDuration <= 0) {
      // Decrement boss attack timer
      this.bossAttackTimer--;
    } else if (this.bossStunDuration > 0) {
      this.bossStunDuration--;
    }
    this.ctx.characterStorage.setItem("Bat", this.bossAttackTimer);
    this.ctx.characterStorage.setItem("Bna", this.bossNextAttackIndex);
    this.bossAttackNeedsUIUpdate = true;
    let nextAttack = this.getBossAttack();
    if (nextAttack === null) {
      // default to the first attack
      nextAttack = this.activeBoss.attacks[0];
      this.bossAttackTimer = nextAttack.cooldown;
    } // Execute boss attack when timer reaches zero
    if (this.bossAttackTimer <= 0) {
      if (nextAttack) {
        this.executeBossAttack(nextAttack);
        this.updateBossAttack();
      }
    } else {
    }
    this.bossAttackNeedsUIUpdate = true;
    // Update UI if needed
    this.updateUIIfNeeded();
  }

  activateCurrentAbility() {
    const ability = this.equippedAbilities[this.activeAbilitySlot];
    if (ability) {
      ability.activate(game);
      // if the ability isn't already in the array, add it
      if (!this.abilitySkillsThisBattle.includes(ability.skill)) {
        this.abilitySkillsThisBattle.push(ability.skill);
        this.ctx.characterStorage.setItem("AsTb", this.abilitySkillsThisBattle);
      }
      battlesUIModule.updateCurrentCombatStatsUI();
      // check if its the third ability slot
      if (this.activeAbilitySlot === 2) {
        // check if the player has the shield charger upgrade
        const shieldChargerValue = this.modCache.get(
          "smattyBosses:shieldCharger"
        );
        if (shieldChargerValue > 0) {
          this.restoreShield(shieldChargerValue, "player");
          this.needsCombatStatsUIUpdate = true;
          this.updateUIIfNeeded();
        }
      }
    } else {
      console.warn(`No ability equipped in slot ${this.activeAbilitySlot}`);
    }
  }

  tickAbility() {
    this.activeAbilityTimer--;

    if (this.activeAbilityTimer <= 0) {
      // Activate the ability
      this.activateCurrentAbility();
      this.currentBattleAbilitiesUsed++;
      this.needsCombatStatsUIUpdate = true;

      this.advanceAbilitySlot();
    }
    this.needsAbilityUIUpdate = true;
  }

  updateUIIfNeeded() {
    if (this.needsAbilityUIUpdate) {
      battlesUIModule.updateAbilityProgressUI();
      this.needsAbilityUIUpdate = false;
    }
    if (this.needsCombatStatsUIUpdate) {
      battlesUIModule.updateCurrentCombatStatsUI();
      battlesUIModule.updateCurrentCombatPlayerDefenseStatsUI();
      this.needsCombatStatsUIUpdate = false;
    }
    if (this.needsPlayerHealthBarUpdate) {
      battlesUIModule.updatePlayerHealthBar();
      battlesUIModule.updatePlayerShieldBar();
      battlesUIModule.updateBossOffensiveInfoUI();
      this.needsPlayerHealthBarUpdate = false;
    }
    if (this.needsBossEffectsUIUpdate) {
      battlesUIModule.updateBossEffects();
      this.needsBossEffectsUIUpdate = false;
    }
    if (this.bossAttackNeedsUIUpdate) {
      battlesUIModule.updateBossAttackUI();
      battlesUIModule.updateBossOffensiveInfoUI();
      this.bossAttackNeedsUIUpdate = false;
    }
    const playerSkillTickInfo = document.getElementById(
      "player-skill-tick-info"
    );
    if (playerSkillTickInfo) {
      playerSkillTickInfo.innerHTML = this.lastAbilityTickText;
    }
    if (this.needsQuestUIUpdate) {
      questUIModule.buildQuests(this.ctx);
      this.needsQuestUIUpdate = false;
    }
  }

  updateLastAttackInfoUI() {
    const lastAttackInfo = document.getElementById("last-attack-info");
    if (lastAttackInfo) {
      let content = `
      <span class="text-muted">
      Last ability dealt <span class="text-danger">${this.lastSkillDamageDealt} Damage</span> to the target`;
      if (this.lastSkillExtraText.length > 0) {
        for (let i = 0; i < this.lastSkillExtraText.length; i++) {
          content += `<span class="text-muted"> and ${this.lastSkillExtraText[i]}</span>`;
        }
      }
      lastAttackInfo.innerHTML = content + "</span>";
    }
  }

  advanceAbilitySlot() {
    this.activeAbilitySlot++;

    if (this.activeAbilitySlot >= this.equippedAbilities.length) {
      this.activeAbilitySlot = 0;
    }

    const nextAbility = this.equippedAbilities[this.activeAbilitySlot];

    if (nextAbility) {
      // Set the active ability timer to the cooldown of the new ability
      this.activeAbilityTimer = nextAbility.cooldown;
    } else {
      this.activeAbilityTimer = null;
      console.warn(`No ability equipped in slot ${this.activeAbilitySlot}`);
      this.advanceAbilitySlot();
    }
  }
  executeBossAttack(attack) {
    let damage = this.activeBoss.attackPower * attack.damageModifier;
    if (attack.type === "Magic") {
      damage -= damage * (1 / this.playerMagicResistance);
    } else if (attack.type === "Physical") {
      damage -= damage * (1 / this.playerPhysicalResistance);
    }
    this.takeDamage(damage, "player");
    this.bossAbilitiesUsed++;
    this.ctx.characterStorage.setItem("BaU", this.bossAbilitiesUsed);
    this.needsQuestUIUpdate = true;
    this.bossAttackNeedsUIUpdate = true;
  }

  updateBossAttack() {
    try {
      if (this.activeBoss === null) {
        console.warn("Active boss is null, cannot update boss attack");
        return;
      }
      this.bossNextAttackIndex =
        (this.bossNextAttackIndex + 1) % this.activeBoss.attacks.length;
      if (
        this.bossNextAttackIndex === null ||
        this.bossNextAttackIndex > this.activeBoss.attacks.length
      ) {
        console.warn("Invalid boss attack index", this.bossNextAttackIndex);
        throw new Error("Invalid boss attack index", this);
      }
      const nextAttack = this.activeBoss.attacks[this.bossNextAttackIndex];
      this.bossAttackTimer = nextAttack.cooldown;
      this.bossAttackNeedsUIUpdate = true;
    } catch (error) {
      console.error("Error updating boss attack:", error);
      throw error;
    }
  }

  pauseBattle(amount) {
    this.pauseBattleTicks = amount;
    this.ctx.characterStorage.setItem("Pbt", this.pauseBattleTicks);
  }

  takeDamage(amount, target, debuff = false) {
    amount = Math.floor(amount);
    amount = Math.max(1, amount);
    if (target === "player") {
      this.currentBattleBossDamageDamageDealt += amount;
      this.ExtraPlayerStats.damageTaken += amount;
      this.ctx.characterStorage.setItem(
        "damageTaken",
        this.ExtraPlayerStats.damageTaken
      );
      if (this.ExtraPlayerStats.highestDamageTaken < amount) {
        this.ExtraPlayerStats.highestDamageTaken = amount;
        this.ctx.characterStorage.setItem(
          "highestDamageTaken",
          this.ExtraPlayerStats.highestDamageTaken
        );
      }
      if (this.playerShield > 0) {
        if (this.playerShield >= amount) {
          // Shield absorbs all the damage
          this.playerShield -= amount;
          this.playerShieldLost += amount;
          this.showPlayerDamageIndicatorOnUI(amount, "shield");
        } else {
          // Shield is depleted; apply remaining damage to HP
          const remainingDamage = amount - this.playerShield;
          this.playerShieldLost += this.playerShield;
          this.playerShield = 0;

          // Apply remaining damage to HP
          this.playerCoreHP -= remainingDamage;
          this.playerHPLost += remainingDamage;
          this.showPlayerDamageIndicatorOnUI(remainingDamage, "hp");
        }
      } else {
        // No shield - damage applies directly to HP
        this.playerCoreHP -= amount;
        this.playerHPLost += amount;
        this.showPlayerDamageIndicatorOnUI(amount, "hp");
      }

      // Update character storage and UI
      this.ctx.characterStorage.setItem("Psh", this.playerShield);
      this.ctx.characterStorage.setItem("PshL", this.playerShieldLost);
      this.ctx.characterStorage.setItem("PcHP", this.playerCoreHP);
      this.ctx.characterStorage.setItem("PhL", this.playerHPLost);

      this.ctx.characterStorage.setItem("BctD", this.currentBattleDamageDealt);
      this.needsCombatStatsUIUpdate = true;
      this.needsPlayerHealthBarUpdate = true;

      if (this.playerCoreHP <= 0) {
        this.playerCoreHP = 0;
        this.endBattle("loss");
      }
    } else if (target === "boss") {
      this.bossCurrHP -= amount;
      this.showBossDamageIndicatorOnUI(amount);
      this.currentBattleDamageDealt += amount;
      this.ExtraPlayerStats.damageDealt += amount;
      this.ctx.characterStorage.setItem(
        "damageDealt",
        this.ExtraPlayerStats.damageDealt
      );
      if (this.ExtraPlayerStats.highestDamageDealt < amount) {
        this.ExtraPlayerStats.highestDamageDealt = amount;
        this.ctx.characterStorage.setItem(
          "highestDamageDealt",
          this.ExtraPlayerStats.highestDamageDealt
        );
      }
      if (debuff) {
        this.currentBattleDebuffDamageDealt += amount;
        this.ctx.characterStorage.setItem(
          "BctDb",
          this.currentBattleDebuffDamageDealt
        );
        this.ExtraPlayerStats.debuffDamageDealt += amount;
        this.ctx.characterStorage.setItem(
          "debuffDamageDealt",
          this.ExtraPlayerStats.debuffDamageDealt
        );
        if (this.ExtraPlayerStats.highestDebuffDamageDealt < amount) {
          this.ExtraPlayerStats.highestDebuffDamageDealt = amount;
          this.ctx.characterStorage.setItem(
            "highestDebuffDamageDealt",
            this.ExtraPlayerStats.highestDebuffDamageDealt
          );
        }
      }
      if (this.bossCurrHP <= 0) {
        this.bossCurrHP = 0;
        this.endBattle("win");
      }
    }
    this.needsQuestUIUpdate = true;
    battlesUIModule.updateBattleStatsUI();
    this.updateUIIfNeeded;
  }

  showBossDamageIndicatorOnUI(amount) {
    const bossHPContainer = document.querySelector(".boss-hp-bar");
    if (bossHPContainer) {
      const classOptions = [
        "boss-damage-indicator",
        "boss-damage-indicator-2",
        "boss-damage-indicator-3",
        "boss-damage-indicator-4",
        "boss-damage-indicator-5",
        "boss-damage-indicator-6",
        "boss-damage-indicator-7",
      ];
      const chosenClass =
        classOptions[Math.floor(Math.random() * classOptions.length)];
      const damageIndicator = document.createElement("div");
      damageIndicator.classList.add(chosenClass);
      damageIndicator.classList.add("animate-damage-indicator");
      damageIndicator.textContent = `-${amount}`;
      bossHPContainer.appendChild(damageIndicator);
      // remove the damage indicator after a few seconds
      setTimeout(() => {
        damageIndicator.remove();
      }, 3000);
    }
  }

  showPlayerDamageIndicatorOnUI(amount, type) {
    const playerHPContainer = document.querySelector(
      ".player-health-bar-container"
    );
    if (playerHPContainer) {
      // TODO : class types based
      const classOptions = [
        "player-damage-indicator",
        "player-damage-indicator-2",
        "player-damage-indicator-3",
        "player-damage-indicator-4",
        "player-damage-indicator-5",
        "player-damage-indicator-6",
        "player-damage-indicator-7",
      ];
      const chosenClass =
        classOptions[Math.floor(Math.random() * classOptions.length)];
      const damageIndicator = document.createElement("div");
      damageIndicator.classList.add(chosenClass);
      damageIndicator.classList.add("animate-damage-indicator");
      damageIndicator.textContent = `-${amount}`;
      playerHPContainer.appendChild(damageIndicator);
      // remove the damage indicator after a few seconds
      setTimeout(() => {
        damageIndicator.remove();
      }, 3000);
    }
  }

  checkforRegen(target) {
    if (target === "player") {
      let regenerated = false;

      // Shield regeneration
      if (this.playerShield < this.playerShieldMax) {
        const [regenChance, regenAmount] = this.playerShieldRegen;
        if (Math.random() <= regenChance) {
          this.restoreShield(regenAmount, target);
          regenerated = true;
        }
      }

      // Health regeneration
      if (this.playerCoreHP < this.playerCoreMaxHP) {
        const [regenChance, regenAmount] = this.playerHPRegen;
        if (Math.random() <= regenChance) {
          this.healTarget(regenAmount, target);
          regenerated = true;
        }
      }

      return regenerated; // Indicate whether regeneration occurred
    } else if (target === "boss") {
      if (this.bossCurrHP >= this.activeBoss.maxHP) return false; // Early return if boss HP is full

      if (Math.random() <= this.activeBoss.regenChance) {
        this.healTarget(this.activeBoss.regen, target);
        return true;
      }
    }
    return false;
  }

  restoreShield(amount, target, ignore = false) {
    amount = Math.max(1, amount);
    amount = Math.floor(amount);
    if (target === "player") {
      this.playerShield += amount;
      if (!ignore) {
        this.playerShieldGained += amount;
      }
      if (this.playerShield > this.playerShieldMax) {
        this.playerShield = this.playerShieldMax;
      }
      this.ctx.characterStorage.setItem("Psh", this.playerShield);
      this.ctx.characterStorage.setItem("PshG", this.playerShieldGained);
    } else if (target === "boss") {
      // TODO
    }
    this.needsPlayerHealthBarUpdate = true;
    this.needsCombatStatsUIUpdate = true;
    this.updateUIIfNeeded();
  }

  healTarget(amount, target) {
    amount = Math.max(1, amount);
    amount = Math.floor(amount);
    if (target === "player") {
      this.playerCoreHP += amount;
      this.playerHPGained += amount;

      if (this.playerCoreHP > this.playerCoreMaxHP) {
        const difference = this.playerCoreMaxHP - this.playerCoreHP;
        this.playerCoreHP = this.playerCoreMaxHP;
        this.playerHPGained += difference;
      }
      this.ctx.characterStorage.setItem("PhG", this.playerHPGained);
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

      setTimeout(() => {
        healIndicator.remove();
      }, 3000);
    }
    this.needsCombatStatsUIUpdate = true;
    battlesUIModule.updateBattleStatsUI();
    this.updateUIIfNeeded;
  }

  getBossAttack() {
    try {
      if (this.activeBoss === null) {
        console.warn("Getting boss attack index, but active boss is null");
        return null;
      }
      if (
        this.bossNextAttackIndex === null ||
        this.bossNextAttackIndex > this.activeBoss.attacks.length
      ) {
        console.warn(
          "Getting boss attack with index",
          this.bossNextAttackIndex
        );
        // failsafe so the boss at least has an attack to do
        return this.activeBoss.attacks[0];
      }
      return this.activeBoss.attacks[this.bossNextAttackIndex];
    } catch (error) {
      console.error("Error getting boss attack:", error);
    }
  }

  clearEffects() {
    this.bossCurrentBuffs = [];
    this.bossCurrentDebuffs = [];
    this.ctx.characterStorage.setItem("BsDb", this.bossCurrentDebuffs);
    this.needsBossEffectsUIUpdate = true;
    this.updateUIIfNeeded();
  }

  resetPlayerDefensiveTrackers() {
    this.playerShieldLost = 0;
    this.playerHPLost = 0;
    this.ctx.characterStorage.setItem("PhL", this.playerHPLost);
    this.ctx.characterStorage.setItem("PshL", this.playerShieldLost);
    this.needsCombatStatsUIUpdate = true;
    this.updateUIIfNeeded();
  }

  endBattle(result) {
    this.clearEffects();
    if (result === "win") {
      // if the current ticks are lower than the boss tick record, update the tick record
      if (this.activeBoss.tickRecord === 0) {
        this.activeBoss.tickRecord = this.currentBattleTicks;
      } else if (this.currentBattleTicks < this.activeBoss.tickRecord) {
        this.activeBoss.tickRecord = this.currentBattleTicks;
      }
      this.activeBoss.kills++;
      this.bossKillsArray = battlesUIModule.createBossKillArrayAndSave();
      this.ctx.characterStorage.setItem("BctR", this.bossKillsArray);
      this.updatePlayerBossStats();
      this.grantBossRewards(this.activeBoss);
      // check if certain ability skills were used against certain bosses
      this.checkForAbilitySkillsAgainstBoss();
      this.startBattle();
    } else if (result === "loss") {
      this.healTarget(10, "player");
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

  checkForAbilitySkillsAgainstBoss() {
    // this is called on battle won
    // for example, if the player used only cooking skills against the fishing boss,
    // the quest will be marked as complete
    if (this.abilitySkillsThisBattle.length > 1) {
      return;
    }
    for (let i = 0; i < this.abilitySkillsThisBattle.length; i++) {
      const abilitySkill = this.abilitySkillsThisBattle[i];
      const boss = this.activeBoss;
      if (abilitySkill === "melvorD:Cooking" && this.currentBattleTicks < 150) {
        if (boss.skill === "Fishing") {
          this.ExtraPlayerStats.cookTheFish = 1;
        }
      } else if (
        abilitySkill === "melvorD:Thieving" &&
        this.currentBattleTicks < 150
      ) {
        if (boss.skill === "Cooking") {
          this.ExtraPlayerStats.thiefTheChef = 1;
        }
      }
    }
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
            console.warn(`Boss with ID ${bossId} not found.`);
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
      console.warn("Inventory is full!");
    }
    // save the updated loot
    this.ctx.characterStorage.setItem("Plt", this.playerLoot);
    // Update the inventory display
    inventoryUIModule.updateInventoryDisplay(this.ctx);
  }
  grantBossRewards(boss) {
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
      });
    }

    const rewardTier = boss.determineRewardTier();

    // Grant a single random reward from the determined tier
    const tierReward = this.grantSingleRewardFromTier(boss, rewardTier);
    if (tierReward) {
      const [itemId, quantity] = tierReward;
      this.addItemToInventory(itemId, quantity);
      rewards.push(tierReward);
    }

    this.setLastLootDrop(boss, rewardTier, rewards);
    inventoryUIModule.updateInventoryDisplay(this.ctx);
    inventoryUIModule.updateLastLootDropDisplay(this.ctx);
  }

  grantSingleRewardFromTier(boss, tier) {
    let rewardItems;
    switch (tier) {
      case "common":
        rewardItems = boss.commonRewardTier.items;
        this.ExtraPlayerStats.commonRewardHits++;
        this.ctx.characterStorage.setItem(
          "commonRewardHits",
          this.ExtraPlayerStats.commonRewardHits
        );
        break;
      case "uncommon":
        rewardItems = boss.uncommonRewardTier.items;
        this.ExtraPlayerStats.uncommonRewardHits++;
        this.ctx.characterStorage.setItem(
          "uncommonRewardHits",
          this.ExtraPlayerStats.uncommonRewardHits
        );
        break;
      case "rare":
        rewardItems = boss.rareRewardTier.items;
        this.ExtraPlayerStats.rareRewardHits++;
        this.ctx.characterStorage.setItem(
          "rareRewardHits",
          this.ExtraPlayerStats.rareRewardHits
        );
        break;
      case "legendary":
        rewardItems = boss.legendaryRewardTier.items;
        this.ExtraPlayerStats.legendaryRewardHits++;
        this.ctx.characterStorage.setItem(
          "legendaryRewardHits",
          this.ExtraPlayerStats.legendaryRewardHits
        );
        break;
      default:
        console.warn(`Unknown reward tier: ${tier}`);
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
      console.warn(`No rewards available for tier: ${tier}`);
      return null;
    }
  }
  setLastLootDrop(boss, tier, loot) {
    this.lastLootDrop = { boss, tier, loot };
  }
  // helper functions
  getQuantityFromBankItemArray(itemID) {
    const bankArray = game.bank.searchArray;
    for (let i = 0; i < bankArray.length; i++) {
      if (bankArray[i].item.id === itemID) {
        return bankArray[i].qty;
      }
    }
    return 0;
  }
  reduceBossPhysicalDefence(reduction) {
    this.activeBoss.physicalDefense -= reduction;
    this.activeBoss.physicalDefense = Math.max(
      0,
      this.activeBoss.physicalDefense
    );
    this.ctx.characterStorage.setItem("Bpd", this.activeBoss.physicalDefense);
    this.needsCombatStatsUIUpdate = true;
    this.needsBossEffectsUIUpdate = true;
    this.updateUIIfNeeded();
  }
  increaseBossPhysicalDefence(increase) {
    this.activeBoss.physicalDefense += increase;
    this.activeBoss.physicalDefense = Math.min(
      75,
      this.activeBoss.physicalDefense
    );
    this.ctx.characterStorage.setItem("Bpd", this.activeBoss.physicalDefense);
    this.needsCombatStatsUIUpdate = true;
    this.needsBossEffectsUIUpdate = true;
    this.updateUIIfNeeded();
  }
  reduceBossMagicDefence(reduction) {
    this.activeBoss.magicDefense -= reduction;
    this.activeBoss.magicDefense = Math.max(0, this.activeBoss.magicDefense);
    this.ctx.characterStorage.setItem("Bmd", this.activeBoss.magicDefense);
    this.needsCombatStatsUIUpdate = true;
    this.needsBossEffectsUIUpdate = true;
    this.updateUIIfNeeded();
  }
  increaseBossMagicDefence(increase) {
    this.activeBoss.magicDefense += increase;
    this.activeBoss.magicDefense = Math.min(75, this.activeBoss.magicDefense);
    this.ctx.characterStorage.setItem("Bmd", this.activeBoss.magicDefense);
    this.needsCombatStatsUIUpdate = true;
    this.needsBossEffectsUIUpdate = true;
    this.updateUIIfNeeded();
  }
}

export class ExtraPlayerStats {
  constructor() {
    this.totalBossKills = 0;
    this.fastestBossKill = 0;
    this.damageDealt = 0;
    this.highestDamageDealt = 0;
    this.debuffsApplied = 0;
    this.debuffDamageDealt = 0;
    this.highestDebuffDamageDealt = 0;
    this.damageTaken = 0;
    this.highestDamageTaken = 0;
    this.physicalResistReduced = 0;
    this.magicResistReduced = 0;
    this.suppliesUsed = 0;
    // rewards
    this.commonRewardHits = 0;
    this.uncommonRewardHits = 0;
    this.rareRewardHits = 0;
    this.legendaryRewardHits = 0;
  }
}
