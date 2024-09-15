export async function init(ctx) {
  try {
    const { SkillingBossesQuestComponent } = await ctx.loadModule(
      "src/components/quests-component.mjs"
    );

    const skillingBossesQuestComponent = new SkillingBossesQuestComponent(
      ctx,
      game
    );

    const questsContainer = document.getElementById("quests-content");
    if (!questsContainer) {
      throw new Error("Quests container not found in DOM!");
    }
    if (!document.querySelector(".quest-category")) {
      skillingBossesQuestComponent.mount(questsContainer);
      skillingBossesQuestComponent.show();
    }
    buildMainQuestSection(ctx);
    questUpdatePatches(ctx);
  } catch (error) {
    console.error("Error during Quests initialization:", error);
  }
}

export async function buildMainQuestSection(ctx) {
  console.log("Building main quest section...");
  const mainQuestContainer = document.getElementById("main-quests");
  if (!mainQuestContainer) {
    throw new Error("Main quests container not found in DOM!");
  }
  mainQuestContainer.innerHTML = "";
  const currentMainQuestNum = game.skillingBosses.currentMainQuest;
  console.log(currentMainQuestNum);
  game.skillingBosses.mainQuests.forEach((quest, questNumber) => {
    if (questNumber === currentMainQuestNum) {
      const questItem = buildMainQuestItem(ctx, quest);
      if (questItem) {
        mainQuestContainer.appendChild(questItem);
      } else {
        throw new Error("Main quest item not found!");
      }
    }
  });
  const pagesUIModule = await ctx.loadModule("src/ui/pages.mjs");
  pagesUIModule.checkButtons();
}

function buildMainQuestItem(ctx, quest) {
  const questItem = document.createElement("div");
  questItem.classList.add("quest-item", "main-quest");
  console.log("building main quest item");
  console.log(quest);

  // Build the quest item
  questItem.innerHTML = `
    <div class="quest-header">
      <div class="quest-icon">
        <img src="${quest.image}"/>
      </div>
      <div class="quest-info">
        <h3 class="quest-title">${quest.name}</h3>
        <p class="quest-description">${quest.description}</p>
      </div>
    </div>
    <div role="separator" class="seperator"></div>
    <h4 class="quest-objectives-title">Objectives</h4>
    <div class="quest-objectives"></div>
    <div role="separator" class="seperator"></div>
    <h4 class="quest-rewards-title">Rewards</h4>
    <div class="quest-rewards"></div>
  `;

  // Insert the objectives
  const objectivesContainer = questItem.querySelector(".quest-objectives");
  quest.objectives.forEach((objective) => {
    const objectiveItem = document.createElement("div");
    objectiveItem.classList.add("quest-objective");
    objectiveItem.innerHTML = `
      <div class="objective-icon">
        <img src="${objective.image}" />
      </div>
      <div class="objective-info">
        <h4 class="objective-title">${objective.name}</h4>
        <p class="objective-description">${objective.description}</p>
        <div class="objective-progress">
          <div class="progress-bar" style="width: ${
            objective.checkProgress(game) * 100
          }%">
          </div>
          <span class="progress-text">
            ${(objective.checkProgress(game) * 100).toFixed(0)}% Completed
          </span>
        </div>
      </div>
    `;
    objectivesContainer.appendChild(objectiveItem);
  });
  const claimButton = document.createElement("button");
  claimButton.classList.add("quest-claim-btn");
  claimButton.innerHTML = "Claim Reward";
  let canClaim = false;
  for (const objective of quest.objectives) {
    if (objective.checkProgress(game) === 1) {
      canClaim = true;
    } else {
      canClaim = false;
      break;
    }
  }
  if (canClaim) {
    questItem.appendChild(claimButton);
    claimButton.addEventListener("mousedown", (event) => {
      for (const reward of quest.rewards) {
        reward.rewardFunc(game);
      }
      init(ctx);
    });
  }
  const rewardsContainer = questItem.querySelector(".quest-rewards");
  quest.rewards.forEach((reward) => {
    const rewardItem = document.createElement("div");
    rewardItem.classList.add("quest-reward");
    rewardItem.innerHTML = `
      <div class="reward-icon">
        <img src="${reward.image}" />
      </div>
      <div class="reward-info">
        <h4 class="reward-title">${reward.name}</h4>
        <p class="reward-description">${reward.description}</p>
      </div>
    `;
    rewardsContainer.appendChild(rewardItem);
  });

  return questItem;
}

async function questUpdatePatches(ctx) {
  const abilitiesUIModule = await ctx.loadModule("src/ui/abilities.mjs");
  ctx.patch(Skill, "levelUp").after(function () {
    console.log("Skill XP added");
    buildMainQuestSection(ctx);
  });
}
