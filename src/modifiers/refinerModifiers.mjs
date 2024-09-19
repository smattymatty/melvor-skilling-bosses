const { loadModule } = mod.getContext(import.meta);

const upgradeHelpers = await loadModule("src/helpers/upgradeHelpers.mjs");

export async function init(ctx) {
  try {
    addRefinerModifiers(ctx);
  } catch (error) {
    console.error("Error initializing refiner modifiers:", error);
  }
}

function addRefinerModifiers(ctx) {
  try {
    // Flame Roller (Firemaking)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "flameRoller",
      tiers: 4,
      descriptions: [
        {
          text: "Firemaking Abilities have up to ${value}% chance to apply a Burn DoT effect (Magical damage) against Skilling Bosses",
        },
      ],
    });

    // Spice Roller (Cooking)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "spiceRoller",
      tiers: 4,
      descriptions: [
        {
          text: "Cooking Abilities have up to ${value}% chance to apply a Spiced debuff (increases damage taken) against Skilling Bosses",
        },
      ],
    });

    // Toxin Roller (Herblore)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "toxinRoller",
      tiers: 4,
      descriptions: [
        {
          text: "Herblore Abilities have up to ${value}% chance to apply a Poison DoT effect (Physical damage) against Skilling Bosses",
        },
      ],
    });
  } catch (error) {
    console.error("Error adding refiner modifiers:", error);
  }
}
