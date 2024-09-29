const { loadModule } = mod.getContext(import.meta);

const progessCheckerModule = await loadModule(
  "src/quests/progressCheckers.mjs"
);

export async function init(ctx) {
  try {
    const { SkillingBossesBattleComponent } = await ctx.loadModule(
      "src/components/battles-component.mjs"
    );

    const skillingBossesBattleComponent = new SkillingBossesBattleComponent(
      ctx,
      game
    );

    const battlesContainer = document.getElementById("bosses-content");
    if (!battlesContainer) {
      throw new Error("Battles container not found in DOM!");
    }
    if (!document.querySelector(".battle-container")) {
      skillingBossesBattleComponent.mount(battlesContainer);
      skillingBossesBattleComponent.show();
      const playerHealBtn = document.getElementById("player-heal-btn");
      if (playerHealBtn) {
        playerHealBtn.addEventListener("click", (event) => {
          event.stopPropagation(); // Prevent triggering the details toggle
          repairCoreWithSkillingSupplies(10);
        });
      }
    }
    const playerHealBtnImg = document.getElementById("player-heal-btn-img");
    if (playerHealBtnImg) {
      playerHealBtnImg.src = ctx.getResourceUrl(
        "assets/items/skilling-supplies.svg"
      );
    }
    initializeTierBossSelectButtons(ctx);
    setSupplyAmount();
    updatePlayerHealthBar();
    updatePlayerShieldBar();
    updateBossSelectionList(ctx, "tier1");
    updateBossDisplay(ctx);
    updateBossAttackUI();
    updatePlayerExtraStats();
    game.skillingBosses.updatePlayerBossStats();
    if (game.skillingBosses.currentBattleTicks > 0) {
      updateCurrentCombatStatsUI();
    }
    game.skillingBosses.updateLastAttackInfoUI();
  } catch (error) {
    console.error("Error initializing battles:", error);
    throw error;
  }
  if (game.skillingBosses.currentBattleTicks > 0) {
    createRunAwayButton(ctx);
  }
}

export function setSupplyAmount() {
  game.bank.updateSearchArray();
  const amountOfSupplies = game.skillingBosses.getQuantityFromBankItemArray(
    "smattyBosses:skillingSupplies"
  );
  const supplyAmountElement = document.getElementById("amount-of-supplies");
  if (supplyAmountElement) {
    supplyAmountElement.textContent = amountOfSupplies;
  }
  return amountOfSupplies;
}

export function repairCoreWithSkillingSupplies() {
  const HEAL_PER_SUPPLY = 3;
  const DEFAULT_SUPPLIES_TO_USE = 10;

  const amountOfSupplies = setSupplyAmount();
  const playerCurrentHP = game.skillingBosses.playerCoreHP;
  const playerMaxHP = game.skillingBosses.playerCoreMaxHP;
  const hpNeeded = playerMaxHP - playerCurrentHP;

  if (playerCurrentHP >= playerMaxHP) {
    // TODO: UI warning for full core
    return;
  }

  if (amountOfSupplies === 0) {
    // TODO: UI warning for no supplies
    return;
  }
  const suppliesNeededForFullHeal = Math.ceil(hpNeeded / HEAL_PER_SUPPLY);
  const suppliesToUse = Math.min(
    DEFAULT_SUPPLIES_TO_USE,
    suppliesNeededForFullHeal,
    amountOfSupplies
  );
  const healAmount = suppliesToUse * HEAL_PER_SUPPLY;
  // healing
  game.skillingBosses.healTarget(healAmount, "player");
  game.skillingBosses.ExtraPlayerStats.suppliesUsed += suppliesToUse;
  game.skillingBosses.ctx.characterStorage.setItem(
    "suppliesUsed",
    game.skillingBosses.ExtraPlayerStats.suppliesUsed
  );
  updatePlayerHealthBar();
  // remove supplies from bank
  game.bank.removeItemQuantityByID(
    "smattyBosses:skillingSupplies",
    suppliesToUse
  );
  setSupplyAmount();
}

export function createBossKillArrayAndSave() {
  const bossKillArray = [];
  for (const boss of game.skillingBosses.bosses.values()) {
    bossKillArray.push([boss.kills, boss.tickRecord]);
  }
  return bossKillArray;
}

function createRunAwayButton(ctx) {
  const runAwayButton = document.createElement("button");
  runAwayButton.classList.add("btn", "btn-primary", "z-4");
  runAwayButton.id = "boss-run-away-btn";
  runAwayButton.innerHTML = "Run Away";
  runAwayButton.addEventListener("mousedown", (event) => {
    game.skillingBosses.activeBoss = null;
    game.skillingBosses.currentBattleTicks = null;
    document.getElementById("current-combat-stats").innerHTML =
      "Begin a Battle to track stats";
    actuallyUpdateBossDisplay();
    ctx.characterStorage.setItem("AcBss", null);
    ctx.characterStorage.setItem("Crbt", null);
    // remove the run away button
    runAwayButton.remove();
  });

  const bossImageDiv = document.querySelector("#run-away-btn-container");
  if (bossImageDiv) {
    // clear the container
    bossImageDiv.innerHTML = "";
    bossImageDiv.appendChild(runAwayButton);
  }
  return runAwayButton;
}

