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
    if (!document.querySelector(".abilities-list")) {
      skillingBossesAbilitiesComponent.mount(abilitiesContainer);
      skillingBossesAbilitiesComponent.show();
    }
    if (game.skillingBosses.currentlyTrainingSkill === null) {
      buildAbilitiesList(ctx);
    } else {
      buildAbilitiesList(ctx, game.skillingBosses.currentlyTrainingSkill);
    }
    updateEquippedAbilitiesDisplay();
  } catch (error) {
    console.error("Error during Abilities initialization:", error);
    throw error;
  }
}

export async function buildAbilitiesList(ctx, filteredSkill = "all") {
  try {
    const container = document.getElementById("abilities-list");
    container.innerHTML = `
      <div class="abilities-filter-container">
        <button class="ability-filter-btn ${
          filteredSkill === "all" ? "active" : ""
        }" data-filter="all">
          <img src="https://cdn2-main.melvor.net/assets/media/main/lore.png" alt="All">
        </button>
        <button class="ability-filter-btn ${
          filteredSkill === "melvorD:Woodcutting" ? "active" : ""
        }" data-filter="melvorD:Woodcutting">
          <img src="https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png" alt="Woodcutting">
        </button>
        <button class="ability-filter-btn ${
          filteredSkill === "melvorD:Fishing" ? "active" : ""
        }" data-filter="melvorD:Fishing">
          <img src="https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png" alt="Fishing">
        </button>
        <button class="ability-filter-btn ${
          filteredSkill === "melvorD:Mining" ? "active" : ""
        }" data-filter="melvorD:Mining">
          <img src="https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png" alt="Mining">
        </button>
        <button class="ability-filter-btn ${
          filteredSkill === "melvorD:Cooking" ? "active" : ""
        }" data-filter="melvorD:Cooking">
          <img src="https://cdn2-main.melvor.net/assets/media/skills/cooking/cooking.png" alt="Cooking">
        </button>
        <button class="ability-filter-btn ${
          filteredSkill === "melvorD:Herblore" ? "active" : ""
        }" data-filter="melvorD:Herblore">
          <img src="https://cdn2-main.melvor.net/assets/media/skills/herblore/herblore.png" alt="Herblore">
        </button>
        <button class="ability-filter-btn ${
          filteredSkill === "melvorD:Firemaking" ? "active" : ""
        }" data-filter="melvorD:Firemaking">
          <img src="https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png" alt="Firemaking">
        </button>
        <button class="ability-filter-btn ${
          filteredSkill === "melvorD:Crafting" ? "active" : ""
        }" data-filter="melvorD:Crafting">
          <img src="https://cdn2-main.melvor.net/assets/media/skills/crafting/crafting.png" alt="Crafting">
        </button>
        <button class="ability-filter-btn ${
          filteredSkill === "melvorD:Smithing" ? "active" : ""
        }" data-filter="melvorD:Smithing">
          <img src="https://cdn2-main.melvor.net/assets/media/skills/smithing/smithing.png" alt="Smithing">
        </button>
        <button class="ability-filter-btn ${
          filteredSkill === "melvorD:Fletching" ? "active" : ""
        }" data-filter="melvorD:Fletching">
          <img src="https://cdn2-main.melvor.net/assets/media/skills/fletching/fletching.png" alt="Fletching">
        </button>
        <button class="ability-filter-btn ${
          filteredSkill === "melvorD:Agility" ? "active" : ""
        }" data-filter="melvorD:Agility">
          <img src="https://cdn2-main.melvor.net/assets/media/skills/agility/agility.png" alt="Agility">
        </button>
        <button class="ability-filter-btn ${
          filteredSkill === "melvorD:Thieving" ? "active" : ""
        }" data-filter="melvorD:Thieving">
          <img src="https://cdn2-main.melvor.net/assets/media/skills/thieving/thieving.png" alt="Thieving">
        </button>
        <button class="ability-filter-btn ${
          filteredSkill === "melvorD:Summoning" ? "active" : ""
        }" data-filter="melvorD:Summoning">
          <img src="https://cdn2-main.melvor.net/assets/media/skills/summoning/summoning.png" alt="Summoning">
        </button>
        <button class="ability-filter-btn ${
          filteredSkill === "melvorD:Astrology" ? "active" : ""
        }" data-filter="melvorD:Astrology">
          <img src="https://cdn2-main.melvor.net/assets/media/skills/astrology/astrology.png" alt="Astrology">
        </button>
        <button class="ability-filter-btn ${
          filteredSkill === "melvorD:Runecrafting" ? "active" : ""
        }" data-filter="melvorD:Runecrafting">
          <img src="https://cdn2-main.melvor.net/assets/media/skills/runecrafting/runecrafting.png" alt="Runecrafting">
        </button>
      </div>
    `;

    const filterButtons = container.querySelectorAll(".ability-filter-btn");
    filterButtons.forEach((filterButton) => {
      filterButton.addEventListener("click", (event) => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        event.currentTarget.classList.add("active");

        const filter = event.currentTarget.dataset.filter;
        buildAbilitiesList(ctx, filter);
      });
    });

    const abilities = game.skillingBosses.abilities;

    const filteredAbilities = Array.from(abilities.values()).filter(
      (ability) => filteredSkill === "all" || ability.skill === filteredSkill
    );

    const abilityItems = await Promise.all(
      filteredAbilities.map((ability) => createAbilityItem(ctx, ability))
    );

    const abilitiesContainer = document.createElement("div");
    abilitiesContainer.className = "abilities-list";

    abilityItems.forEach((abilityItem) => {
      abilitiesContainer.appendChild(abilityItem);
    });

    container.appendChild(abilitiesContainer);
  } catch (error) {
    console.error("Error building abilities list:", error);
  }
}

