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
  <img src="${boss.image}" alt="${
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
  const skillLoopItems = document.querySelectorAll(".skill-loop-item");

  skillLoopItems.forEach((itemElement, index) => {
    const ability = game.skillingBosses.equippedAbilities[index];
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
      abilityNameElement.textContent = ability.name;
      abilityIconElement.src = ability.icon;
      abilityIconElement.alt = ability.name;

      if (index < game.skillingBosses.activeAbilitySlot) {
        // Abilities before the current slot are completed
        progressBar.style.width = "100%";
        progressBarText.textContent = `${ability.cooldown} / ${ability.cooldown}`;
      } else if (index === game.skillingBosses.activeAbilitySlot) {
        // Current ability slot
        const abilityCooldown = ability.cooldown;
        const timeElapsed =
          abilityCooldown - game.skillingBosses.activeAbilityTimer;
        const progressPercentage = (timeElapsed / abilityCooldown) * 100;

        progressBar.style.width = `${progressPercentage}%`;

        // Update the progress bar text with time elapsed and total cooldown
        progressBarText.textContent = `${Math.floor(
          timeElapsed
        )} / ${abilityCooldown}`;
      } else {
        // Abilities after the current slot are yet to activate
        progressBar.style.width = "0%";
        progressBarText.textContent = `0 / ${ability.cooldown}`;
      }
    } else {
      // No ability equipped in this slot
      abilityNameElement.textContent = "No Ability";
      abilityIconElement.src = ""; // Or a default image
      abilityIconElement.alt = "No Ability";

      // Progress bar is empty
      progressBar.style.width = "0%";
      progressBarText.textContent = ""; // Clear text
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
  if (!document.querySelector(".boss-hp-bar-inner")) {
    return;
  }
  if (game.skillingBosses.currentBattleTicks > 0) {
    updateCurrentCombatStatsUI();
  }

  // Update Boss HP
  const bossCurrHP = game.skillingBosses.bossCurrHP;
  const bossMaxHP = game.skillingBosses.bossMaxHP;
  document.getElementById("boss-current-hp").textContent = `${bossCurrHP} `;
  document.getElementById("boss-max-hp").textContent = ` ${bossMaxHP}`;

  // Update Boss HP Bar
  const bossHPPercentage = (bossCurrHP / bossMaxHP) * 100;
  const bossHPBarInner = document.querySelector(".boss-hp-bar-inner");
  bossHPBarInner.style.setProperty("--hp-percentage", `${bossHPPercentage}%`);
  document.getElementById(
    "boss-hp-text"
  ).textContent = `${bossCurrHP} / ${bossMaxHP}`;

  // Update Player Core HP
  document.getElementById(
    "player-current-hp"
  ).textContent = `${game.skillingBosses.playerCoreHP} `;
  document.getElementById(
    "player-max-hp"
  ).textContent = ` ${game.skillingBosses.playerCoreMaxHP}`;

  // Update Boss Next Attack
  if (
    game.skillingBosses.activeBoss &&
    game.skillingBosses.activeBoss.attacks &&
    game.skillingBosses.bossNextAttackIndex !== null &&
    game.skillingBosses.bossNextAttackIndex !== undefined
  ) {
    const nextAttack =
      game.skillingBosses.activeBoss.attacks[
        game.skillingBosses.bossNextAttackIndex
      ];

    if (nextAttack) {
      document.getElementById("boss-next-attack").textContent = nextAttack.name;
      document.getElementById("boss-attack-timer").textContent =
        game.skillingBosses.bossAttackTimer;
    } else {
      document.getElementById("boss-next-attack").textContent = "N/A";
      document.getElementById("boss-attack-timer").textContent = "N/A";
    }
  } else {
    document.getElementById("boss-next-attack").textContent = "N/A";
    document.getElementById("boss-attack-timer").textContent = "N/A";
  }

  // Update Boss Defensive Stats
  document.getElementById("boss-physical-defense").textContent =
    game.skillingBosses.activeBoss.stats.physicalDefense;
  document.getElementById("boss-magic-defense").textContent =
    game.skillingBosses.activeBoss.stats.magicDefense;
  document.getElementById("boss-regen").textContent = `${
    game.skillingBosses.activeBoss.regenChance * 100
  }% /${game.skillingBosses.activeBoss.regen} HP`;

  const bossDefensiveStatsInfo = document.getElementById(
    "boss-defensive-stats-info"
  );
  if (bossDefensiveStatsInfo) {
    let HTMLContent = `
    <div>Healed ${game.skillingBosses.currentBattleBossHealed} HP</div>
    <div>Reduced ${game.skillingBosses.currentBattleBossDamageReduced} Damage</div>
    `;
    bossDefensiveStatsInfo.innerHTML = HTMLContent;
  }
}

export function updateCurrentCombatStatsUI() {
  const currentCombatStats = document.getElementById("current-combat-stats");
  let avgDamagePerAbility =
    game.skillingBosses.currentBattleDamageDealt /
    game.skillingBosses.currentBattleAbilitiesUsed;
  let HTMLContent = `
    <div>Current Combat's Ticks: ${game.skillingBosses.currentBattleTicks}</div>
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
  if (currentCombatStats) {
    currentCombatStats.innerHTML = HTMLContent;
  }
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