function buildBossSelectionList(ctx) {
  const container = document.getElementById("boss-selection-list");
  // Clear existing content
  container.innerHTML = "";

  // Get bosses from the game object
  const bosses = game.skillingBosses.bosses;

  // Create a boss item for each boss
  bosses.forEach((boss) => {
    const bossItem = createBossItem(ctx, boss);
    container.appendChild(bossItem);
    fillBossRewards(ctx, boss);
  });
}

function createBossItem(ctx, boss) {
  try {
    const bossItem = document.createElement("div");
    bossItem.className = "list-group-item";
    bossItem.classList.add(
      "d-flex",
      "flex-column",
      "align-items-start",
      "boss-item"
    );

    let levelReqClass = "text-danger";
    if (
      progessCheckerModule.checkSkillLevel(
        game,
        `melvorD:${boss.skill}`,
        boss.levelRequirement
      ) === 1
    ) {
      levelReqClass = "text-success";
    }
    const levelReqInfo = `
      <div class="${levelReqClass}" style="font-size: 0.8rem; text-align: center; width: 100%;">
        Level ${boss.levelRequirement} required
      </div>
    `;
    let fightButtonText = `<button class="btn btn-primary mt-2 mb-2 w-100">Fight Boss</button>`;
    if (levelReqClass === "text-danger") {
      fightButtonText = ``;
    }
    // Build the boss item
    bossItem.innerHTML = `
    <div class="d-flex w-100 justify-content-between align-items-center">
    <h5 class="mb-1 flex-shrink">${boss.name}</h5>
    <div class="player-skill-tick-info flex-grow" id="boss-player-tick-info" data-boss-id="${boss.id}"></div>
    <small>${boss.stats.maxHP} HP / ${boss.stats.attackPower} ATK</small>
  </div>
  <img src="https://cdn2-main.melvor.net/assets/media/skills/${boss.skill}/${boss.skill}.png" alt="${boss.name}" class="img-fluid rounded-start" style="max-width: 100px;">
    <div class="boss-details d-none mt-3">
    <div>${levelReqInfo}</div>
    ${fightButtonText}
        
      <div class="boss-rewards" id="boss-rewards-${boss.id}">yoooo</div>
    </div>
    `;

    bossItem.addEventListener("click", (event) => {
      const detailsContainer = bossItem.querySelector(".boss-details");
      if (event.target.tagName !== "BUTTON") {
        if (detailsContainer.classList.contains("d-none")) {
          closeAllDetails(); // Close all other details
          detailsContainer.classList.remove("d-none"); // Open this details
        } else {
          detailsContainer.classList.add("d-none"); // Close this details if it's already open
        }
      }
    });

    const fightButton = bossItem.querySelector(".btn-primary");
    if (fightButton) {
      fightButton.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent triggering the details toggle
        startBossFight(ctx, boss);
      });
    }

    return bossItem;
  } catch (error) {
    console.error("Error creating boss item:", error);
  }
}

function closeAllDetails() {
  const allDetails = document.querySelectorAll(".boss-details");
  allDetails.forEach((detail) => detail.classList.add("d-none"));
}

function startBossFight(ctx, boss) {
  // Start the battle to initialize battle-related properties
  game.skillingBosses.activeBoss = boss;
  game.skillingBosses.startBattle();

  // Initialize ability slots and update displays after starting the battle
  initializeAbilitySlots();
  updateBossDisplay(ctx);
  updateBattleStatsUI();
  if (!document.querySelector("#boss-run-away-btn")) {
    createRunAwayButton(ctx);
  }
}

function updateBossDisplay(ctx) {
  if (!game.skillingBosses.activeBoss) {
    return;
  }
  ctx.characterStorage.setItem("AcBss", game.skillingBosses.activeBoss.id);
  actuallyUpdateBossDisplay();
}

export function actuallyUpdateBossDisplay() {
  const bossImage = document.getElementById("boss-image");
  if (game.skillingBosses.activeBoss) {
    bossImage.src = game.skillingBosses.activeBoss.image;
  } else {
    bossImage.src = "";
  }
  const bossName = document.getElementById("boss-name");
  if (game.skillingBosses.activeBoss) {
    bossName.innerHTML = `<h2>${game.skillingBosses.activeBoss.name}</h2>`;
  } else {
    bossName.innerHTML = "Select A Boss";
  }
}

