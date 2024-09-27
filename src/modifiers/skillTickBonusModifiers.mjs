const { loadModule } = mod.getContext(import.meta);

const upgradeHelpers = await loadModule("src/helpers/upgradeHelpers.mjs");

export async function init(ctx) {
  try {
    addSkillTickBonusModifiers(ctx);
  } catch (error) {
    console.error("Error initializing skill tick bonus modifiers:", error);
  }
}

function addSkillTickBonusModifiers(ctx) {
  try {
    // Gatherer Matches skills
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "gathererMatchesSkill",
      tiers: 2,
      descriptions: [
        {
          text: "When a Gatherer Ability matches your skill, you get 2 extra skill-ticks per action.",
        },
      ],
    });
    // Gatherer Matches Boss
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "gathererMatchesBoss",
      tiers: 2,
      descriptions: [
        {
          text: "When a Gatherer Ability matches the boss you are fighting, you get 2 extra skill-ticks per action.",
        },
      ],
    });
    // Refiner Matches skills
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "refinerMatchesSkill",
      tiers: 2,
      descriptions: [
        {
          text: "When a Refiner Ability matches your skill, you get 2 extra skill-ticks per action.",
        },
      ],
    });
    // Refiner Matches Boss
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "refinerMatchesBoss",
      tiers: 2,
      descriptions: [
        {
          text: "When a Refiner Ability matches the boss you are fighting, you get 2 extra skill-ticks per action.",
        },
      ],
    });
    // Artisan Matches skills
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "artisanMatchesSkill",
      tiers: 2,
      descriptions: [
        {
          text: "When an Artisan Ability matches your skill, you get 2 extra skill-ticks per action.",
        },
      ],
    });
    // Artisan Matches Boss
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "artisanMatchesBoss",
      tiers: 2,
      descriptions: [
        {
          text: "When an Artisan Ability matches the boss you are fighting, you get 2 extra skill-ticks per action.",
        },
      ],
    });
    // Mystic Matches skills
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "mysticMatchesSkill",
      tiers: 2,
      descriptions: [
        {
          text: "When a Mystic Ability matches your skill, you get 2 extra skill-ticks per action.",
        },
      ],
    });
    // Mystic Matches Boss
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "mysticMatchesBoss",
      tiers: 2,
      descriptions: [
        {
          text: "When a Mystic Ability matches the boss you are fighting, you get 2 extra skill-ticks per action.",
        },
      ],
    });
    // Shifty Matches skills
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "shiftyMatchesSkill",
      tiers: 2,
      descriptions: [
        {
          text: "When a Shifty Ability matches your skill, you get 2 extra skill-ticks per action.",
        },
      ],
    });
    // Shifty Matches Boss
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "shiftyMatchesBoss",
      tiers: 2,
      descriptions: [
        {
          text: "When a Shifty Ability matches the boss you are fighting, you get 2 extra skill-ticks per action.",
        },
      ],
    });
  } catch (error) {
    console.error("Error adding skill tick bonus modifiers:", error);
  }
}
