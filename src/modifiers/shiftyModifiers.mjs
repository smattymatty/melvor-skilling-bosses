const { loadModule } = mod.getContext(import.meta);

const upgradeHelpers = await loadModule("src/helpers/upgradeHelpers.mjs");

export async function init(ctx) {
  try {
    addShiftyModifiers(ctx);
  } catch (error) {
    console.error("Error initializing shifty modifiers:", error);
  }
}

function addShiftyModifiers(ctx) {
  try {
    // Money Roller (Thieving)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "moneyRoller",
      tiers: 4,
      descriptions: [
        {
          text: "Thieving Abilities have up to ${value}% chance to gain up to 1/6th of your thieving level as gold and deal that much damage to the target.",
        },
      ],
    });

    // Speed Roller (Agility)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "speedRoller",
      tiers: 4,
      descriptions: [
        {
          text: "Agility Abilities have up to ${value}% chance to gain up to 1/6th of your agility level as speed and deal that much damage to the target.",
        },
      ],
    });
  } catch (error) {
    console.error("Error adding shifty modifiers:", error);
  }
}
