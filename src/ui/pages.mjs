export async function init(ctx) {
  try {
    const { SkillingBossesPageUIComponent } = await ctx.loadModule(
      "src/components/skilling-bosses-page.mjs"
    );

    const skillingBossesPage = createPage(
      ctx,
      "SkillingBosses",
      "Skilling Bosses",
      "https://www.svgrepo.com/show/200452/skull.svg",
      "skilling-bosses-container",
      openSkillingBossesScreen
    );

    const skillingBossesComponent = new SkillingBossesPageUIComponent(
      ctx,
      game
    );

    sidebar.category("Passive").item("SkillingBosses", {
      name: "Skilling Bosses",
      icon: "https://www.svgrepo.com/show/200452/skull.svg",
      onClick: () => {
        changePage(skillingBossesPage);
        openSkillingBossesScreen(ctx, skillingBossesComponent);
      },
    });
  } catch (error) {
    console.error("Error during Skilling Bosses mod initialization:", error);
  }
}

function createPage(ctx, id, name, icon, containerID, openFunction) {
  try {
    const pageData = {
      id: `SkillingBosses`,
      customName: name,
      media: icon,
      containerID: containerID,
      headerBgClass: "bg-combat",
      hasGameGuide: false,
      canBeDefault: false,
      skillSidebarCategoryID: "Passive",
    };

    const namespace = game.registeredNamespaces.getNamespace("smattyBosses");
    if (!namespace) {
      throw new Error("smattyBosses namespace not found!");
    }

    const newPage = new Page(namespace, pageData, game);

    // Register the page with the game
    game.pages.registerObject(newPage);

    // Create the container if it doesn't exist
    if (!document.getElementById(containerID)) {
      const container = document.createElement("div");
      container.id = containerID;
      container.className = "content d-none";
      const mainContainer = document.getElementById("main-container");
      if (!mainContainer) {
        throw new Error("Main container not found in DOM!");
      }
      mainContainer.appendChild(container);
    } else {
    }

    return newPage;
  } catch (error) {
    console.error(`Error creating page ${id}:`, error);
    throw error;
  }
}
export async function openSkillingBossesScreen(ctx, component) {
  try {
    const container = document.getElementById("main-container");
    if (!container) {
      throw new Error("Main container not found in DOM!");
    }

    // Hide all other content
    container.querySelectorAll(".content").forEach((el) => {
      if (el.id !== "skilling-bosses-container") {
        el.classList.add("d-none");
      }
    });

    const bossContainer = document.getElementById("skilling-bosses-container");
    if (!bossContainer) {
      throw new Error("Skilling bosses container not found in DOM!");
    }
    // Clear the container before mounting
    bossContainer.innerHTML = "";

    // Show our component
    component.mount(bossContainer);
    component.show();

    // Fill the Content
    try {
      const questsUIModule = await ctx.loadModule("src/ui/quest.mjs");
      await questsUIModule.init(ctx);
      const battleUIModule = await ctx.loadModule("src/ui/battle.mjs");
      await battleUIModule.init(ctx);
      game.skillingBosses.updatePlayerBossStats();
      const abilitiesUIModule = await ctx.loadModule("src/ui/abilities.mjs");
      await abilitiesUIModule.init(ctx);
      const inventoryUIModule = await ctx.loadModule("src/ui/inventory.mjs");
      await inventoryUIModule.init(ctx);
    } catch (error) {
      console.error("Error initializing Skilling Bosses screen:", error);
      throw error;
    }
    checkButtons();
    if (game.skillingBosses.currentMainQuest < 2) {
      component.showSection("quests");
    } else {
      component.showSection("bosses");
    }
  } catch (error) {
    console.error("Error opening Skilling Bosses screen:", error);
  }
}

export function checkButtons() {
  const battleButton = document.querySelector(
    ".skilling-bosses-nav-btn[data-section='bosses']"
  );
  const questButton = document.querySelector(
    ".skilling-bosses-nav-btn[data-section='quests']"
  );
  const abilityButton = document.querySelector(
    ".skilling-bosses-nav-btn[data-section='abilities']"
  );
  if (game.skillingBosses.currentMainQuest === 0) {
    battleButton.classList.add("d-none");
    abilityButton.classList.add("d-none");
  } else if (game.skillingBosses.currentMainQuest === 1) {
    abilityButton.classList.remove("d-none");
    battleButton.classList.add("d-none");
  } else if (game.skillingBosses.currentMainQuest === 2) {
    battleButton.classList.remove("d-none");
  } else {
  }
}