export function updateAbilityProgressUI() {
  const bossesContent = document.getElementById("skilling-bosses-container");
  if (!bossesContent || bossesContent.classList.contains("d-none")) {
    return;
  }

  const skillLoopItems = document.querySelectorAll(".skill-loop-item");
  if (skillLoopItems.length === 0) {
    return;
  }

  const skillingBosses = game.skillingBosses;
  const equippedAbilities = skillingBosses.equippedAbilities;
  const activeAbilitySlot = skillingBosses.activeAbilitySlot;
  const activeAbilityTimer = skillingBosses.activeAbilityTimer;

  skillLoopItems.forEach((itemElement, index) => {
    const ability = equippedAbilities[index];

    const progressBar = itemElement.querySelector(
      ".skill-loop-item-progress-bar"
    );
    const progressBarText = itemElement.querySelector(".progress-bar-text");
    const abilityNameElement = itemElement.querySelector(
      ".skill-loop-item-name"
    );
    const abilityIconElement = itemElement.querySelector(
      ".skill-loop-item-icon img"
    );

    if (ability) {
      if (abilityNameElement.textContent !== ability.name) {
        abilityNameElement.textContent = ability.name;
      }

      if (abilityIconElement.getAttribute("src") !== ability.icon) {
        abilityIconElement.src = ability.icon;
        abilityIconElement.alt = ability.name;
      }

      if (index < activeAbilitySlot) {
        if (progressBar.style.width !== "100%") {
          progressBar.style.width = "100%";
        }
        const progressText = `${ability.cooldown} / ${ability.cooldown}`;
        if (progressBarText.textContent !== progressText) {
          progressBarText.textContent = progressText;
        }
      } else if (index === activeAbilitySlot) {
        const abilityCooldown = ability.cooldown;
        const timeElapsed = abilityCooldown - activeAbilityTimer;
        const progressPercentage = (timeElapsed / abilityCooldown) * 100;

        const progressWidth = `${progressPercentage}%`;
        if (progressBar.style.width !== progressWidth) {
          progressBar.style.width = progressWidth;
        }

        const progressText = `${Math.floor(timeElapsed)} / ${abilityCooldown}`;
        if (progressBarText.textContent !== progressText) {
          progressBarText.textContent = progressText;
        }
      } else {
        if (progressBar.style.width !== "0%") {
          progressBar.style.width = "0%";
        }
        const progressText = `0 / ${ability.cooldown}`;
        if (progressBarText.textContent !== progressText) {
          progressBarText.textContent = progressText;
        }
      }
    } else {
      if (abilityNameElement.textContent !== "No Ability") {
        abilityNameElement.textContent = "No Ability";
      }

      const defaultIconSrc = "";
      if (abilityIconElement.getAttribute("src") !== defaultIconSrc) {
        abilityIconElement.src = defaultIconSrc;
        abilityIconElement.alt = "No Ability";
      }

      if (progressBar.style.width !== "0%") {
        progressBar.style.width = "0%";
      }
      if (progressBarText.textContent !== "") {
        progressBarText.textContent = "";
      }
    }
  });
}

export function initializeAbilitySlots() {
  const skillLoopItems = document.querySelectorAll(".skill-loop-item");

  skillLoopItems.forEach((itemElement, index) => {
    const ability = game.skillingBosses.equippedAbilities[index];
    const abilityNameElement = itemElement.querySelector(
      ".skill-loop-item-name"
    );
    const abilityIconElement = itemElement.querySelector(
      ".skill-loop-item-icon img"
    );

    if (ability) {
      abilityNameElement.textContent = ability.name;
      abilityIconElement.src = ability.icon;
      abilityIconElement.alt = ability.name;
    } else {
      abilityNameElement.textContent = "No Ability";
      abilityIconElement.src = ""; // Or default icon
      abilityIconElement.alt = "No Ability";
    }

    // Initialize progress bars to 0%
    const progressBar = itemElement.querySelector(
      ".skill-loop-item-progress-bar"
    );
    progressBar.style.width = "0%";
  });
}

