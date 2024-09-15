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
    if (!document.querySelector(".battle-category")) {
      skillingBossesBattleComponent.mount(battlesContainer);
      skillingBossesBattleComponent.show();
    }
    buildBossSelectionList(ctx);
    updateBossDisplay(ctx);
    game.skillingBosses.updatePlayerBossStats();
  } catch (error) {
    console.error("Error initializing battles:", error);
    throw error;
  }
  console.log("Battles initialized");
}

function buildBossSelectionList(ctx) {
  console.log("Building boss selection list...");
  const container = document.getElementById("boss-selection-list");
  // Clear existing content
  container.innerHTML = "";

  // Get bosses from the game object
  const bosses = game.skillingBosses.bosses;

  // Create a boss item for each boss
  bosses.forEach((boss) => {
    console.log("Creating boss item for", boss);
    const bossItem = createBossItem(ctx, boss);
    container.appendChild(bossItem);
  });
  console.log("Boss selection list built");
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
  <button class="btn btn-primary mt-2">Fight Boss</button>
    <div class="boss-details d-none mt-3">
        <p class="mb-1">Physical Defense: ${boss.stats.physicalDefense}</p>
    <p class="mb-1">Magic Defense: ${boss.stats.magicDefense}</p>
    <p class="mb-1">Regen: ${boss.stats.regen}</p>
      <h6>Boss Attacks:</h6>
      <ul>
        ${boss.attacks
          .map((attack) => `<li>${attack.name}: ${attack.damage} damage</li>`)
          .join("")}
      </ul>
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
  console.log(`Starting fight with ${boss.name}`);

  // Set the active boss
  game.skillingBosses.setActiveBoss(boss.id);
  ctx.characterStorage.setItem("AcBss", game.skillingBosses.activeBoss.id);
  console.log("storing active boss id", ctx.characterStorage.getItem("AcBss"));
  // Start the battle to initialize battle-related properties
  game.skillingBosses.startBattle();

  // Initialize ability slots and update displays after starting the battle
  initializeAbilitySlots();
  updateBossDisplay(ctx);
  updateBattleStatsUI();
}

function updateBossDisplay(ctx) {
  if (!game.skillingBosses.activeBoss) {
    return;
  }
  ctx.characterStorage.setItem("AcBss", game.skillingBosses.activeBoss.id);
  console.log("storing active boss id", ctx.characterStorage.getItem("AcBss"));
  const bossImage = document.getElementById("boss-image");
  bossImage.src = game.skillingBosses.activeBoss.image;
  const bossName = document.getElementById("boss-name");
  bossName.textContent = game.skillingBosses.activeBoss.name;
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
  }% chance to regen ${game.skillingBosses.activeBoss.regen} HP`;
}
