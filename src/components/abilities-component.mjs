const { loadModule } = mod.getContext(import.meta);

const { SkillingBossesUIComponent } = await loadModule(
  "src/components/skilling-bosses-ui-component.mjs"
);

export class SkillingBossesAbilitiesComponent extends SkillingBossesUIComponent {
  constructor(manager, game) {
    super(manager, game, "skilling-bosses-abilities-component");
  }
  initialize() {
    this.initializeEventListeners();
  }

  initializeEventListeners() {}

  show() {
    super.show();
  }

  mount(parent) {
    super.mount(parent);
    this.initialize(); // Call initialize after mounting
  }
}
