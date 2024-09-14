export async function init(ctx) {
  try {
    const { SkillingBossesAbilitiesComponent } = await ctx.loadModule(
      "src/components/abilities-component.mjs"
    );

    const skillingBossesAbilitiesComponent =
      new SkillingBossesAbilitiesComponent(ctx, game);

    const abilitiesContainer = document.getElementById("abilities-content");
    if (!abilitiesContainer) {
      throw new Error("Abilities container not found in DOM!");
    }
    if (!document.querySelector(".ability-item")) {
      skillingBossesAbilitiesComponent.mount(abilitiesContainer);
      skillingBossesAbilitiesComponent.show();
      buildAbilitiesList(ctx);
      updateEquippedAbilitiesDisplay();
    }
  } catch (error) {
    console.error("Error during Abilities initialization:", error);
    throw error;
  }
}

function buildAbilitiesList(ctx) {
  try {
    console.log("Building abilities list...");
    const container = document.getElementById("abilities-list");
    // Clear existing content
    container.innerHTML = "";

    // Get abilities from the game object
    const abilities = game.skillingBosses.abilities;

    // Create an ability item for each ability
    abilities.forEach((ability) => {
      console.log("Creating ability item for", ability);
      const abilityItem = createAbilityItem(ability);
      container.appendChild(abilityItem);
    });
  } catch (error) {
    console.error("Error building abilities list:", error);
  }

  function createAbilityItem(ability) {
    try {
      const abilityId =
        ability.id || `ability-${Math.random().toString(36).substr(2, 9)}`;
      const abilityItem = document.createElement("div");
      abilityItem.className = "ability-item";

      abilityItem.innerHTML = `
    <div class="ability-icon">
        <img src="${ability.icon}" alt="${ability.name} Icon">
    </div>
    <div class="ability-content">
        <div class="ability-header">
        <h3 class="ability-name">${ability.name}</h3>
        <div class="ability-tags">
            ${ability.tags
              .map((tag) => `<span class="ability-tag">${tag}</span>`)
              .join("")}
        </div>
        </div>
        <div class="ability-description">
        <p>${ability.description}</p>
        </div>
        <div class="ability-stats">
        <span class="ability-time">Cooldown: ${
          ability.cooldown
        } skill-ticks</span>
        <span class="ability-level">Level: ${ability.level} ${
        ability.skill
      }</span>
        </div>
    </div>
    <div class="ability-equip-area d-none" id="equip-area-${abilityId}">
        <p>Equip to slot:</p>
        <div class="ability-equip-slots">
        <div class="equip-slot-button">
            <input type="radio" id="equip-${abilityId}-1" name="equip-${abilityId}" value="1">
            <label for="equip-${abilityId}-1">Slot 1</label>
        </div>
        <div class="equip-slot-button">
            <input type="radio" id="equip-${abilityId}-2" name="equip-${abilityId}" value="2">
            <label for="equip-${abilityId}-2">Slot 2</label>
        </div>
        <div class="equip-slot-button">
            <input type="radio" id="equip-${abilityId}-3" name="equip-${abilityId}" value="3">
            <label for="equip-${abilityId}-3">Slot 3</label>
        </div>
        </div>
    </div>
    `;

      // Add click event to toggle equip area
      abilityItem.addEventListener("mousedown", (event) => {
        if (!event.target.closest(".ability-equip-area")) {
          const equipArea = abilityItem.querySelector(".ability-equip-area");
          if (equipArea.classList.contains("d-none")) {
            closeAllEquipAreas(); // Close all other equip areas
            equipArea.classList.remove("d-none"); // Open this equip area
          } else {
            equipArea.classList.add("d-none"); // Close this equip area if it's already open
          }
        }
      });

      // Add change event for radio buttons, specific to this ability
      const radioButtons = abilityItem.querySelectorAll(
        `input[name="equip-${abilityId}"]`
      );
      radioButtons.forEach((radio) => {
        radio.addEventListener("change", (event) => {
          const slot = event.target.value;
          equipAbility(ctx, ability, slot);
        });
      });

      return abilityItem;
    } catch (error) {
      console.error("Error creating ability item:", error);
    }
  }
}

