export async function init(ctx) {
  try {
    console.log("Initializing abilities ui module...");
    const { SkillingBossesAbilitiesComponent } = await ctx.loadModule(
      "src/components/abilities-component.mjs"
    );

    const skillingBossesAbilitiesComponent =
      new SkillingBossesAbilitiesComponent(ctx, game);

    const abilitiesContainer = document.getElementById("abilities-content");
    if (!abilitiesContainer) {
      throw new Error("Abilities container not found in DOM!");
    }
    console.log(
      "skillBossesAbilitiesComponent",
      skillingBossesAbilitiesComponent
    );
    if (!document.querySelector(".abilities-list")) {
      console.log("mounting abilities container");
      skillingBossesAbilitiesComponent.mount(abilitiesContainer);
      skillingBossesAbilitiesComponent.show();
      console.log(
        "mounted abilities container",
        document.querySelector(".abilities-list")
      );
    }
    buildAbilitiesList(ctx);
    updateEquippedAbilitiesDisplay();
  } catch (error) {
    console.error("Error during Abilities initialization:", error);
    throw error;
  }
}

export async function buildAbilitiesList(ctx) {
  try {
    console.log("Building abilities list...");
    const container = document.getElementById("abilities-list");
    // Clear existing content
    container.innerHTML = "";
    console.log("container", container);

    // Get abilities from the game object
    const abilities = game.skillingBosses.abilities;
    console.log("container", container);
    // Use Promise.all to wait for all ability items to be created
    const abilityItems = await Promise.all(
      Array.from(abilities.values()).map((ability) =>
        createAbilityItem(ctx, ability)
      )
    );

    // Now append all created ability items to the container
    abilityItems.forEach((abilityItem) => {
      container.appendChild(abilityItem);
    });
  } catch (error) {
    console.error("Error building abilities list:", error);
  }

  async function createAbilityItem(ctx, ability) {
    try {
      const abilityId =
        ability.id || `ability-${Math.random().toString(36).substr(2, 9)}`;
      // check if element with the same id already exist
      const abilityItem = document.createElement("div");
      abilityItem.className = "ability-item";
      abilityItem.id = `ability-item-${abilityId}`;
      const skillRegistry = game.skills.registeredObjects;
      const progressCheckers = await ctx.loadModule(
        "src/quests/progressCheckers.mjs"
      );
      let levelReqColor = "#ffffff"; // white
      if (
        progressCheckers.checkSkillLevel(game, ability.skill, ability.level) !==
        1
      ) {
        levelReqColor = "#ff0000"; // red
      } else {
        levelReqColor = "#00ff00"; // green
      }

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
        <span class="ability-level" style="color: ${levelReqColor};">
        Level: ${ability.level} ${skillRegistry.get(ability.skill).name}
        </span>
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
      abilityItem.addEventListener("mousedown", async (event) => {
        if (!event.target.closest(".ability-equip-area")) {
          const progressCheckers = await ctx.loadModule(
            "src/quests/progressCheckers.mjs"
          );
          const hasRequiredLevel =
            progressCheckers.checkSkillLevel(
              game,
              ability.skill,
              ability.level
            ) === 1;

          if (hasRequiredLevel) {
            const equipArea = abilityItem.querySelector(".ability-equip-area");
            if (equipArea.classList.contains("d-none")) {
              closeAllEquipAreas(); // Close all other equip areas
              equipArea.classList.remove("d-none"); // Open this equip area
            } else {
              equipArea.classList.add("d-none"); // Close this equip area if it's already open
            }
          } else {
            console.log(
              `Player doesn't meet the level requirement for ${ability.name}`
            );
            // Optionally, you can show a message to the player
            // For example:
            // showTooltip(`You need level ${ability.level} ${game.skills.registeredObjects.get(ability.skill).name} to equip this ability.`);
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
      throw error;
    }
  }
}

async function equipAbility(ctx, ability, slot) {
  console.log("Equipping ability", ability);
  // Unequip any ability currently in the slot
  game.skillingBosses.equippedAbilities[slot - 1] = null;

  // Unequip the ability from any other slot
  game.skillingBosses.equippedAbilities =
    game.skillingBosses.equippedAbilities.map((equippedAbility) =>
      equippedAbility && equippedAbility.id === ability.id
        ? null
        : equippedAbility
    );
  // check if the player has the required level for the ability
  const progressCheckers = await ctx.loadModule(
    "src/quests/progressCheckers.mjs"
  );
  if (
    progressCheckers.checkSkillLevel(game, ability.skill, ability.level) !== 1
  ) {
    console.log("Not enough level for ability");
    return;
  }
  // Equip the new ability
  game.skillingBosses.equippedAbilities[slot - 1] = ability;

  console.log(`Equipped ${ability.name} to slot ${slot}`);

  // Save equipped abilities by IDs
  const arrayOfAbilityIDs = game.skillingBosses.equippedAbilities.map(
    (ability) => (ability ? ability.id : null)
  );
  ctx.characterStorage.setItem("ASlts", JSON.stringify(arrayOfAbilityIDs));
  const questsUIModule = await ctx.loadModule("src/ui/quest.mjs");
  questsUIModule.buildMainQuestSection(ctx);
  // Update UI
  updateEquippedAbilitiesDisplay();
  closeAllEquipAreas();
  console.log("Equipped abilities saved to storage");
  console.log(game.skillingBosses);
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
      miniSlotIcon.src = equippedAbility.icon;
      miniSlotIcon.alt = equippedAbility.name;
      miniSlotName.textContent = equippedAbility.name;
      miniSlot.classList.add("equipped");

      // Update skill-loop-item
      const skillLoopIcon = skillLoopItem.querySelector(
        ".skill-loop-item-icon img"
      );
      const skillLoopName = skillLoopItem.querySelector(
        ".skill-loop-item-name"
      );
      skillLoopIcon.src = equippedAbility.icon;
      skillLoopIcon.alt = equippedAbility.name;
      skillLoopName.textContent = equippedAbility.name;
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
      const skillLoopIcon = skillLoopItem.querySelector(
        ".skill-loop-item-icon img"
      );
      const skillLoopName = skillLoopItem.querySelector(
        ".skill-loop-item-name"
      );
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
