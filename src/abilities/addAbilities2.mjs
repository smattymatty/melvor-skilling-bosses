const BASE_COOLDOWN = 32;

export async function init(ctx) {
  try {
    const activationFuncs = await ctx.loadModule(
      "src/abilities/activationFuncs.mjs"
    );
    const models = await ctx.loadModule("src/abilities/models.mjs");

    initializeAbilities(ctx, models, activationFuncs);
  } catch (error) {
    console.error("Error initializing abilities:", error);
  }
}

function initializeAbilities(ctx, models, activationFuncs) {
  try {
    // For the three abilities above generics, (generics are in addAbilities.mjs)
    // Woodcutting
    const ability43 = new models.Ability(
      43,
      "Sap Tap",
      `Deal Half your woodcutting level as physical damage to the target.
      <p>+5 flat damage before reduction. (applied after % boosts)</p>
      <p>40% to stun for 10 battle ticks.</p>`,
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "melvorD:Woodcutting",
      ["Quick Attack", "Physical", "Stun"],
      BASE_COOLDOWN / 2 + 2,
      30,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5, 5),
        // TODO: add stun effect
      ]
    );
    const ability44 = new models.Ability(
      44,
      "???",
      "????",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "melvorD:Woodcutting",
      ["Quick Attack", "Physical"],
      BASE_COOLDOWN / 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5, 5),
      ]
    );
    const ability45 = new models.Ability(
      45,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "melvorD:Woodcutting",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Mining
    const ability46 = new models.Ability(
      46,
      "Boulder Strike",
      `Deal your mining level as physical damage to the target.
      <p>+10 flat damage before reduction. (applied after % boosts)</p>
      <p>50% to stun for 12 battle ticks.</p>
        `,
      "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
      "melvorD:Mining",
      ["Basic Attack", "Physical", "Stun"],
      BASE_COOLDOWN + 2,
      30,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 1, 10),
        // TODO: add stun effect
      ]
    );
    const ability47 = new models.Ability(
      47,
      "???",
      "????",
      "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
      "melvorD:Mining",
      ["Basic Attack", "Physical"],
      BASE_COOLDOWN,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability48 = new models.Ability(
      48,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
      "melvorD:Mining",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Fishing
    const ability49 = new models.Ability(
      49,
      "Anchor Smash",
      `Deal Double your fishing level as physical damage to the target.60% to stun for 14 battle ticks.
      <p>+15 flat damage before reduction. (applied after % boosts)</p>
      <p>60% to stun for 14 battle ticks.</p>
      
        `,
      "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
      "melvorD:Fishing",
      ["Strong Attack", "Physical", "Stun"],
      BASE_COOLDOWN * 2 + 2,
      30,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2, 15),
        // TODO: add stun effect
      ]
    );
    const ability50 = new models.Ability(
      50,
      "???",
      "????",
      "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
      "melvorD:Fishing",
      ["Basic Attack", "Physical"],
      BASE_COOLDOWN,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability51 = new models.Ability(
      51,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
      "melvorD:Fishing",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Cooking
    const ability52 = new models.Ability(
      52,
      "Spice Throw",
      `Deal half your cooking level as magical damage to the target.
      <p>Apply a Spice debuff (4% increased damage taken) for 16 battle ticks.</p`,
      "https://cdn2-main.melvor.net/assets/media/skills/cooking/cooking.png",
      "melvorD:Cooking",
      ["Quick Attack", "Magic", "Debuff"],
      BASE_COOLDOWN / 2 + 2,
      30,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game),
        (ability, game) => activationFuncs.applySpicedEffect(game, ability, 16),
      ]
    );
    const ability53 = new models.Ability(
      53,
      "???",
      "????",
      "https://cdn2-main.melvor.net/assets/media/skills/cooking/cooking.png",
      "melvorD:Cooking",
      ["Quick Attack", "Magic"],
      BASE_COOLDOWN / 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability54 = new models.Ability(
      54,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/cooking/cooking.png",
      "melvorD:Cooking",
      ["Quick Attack", "Magic"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Firemaking
    const ability55 = new models.Ability(
      55,
      "Ember Burst",
      "Deal your firemaking level as magical damage to the target.<br></br>Apply a Burn DoT (4% of hit per tick) for 8 battle ticks.",
      "https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png",
      "melvorD:Firemaking",
      ["Basic Attack", "Magic", "Debuff"],
      BASE_COOLDOWN + 2,
      30,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game),
        (ability, game) =>
          activationFuncs.applyBurnEffect(
            game,
            ability,
            game.skillingBosses.lastSkillDamageDealt,
            8,
            0.04
          ),
      ]
    );
    const ability56 = new models.Ability(
      56,
      "???",
      "????",
      "https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png",
      "melvorD:Firemaking",
      ["Basic Attack", "Magic"],
      BASE_COOLDOWN,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability57 = new models.Ability(
      57,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png",
      "melvorD:Firemaking",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Herblore
    const ability58 = new models.Ability(
      58,
      "Toxic Concoction",
      "Deal double your herblore level as magical damage to the target.<br></br>Apply a Poison DoT (6% of hit per tick) for 8 battle ticks.",
      "https://cdn2-main.melvor.net/assets/media/skills/herblore/herblore.png",
      "melvorD:Herblore",
      ["Strong Attack", "Magic", "Debuff"],
      BASE_COOLDOWN * 2 + 2,
      30,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
        (ability, game) =>
          activationFuncs.applyPoisonEffect(
            game,
            ability,
            game.skillingBosses.lastSkillDamageDealt,
            8,
            0.06
          ),
      ]
    );
    const ability59 = new models.Ability(
      59,
      "???",
      "????",
      "https://cdn2-main.melvor.net/assets/media/skills/herblore/herblore.png",
      "melvorD:Herblore",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability60 = new models.Ability(
      60,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/herblore/herblore.png",
      "melvorD:Herblore",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );

    game.skillingBosses.addAbility(ability43);
    game.skillingBosses.addAbility(ability46);
    game.skillingBosses.addAbility(ability49);
    game.skillingBosses.addAbility(ability52);
    game.skillingBosses.addAbility(ability55);
    game.skillingBosses.addAbility(ability58);
  } catch (error) {
    console.error("Error adding abilities:", error);
  }
}
