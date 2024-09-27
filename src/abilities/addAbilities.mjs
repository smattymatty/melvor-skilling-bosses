const BASE_COOLDOWN = 32;

export async function init(ctx) {
  const activationFuncs = await ctx.loadModule(
    "src/abilities/activationFuncs.mjs"
  );
  const models = await ctx.loadModule("src/abilities/models.mjs");
  initializeAbilities(ctx, models, activationFuncs);
}

function initializeAbilities(ctx, models, activationFuncs) {
  try {
    // Woodcutting
    const ability1 = new models.Ability(
      1,
      "Chop",
      "Deal your Woodcutting level as physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "melvorD:Woodcutting",
      ["Basic Attack", "Physical"],
      BASE_COOLDOWN,
      20,
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );

    const ability2 = new models.Ability(
      2,
      "Splinter",
      "Deal half your Woodcutting level as physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "melvorD:Woodcutting",
      ["Quick Attack", "Physical"],
      BASE_COOLDOWN / 2,
      20,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );

    const ability3 = new models.Ability(
      3,
      "Timber",
      "Deal double your Woodcutting level as physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/woodcutting/woodcutting.png",
      "melvorD:Woodcutting",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2,
      20,
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Mining

    const ability4 = new models.Ability(
      4,
      "Strike",
      "Deal your Mining level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
      "melvorD:Mining",
      ["Basic Attack", "Physical"],
      BASE_COOLDOWN, // Cooldown in ticks
      20, // Required level
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );

    const ability5 = new models.Ability(
      5,
      "Shatter",
      "Deal half your Mining level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
      "melvorD:Mining",
      ["Quick Attack", "Physical"],
      BASE_COOLDOWN / 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );

    const ability6 = new models.Ability(
      6,
      "Earthquake",
      "Deal double your Mining level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/mining/mining.png",
      "melvorD:Mining",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Fishing
    const ability7 = new models.Ability(
      7,
      "Hook",
      "Deal your Fishing level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
      "melvorD:Fishing",
      ["Basic Attack", "Physical"],
      BASE_COOLDOWN, // Cooldown in ticks
      20, // Required level
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );
    const ability8 = new models.Ability(
      8,
      "Line",
      "Deal half your Fishing level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
      "melvorD:Fishing",
      ["Quick Attack", "Physical"],
      BASE_COOLDOWN / 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );

    const ability9 = new models.Ability(
      9,
      "Sinker",
      "Deal double your Fishing level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/fishing/fishing.png",
      "melvorD:Fishing",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Cooking
    const ability10 = new models.Ability(
      10,
      "Char",
      "Deal your Cooking level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/cooking/cooking.png",
      "melvorD:Cooking",
      ["Basic Attack", "Magic"],
      BASE_COOLDOWN, // Cooldown in ticks
      20, // Required level
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );
    const ability11 = new models.Ability(
      11,
      "Simmer",
      "Deal half your Cooking level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/cooking/cooking.png",
      "melvorD:Cooking",
      ["Quick Attack", "Magic"],
      BASE_COOLDOWN / 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability12 = new models.Ability(
      12,
      "Boil",
      "Deal double your Cooking level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/cooking/cooking.png",
      "melvorD:Cooking",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN * 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Herblore
    const ability13 = new models.Ability(
      13,
      "Mix",
      "Deal your Herblore level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/herblore/herblore.png",
      "melvorD:Herblore",
      ["Basic Attack", "Magic"],
      BASE_COOLDOWN, // Cooldown in ticks
      20, // Required level
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );
    const ability14 = new models.Ability(
      14,
      "Brew",
      "Deal half your Herblore level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/herblore/herblore.png",
      "melvorD:Herblore",
      ["Quick Attack", "Magic"],
      BASE_COOLDOWN / 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability15 = new models.Ability(
      15,
      "Smother",
      "Deal double your Herblore level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/herblore/herblore.png",
      "melvorD:Herblore",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN * 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Firemaking
    const ability16 = new models.Ability(
      16,
      "Ignite",
      "Deal your Firemaking level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png",
      "melvorD:Firemaking",
      ["Basic Attack", "Magic"],
      BASE_COOLDOWN, // Cooldown in ticks
      20, // Required level
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );
    const ability17 = new models.Ability(
      17,
      "Flare",
      "Deal half your Firemaking level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png",
      "melvorD:Firemaking",
      ["Quick Attack", "Magic"],
      BASE_COOLDOWN / 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability18 = new models.Ability(
      18,
      "Incinerate",
      "Deal double your Firemaking level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/firemaking/firemaking.png",
      "melvorD:Firemaking",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN * 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Crafting
    const ability19 = new models.Ability(
      19,
      "Chisel",
      "Deal your Crafting level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/crafting/crafting.png",
      "melvorD:Crafting",
      ["Basic Attack", "Physical"],
      BASE_COOLDOWN, // Cooldown in ticks
      20, // Required level
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );
    const ability20 = new models.Ability(
      20,
      "Engrave",
      "Deal half your Crafting level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/crafting/crafting.png",
      "melvorD:Crafting",
      ["Quick Attack", "Magic"],
      BASE_COOLDOWN / 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability21 = new models.Ability(
      21,
      "Press",
      "Deal double your Crafting level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/crafting/crafting.png",
      "melvorD:Crafting",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Smithing
    const ability22 = new models.Ability(
      22,
      "Smelt",
      "Deal your Smithing level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/smithing/smithing.png",
      "melvorD:Smithing",
      ["Basic Attack", "Magic"],
      BASE_COOLDOWN, // Cooldown in ticks
      20, // Required level
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );
    const ability23 = new models.Ability(
      23,
      "Temper",
      "Deal half your Smithing level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/smithing/smithing.png",
      "melvorD:Smithing",
      ["Quick Attack", "Physical"],
      BASE_COOLDOWN / 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability24 = new models.Ability(
      24,
      "Forge",
      "Deal double your Smithing level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/smithing/smithing.png",
      "melvorD:Smithing",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN * 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Fletching
    const ability25 = new models.Ability(
      25,
      "Cut",
      "Deal your Fletching level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/fletching/fletching.png",
      "melvorD:Fletching",
      ["Basic Attack", "Physical"],
      BASE_COOLDOWN, // Cooldown in ticks
      20, // Required level
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );
    const ability26 = new models.Ability(
      26,
      "Carve",
      "Deal half your Fletching level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/fletching/fletching.png",
      "melvorD:Fletching",
      ["Quick Attack", "Physical"],
      BASE_COOLDOWN / 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability27 = new models.Ability(
      27,
      "Pierce",
      "Deal double your Fletching level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/fletching/fletching.png",
      "melvorD:Fletching",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Runecrafting
    const ability28 = new models.Ability(
      28,
      "Transmute",
      "Deal your Runecrafting level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/runecrafting/runecrafting.png",
      "melvorD:Runecrafting",
      ["Basic Attack", "Magic"],
      BASE_COOLDOWN, // Cooldown in ticks
      20, // Required level
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );
    const ability29 = new models.Ability(
      29,
      "Bind",
      "Deal half your Runecrafting level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/runecrafting/runecrafting.png",
      "melvorD:Runecrafting",
      ["Quick Attack", "Magic"],
      BASE_COOLDOWN / 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability30 = new models.Ability(
      30,
      "Warp",
      "Deal double your Runecrafting level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/runecrafting/runecrafting.png",
      "melvorD:Runecrafting",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN * 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Summoning
    const ability31 = new models.Ability(
      31,
      "Summon",
      "Deal your Summoning level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/summoning/summoning.png",
      "melvorD:Summoning",
      ["Basic Attack", "Magic"],
      BASE_COOLDOWN, // Cooldown in ticks
      20, // Required level
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );
    const ability32 = new models.Ability(
      32,
      "Animate",
      "Deal half your Summoning level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/summoning/summoning.png",
      "melvorD:Summoning",
      ["Quick Attack", "Magic"],
      BASE_COOLDOWN / 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability33 = new models.Ability(
      33,
      "Overwhelm",
      "Deal double your Summoning level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/summoning/summoning.png",
      "melvorD:Summoning",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN * 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Astrology
    const ability34 = new models.Ability(
      34,
      "Light",
      "Deal your Astrology level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/astrology/astrology.png",
      "melvorD:Astrology",
      ["Basic Attack", "Magic"],
      BASE_COOLDOWN, // Cooldown in ticks
      20, // Required level
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );
    const ability35 = new models.Ability(
      35,
      "Glow",
      "Deal half your Astrology level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/astrology/astrology.png",
      "melvorD:Astrology",
      ["Quick Attack", "Magic"],
      BASE_COOLDOWN / 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability36 = new models.Ability(
      36,
      "Starfall",
      "Deal double your Astrology level as Magical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/astrology/astrology.png",
      "melvorD:Astrology",
      ["Strong Attack", "Magic"],
      BASE_COOLDOWN * 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Agility
    const ability37 = new models.Ability(
      37,
      "Pounce",
      "Deal your Agility level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/agility/agility.png",
      "melvorD:Agility",
      ["Basic Attack", "Physical"],
      BASE_COOLDOWN, // Cooldown in ticks
      20, // Required level
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );
    const ability38 = new models.Ability(
      38,
      "Whirl",
      "Deal half your Agility level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/agility/agility.png",
      "melvorD:Agility",
      ["Quick Attack", "Physical"],
      BASE_COOLDOWN / 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability39 = new models.Ability(
      39,
      "Zip",
      "Deal double your Agility level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/agility/agility.png",
      "melvorD:Agility",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Thieving
    const ability40 = new models.Ability(
      40,
      "Pick",
      "Deal your Thieving level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/thieving/thieving.png",
      "melvorD:Thieving",
      ["Basic Attack", "Physical"],
      BASE_COOLDOWN, // Cooldown in ticks
      20, // Required level
      [(ability, game) => activationFuncs.dealSkillLevelAsDamage(ability, game)]
    );
    const ability41 = new models.Ability(
      41,
      "Poke",
      "Deal half your Thieving level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/thieving/thieving.png",
      "melvorD:Thieving",
      ["Quick Attack", "Physical"],
      BASE_COOLDOWN / 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 0.5),
      ]
    );
    const ability42 = new models.Ability(
      42,
      "Pawn",
      "Deal double your Thieving level as Physical damage to the target.",
      "https://cdn2-main.melvor.net/assets/media/skills/thieving/thieving.png",
      "melvorD:Thieving",
      ["Strong Attack", "Physical"],
      BASE_COOLDOWN * 2, // Cooldown in ticks
      20, // Required level
      [
        (ability, game) =>
          activationFuncs.dealSkillLevelAsDamage(ability, game, 2),
      ]
    );
    // Add the abilities to the SkillingBosses instance
    game.skillingBosses.addAbility(ability1);
    game.skillingBosses.addAbility(ability2);
    game.skillingBosses.addAbility(ability3);
    game.skillingBosses.addAbility(ability4);
    game.skillingBosses.addAbility(ability5);
    game.skillingBosses.addAbility(ability6);
    game.skillingBosses.addAbility(ability7);
    game.skillingBosses.addAbility(ability8);
    game.skillingBosses.addAbility(ability9);
    game.skillingBosses.addAbility(ability10);
    game.skillingBosses.addAbility(ability11);
    game.skillingBosses.addAbility(ability12);
    game.skillingBosses.addAbility(ability13);
    game.skillingBosses.addAbility(ability14);
    game.skillingBosses.addAbility(ability15);
    game.skillingBosses.addAbility(ability16);
    game.skillingBosses.addAbility(ability17);
    game.skillingBosses.addAbility(ability18);
    game.skillingBosses.addAbility(ability19);
    game.skillingBosses.addAbility(ability20);
    game.skillingBosses.addAbility(ability21);
    game.skillingBosses.addAbility(ability22);
    game.skillingBosses.addAbility(ability23);
    game.skillingBosses.addAbility(ability24);
    game.skillingBosses.addAbility(ability25);
    game.skillingBosses.addAbility(ability26);
    game.skillingBosses.addAbility(ability27);
    game.skillingBosses.addAbility(ability28);
    game.skillingBosses.addAbility(ability29);
    game.skillingBosses.addAbility(ability30);
    game.skillingBosses.addAbility(ability31);
    game.skillingBosses.addAbility(ability32);
    game.skillingBosses.addAbility(ability33);
    game.skillingBosses.addAbility(ability34);
    game.skillingBosses.addAbility(ability35);
    game.skillingBosses.addAbility(ability36);
    game.skillingBosses.addAbility(ability37);
    game.skillingBosses.addAbility(ability38);
    game.skillingBosses.addAbility(ability39);
    game.skillingBosses.addAbility(ability40);
    game.skillingBosses.addAbility(ability41);
    game.skillingBosses.addAbility(ability42);
  } catch (error) {
    console.error("Error initializing abilities:", error);
  }
}