export function updateBattleStatsUI() {
  // Early return if the boss HP bar is not present
  const bossHPBarInner = document.querySelector(".boss-hp-bar-inner");
  if (!bossHPBarInner) {
    return;
  }

  const bossesContent = document.getElementById("skilling-bosses-container");
  if (!bossesContent || bossesContent.classList.contains("d-none")) {
    return;
  }

  const skillingBosses = game.skillingBosses;

  if (skillingBosses.currentBattleTicks > 0) {
    updateCurrentCombatStatsUI();
  }
  const bossAttackPowerElement = document.getElementById("boss-attack-power");
  const bossCurrentHPElement = document.getElementById("boss-current-hp");
  const bossMaxHPElement = document.getElementById("boss-max-hp");
  const bossHPTextElement = document.getElementById("boss-hp-text");
  const playerCurrentHPElement = document.getElementById("player-current-hp");
  const playerMaxHPElement = document.getElementById("player-max-hp");
  const playerHPRegenElement = document.getElementById("player-regen");
  const bossNextAttackElement = document.getElementById("boss-next-attack");
  const bossAttackTimerElement = document.getElementById("boss-attack-timer");
  const bossPhysicalDefenseElement = document.getElementById(
    "boss-physical-defense"
  );
  const bossMagicDefenseElement = document.getElementById("boss-magic-defense");
  const bossRegenElement = document.getElementById("boss-regen");
  const bossDefensiveStatsInfo = document.getElementById(
    "boss-defensive-stats-info"
  );
  const playerShieldElement = document.getElementById("player-shield-current");
  const playerShieldMaxElement = document.getElementById("player-shield-max");
  const playerShieldRegenElement = document.getElementById(
    "player-shield-regen"
  );
  const playerPhysicalResistanceElement = document.getElementById(
    "player-physical-defence"
  );
  const playerMagicResistanceElement = document.getElementById(
    "player-magic-defence"
  );

  // Store boss and player stats in variables
  const bossCurrHP = skillingBosses.bossCurrHP;
  const bossMaxHP = skillingBosses.bossMaxHP;
  const bossHPPercentage = (bossCurrHP / bossMaxHP) * 100;
  const playerCurrHP = skillingBosses.playerCoreHP;
  const playerMaxHP = skillingBosses.playerCoreMaxHP;
  const playerHPRegenChance = skillingBosses.playerHPRegen[0];
  const playerHPRegenAmount = skillingBosses.playerHPRegen[1];
  const playerShield = skillingBosses.playerShield;
  const playerShieldMax = skillingBosses.playerShieldMax;
  const playerShieldRegenChance = skillingBosses.playerShieldRegen[0];
  const playerShieldRegenAmount = skillingBosses.playerShieldRegen[1];
  const playerPhysicalResistance = skillingBosses.playerPhysicalResistance;
  const playerMagicResistance = skillingBosses.playerMagicResistance;

  const bossCurrentHPText = `${bossCurrHP} `;
  if (bossCurrentHPElement.textContent !== bossCurrentHPText) {
    bossCurrentHPElement.textContent = bossCurrentHPText;
  }

  const bossMaxHPText = ` ${bossMaxHP}`;
  if (bossMaxHPElement.textContent !== bossMaxHPText) {
    bossMaxHPElement.textContent = bossMaxHPText;
  }

  const bossHPBarWidth = `${bossHPPercentage}%`;
  if (
    bossHPBarInner.style.getPropertyValue("--hp-percentage") !== bossHPBarWidth
  ) {
    bossHPBarInner.style.setProperty("--hp-percentage", bossHPBarWidth);
  }

  const bossHPText = `${bossCurrHP} / ${bossMaxHP}`;
  if (bossHPTextElement.textContent !== bossHPText) {
    bossHPTextElement.textContent = bossHPText;
  }
  const playerShieldText = `${playerShield}`;
  if (playerShieldElement.textContent !== playerShieldText) {
    playerShieldElement.textContent = playerShieldText;
  }
  const playerShieldMaxText = ` ${playerShieldMax}`;
  if (playerShieldMaxElement.textContent !== playerShieldMaxText) {
    playerShieldMaxElement.textContent = playerShieldMaxText;
  }

  const playerCurrentHPText = `${playerCurrHP} `;
  if (playerCurrentHPElement.textContent !== playerCurrentHPText) {
    playerCurrentHPElement.textContent = playerCurrentHPText;
  }
  const playerHPRegenText = `${
    playerHPRegenChance * 100
  } % / ${playerHPRegenAmount}`;
  if (playerHPRegenElement.textContent !== playerHPRegenText) {
    playerHPRegenElement.textContent = playerHPRegenText;
  }

  const playerMaxHPText = ` ${playerMaxHP}`;
  if (playerMaxHPElement.textContent !== playerMaxHPText) {
    playerMaxHPElement.textContent = playerMaxHPText;
  }

  const playerShieldRegenText = `${Math.floor(
    playerShieldRegenChance * 100
  )} % / ${playerShieldRegenAmount}`;
  if (playerShieldRegenElement.textContent !== playerShieldRegenText) {
    playerShieldRegenElement.textContent = playerShieldRegenText;
  }
  const playerPhysicalResistanceText = `${playerPhysicalResistance} %`;
  if (
    playerPhysicalResistanceElement.textContent !== playerPhysicalResistanceText
  ) {
    playerPhysicalResistanceElement.textContent = playerPhysicalResistanceText;
  }
  const playerMagicResistanceText = `${playerMagicResistance} %`;
  if (playerMagicResistanceElement.textContent !== playerMagicResistanceText) {
    playerMagicResistanceElement.textContent = playerMagicResistanceText;
  }

  if (skillingBosses.activeBoss) {
    const physicalDefenseText = `${skillingBosses.activeBoss.physicalDefense} %`;
    if (bossPhysicalDefenseElement.textContent !== physicalDefenseText) {
      bossPhysicalDefenseElement.textContent = physicalDefenseText;
    }

    const magicDefenseText = `${skillingBosses.activeBoss.magicDefense} %`;
    if (bossMagicDefenseElement.textContent !== magicDefenseText) {
      bossMagicDefenseElement.textContent = magicDefenseText;
    }

    const regenText = `${skillingBosses.activeBoss.regenChance * 100} % / ${
      skillingBosses.activeBoss.regen
    } HP`;
    if (bossRegenElement.textContent !== regenText) {
      bossRegenElement.textContent = regenText;
    }
  }
  let HTMLContent = ``;
  if (bossDefensiveStatsInfo) {
    if (skillingBosses.activeBoss) {
      if (skillingBosses.currentBattleDamageDealt > 0) {
        HTMLContent += `<div>Lost ${skillingBosses.currentBattleDamageDealt} HP</div>`;
      }
      if (skillingBosses.currentBattleBossHealed > 0) {
        HTMLContent += `<div>Healed ${skillingBosses.currentBattleBossHealed} HP</div>`;
      }
      if (skillingBosses.currentBattleBossDamageReduced > 0) {
        HTMLContent += `<div>Reduced ${skillingBosses.currentBattleBossDamageReduced} Damage</div>`;
      }
      if (bossDefensiveStatsInfo.innerHTML !== HTMLContent) {
        bossDefensiveStatsInfo.innerHTML = HTMLContent;
      }
    }
    if (bossAttackPowerElement && skillingBosses.activeBoss) {
      bossAttackPowerElement.textContent =
        skillingBosses.activeBoss.attackPower;
    }
  }
}

