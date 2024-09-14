export async function init(ctx) {
  const models = await ctx.loadModule("src/abilities/models.mjs");
  initializeAbilities(ctx, models);
}

function initializeAbilities(ctx, models) {
  try {
    console.log("Initializing abilities...");

    // Define your abilities here
    const ability1 = new models.Ability(
      1,
      "Chop",
      "Deal your Woodcutting level as physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "MelvorD:Woodcutting",
      ["Basic Attack", "Physical"],
      10,
      20
    );

    const ability2 = new models.Ability(
      2,
      "Splinter",
      "Reduce the target's physical defense by your Woodcutting level / 10",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "MelvorD:Woodcutting",
      ["Debuff", "Physical"],
      15,
      40 // This ability has a higher level than ability1
    );

    const ability3 = new models.Ability(
      3,
      "Timber",
      "Deal your Woodcutting level * 2 as physical damage to the target. Target is stunned for 10 skill-ticks.",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "MelvorD:Woodcutting",
      ["Strong Attack", "Physical", "Stun"],
      25,
      60
    );

    // Add the abilities to the SkillingBosses instance
    game.skillingBosses.addAbility(ability1);
    game.skillingBosses.addAbility(ability2);
    game.skillingBosses.addAbility(ability3);

    console.log("Abilities initialized");
    console.log(game.skillingBosses);
  } catch (error) {
    console.error("Error initializing abilities:", error);
  }
}
