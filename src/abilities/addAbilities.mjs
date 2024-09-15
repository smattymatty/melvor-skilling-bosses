export async function init(ctx) {
  const activationFuncs = await ctx.loadModule(
    "src/abilities/activationFuncs.mjs"
  );
  const models = await ctx.loadModule("src/abilities/models.mjs");
  initializeAbilities(ctx, models, activationFuncs);
}

function initializeAbilities(ctx, models, activationFuncs) {
  try {
    console.log("Initializing abilities...");
    console.log(game);

    // Define your abilities here
    const ability1 = new models.Ability(
      1,
      "Chop",
      "Deal your Woodcutting level as physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "melvorD:Woodcutting",
      ["Basic Attack", "Physical"],
      15,
      20,
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );

    const ability2 = new models.Ability(
      2,
      "Splinter",
      "Reduce the target's physical defense by your Woodcutting level / 10",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "melvorD:Woodcutting",
      ["Debuff", "Physical"],
      20,
      40,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ] // This ability has a higher level than ability1, // TODO:: ADD EFFECT
    );

    const ability3 = new models.Ability(
      3,
      "Timber",
      "Deal your Woodcutting level * 2 as physical damage to the target. Target is stunned for 10 skill-ticks.",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "melvorD:Woodcutting",
      ["Strong Attack", "Physical", "Stun"],
      30,
      60,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ] // TODO:: ADD EFFECT
    );

    const ability4 = new models.Ability(
      4,
      "Strike",
      "Deal your Mining level as physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
      "melvorD:Mining",
      ["Basic Attack", "Physical"],
      15, // Cooldown in ticks
      20, // Required level
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );

    const ability5 = new models.Ability(
      5,
      "Shatter",
      "Reduce the target's physical defense by your Mining level divided by 10.",
      "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
      "melvorD:Mining",
      ["Debuff", "Physical"],
      20, // Cooldown in ticks
      40, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );

    const ability6 = new models.Ability(
      6,
      "Earthquake",
      "Deal your Mining level multiplied by 2 as physical damage to the target and stun it for 10 skill-ticks.",
      "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
      "melvorD:Mining",
      ["Strong Attack", "Physical", "Stun"],
      30, // Cooldown in ticks
      60, // Required level
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

    console.log("Abilities initialized");
    console.log(game.skillingBosses);
  } catch (error) {
    console.error("Error initializing abilities:", error);
  }
}
