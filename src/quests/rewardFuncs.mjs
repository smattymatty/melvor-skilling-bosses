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
