const { loadModule } = mod.getContext(import.meta);

const { SkillingBossesUIComponent } = await loadModule(
  "src/components/skilling-bosses-ui-component.mjs"
);

const battleUiModule = await loadModule("src/ui/battle.mjs");
const abilitiesUiModule = await loadModule("src/ui/abilities.mjs");
const questsUiModule = await loadModule("src/ui/quest.mjs");

export class SkillingBossesPageUIComponent extends SkillingBossesUIComponent {
  constructor(manager, game) {
    super(manager, game, "skilling-bosses-page-component");
  }

  initialize() {
    this.navButtons = document.querySelectorAll(".skilling-bosses-nav-btn");
    this.contentSections = document.querySelectorAll(
      ".skilling-bosses-section"
    );
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.navButtons.forEach((button) => {
      button.addEventListener("mousedown", (event) => {
        this.showSection(event.target.dataset.section);
      });
    });
  }

  showSection(sectionName) {
    // Hide all sections
    try {
      this.contentSections.forEach((section) => {
        if (sectionName === "bosses") {
          battleUiModule.initializeAbilitySlots();
          battleUiModule.updateAbilityProgressUI();
          battleUiModule.updateBattleStatsUI();
          battleUiModule.updatePlayerExtraStats();
          battleUiModule.updatePlayerShieldBar();
          battleUiModule.updatePlayerHealthBar();

          game.skillingBosses.updatePlayerBossStats();
        } else if (sectionName === "abilities") {
          //abilitiesUiModule.buildAbilitiesList(this.manager);
        } else if (sectionName === "quests") {
          questsUiModule.buildMainQuestSection(this.manager);
        }

        section.classList.remove("active");
        section.classList.add("d-none");
      });
    } catch (error) {
      console.error("Error hiding sections:", error);
    }

    // Show the selected section
    const selectedSection = document.querySelector(`#${sectionName}-content`);
    if (selectedSection) {
      selectedSection.classList.remove("d-none");
      selectedSection.classList.add("active");
    }

    // Update button styles
    this.navButtons.forEach((button) => {
      if (button.dataset.section === sectionName) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  show() {
    super.show();
  }

  mount(parent) {
    super.mount(parent);
    this.initialize(); // Call initialize after mounting
  }
}
