const { loadModule } = mod.getContext(import.meta);

const battlesUIModule = await loadModule("src/ui/battle.mjs");

export async function nextMainQuest(game, ctx) {
  if (
    game.skillingBosses.currentMainQuest === 2 ||
    game.skillingBosses.currentMainQuest === 4 ||
    game.skillingBosses.currentMainQuest === 6 ||
    game.skillingBosses.currentMainQuest === 8
  ) {
    // add bank slot
    addBankSlotTokenToBank(game, ctx);
  } else if (
    game.skillingBosses.currentMainQuest === 3 ||
    game.skillingBosses.currentMainQuest === 5 ||
    game.skillingBosses.currentMainQuest === 6 ||
    game.skillingBosses.currentMainQuest === 7 ||
    game.skillingBosses.currentMainQuest === 8
  ) {
    // add mastery token bag
    addMasteryTokenBagToBank(game, ctx);
  }
  if (
    game.skillingBosses.currentMainQuest === 5 ||
    game.skillingBosses.currentMainQuest === 8
  ) {
    // add mastery token bag
    addMasteryTokenBagToBank(game, ctx);
  }
  if (game.skillingBosses.currentMainQuest === 6) {
    //1 more bag
    addMasteryTokenBagToBank(game, ctx);
  } else if (game.skillingBosses.currentMainQuest === 7) {
    //2 more bags
    addMasteryTokenBagToBank(game, ctx);
    addMasteryTokenBagToBank(game, ctx);
  }
  game.skillingBosses.startNextMainQuest();
  ctx.characterStorage.setItem("mqNum", game.skillingBosses.currentMainQuest);
}

export async function addBankSlotTokenToBank(game, ctx) {
  game.bank.addItemByID("melvorF:Bank_Slot_Token", 1, false, true, true, true);
}

export async function addMasteryTokenBagToBank(game, ctx) {
  game.bank.addItemByID(
    "smattyBosses:tier1MasteryBag",
    1,
    false,
    false,
    true,
    true
  );
}

export async function addBossCoins(game, ctx, amount) {
  game.bank.addItemByID(
    "smattyBosses:bossCoin",
    amount,
    false,
    true,
    true,
    true
  );
}

export async function addGenericSouls(game, ctx, amount) {
  game.bank.addItemByID(
    "smattyBosses:genericSoul",
    amount,
    false,
    true,
    true,
    true
  );
}

export async function addSkillingSupplies(game, ctx, amount) {
  game.bank.addItemByID(
    "smattyBosses:skillingSupplies",
    amount,
    false,
    true,
    true,
    true
  );
  battlesUIModule.setSupplyAmount();
}

export async function addGathererSouls(game, ctx, amount) {
  game.bank.addItemByID(
    "smattyBosses:gathererSoul",
    amount,
    false,
    true,
    true,
    true
  );
}

export async function addRefinerSouls(game, ctx, amount) {
  game.bank.addItemByID(
    "smattyBosses:refinerSoul",
    amount,
    false,
    true,
    true,
    true
  );
}

export async function addArtisanSouls(game, ctx, amount) {
  game.bank.addItemByID(
    "smattyBosses:artisanSoul",
    amount,
    false,
    true,
    true,
    true
  );
}
export async function addMysticSouls(game, ctx, amount) {
  game.bank.addItemByID(
    "smattyBosses:mysticSoul",
    amount,
    false,
    true,
    true,
    true
  );
}

export async function addShiftySouls(game, ctx, amount) {
  game.bank.addItemByID(
    "smattyBosses:shiftySoul",
    amount,
    false,
    true,
    true,
    true
  );
}

export async function addCherryCupCakes(game, ctx, amount) {
  game.bank.addItemByID(
    "melvorD:Cherry_Cupcake",
    amount,
    false,
    true,
    true,
    true
  );
}

export async function addSharks(game, ctx, amount) {
  game.bank.addItemByID("melvorD:Shark", amount, false, true, true, true);
}

export async function addSapphires(game, ctx, amount) {
  game.bank.addItemByID("melvorD:Sapphire", amount, false, true, true, true);
}

export function addSwordfish(game, ctx, amount) {
  game.bank.addItemByID("melvorD:Swordfish", amount, false, true, true, true);
}

export async function addBirdNest(game, ctx, amount) {
  game.bank.addItemByID("melvorD:Bird_Nest", amount, false, true, true, true);
}

export async function addMithrilShields(game, ctx, amount) {
  game.bank.addItemByID(
    "melvorD:Mithril_Shield",
    amount,
    false,
    true,
    true,
    true
  );
}

export async function addGoldSapphireNecklaces(game, ctx, amount) {
  game.bank.addItemByID(
    "melvorF:Gold_Sapphire_Necklace",
    amount,
    false,
    true,
    true,
    true
  );
}
