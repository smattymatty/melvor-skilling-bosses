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
    }
    buildBossSelectionList(ctx);
    updateBossDisplay(ctx);
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

    // Build the boss item
    bossItem.innerHTML = `
    <div class="d-flex w-100 justify-content-between align-items-center">
    <h5 class="mb-1 flex-shrink">${boss.name}</h5>
    <div class="player-skill-tick-info flex-grow" id="boss-player-tick-info" data-boss-id="${
      boss.id
    }"></div>
    <small>${boss.stats.maxHP} HP / ${boss.stats.attackPower} ATK</small>
  </div>
  <img src="https://cdn2-main.melvor.net/assets/media/skills/${boss.skill}/${
      boss.skill
    }.png" alt="${
      boss.name
    }" class="img-fluid rounded-start" style="max-width: 100px;">
    <div class="boss-details d-none mt-3">
    <button class="btn btn-primary mt-2 mb-2 w-100">Fight Boss</button>
        <p class="mb-1">Physical Reduction: ${boss.stats.physicalDefense}%</p>
    <p class="mb-1">Magic Reduction: ${boss.stats.magicDefense}%</p>
    <p class="mb-1">Regen: ${boss.stats.regen}</p>
      <h6>Boss Attacks:</h6>
      <ul>
        ${boss.attacks
          .map((attack) => `<li>${attack.name}: ${attack.damage} damage</li>`)
          .join("")}
      </ul>
      <div class="boss-rewards" id="boss-rewards-${boss.id}">yoooo</div>
    </div>
    `;

    // Add click event to toggle boss details
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

    // Add click event for the "Fight Boss" button
    const fightButton = bossItem.querySelector(".btn-primary");
    fightButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent triggering the details toggle
      startBossFight(ctx, boss);
    });

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
  // Set the active boss
  game.skillingBosses.setActiveBoss(boss.id);
  ctx.characterStorage.setItem("AcBss", game.skillingBosses.activeBoss.id);
  // Start the battle to initialize battle-related properties
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
    bossImage.src = "https://via.placeholder.com/200";
  }
  const bossName = document.getElementById("boss-name");
  if (game.skillingBosses.activeBoss) {
    bossName.textContent = game.skillingBosses.activeBoss.name;
  } else {
    bossName.textContent = "Select A Boss";
  }
}

