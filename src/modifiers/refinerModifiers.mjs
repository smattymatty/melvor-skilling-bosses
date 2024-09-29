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

    // Efficient Skilling (Refiner)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "efficientSkillingRefiner",
      tiers: 2,
      descriptions: [
        {
          text: "When a Refiner Skill matches your Ability, you get an additional skill-tick against tier-2+ Bosses.",
        },
      ],
    });
    // Efficient Bossing (Refiner)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "efficientBossingRefiner",
      tiers: 2,
      descriptions: [
        {
          text: "When a Refining Skill matches the Boss you are fighting, you get an additional skill-tick against tier-2+ Bosses.",
        },
      ],
    });
  } catch (error) {
    console.error("Error adding refiner modifiers:", error);
  }
}
