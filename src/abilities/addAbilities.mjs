const BASE_COOLDOWN = 24;

export async function init(ctx) {
  const activationFuncs = await ctx.loadModule(
    "src/abilities/activationFuncs.mjs"
  );
  const models = await ctx.loadModule("src/abilities/models.mjs");
  initializeAbilities(ctx, models, activationFuncs);
}

function initializeAbilities(ctx, models, activationFuncs) {
  try {
    // Define your abilities here
    const ability1 = new models.Ability(
      1,
      "Chop",
      "Deal your Woodcutting level as physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "melvorD:Woodcutting",
      ["Basic Attack", "Physical"],
      BASE_COOLDOWN,
      20,
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );

    const ability2 = new models.Ability(
      2,
      "Splinter",
      "Deal half your Woodcutting level as physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "melvorD:Woodcutting",
      ["Quick Attack", "Physical"],
      BASE_COOLDOWN / 2,
      20,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ] // This ability has a higher level than ability1, // TODO:: ADD EFFECT
    );

    const ability3 = new models.Ability(
      3,
      "Timber",
      "Deal double your Woodcutting level as physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "melvorD:Woodcutting",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2,
      20,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ] // TODO:: ADD EFFECT
    );

    const ability4 = new models.Ability(
      4,
      "Strike",
      "Deal your Mining level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
      "melvorD:Mining",
      ["Basic Attack", "Physical"],
      BASE_COOLDOWN, // Cooldown in ticks
      20, // Required level
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );

    const ability5 = new models.Ability(
      5,
      "Shatter",
      "Deal half your Mining level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
      "melvorD:Mining",
      ["Quick Attack", "Physical"],
      BASE_COOLDOWN / 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );

    const ability6 = new models.Ability(
      6,
      "Earthquake",
      "Deal double your Mining level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
      "melvorD:Mining",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );

    const ability7 = new models.Ability(
      7,
      "Hook",
      "Deal your Fishing level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
      "melvorD:Fishing",
      ["Basic Attack", "Physical"],
      BASE_COOLDOWN, // Cooldown in ticks
      20, // Required level
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );
    const ability8 = new models.Ability(
      8,
      "Line",
      "Deal half your Fishing level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
      "melvorD:Fishing",
      ["Quick Attack", "Physical"],
      BASE_COOLDOWN / 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );

    const ability9 = new models.Ability(
      9,
      "Sinker",
      "Deal double your Fishing level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
      "melvorD:Fishing",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Add the abilities to the SkillingBosses instance
    game.skillingBosses.addAbility(ability1);
    game.skillingBosses.addAbility(ability2);
    game.skillingBosses.addAbility(ability3);
    game.skillingBosses.addAbility(ability4);
    game.skillingBosses.addAbility(ability5);
    game.skillingBosses.addAbility(ability6);
    game.skillingBosses.addAbility(ability7);
    game.skillingBosses.addAbility(ability8);
    game.skillingBosses.addAbility(ability9);
  } catch (error) {
    console.error("Error initializing abilities:", error);
  }
}
