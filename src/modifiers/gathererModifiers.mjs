const { loadModule } = mod.getContext(import.meta);

const upgradeHelpers = await loadModule("src/helpers/upgradeHelpers.mjs");

export async function init(ctx) {
  try {
    addGathererModifiers(ctx);
  } catch (error) {
    console.error("Error initializing gatherer modifiers:", error);
  }
}

function addGathererModifiers(ctx) {
  try {
    // Rock Roller (Mining)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "rockRoller",
      tiers: 4,
      descriptions: [
        {
          text: "Mining Abilities deal up to ${value}% more damage against Skilling Bosses",
        },
      ],
    });

    // Wood Roller (Woodcutting)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "woodRoller",
      tiers: 4,
      descriptions: [
        {
          text: "Woodcutting Abilities deal up to ${value}% more damage against Skilling Bosses",
        },
      ],
    });

    // Fish Roller (Fishing)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "fishRoller",
      tiers: 4,
      descriptions: [
        {
          text: "Fishing Abilities deal up to ${value}% more damage against Skilling Bosses",
        },
      ],
    });
  } catch (error) {
    console.error("Error adding gatherer modifiers:", error);
  }
}
