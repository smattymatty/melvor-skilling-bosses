export async function nextMainQuest(game, ctx) {
  console.log("Main Quest Reward Claimed");
  game.skillingBosses.startNextMainQuest();
  ctx.characterStorage.setItem("mqNum", game.skillingBosses.currentMainQuest);
  console.log("Storing main quest number in storage");
  console.log(ctx.characterStorage);
  console.log("Main Quest Started");
  console.log(game.skillingBosses);
}