export function updateCurrentCombatStatsUI() {
  const currentCombatStats = document.getElementById("current-combat-stats");
  if (!currentCombatStats) return;
  let avgDamagePerAbility =
    game.skillingBosses.currentBattleDamageDealt /
    game.skillingBosses.currentBattleAbilitiesUsed;
  let HTMLContent = `
    <div>Current Battle's Total Ticks: ${game.skillingBosses.currentBattleTicks}</div>
    <div>Total Damage Dealt: ${game.skillingBosses.currentBattleDamageDealt}</div>
    <div>Total Abilities Used: ${game.skillingBosses.currentBattleAbilitiesUsed}</div>
    `;
  if (game.skillingBosses.currentBattleAbilitiesUsed > 0) {
    avgDamagePerAbility =
      game.skillingBosses.currentBattleDamageDealt /
      game.skillingBosses.currentBattleAbilitiesUsed;
    HTMLContent += `<div>Avg. Damage/Ability: ${Math.floor(
      avgDamagePerAbility
    )}</div>`;
  }
  if (game.skillingBosses.currentBattleDebuffDamageDealt > 0) {
    HTMLContent += `<div>Debuff Damage Dealt: ${game.skillingBosses.currentBattleDebuffDamageDealt}</div>`;
  }
  currentCombatStats.innerHTML = HTMLContent;
}

async function fillBossRewards(ctx, boss) {
  try {
    const itemImagesHelper = await ctx.loadModule("src/helpers/itemImages.mjs");
    const rewardsContainer = document.getElementById(`boss-rewards-${boss.id}`);
    if (rewardsContainer) {
      let htmlContent = "";

      const tiers = [
        {
          name: "Always",
          rewards: boss.alwaysRewardTier,
          color: "#111111AA",
          chance: 100,
        },
        {
          name: "Common",
          rewards: boss.commonRewardTier,
          color: "#2196F3AA",
          chance: boss.rewardProbabilities.common * 100,
        },
        {
          name: "Uncommon",
          rewards: boss.uncommonRewardTier,
          color: "#4CAF50AA",
          chance: boss.rewardProbabilities.uncommon * 100,
        },
        {
          name: "Rare",
          rewards: boss.rareRewardTier,
          color: "#FF5722AA",
          chance: boss.rewardProbabilities.rare * 100,
        },
        {
          name: "Legendary",
          rewards: boss.legendaryRewardTier,
          color: "#9C27B0AA",
          chance: boss.rewardProbabilities.legendary * 100,
        },
      ];

      tiers.forEach((tier) => {
        if (tier.rewards && tier.rewards.items.length > 0) {
          htmlContent += `
            <div class="reward-tier" style="border-color: ${tier.color};">
              <h6 class="reward-tier-title" style="background-color: ${
                tier.color
              };">
                ${tier.name} <span class="reward-tier-chance">${
            tier.chance
          } %</span>
              </h6>
              <div class="reward-items">
                ${tier.rewards.items
                  .map((item) => {
                    const itemObj = game.items.getObjectByID(item[0]);
                    const imageUrl = itemImagesHelper.getImageUrlByItemID(
                      ctx,
                      item[0]
                    );
                    return `
                      <div class="reward-item">
                        <img src="${imageUrl}" alt="${
                      itemObj?.name || "Unknown Item"
                    }" class="reward-item-image">
                        <div class="reward-item-details">
                          <span class="reward-item-name">${
                            itemObj?.name || "Unknown Item"
                          }</span>
                          <span class="reward-item-quantity">${item[1]}-${
                      item[2]
                    }</span>
                        </div>
                      </div>
                    `;
                  })
                  .join("")}
              </div>
            </div>
          `;
        }
      });

      rewardsContainer.innerHTML = htmlContent;
    }
  } catch (error) {
    console.error("Error filling boss rewards:", error);
  }
}

export function updateBossEffects() {
  const bossEffectsContainer = document.querySelector(
    ".boss-effects-container"
  );
  if (!bossEffectsContainer) return;

  const bossBuffList = bossEffectsContainer.querySelector(".boss-buff-list");
  const bossDebuffList =
    bossEffectsContainer.querySelector(".boss-debuff-list");

  // Clear existing effects
  bossBuffList.innerHTML = "";
  bossDebuffList.innerHTML = "";

  if (!game.skillingBosses.activeBoss) return;

  // Update buffs
  game.skillingBosses.bossCurrentBuffs.forEach((buff) => {
    const buffElement = createEffectElement(buff, "buff");
    if (buffElement) {
      bossBuffList.appendChild(buffElement);
    }
  });

  // Update debuffs
  game.skillingBosses.bossCurrentDebuffs.forEach((debuff) => {
    const debuffElement = createEffectElement(debuff, "debuff");
    if (debuffElement) {
      bossDebuffList.appendChild(debuffElement);
    }
  });
}

