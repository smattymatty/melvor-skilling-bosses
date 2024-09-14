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
    bossItem.classList.add("d-flex", "flex-column", "align-items-start", "boss-item");


    // Build the boss item
    bossItem.innerHTML = `
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${boss.name}</h5>
      <small>${boss.stats.maxHP} HP / ${boss.stats.attackPower} ATK</small>
    </div>
    <img src="${boss.image}" alt="${boss.name}" class="img-fluid rounded-start" style="max-width: 100px;">
    <button class="btn btn-primary mt-2">Fight Boss</button>
    <div class="boss-details d-none mt-3">
        <p class="mb-1">Physical Defense: ${boss.stats.physicalDefense}</p>
    <p class="mb-1">Magic Defense: ${boss.stats.magicDefense}</p>
    <p class="mb-1">Regen: ${boss.stats.regen}</p>
      <h6>Boss Attacks:</h6>
      <ul>
        ${boss.attacks.map(attack => `<li>${attack.name}: ${attack.damage} damage</li>`).join('')}
      </ul>
    </div>
    `;

    // Add click event to toggle boss details
    bossItem.addEventListener("click", (event) => {
      const detailsContainer = bossItem.querySelector(".boss-details");
      if (event.target.tagName !== 'BUTTON') {
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
  allDetails.forEach(detail => detail.classList.add("d-none"));
}

function startBossFight(ctx, boss) {
  console.log(`Starting fight with ${boss.name}`);
  game.skillingBosses.setActiveBoss(boss.id);
  
  updateBossDisplay(ctx);
  // Implement your boss fight logic here
  game.skillingBosses.startBattle();
}

function updateBossDisplay(ctx) { 
  if (!game.skillingBosses.activeBoss) {
    return;
  }
  ctx.characterStorage.setItem("AcBss", game.skillingBosses.activeBoss.id);
  console.log('storing active boss id', ctx.characterStorage.getItem("AcBss"));
  const bossImage = document.getElementById("boss-image");
  bossImage.src = game.skillingBosses.activeBoss.image;
  const bossName = document.getElementById("boss-name");
  bossName.textContent = game.skillingBosses.activeBoss.name;
}