async function createAbilityItem(ctx, ability) {
  try {
    const abilityId =
      ability.id || `ability-${Math.random().toString(36).substr(2, 9)}`;
    const abilityItem = document.createElement("div");
    abilityItem.className = "ability-item";
    abilityItem.id = `ability-item-${abilityId}`;
    abilityItem.dataset.skill = ability.skill;
    const skillRegistry = game.skills.registeredObjects;
    const progressCheckers = await ctx.loadModule(
      "src/quests/progressCheckers.mjs"
    );
    let levelReqColor = "#ffffffdd"; // white
    if (
      progressCheckers.checkSkillLevel(game, ability.skill, ability.level) !== 1
    ) {
      levelReqColor = "#ff0000dd"; // red
    } else {
      levelReqColor = "#00ff00dd"; // green
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
            closeAllEquipAreas();
            equipArea.classList.remove("d-none");
          } else {
            equipArea.classList.add("d-none");
          }
        } else {
          console.warn(
            `Player doesn't meet the level requirement for ${ability.name}`
          );
        }
      }
    });

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

async function equipAbility(ctx, ability, slot) {
  const slotIndex = parseInt(slot) - 1;

  // Check if the ability is already equipped
  const currentlyEquippedIndex =
    game.skillingBosses.equippedAbilities.findIndex(
      (equippedAbility) => equippedAbility && equippedAbility.id === ability.id
    );

  // Level check
  const progressCheckers = await ctx.loadModule(
    "src/quests/progressCheckers.mjs"
  );
  if (
    progressCheckers.checkSkillLevel(game, ability.skill, ability.level) !== 1
  ) {
    return;
  }

  // If the ability is already equipped in a different slot, swap it
  if (currentlyEquippedIndex !== -1 && currentlyEquippedIndex !== slotIndex) {
    const temp = game.skillingBosses.equippedAbilities[slotIndex];
    game.skillingBosses.equippedAbilities[slotIndex] =
      game.skillingBosses.equippedAbilities[currentlyEquippedIndex];
    game.skillingBosses.equippedAbilities[currentlyEquippedIndex] = temp;
  }
  // If the ability is not equipped, place it in the desired slot
  else if (currentlyEquippedIndex === -1) {
    game.skillingBosses.equippedAbilities[slotIndex] = ability;
  }
  // If trying to equip to the same slot, do nothing
  else {
    return;
  }

  // Ensure we always have 3 abilities equipped
  for (let i = 0; i < 3; i++) {
    if (!game.skillingBosses.equippedAbilities[i]) {
      const availableAbility = Array.from(
        game.skillingBosses.abilities.values()
      ).find((a) => !game.skillingBosses.equippedAbilities.includes(a));
      if (availableAbility) {
        game.skillingBosses.equippedAbilities[i] = availableAbility;
      }
    }
  }

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
