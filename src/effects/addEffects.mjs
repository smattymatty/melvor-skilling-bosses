const { loadModule } = mod.getContext(import.meta);

export async function init(ctx) {
  try {
    const effectsModels = await loadModule("src/effects/models.mjs");
    addDebuffEffects(ctx, effectsModels);
  } catch (error) {
    console.error("Error initializing effects:", error);
  }
}
// Format: [effectId, remainingDuration, damagePerTick, totalDamage]

function addDebuffEffects(ctx, models) {
  try {
    const burnEffect = new models.Effect(
      "burn",
      "Burn",
      "Deals fire damage over time",
      8,
      "onApply",
      (boss, effectData) => {},
      "onTick",
      (boss, effectData) => {
        const [, , damagePerTick] = effectData;
        game.skillingBosses.takeDamage(damagePerTick, "boss");
      },
      "onClear",
      (boss, effectData) => {}
    );

    game.skillingBosses.addEffect(burnEffect);
    const spiceEffect = new models.Effect(
      "spice",
      "Spice",
      "Increases damage taken",
      8,
      "onApply",
      (boss, effectData) => {},
      "onTick",
      (boss, effectData) => {},
      "onClear",
      (boss, effectData) => {}
    );

    game.skillingBosses.addEffect(spiceEffect);
    const toxinEffect = new models.Effect(
      "toxin",
      "Toxin",
      "Deals poison damage over time",
      8,
      "onApply",
      (boss, effectData) => {},
      "onTick",
      (boss, effectData) => {
        const [, , damagePerTick] = effectData;
        game.skillingBosses.takeDamage(damagePerTick, "boss");
      },
      "onClear",
      (boss, effectData) => {}
    );

    game.skillingBosses.addEffect(toxinEffect);
  } catch (error) {
    console.error("Error adding debuff effects:", error);
  }
}
