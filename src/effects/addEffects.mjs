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
        // TODO: check boss magic defence
        game.skillingBosses.takeDamage(damagePerTick, "boss", true);
      },
      "onClear",
      (boss, effectData) => {
        game.skillingBosses.needsBossEffectsUIUpdate = true;
        game.skillingBosses.updateUIIfNeeded();
      }
    );

    game.skillingBosses.addEffect(burnEffect);
    const spiceEffect = new models.Effect(
      "spice",
      "Spice",
      "Increases damage taken by 4%",
      8,
      "onApply",
      (boss, effectData) => {},
      "onTick",
      (boss, effectData) => {},
      "onClear",
      (boss, effectData) => {
        game.skillingBosses.needsBossEffectsUIUpdate = true;
        game.skillingBosses.updateUIIfNeeded();
      }
    );

    game.skillingBosses.addEffect(spiceEffect);
    const toxinEffect = new models.Effect(
      "poison",
      "Poison",
      "Deals poison damage over time",
      8,
      "onApply",
      (boss, effectData) => {},
      "onTick",
      (boss, effectData) => {
        const [, , damagePerTick] = effectData;
        // TODO: check boss physical defence
        game.skillingBosses.takeDamage(damagePerTick, "boss", true);
      },
      "onClear",
      (boss, effectData) => {
        game.skillingBosses.needsBossEffectsUIUpdate = true;
        game.skillingBosses.updateUIIfNeeded();
      }
    );
    game.skillingBosses.addEffect(toxinEffect);

    const bleedEffect = new models.Effect(
      "bleed",
      "Bleed",
      "Deals damage over time",
      8,
      "onApply",
      (boss, effectData) => {},
      "onTick",
      (boss, effectData) => {
        const [, , damagePerTick] = effectData;
        game.skillingBosses.takeDamage(damagePerTick, "boss", true);
      },
      "onClear",
      (boss, effectData) => {
        game.skillingBosses.needsBossEffectsUIUpdate = true;
        game.skillingBosses.updateUIIfNeeded();
      }
    );
    game.skillingBosses.addEffect(bleedEffect);

    const armorReductionEffect = new models.Effect(
      "armorReduction",
      "Armor Reduction",
      "Reduces the armor of the target by ${value}%",
      8,
      "onApply",
      (boss, effectData) => {
        const [, duration, value] = effectData;
        game.skillingBosses.reduceBossPhysicalDefence(value);
      },
      "onTick",
      (boss, effectData) => {},
      "onClear",
      (boss, effectData) => {
        const [, duration, value] = effectData;
        game.skillingBosses.increaseBossPhysicalDefence(value);
        game.skillingBosses.needsBossEffectsUIUpdate = true;
        game.skillingBosses.updateUIIfNeeded();
      }
    );
    game.skillingBosses.addEffect(armorReductionEffect);

    const magicResistReductionEffect = new models.Effect(
      "magicResistReduction",
      "Magic Resist Reduction",
      "Reduces the magic resist of the target by ${value}%",
      8,
      "onApply",
      (boss, effectData) => {
        const [, duration, value] = effectData;
        game.skillingBosses.reduceBossMagicDefence(value);
      },
      "onTick",
      (boss, effectData) => {},
      "onClear",
      (boss, effectData) => {
        const [, duration, value] = effectData;
        game.skillingBosses.increaseBossMagicDefence(value);
        game.skillingBosses.needsBossEffectsUIUpdate = true;
        game.skillingBosses.updateUIIfNeeded();
      }
    );
    game.skillingBosses.addEffect(magicResistReductionEffect);

    const stuckArrowEffect = new models.Effect(
      "stuckArrow",
      "Stuck Arrow",
      "On expiration, deals ${value} damage to the target",
      8,
      "onApply",
      (boss, effectData) => {},
      "onTick",
      (boss, effectData) => {},
      "onClear",
      (boss, effectData) => {
        const [, , damagePerTick] = effectData;
        game.skillingBosses.takeDamage(damagePerTick, "boss", true);
        game.skillingBosses.needsBossEffectsUIUpdate = true;
        game.skillingBosses.updateUIIfNeeded();
      }
    );
    game.skillingBosses.addEffect(stuckArrowEffect);
  } catch (error) {
    console.error("Error adding debuff effects:", error);
  }
}