function createEffectElement(effect, type) {
  // [effectId, remainingDuration, damagePerTick, totalDamage]
  if (effect[1] === 0) {
    removeExpiredEffectElements();
    return;
  }
  const effectElement = document.createElement("div");
  effectElement.className = `boss-${type}`;
  effectElement.dataset.effectId = effect[0];
  effectElement.dataset.duration = effect[1];
  content = `
    <div class="boss-${type}-details">
      <span class="boss-${type}-name">${
    game.skillingBosses.getEffectById(effect[0]).name
  }</span>
      <span class="boss-${type}-description">
  `;
  // add the description
  if (effect[2] > 0) {
    if (effect[0] === "armorReduction") {
      content += `Reduces the Physical Resist of the target by ${effect[2]}`;
    } else if (effect[0] === "magicResistReduction") {
      content += `Reduces the Magic Resist of the target by ${effect[2]}`;
    } else if (effect[0] === "stuckArrow") {
      content += `On expiration, deals ${effect[2]} damage to the target`;
    } else if (effect[0] === "bolsterAttackPower") {
      content += `Increases Attack Power by ${effect[2]}`;
    } else if (effect[0] === "bolsterResistance") {
      content += `Increases Resistances by ${effect[2]}`;
    } else {
      let description = `Deals ${effect[2]} damage per tick`;
      content += description;
    }
  } else {
    content += `${game.skillingBosses.getEffectById(effect[0]).description}`;
  }

  if (effect[1] !== 999) {
    content += `
  </span>
  <span class="boss-${type}-progress-text">
        Removed in ${effect[1]} battle ticks
      </span>
    </div>
  `;
  }
  effectElement.innerHTML = content;
  return effectElement;
}

function removeExpiredEffectElements() {
  const effectElements = document.querySelectorAll(".boss-buff, .boss-debuff");
  for (let i = effectElements.length - 1; i >= 0; i--) {
    const effectElement = effectElements[i];
    const duration = effectElement.dataset.duration;
    if (duration === 0) {
      effectElement.remove();
    }
  }
}

export function updateBossAttackUI() {
  const mainGameContainer = document.getElementById(
    "skilling-bosses-container"
  );
  if (!mainGameContainer || mainGameContainer.classList.contains("d-none")) {
    return;
  }
  const bossAttackInfo = document.querySelector(".next-attack.ability-item");
  if (!bossAttackInfo) {
    console.warn("Boss attack info not found in DOM!");
    return;
  }
  if (game.skillingBosses.activeBoss === null) {
    bossAttackInfo.style.display = "none";
    console.warn("Active boss is null, cannot update boss attack");
    return;
  }
  const bossAttack = game.skillingBosses.getBossAttack();
  if (!bossAttack) {
    console.warn("No boss attack found");
    bossAttackInfo.style.display = "none";
    return;
  }
  bossAttackInfo.style.display = "flex";

  const bossAttackNameElement = document.getElementById("boss-attack-name");
  const bossAttackTypeElement = document.getElementById("boss-attack-type");
  const bossAttackDescriptionElement = document.getElementById(
    "boss-attack-description"
  );
  const bossAttackDamageElement = document.getElementById("boss-attack-damage");
  const bossAttackCooldownElement = document.getElementById(
    "boss-attack-cooldown"
  );
  const bossAttackTimerElement = document.getElementById("boss-attack-timer");
  const bossAttackStunnedElement = document.getElementById(
    "boss-attack-stunned"
  );

  if (bossAttackNameElement)
    bossAttackNameElement.textContent = bossAttack.name;
  if (bossAttackTypeElement)
    bossAttackTypeElement.textContent = bossAttack.type;
  if (bossAttackDescriptionElement)
    bossAttackDescriptionElement.textContent = bossAttack.description;
  if (bossAttackDamageElement)
    bossAttackDamageElement.textContent =
      game.skillingBosses.activeBoss.attackPower * bossAttack.damageModifier;
  if (bossAttackCooldownElement)
    bossAttackCooldownElement.textContent = bossAttack.cooldown;

  if (bossAttackTimerElement)
    bossAttackTimerElement.textContent = game.skillingBosses.bossAttackTimer;
  if (bossAttackStunnedElement && game.skillingBosses.bossStunDuration > 0)
    bossAttackStunnedElement.textContent = `Stunned! (${game.skillingBosses.bossStunDuration})`;
  if (bossAttackStunnedElement && game.skillingBosses.bossStunDuration <= 0)
    bossAttackStunnedElement.textContent = "";
}

