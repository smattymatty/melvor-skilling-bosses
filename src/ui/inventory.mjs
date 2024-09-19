export async function init(ctx) {
  try {
    buildPlayerLootContainer(ctx);
  } catch (error) {
    console.error("Error initializing inventory ui module:", error);
  }
}
function buildPlayerLootContainer(ctx) {
  const container = document.getElementById("player-loot-container");
  if (container) {
    let htmlContent = `
      <span class="text-danger" id="transfer-to-bank-warning"></span>
      <button id="transfer-to-bank-btn" class="btn btn-primary mb-2">Transfer Loot to Bank</button>
      <div id="inventory-grid-container"></div>
      <div id="last-loot-drop-container" class="mt-3"></div>
    `;

    container.innerHTML = htmlContent;

    updateInventoryDisplay(ctx);
    updateLastLootDropDisplay(ctx);

    const transferButton = document.getElementById("transfer-to-bank-btn");
    if (transferButton) {
      transferButton.addEventListener("click", () => handleTransferToBank(ctx));
    }
  } else {
    console.error("Player loot container not found in DOM!");
  }
}

export async function updateInventoryDisplay(ctx) {
  const itemImagesHelper = await ctx.loadModule("src/helpers/itemImages.mjs");

  const gridContainer = document.getElementById("inventory-grid-container");
  if (gridContainer) {
    let htmlContent = '<div class="inventory-grid">';

    for (let i = 0; i < game.skillingBosses.maximumPlayerLoot; i++) {
      const lootItem = game.skillingBosses.playerLoot[i];
      if (lootItem) {
        const [itemId, quantity] = lootItem;
        const imageUrl = itemImagesHelper.getImageUrlByItemID(ctx, itemId);
        const itemName =
          game.items.getObjectByID(itemId)?.name || "Unknown Item";

        htmlContent += `
          <div class="inventory-item" data-slot="${i}">
            <img src="${imageUrl}" alt="${itemName}" class="inventory-item-image">
            <span class="text-muted inventory-item-quantity">${quantity}</span>
          </div>
        `;
      } else {
        htmlContent += `
          <div class="inventory-item" data-slot="${i}">
            <img class="inventory-item-image">
            <span class="text-muted inventory-item-quantity"></span>
          </div>
        `;
      }
    }

    htmlContent += "</div>";
    gridContainer.innerHTML = htmlContent;
  }
}

function handleTransferToBank(ctx) {
  // Create a new array to store items that couldn't be transferred
  let remainingLoot = [];

  for (let i = 0; i < game.skillingBosses.playerLoot.length; i++) {
    const [itemId, quantity] = game.skillingBosses.playerLoot[i];

    if (game.bank.occupiedSlots < game.bank.maximumSlots) {
      // Add item to bank
      game.bank.addItemByID(itemId, quantity, false, true, true, true);
      // Clear this slot in the player's inventory
      game.skillingBosses.playerLoot[i] = null;
    } else {
      const transferWarning = document.getElementById(
        "transfer-to-bank-warning"
      );
      if (transferWarning) {
        transferWarning.innerHTML = `
          Bank is Full! You can't add more items to the bank.
        `;
      }
      setTimeout(() => {
        transferWarning.innerHTML = "";
      }, 3000);
      console.warn("Bank is full, can't add more items");
      // If bank is full, keep the remaining items in the inventory
      remainingLoot.push([itemId, quantity]);
    }
  }

  // Update the player's inventory with only the items that couldn't be transferred
  game.skillingBosses.playerLoot = remainingLoot;

  // Save the updated inventory to storage
  ctx.characterStorage.setItem("Plt", game.skillingBosses.playerLoot);

  // Update the inventory display
  updateInventoryDisplay(ctx);
}

export async function updateLastLootDropDisplay(ctx) {
  const container = document.getElementById("last-loot-drop-container");
  const itemImagesHelper = await ctx.loadModule("src/helpers/itemImages.mjs");
  if (!container) return;

  const lastLoot = game.skillingBosses.lastLootDrop;
  if (!lastLoot) {
    container.innerHTML = "<p></p>";
    return;
  }

  const { boss, tier, loot } = lastLoot;

  let htmlContent = `
    <h4>Last Loot Drop</h4>
    <div class="last-loot-section">
      <div class="last-loot-items">
  `;

  // Display "Always" rewards
  loot.slice(0, -1).forEach(([itemId, quantity]) => {
    const imageUrl = itemImagesHelper.getImageUrlByItemID(ctx, itemId);
    const itemName = game.items.getObjectByID(itemId)?.name || "Unknown Item";
    htmlContent += `
      <div class="last-loot-item">
        <img src="${imageUrl}" alt="${itemName}" title="${itemName}" class="last-loot-item-image">
        <span class="last-loot-item-quantity">${quantity}</span>
      </div>
    `;
  });

  htmlContent += `
      </div>
    </div>
    <div class="last-loot-section">
      <h5>${tier} Reward:</h5>
      <div class="last-loot-items">
  `;

  // Display the rolled tier reward
  const [itemId, quantity] = loot[loot.length - 1];
  const imageUrl = itemImagesHelper.getImageUrlByItemID(ctx, itemId);
  const itemName = game.items.getObjectByID(itemId)?.name || "Unknown Item";
  htmlContent += `
    <div class="last-loot-item">
      <img src="${imageUrl}" alt="${itemName}" title="${itemName}" class="last-loot-item-image">
      <span class="last-loot-item-quantity">${quantity}</span>
    </div>
  `;

  htmlContent += `
      </div>
    </div>
  `;

  container.innerHTML = htmlContent;
}