async function equipAbility(ctx, ability, slot) {
  // Unequip any ability currently in the slot
  game.skillingBosses.equippedAbilities.forEach((equippedAbility, index) => {
    if (equippedAbility && equippedAbility.slot === slot) {
      game.skillingBosses.equippedAbilities[index] = null;
    }
  });
  // check each slot if the ability is already equipped
  game.skillingBosses.equippedAbilities.forEach((equippedAbility, index) => {
    if (equippedAbility && equippedAbility.ability.id === ability.id) {
      game.skillingBosses.equippedAbilities[index] = null;
    }
  });
  // Equip the new ability
  game.skillingBosses.equippedAbilities[slot - 1] = {
    ability: ability,
    slot: slot,
  };

  console.log(`Equipped ${ability.name} to slot ${slot}`);
  console.log(game.skillingBosses);
  const questsUIModule = await ctx.loadModule("src/ui/quest.mjs");
  questsUIModule.buildMainQuestSection(ctx);
  const arrayOfAbilityIDs = game.skillingBosses.equippedAbilities.map((slot) =>
    slot ? slot.ability.id : null
  );
  ctx.characterStorage.setItem("ASlts", arrayOfAbilityIDs);

  updateEquippedAbilitiesDisplay();
  closeAllEquipAreas();
}

function updateEquippedAbilitiesDisplay() {
  const miniSlots = document.querySelectorAll(".mini-slot");
  const skillLoopItems = document.querySelectorAll(".skill-loop-item");

  game.skillingBosses.equippedAbilities.forEach((equippedAbility, index) => {
    const miniSlot = miniSlots[index];
    const skillLoopItem = skillLoopItems[index];

    if (equippedAbility) {
      // Update mini-slot
      const miniSlotIcon = miniSlot.querySelector(".mini-slot-icon img");
      const miniSlotName = miniSlot.querySelector(".mini-slot-name");
      miniSlotIcon.src = equippedAbility.ability.icon;
      miniSlotIcon.alt = equippedAbility.ability.name;
      miniSlotName.textContent = equippedAbility.ability.name;
      miniSlot.classList.add("equipped");

      // Update skill-loop-item
      const skillLoopIcon = skillLoopItem.querySelector(".skill-loop-item-icon img");
      const skillLoopName = skillLoopItem.querySelector(".skill-loop-item-name");
      skillLoopIcon.src = equippedAbility.ability.icon;
      skillLoopIcon.alt = equippedAbility.ability.name;
      skillLoopName.textContent = equippedAbility.ability.name;
      skillLoopItem.classList.add("equipped");
    } else {
      // Update mini-slot
      const miniSlotIcon = miniSlot.querySelector(".mini-slot-icon img");
      const miniSlotName = miniSlot.querySelector(".mini-slot-name");
      miniSlotIcon.src = "https://via.placeholder.com/50";
      miniSlotIcon.alt = `Empty Slot ${index + 1}`;
      miniSlotName.textContent = `Slot ${index + 1}`;
      miniSlot.classList.remove("equipped");

      // Update skill-loop-item
      const skillLoopIcon = skillLoopItem.querySelector(".skill-loop-item-icon img");
      const skillLoopName = skillLoopItem.querySelector(".skill-loop-item-name");
      skillLoopIcon.src = "https://via.placeholder.com/50";
      skillLoopIcon.alt = `Empty Slot ${index + 1}`;
      skillLoopName.textContent = `Slot ${index + 1}`;
      skillLoopItem.classList.remove("equipped");
    }
  });
}
function closeAllEquipAreas() {
  const allEquipAreas = document.querySelectorAll(".ability-equip-area");
  allEquipAreas.forEach((area) => area.classList.add("d-none"));
}
