/** <template id="skilling-bosses-abilities-component">
  <div class="abilities-container">
    <h2 class="abilities-title">Skilling Abilities</h2>
    <div class="abilities-list">
      <!-- This is where abilities will be dynamically inserted -->
      <!-- Example ability item structure: -->
      <div class="ability-item">
        <div class="ability-icon">
          <img src="path/to/ability-icon.png" alt="Ability Icon">
        </div>
        <div class="ability-content">
          <div class="ability-header">
            <h3 class="ability-name">Ability Name</h3>
            <div class="ability-tags">
              <span class="ability-tag">Tag1</span>
              <span class="ability-tag">Tag2</span>
            </div>
          </div>
          <div class="ability-description">
            <p>This is where the ability description goes. It explains what the ability does and how it can be used effectively.</p>
          </div>
          <div class="ability-stats">
            <span class="ability-time">Time: 10s</span>
            <span class="ability-level">Level: 20</span>
          </div>
        </div>
      </div>
      <!-- More ability items will be added dynamically -->
    </div>
  </div>
</template> */

export class Ability {
  constructor(id, name, description, icon, skill, tags, cooldown, level) {
    this.id = id; // unique int id for the ability
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.skill = skill;
    this.tags = tags;
    this.cooldown = cooldown;
    this.level = level;
    this.currentCooldown = 0;
    // TODO: Add activation function
    // TODO: Add other properties as needed
  }
  activate(battle) {
    if (this.currentCooldown === 0) {
      this.effect(battle);
      this.currentCooldown = this.cooldown;
      return true;
    }
    return false;
  }

  tick() {
    if (this.currentCooldown > 0) {
      this.currentCooldown--;
    }
  }
}
