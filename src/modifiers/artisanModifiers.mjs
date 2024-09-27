const { loadModule } = mod.getContext(import.meta);

const upgradeHelpers = await loadModule("src/helpers/upgradeHelpers.mjs");

export async function init(ctx) {
  try {
    addArtisanModifiers(ctx);
  } catch (error) {
    console.error("Error initializing artisan modifiers:", error);
  }
}

function addArtisanModifiers(ctx) {
  try {
    // Arrow Roller (Fletching)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "arrowRoller",
      tiers: 4,
      descriptions: [
        {
          text: "Fletching Abilities have up to ${value}% chance to apply a Stuck Arrow to the target for 6 ticks.",
        },
      ],
    });
    // Ingot Roller (Smithing)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "ingotRoller",
      tiers: 4,
      descriptions: [
        {
          text: "Smithing Abilities have up to ${value}% chance to apply a Shield Charge to the target for 6 ticks.",
        },
      ],
    });
    // Leather Roller (Smithing)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "leatherRoller",
      tiers: 4,
      descriptions: [
        {
          text: "Smithing Abilities have up to ${value}% chance to apply a Shield Charge to the target for 6 ticks.",
        },
      ],
    });
  } catch (error) {
    console.error("Error adding artisan modifiers:", error);
  }
}
