const { loadModule } = mod.getContext(import.meta);

const upgradeHelpers = await loadModule("src/helpers/upgradeHelpers.mjs");

export async function init(ctx) {
  try {
    addMysticModifiers(ctx);
  } catch (error) {
    console.error("Error initializing mystic modifiers:", error);
  }
}

function addMysticModifiers(ctx) {
  try {
    // Star Roller (Astrology)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "starRoller",
      tiers: 4,
      descriptions: [
        {
          text: "Astrology Abilities have up to ${value}% chance to definitely do something.",
        },
      ],
    });
    // Ward Roller (Runecrafting)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "wardRoller",
      tiers: 4,
      descriptions: [
        {
          text: "Runecrafting Abilities have up to ${value}% chance to definitely do something.",
        },
      ],
    });
    // Shard Roller (Summoning)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "shardRoller",
      tiers: 4,
      descriptions: [
        {
          text: "Summoning Abilities have up to ${value}% chance to definitely do something.",
        },
      ],
    });
    // Efficient Skilling (Mystic)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "efficientSkillingMystic",
      tiers: 2,
      descriptions: [
        {
          text: "When a Mystic Skill matches your Ability, you get an additional skill-tick against tier-2+ Bosses.",
        },
      ],
    });
    // Efficient Bossing (Mystic)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "efficientBossingMystic",
      tiers: 2,
      descriptions: [
        {
          text: "When a Mystic Skill matches the Boss you are fighting, you get an additional skill-tick against tier-2+ Bosses.",
        },
      ],
    });
  } catch (error) {
    console.error("Error adding mystic modifiers:", error);
  }
}
