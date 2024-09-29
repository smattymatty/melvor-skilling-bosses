export async function init(ctx) {
  try {
    addSettings(ctx);
  } catch (error) {
    console.error("Error initializing settings:", error);
  }
}

function addSettings(ctx) {
  try {
    addIgnoreSummoningWhileSkilling();
  } catch (error) {
    console.error("Error adding settings:", error);
  }
}

function addIgnoreSummoningWhileSkilling() {
  try {
    const checkbox = document.getElementById("ignore-summoning-while-skilling");
    if (!checkbox) {
      return;
    }
    function handleCheckboxChange() {
      if (checkbox.checked) {
        game.skillingBosses.ignoreSummoningWhileSkilling = true;
        console.log(
          "Ignore summoning while skilling is enabled",
          game.skillingBosses.ignoreSummoningWhileSkilling
        );
      } else {
        game.skillingBosses.ignoreSummoningWhileSkilling = false;
        console.log(
          "Ignore summoning while skilling is disabled",
          game.skillingBosses.ignoreSummoningWhileSkilling
        );
      }
      game.skillingBosses.ctx.characterStorage.setItem(
        "IsSummoningIgnored",
        game.skillingBosses.ignoreSummoningWhileSkilling
      );
    }
    document
      .getElementById("ignore-summoning-while-skilling")
      .addEventListener("change", handleCheckboxChange);
  } catch (error) {
    console.error("Error adding ignore summoning while skilling:", error);
  }
}

export function updateUIForSettings() {}
