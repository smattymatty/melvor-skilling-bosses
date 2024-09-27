const { loadModule } = mod.getContext(import.meta);

const upgradeHelpers = await loadModule("src/helpers/upgradeHelpers.mjs");

export async function init(ctx) {
  try {
    addBuildingModifiers(ctx);
  } catch (error) {
    console.error("Error initializing building modifiers:", error);
  }
}

function addBuildingModifiers(ctx) {
  try {
    // Inn
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "wellFed",
      tiers: 4,
      descriptions: [
        {
          text: "+1 skill-tick gained and consumed from offline ticks while Well Rested.",
        },
      ],
    });
    // ShieldSmith
    addShieldSmithModifiers(ctx);
  } catch (error) {
    console.error("Error adding building modifiers:", error);
  }
}

function addShieldSmithModifiers(ctx) {
  try {
  } catch (error) {
    console.error("Error adding shield smith modifiers:", error);
  }
}
