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

    // Efficient Skilling (Shifty)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "efficientSkillingShifty",
      tiers: 2,
      descriptions: [
        {
          text: "When a Shifty Skill matches your Ability, you get an additional skill-tick against tier-2+ Bosses.",
        },
      ],
    });
    // Efficient Bossing (Shifty)
    upgradeHelpers.createModifier(ctx, game, {
      namespace: "smattyBosses",
      id: "efficientBossingShifty",
      tiers: 2,
      descriptions: [
        {
          text: "When a Shifting Skill matches the Boss you are fighting, you get an additional skill-tick against tier-2+ Bosses.",
        },
      ],
    });
  } catch (error) {
    console.error("Error adding shifty modifiers:", error);
  }
}