export function updateAbilityProgressUI() {
  // Early return if UI is not visible
  const bossesContent = document.getElementById("skilling-bosses-container");
  if (!bossesContent || bossesContent.classList.contains("d-none")) {
    // UI is not visible, no need to update
    return;
  }

  const skillLoopItems = document.querySelectorAll(".skill-loop-item");
  if (skillLoopItems.length === 0) {
    // No skill loop items to update
    return;
  }

  // Cache game data to avoid multiple property accesses
  const skillingBosses = game.skillingBosses;
  const equippedAbilities = skillingBosses.equippedAbilities;
  const activeAbilitySlot = skillingBosses.activeAbilitySlot;
  const activeAbilityTimer = skillingBosses.activeAbilityTimer;

  skillLoopItems.forEach((itemElement, index) => {
    const ability = equippedAbilities[index];

    // Cache DOM elements to minimize queries
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
      // Update ability name if changed
      if (abilityNameElement.textContent !== ability.name) {
        abilityNameElement.textContent = ability.name;
      }

      // Update ability icon if changed
      if (abilityIconElement.getAttribute("src") !== ability.icon) {
        abilityIconElement.src = ability.icon;
        abilityIconElement.alt = ability.name;
      }

      if (index < activeAbilitySlot) {
        // Abilities before the current slot are completed
        if (progressBar.style.width !== "100%") {
          progressBar.style.width = "100%";
        }
        const progressText = `${ability.cooldown} / ${ability.cooldown}`;
        if (progressBarText.textContent !== progressText) {
          progressBarText.textContent = progressText;
        }
      } else if (index === activeAbilitySlot) {
        // Current ability slot
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
        // Abilities after the current slot are yet to activate
        if (progressBar.style.width !== "0%") {
          progressBar.style.width = "0%";
        }
        const progressText = `0 / ${ability.cooldown}`;
        if (progressBarText.textContent !== progressText) {
          progressBarText.textContent = progressText;
        }
      }
    } else {
      // No ability equipped in this slot
      if (abilityNameElement.textContent !== "No Ability") {
        abilityNameElement.textContent = "No Ability";
      }

      // Set default icon if not already set
      const defaultIconSrc = ""; // Replace with default image path if available
      if (abilityIconElement.getAttribute("src") !== defaultIconSrc) {
        abilityIconElement.src = defaultIconSrc;
        abilityIconElement.alt = "No Ability";
      }

      // Progress bar is empty
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

  // Early return if the UI is not visible
  const bossesContent = document.getElementById("skilling-bosses-container");
  if (!bossesContent || bossesContent.classList.contains("d-none")) {
    return;
  }

  const skillingBosses = game.skillingBosses;

  // Update current combat stats UI only if there are battle ticks
  if (skillingBosses.currentBattleTicks > 0) {
    updateCurrentCombatStatsUI();
  }

  const bossCurrentHPElement = document.getElementById("boss-current-hp");
  const bossMaxHPElement = document.getElementById("boss-max-hp");
  const bossHPTextElement = document.getElementById("boss-hp-text");
  const playerCurrentHPElement = document.getElementById("player-current-hp");
  const playerMaxHPElement = document.getElementById("player-max-hp");
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

  // Store boss and player stats in variables
  const bossCurrHP = skillingBosses.bossCurrHP;
  const bossMaxHP = skillingBosses.bossMaxHP;
  const bossHPPercentage = (bossCurrHP / bossMaxHP) * 100;
  const playerCurrHP = skillingBosses.playerCoreHP;
  const playerMaxHP = skillingBosses.playerCoreMaxHP;

  // Update Boss HP if changed
  const bossCurrentHPText = `${bossCurrHP} `;
  if (bossCurrentHPElement.textContent !== bossCurrentHPText) {
    bossCurrentHPElement.textContent = bossCurrentHPText;
  }

  const bossMaxHPText = ` ${bossMaxHP}`;
  if (bossMaxHPElement.textContent !== bossMaxHPText) {
    bossMaxHPElement.textContent = bossMaxHPText;
  }

  // Update Boss HP Bar if changed
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

  // Update Player Core HP if changed
  const playerCurrentHPText = `${playerCurrHP} `;
  if (playerCurrentHPElement.textContent !== playerCurrentHPText) {
    playerCurrentHPElement.textContent = playerCurrentHPText;
  }

  const playerMaxHPText = ` ${playerMaxHP}`;
  if (playerMaxHPElement.textContent !== playerMaxHPText) {
    playerMaxHPElement.textContent = playerMaxHPText;
  }

  // Update Boss Defensive Stats
  if (skillingBosses.activeBoss) {
    const physicalDefenseText = `${skillingBosses.activeBoss.physicalDefense}%`;
    if (bossPhysicalDefenseElement.textContent !== physicalDefenseText) {
      bossPhysicalDefenseElement.textContent = physicalDefenseText;
    }

    const magicDefenseText = `${skillingBosses.activeBoss.magicDefense}%`;
    if (bossMagicDefenseElement.textContent !== magicDefenseText) {
      bossMagicDefenseElement.textContent = magicDefenseText;
    }

    const regenText = `${skillingBosses.activeBoss.regenChance * 100}% / ${
      skillingBosses.activeBoss.regen
    } HP`;
    if (bossRegenElement.textContent !== regenText) {
      bossRegenElement.textContent = regenText;
    }
  }

  // Update Boss Defensive Stats Info
  if (bossDefensiveStatsInfo) {
    const HTMLContent = `
      <div>Healed ${skillingBosses.currentBattleBossHealed} HP</div>
      <div>Reduced ${skillingBosses.currentBattleBossDamageReduced} Damage</div>
    `;
    if (bossDefensiveStatsInfo.innerHTML !== HTMLContent) {
      bossDefensiveStatsInfo.innerHTML = HTMLContent;
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
          }%</span>
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
    bossBuffList.appendChild(buffElement);
  });

  // Update debuffs
  game.skillingBosses.bossCurrentDebuffs.forEach((debuff) => {
    const debuffElement = createEffectElement(debuff, "debuff");
    bossDebuffList.appendChild(debuffElement);
  });
}

function createEffectElement(effect, type) {
  // [effectId, remainingDuration, damagePerTick, totalDamage]
  const effectElement = document.createElement("div");
  effectElement.className = `boss-${type}`;
  content = `
    <div class="boss-${type}-details">
      <span class="boss-${type}-name">${
    game.skillingBosses.getEffectById(effect[0]).name
  }</span>
      <span class="boss-${type}-description">
  `;
  // add the description
  if (effect[2] > 0) {
    let description = `Deals ${effect[2]} damage per tick`;
    content += description;
  } else {
    content += `${game.skillingBosses.getEffectById(effect[0]).description}`;
  }
  content += `
  </span>
  <span class="boss-${type}-progress-text">
        Removed in ${effect[1]} battle ticks
      </span>
    </div>
  `;
  effectElement.innerHTML = content;

  return effectElement;
}
