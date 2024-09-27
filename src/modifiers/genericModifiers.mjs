const { loadModule } = mod.getContext(import.meta);

const upgradeHelpers = await loadModule("src/helpers/upgradeHelpers.mjs");

export async function init(ctx) {
  try {
    addGenericModifiers(ctx);
  } catch (error) {
    console.error("Error initializing generic modifiers:", error);
  }
}

function addGenericModifiers(ctx) {
  try {
    // Lucky Levels
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "luckyLevels",
      tiers: 4,
      descriptions: [
        {
          text: "When an ability checks your skill level, randomly add up to ${value} to the check.",
        },
      ],
    });

    // Duck Defence
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "duckDefence",
      tiers: 6,
      descriptions: [
        {
          text: "When a battle is initiated, reduce the boss's Physical and Magic Reduction by ${value}.",
        },
      ],
    });
    // Shield Charger
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "shieldCharger",
      tiers: 6,
      descriptions: [
        {
          text: "When your third ability is used, regenerate ${value} shield.",
        },
      ],
    });
  } catch (error) {
    console.error("Error adding generic modifiers:", error);
  }
}
