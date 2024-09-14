const { loadModule } = mod.getContext(import.meta);

const { SkillingBossesUIComponent } = await loadModule(
  "src/components/skilling-bosses-ui-component.mjs"
);

export class SkillingBossesBattleComponent extends SkillingBossesUIComponent {
  constructor(manager, game) {
    super(manager, game, "skilling-bosses-battles-component");
  }
  initialize() {
    console.log("Initializing Skilling Bosses Battles Component");
    this.initializeEventListeners();
  }
  initializeEventListeners() {
    // TODO: Add event listeners for boss selection
  }
  show() {
    super.show();
  }

  mount(parent) {
    super.mount(parent);
    this.initialize(); // Call initialize after mounting
  }
}
