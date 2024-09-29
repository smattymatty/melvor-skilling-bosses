const BASE_COOLDOWN = 35;

export async function init(ctx) {
  try {
    const activationFuncs = await ctx.loadModule(
      "src/abilities/activationFuncs.mjs"
    );
    const models = await ctx.loadModule("src/abilities/models.mjs");

    initializeAbilities(ctx, models, activationFuncs);
  } catch (error) {
    console.error("Error initializing abilities:", error);
  }
}

function initializeAbilities(ctx, models, activationFuncs) {
  try {
    // For the three abilities above generics, (generics are in addAbilities.mjs)
    // Woodcutting
    const ability43 = new models.Ability(
      43,
      "Sap Tap",
      `Deal Half your woodcutting level as physical damage to the target. +5 flat damage before reduction.
      <p>40% to stun for 2 battle ticks.</p>`,
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "melvorD:Woodcutting",
      ["Quick Attack", "Physical", "Stun"],
      BASE_COOLDOWN / 2 + 2,
      40,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5, 5),
        (ability, game) => activationFuncs.chanceToStun(game, ability, 0.4, 2),
      ]
    );
    const ability44 = new models.Ability(
      44,
      "???",
      "????",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "melvorD:Woodcutting",
      ["Quick Attack", "Physical"],
      BASE_COOLDOWN / 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5, 5),
      ]
    );
    const ability45 = new models.Ability(
      45,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "melvorD:Woodcutting",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Mining
    const ability46 = new models.Ability(
      46,
      "Boulder Bash",
      `Deal your mining level as physical damage to the target. +10 flat damage before reduction.
      <p>50% to stun for 4 battle ticks.</p>
        `,
      "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
      "melvorD:Mining",
      ["Basic Attack", "Physical", "Stun"],
      BASE_COOLDOWN + 2,
      40,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 1, 10),
        (ability, game) => activationFuncs.chanceToStun(game, ability, 0.5, 4),
      ]
    );
    const ability47 = new models.Ability(
      47,
      "???",
      "????",
      "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
      "melvorD:Mining",
      ["Basic Attack", "Physical"],
      BASE_COOLDOWN,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability48 = new models.Ability(
      48,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
      "melvorD:Mining",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Fishing
    const ability49 = new models.Ability(
      49,
      "Anchor Slam",
      `Deal Double your fishing level as physical damage to the target. +15 flat damage before reduction.
      <p>60% to stun for 6 battle ticks.</p> 
      
        `,
      "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
      "melvorD:Fishing",
      ["Strong Attack", "Physical", "Stun"],
      BASE_COOLDOWN * 2 + 2,
      40,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2, 15),
        (ability, game) => activationFuncs.chanceToStun(game, ability, 0.6, 6),
      ]
    );
    const ability50 = new models.Ability(
      50,
      "???",
      "????",
      "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
      "melvorD:Fishing",
      ["Basic Attack", "Physical"],
      BASE_COOLDOWN,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability51 = new models.Ability(
      51,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
      "melvorD:Fishing",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Cooking
    const ability52 = new models.Ability(
      52,
      "Spice Throw",
      `Deal half your cooking level as magical damage to the target.
      <p>Apply a Spice debuff (4% increased damage taken) for 12 battle ticks.</p`,
      "https://cdn2-main.melvor.net/assets/media/skills/cooking/cooking.png",
      "melvorD:Cooking",
      ["Quick Attack", "Magic", "Debuff"],
      BASE_COOLDOWN / 2 + 3,
      40,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game),
        (ability, game) => activationFuncs.applySpicedEffect(game, ability, 12),
      ]
    );
    const ability53 = new models.Ability(
      53,
      "???",
      "????",
      "https://cdn2-main.melvor.net/assets/media/skills/cooking/cooking.png",
      "melvorD:Cooking",
      ["Quick Attack", "Magic"],
      BASE_COOLDOWN / 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability54 = new models.Ability(
      54,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/cooking/cooking.png",
      "melvorD:Cooking",
      ["Quick Attack", "Magic"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Firemaking
    const ability55 = new models.Ability(
      55,
      "Ember Burst",
      "Deal your firemaking level as magical damage to the target.<br></br>Apply a Burn DoT (4% of hit per tick) for 6 battle ticks.",
      "https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png",
      "melvorD:Firemaking",
      ["Basic Attack", "Magic", "Debuff"],
      BASE_COOLDOWN + 2,
      40,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game),
        (ability, game) =>
          activationFuncs.applyBurnEffect(
            game,
            ability,
            game.skillingBosses.lastSkillDamageDealt,
            6,
            0.04
          ),
      ]
    );
    const ability56 = new models.Ability(
      56,
      "???",
      "????",
      "https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png",
      "melvorD:Firemaking",
      ["Basic Attack", "Magic"],
      BASE_COOLDOWN,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability57 = new models.Ability(
      57,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png",
      "melvorD:Firemaking",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Herblore
    const ability58 = new models.Ability(
      58,
      "Toxic Concoction",
      "Deal double your herblore level as magical damage to the target.<br></br>Apply a Poison DoT (6% of hit per tick) for 8 battle ticks.",
      "https://cdn2-main.melvor.net/assets/media/skills/herblore/herblore.png",
      "melvorD:Herblore",
      ["Strong Attack", "Magic", "Debuff"],
      BASE_COOLDOWN * 2 + 2,
      40,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
        (ability, game) =>
          activationFuncs.applyPoisonEffect(
            game,
            ability,
            game.skillingBosses.lastSkillDamageDealt,
            8,
            0.06
          ),
      ]
    );
    const ability59 = new models.Ability(
      59,
      "???",
      "????",
      "https://cdn2-main.melvor.net/assets/media/skills/herblore/herblore.png",
      "melvorD:Herblore",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability60 = new models.Ability(
      60,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/herblore/herblore.png",
      "melvorD:Herblore",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    const ability61 = new models.Ability(
      61,
      "Arcane Thread",
      `Deal double your crafting level as magical damage to the target.
      Apply 8% Magic resist reduction for 16 ticks.
      `,
      "https://cdn2-main.melvor.net/assets/media/skills/crafting/crafting.png",
      "melvorD:Crafting",
      ["Basic Attack", "Magic"],
      BASE_COOLDOWN * 2 + 2,
      40,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
        (ability, game) =>
          activationFuncs.applyMagicResistReductionEffect(game, ability, 16, 8),
      ]
    );
    const ability62 = new models.Ability(
      62,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/crafting/crafting.png",
      "melvorD:Crafting",
      ["Quick Attack", "Magic"],
      BASE_COOLDOWN / 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability63 = new models.Ability(
      63,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/crafting/crafting.png",
      "melvorD:Crafting",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Smithing
    const ability64 = new models.Ability(
      64,
      "Armor Sunder",
      `Deal double your smithing level as physical damage to the target.
      Apply 8 Physical resist reduction for 16 ticks.
      `,
      "https://cdn2-main.melvor.net/assets/media/skills/smithing/smithing.png",
      "melvorD:Smithing",
      ["Strong Attack", "Physical", "Debuff"],
      BASE_COOLDOWN * 2 + 2,
      40,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
        (ability, game) =>
          activationFuncs.applyArmorReductionEffect(game, ability, 16, 8),
      ]
    );
    const ability65 = new models.Ability(
      65,
      "Reinforce Shield",
      `Gain 1/10th of your Smithing level as Shield`,
      "https://cdn2-main.melvor.net/assets/media/skills/smithing/smithing.png",
      "melvorD:Smithing",
      ["Shield", "Buff"],
      BASE_COOLDOWN + 4,
      40,
      [
        (ability, game) =>
          activationFuncs.gainShield(ability, game, game.smithing.level / 10),
      ]
    );
    const ability66 = new models.Ability(
      66,
      `Shield Slam`,
      `Deal your Smithing level as physical Damage.
      Add your Shield as flat extra damage, applied after percentage boosts.`,
      "https://cdn2-main.melvor.net/assets/media/skills/smithing/smithing.png",
      "melvorD:Smithing",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN * 2 - 4,
      50,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 1),
        // TODO: add shield slam effect
      ]
    );
    // Fletching
    const ability67 = new models.Ability(
      67,
      "Arrow Barrage",
      `Deal 1/3rd your fletching level as physical damage to the target Three times. 
      Each hit has a 20% chance to apply a bleed of 2% of damage dealt for 4 ticks.`,
      "https://cdn2-main.melvor.net/assets/media/skills/fletching/fletching.png",
      "melvorD:Fletching",
      ["Basic Attack", "Physical"],
      BASE_COOLDOWN + 2,
      40,
      [
        (ability, game) =>
          activationFuncs.dealDamageMultipleTimesAndChanceToBleed(
            ability,
            game,
            0.33, // 1/3rd damage
            3, // hits
            0.2, // chance to bleed
            4 // bleed duration
          ),
      ]
    );
    const ability68 = new models.Ability(
      68,
      "Sharpen Senses",
      "Increase the user's Ability damage by 10% for 12 ticks.",
      "https://cdn2-main.melvor.net/assets/media/skills/fletching/fletching.png",
      "melvorD:Fletching",
      ["Quick Attack", "Physical"],
      BASE_COOLDOWN / 2,
      40,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
        // TODO: add sharpen senses effect
      ]
    );
    const ability69 = new models.Ability(
      69,
      "Piercing Shot",
      `Deal double your fletching level as physical damage to the target.
      Ignore 50% of the target's physical defense.
      +20 flat damage before reduction. (applied after % boosts)`,
      "https://cdn2-main.melvor.net/assets/media/skills/fletching/fletching.png",
      "melvorD:Fletching",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2 + 4,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2, 20),
        // TODO: add piercing shot effect
      ]
    );
    // Runecrafting
    const ability70 = new models.Ability(
      70,
      "Rune Burst",
      `Deal your Runecrafting level as magical damage to the target.
      <p>Gain +3 damage (before reduction) per debuff on the target.</p>
`,
      "https://cdn2-main.melvor.net/assets/media/skills/runecrafting/runecrafting.png",
      "melvorD:Runecrafting",
      ["Basic Attack", "Magic", "Debuff"],
      BASE_COOLDOWN + 4,
      40,
      [
        (ability, game) =>
          activationFuncs.attackWithFlatBonusPerDebuff(ability, game, 3),
      ]
    );
    const ability71 = new models.Ability(
      71,
      "???",
      "????",
      "https://cdn2-main.melvor.net/assets/media/skills/runecrafting/runecrafting.png",
      "melvorD:Runecrafting",
      ["Quick Attack", "Magic"],
      BASE_COOLDOWN / 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability72 = new models.Ability(
      72,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/runecrafting/runecrafting.png",
      "melvorD:Runecrafting",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Astrology
    const ability73 = new models.Ability(
      73,
      "Solar Flare",
      `Deal double your Astrology level to the target.
      <p>Apply a Burn effect (6% of hit per tick) for 8 battle ticks.</p>`,
      "https://cdn2-main.melvor.net/assets/media/skills/astrology/astrology.png",
      "melvorD:Astrology",
      ["Strong Attack", "Magic", "Debuff"],
      BASE_COOLDOWN * 2 + 2,
      40,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
        (ability, game) =>
          activationFuncs.applyBurnEffect(
            game,
            ability,
            game.skillingBosses.lastSkillDamageDealt,
            8,
            0.06
          ),
      ]
    );
    const ability74 = new models.Ability(
      74,
      "???",
      "????",
      "https://cdn2-main.melvor.net/assets/media/skills/astrology/astrology.png",
      "melvorD:Astrology",
      ["Quick Attack", "Magic"],
      BASE_COOLDOWN / 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability75 = new models.Ability(
      75,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/astrology/astrology.png",
      "melvorD:Astrology",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Summoning
    const ability76 = new models.Ability(
      76,
      "Spirit Bite",
      `Deal half your Summoning level as magical damage to the target. Add 10 flat damage before reduction.
      <p>Apply a Bleed effect (4% of hit per tick) for 8 battle ticks.</p>`,
      "https://cdn2-main.melvor.net/assets/media/skills/summoning/summoning.png",
      "melvorD:Summoning",
      ["Quick Attack", "Magic", "Debuff"],
      BASE_COOLDOWN / 2 - 2,
      40,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5, 10),
        (ability, game) =>
          activationFuncs.applyBleedEffect(
            game,
            ability,
            game.skillingBosses.lastSkillDamageDealt,
            8,
            0.04
          ),
      ]
    );
    const ability77 = new models.Ability(
      77,
      "???",
      "????",
      "https://cdn2-main.melvor.net/assets/media/skills/summoning/summoning.png",
      "melvorD:Summoning",
      ["Quick Attack", "Magic"],
      BASE_COOLDOWN / 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability78 = new models.Ability(
      78,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/summoning/summoning.png",
      "melvorD:Summoning",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Agility
    const ability79 = new models.Ability(
      78,
      "Double Jab",
      `Perform two strikes, each dealing 66% of your Agility Level.`,
      "https://cdn2-main.melvor.net/assets/media/skills/agility/agility.png",
      "melvorD:Agility",
      ["Basic Attack", "Physical"],
      BASE_COOLDOWN + 2,
      40,
      [(ability, game) => activationFuncs.multiAttack(ability, game, 2, 0.66)]
    );
    const ability80 = new models.Ability(
      80,
      "???",
      "????",
      "https://cdn2-main.melvor.net/assets/media/skills/agility/agility.png",
      "melvorD:Agility",
      ["Quick Attack", "Physical"],
      BASE_COOLDOWN / 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability81 = new models.Ability(
      81,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/agility/agility.png",
      "melvorD:Agility",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Thieving
    const ability82 = new models.Ability(
      82,
      "Gamble Strike",
      `Deal double your Thieving level as physical damage to the target.
      <p>Gain up to 80 gold and deal that much damage to the target.</p>`,
      "https://cdn2-main.melvor.net/assets/media/skills/thieving/thieving.png",
      "melvorD:Thieving",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2 + 4,
      40,
      [
        (ability, game) =>
          activationFuncs.attackWithChanceToGainGoldAndDealThatMuchDamage(
            ability,
            game,
            80,
            2
          ),
        // TODO: add gambler's strike effect
      ]
    );
    const ability83 = new models.Ability(
      83,
      "???",
      "????",
      "https://cdn2-main.melvor.net/assets/media/skills/thieving/thieving.png",
      "melvorD:Thieving",
      ["Quick Attack", "Physical"],
      BASE_COOLDOWN / 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability84 = new models.Ability(
      84,
      "???",
      "?????",
      "https://cdn2-main.melvor.net/assets/media/skills/thieving/thieving.png",
      "melvorD:Thieving",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2,
      150,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );

    game.skillingBosses.addAbility(ability43);
    game.skillingBosses.addAbility(ability46);
    game.skillingBosses.addAbility(ability49);
    game.skillingBosses.addAbility(ability52);
    game.skillingBosses.addAbility(ability55);
    game.skillingBosses.addAbility(ability58);
    game.skillingBosses.addAbility(ability61);
    game.skillingBosses.addAbility(ability64);
    game.skillingBosses.addAbility(ability67);
    game.skillingBosses.addAbility(ability70);
    game.skillingBosses.addAbility(ability73);
    game.skillingBosses.addAbility(ability76);
    game.skillingBosses.addAbility(ability79);
    game.skillingBosses.addAbility(ability82);
  } catch (error) {
    console.error("Error adding abilities:", error);
  }
}
