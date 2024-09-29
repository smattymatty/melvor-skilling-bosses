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

    // Efficient Skilling (Gatherer)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "efficientSkillingGatherer",
      tiers: 2,
      descriptions: [
        {
          text: "When a Gatherer Skill matches your Ability, you get an additional skill-tick against tier-2+ Bosses.",
        },
      ],
    });
    // Efficient Bossing (Gatherer)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "efficientBossingGatherer",
      tiers: 2,
      descriptions: [
        {
          text: "When a Gathering Skill matches the Boss you are fighting, you get an additional skill-tick against tier-2+ Bosses.",
        },
      ],
    });
  } catch (error) {
    console.error("Error adding gatherer modifiers:", error);
  }
}