export function updateBossOffensiveInfoUI() {
  const bossOffensiveStatsInfo = document.getElementById(
    "boss-offensive-stats-info"
  );
  if (bossOffensiveStatsInfo) {
    let HTMLContent = ``;
    if (game.skillingBosses.activeBoss) {
      if (
        game.skillingBosses.playerShieldLost > 0 ||
        game.skillingBosses.playerHPLost > 0
      ) {
        HTMLContent += `
        <div>Dealt ${
          game.skillingBosses.playerShieldLost +
          game.skillingBosses.playerHPLost
        } Damage</div>
        `;
      }
      if (game.skillingBosses.bossAbilitiesUsed > 0) {
        HTMLContent += `
        <div>Used ${game.skillingBosses.bossAbilitiesUsed} Abilities</div>
        <div>Avg. Damage/Ability: ${Math.floor(
          (game.skillingBosses.playerShieldLost +
            game.skillingBosses.playerHPLost) /
            game.skillingBosses.bossAbilitiesUsed
        )}</div>
        `;
      }
      bossOffensiveStatsInfo.innerHTML = HTMLContent;
    }
  }
}

export function updateCurrentCombatPlayerDefenseStatsUI() {
  const currentCombatPlayerDefenseStats = document.getElementById(
    "current-combat-player-defense-stats"
  );
  if (!currentCombatPlayerDefenseStats) return;
  const currentBattleShieldLost = game.skillingBosses.playerShieldLost;
  const currentBattleHPLost = game.skillingBosses.playerHPLost;
  const currentBattleShieldGained = game.skillingBosses.playerShieldGained;
  const currentBattleHPGained = game.skillingBosses.playerHPGained;
  let HTMLContent = ``;
  if (currentBattleShieldGained > 0) {
    HTMLContent += `<div>Restored ${currentBattleShieldGained} Shield</div>`;
  }
  if (currentBattleShieldLost > 0) {
    HTMLContent += `<div>Lost ${currentBattleShieldLost} Shield</div>`;
  }
  if (currentBattleHPLost > 0) {
    HTMLContent += `<div>Lost ${currentBattleHPLost} HP</div>`;
  }
  if (currentBattleHPGained > 0) {
    HTMLContent += `<div>Healed ${currentBattleHPGained} HP</div>`;
  }
  currentCombatPlayerDefenseStats.innerHTML = HTMLContent;
}
export function updatePlayerHealthBar() {
  const healthBar = document.getElementById("player-health-bar");
  if (!healthBar) return;

  const currentHP = game.skillingBosses.playerCoreHP;
  const maxHP = game.skillingBosses.playerCoreMaxHP;
  const healthPercentage = (currentHP / maxHP) * 100;

  healthBar.style.width = `${healthPercentage}%`;

  // Optional: Update color based on health percentage
  if (healthPercentage > 50) {
    healthBar.style.backgroundColor = "#0bc00bcb";
  } else if (healthPercentage > 25) {
    healthBar.style.backgroundColor = "#1cc00baa";
  } else {
    healthBar.style.backgroundColor = "#2dc00b99";
  }
}

export function updatePlayerShieldBar() {
  const shieldBar = document.getElementById("player-shield-bar");
  if (!shieldBar) return;

  const currentShield = game.skillingBosses.playerShield;
  const maxShield = game.skillingBosses.playerShieldMax;
  const shieldPercentage = (currentShield / maxShield) * 100;

  shieldBar.style.width = `${shieldPercentage}%`;

  // Optional: Update color based on shield percentage
  if (shieldPercentage > 50) {
    shieldBar.style.backgroundColor = "#26C6DACC"; // Light Blue
  } else if (shieldPercentage > 25) {
    shieldBar.style.backgroundColor = "#03A9F4BB"; // Blue
  } else {
    shieldBar.style.backgroundColor = "#1E88E5AA"; // Dark Blue
  }
}

