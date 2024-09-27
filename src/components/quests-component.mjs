const { loadModule } = mod.getContext(import.meta);

const { SkillingBossesUIComponent } = await loadModule(
  "src/components/skilling-bosses-ui-component.mjs"
);

const { questUIModule } = await loadModule("src/ui/quest.mjs");

export class SkillingBossesQuestComponent extends SkillingBossesUIComponent {
  constructor(manager, game) {
    super(manager, game, "skilling-bosses-quests-component");
  }
  initialize() {
    this.navButtons = document.querySelectorAll(".quest-category-btn");
    this.contentSections = document.querySelectorAll(".quest-category");
    this.initializeEventListeners();
  }

  initializeEventListeners() {
    this.navButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        this.showSection(event.target.dataset.category);
      });
    });
  }
  showSection(category) {
    // Hide all sections
    this.contentSections.forEach((section) => {
      section.classList.remove("active");
      section.classList.add("d-none");
    });

    // Show the selected section
    const selectedSection = document.querySelector(`#${category}-quests`);
    if (selectedSection) {
      selectedSection.classList.remove("d-none");
      selectedSection.classList.add("active");
    }

    // Update button styles
    this.navButtons.forEach((button) => {
      if (button.dataset.category === category) {
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