export function updatePlayerExtraStats() {
  function update() {
    const playerExtraStatsContainer = document.getElementById(
      "player-extra-stats-container"
    );
    if (!playerExtraStatsContainer) return;
    playerExtraStatsContainer.innerHTML = "";
    let htmlContent = "";
    if (game.skillingBosses.ExtraPlayerStats.totalBossKills > 0) {
      htmlContent += `<div>Total Boss Kills: ${game.skillingBosses.ExtraPlayerStats.totalBossKills}</div>`;
    }
    if (game.skillingBosses.ExtraPlayerStats.fastestBossKill > 0) {
      htmlContent += `<div>Fastest Boss Kill: ${game.skillingBosses.ExtraPlayerStats.fastestBossKill}</div>`;
    }
    if (game.skillingBosses.ExtraPlayerStats.damageDealt > 0) {
      htmlContent += `<div>Total Damage Dealt: ${game.skillingBosses.ExtraPlayerStats.damageDealt}</div>`;
    }
    if (game.skillingBosses.ExtraPlayerStats.highestDamageDealt > 0) {
      htmlContent += `<div>Highest Damage Dealt: ${game.skillingBosses.ExtraPlayerStats.highestDamageDealt}</div>`;
    }
    if (game.skillingBosses.ExtraPlayerStats.debuffsApplied > 0) {
      htmlContent += `<div>Debuffs Applied: ${game.skillingBosses.ExtraPlayerStats.debuffsApplied}</div>`;
    }
    if (game.skillingBosses.ExtraPlayerStats.debuffDamageDealt > 0) {
      htmlContent += `<div>Total Debuff Damage Dealt: ${game.skillingBosses.ExtraPlayerStats.debuffDamageDealt}</div>`;
    }
    if (game.skillingBosses.ExtraPlayerStats.highestDebuffDamageDealt > 0) {
      htmlContent += `<div>Highest Debuff Damage Dealt: ${game.skillingBosses.ExtraPlayerStats.highestDebuffDamageDealt}</div>`;
    }
    if (game.skillingBosses.ExtraPlayerStats.damageTaken > 0) {
      htmlContent += `<div>Total Damage Taken: ${game.skillingBosses.ExtraPlayerStats.damageTaken}</div>`;
    }
    if (game.skillingBosses.ExtraPlayerStats.highestDamageTaken > 0) {
      htmlContent += `<div>Highest Damage Taken: ${game.skillingBosses.ExtraPlayerStats.highestDamageTaken}</div>`;
    }
    if (game.skillingBosses.ExtraPlayerStats.physicalResistReduced > 0) {
      htmlContent += `<div>Physical Resist Reduced: ${game.skillingBosses.ExtraPlayerStats.physicalResistReduced}</div>`;
    }
    if (game.skillingBosses.ExtraPlayerStats.magicResistReduced > 0) {
      htmlContent += `<div>Magic Resist Reduced: ${game.skillingBosses.ExtraPlayerStats.magicResistReduced}</div>`;
    }
    if (game.skillingBosses.ExtraPlayerStats.suppliesUsed > 0) {
      htmlContent += `<div>Skilling Supplies Used: ${game.skillingBosses.ExtraPlayerStats.suppliesUsed}</div>`;
    }
    if (game.skillingBosses.ExtraPlayerStats.commonRewardHits > 0) {
      htmlContent += `<div>Common Rewards: ${game.skillingBosses.ExtraPlayerStats.commonRewardHits}</div>`;
    }
    if (game.skillingBosses.ExtraPlayerStats.uncommonRewardHits > 0) {
      htmlContent += `<div>Uncommon Rewards: ${game.skillingBosses.ExtraPlayerStats.uncommonRewardHits}</div>`;
    }
    if (game.skillingBosses.ExtraPlayerStats.rareRewardHits > 0) {
      htmlContent += `<div>Rare Rewards: ${game.skillingBosses.ExtraPlayerStats.rareRewardHits}</div>`;
    }
    if (game.skillingBosses.ExtraPlayerStats.legendaryRewardHits > 0) {
      htmlContent += `<div>Legendary Rewards: ${game.skillingBosses.ExtraPlayerStats.legendaryRewardHits}</div>`;
    }
    playerExtraStatsContainer.innerHTML = htmlContent;
  }
  update();
}

export function initializeTierBossSelectButtons(ctx) {
  const tier1BossSelectButton = document.getElementById("tier-1-boss-select");
  const tier2BossSelectButton = document.getElementById("tier-2-boss-select");
  const tier3BossSelectButton = document.getElementById("tier-3-boss-select");
  if (tier1BossSelectButton) {
    tier1BossSelectButton.addEventListener("mousedown", (event) => {
      updateBossSelectionList(ctx, "tier1");
    });
  }
  if (tier2BossSelectButton) {
    tier2BossSelectButton.addEventListener("mousedown", (event) => {
      updateBossSelectionList(ctx, "tier2");
    });
  }
  if (tier3BossSelectButton) {
    tier3BossSelectButton.addEventListener("mousedown", (event) => {
      updateBossSelectionList(ctx, "tier3");
    });
  }
  tier2BossSelectButton.disabled = true;
  if (game.skillingBosses.currentMainQuest > 9) {
    tier2BossSelectButton.disabled = false;
  }
  tier3BossSelectButton.disabled = true;
}

function updateBossSelectionList(ctx, tier) {
  const container = document.getElementById("boss-selection-list");
  if (!container) return;
  let bosses = [];
  switch (tier) {
    case "tier1":
      bosses = getBossesByIDRange(0, 13);
      container.innerHTML = "";
      bosses.forEach((boss) => {
        const bossItem = createBossItem(ctx, boss);

        container.appendChild(bossItem);
        fillBossRewards(ctx, boss);
        game.skillingBosses.updatePlayerBossStats();
      });
      break;
    case "tier2":
      container.innerHTML = "";
      bosses = getBossesByIDRange(14, 27);
      bosses.forEach((boss) => {
        const bossItem = createBossItem(ctx, boss);

        container.appendChild(bossItem);
        fillBossRewards(ctx, boss);
        game.skillingBosses.updatePlayerBossStats();
      });
      break;
    case "tier3":
      container.innerHTML = "";
      break;
    default:
      console.warn("Invalid tier for boss selection list:", tier);
      return;
  }
}

function getBossesByIDRange(rangeStart, rangeEnd) {
  const bosses = [];
  for (let i = rangeStart; i <= rangeEnd; i++) {
    const boss = game.skillingBosses.getBossById(i);
    if (boss) {
      bosses.push(boss);
    }
  }
  return bosses;
}
