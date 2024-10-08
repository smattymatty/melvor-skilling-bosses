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
    buildQuests(ctx);
    questUpdatePatches(ctx);
  } catch (error) {
    console.error("Error during Quests initialization:", error);
  }
}

export async function buildMainQuestSection(ctx) {
  const mainQuestContainer = document.getElementById("main-quests");
  if (!mainQuestContainer) {
    throw new Error("Main quests container not found in DOM!");
  }
  const mainQuestCount = `${game.skillingBosses.currentMainQuest}/${game.skillingBosses.mainQuests.size}`;
  document.getElementById(
    "main-quests-count"
  ).textContent = `(${mainQuestCount})`;
  mainQuestContainer.innerHTML = "";
  const currentMainQuestNum = game.skillingBosses.currentMainQuest;
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
  ctx.patch(Skill, "levelUp").after(function () {
    if (game.skillingBosses.currentMainQuest === 0) {
      buildMainQuestSection(ctx);
    }
  });
}

export function buildQuests(ctx) {
  if (!document.getElementById("main-quests")) {
    return;
  }
  buildMainQuestSection(ctx);
  buildBeginnerQuestSection(ctx);
  buildAverageQuestSection(ctx);
}

export function buildBeginnerQuestSection(ctx) {
  const beginnerQuestContainer = document.getElementById("beginner-quests");
  if (!beginnerQuestContainer) {
    return;
  }
  const beginnerQuestCount = `${game.skillingBosses.beginnerQuestsCompleted.length}/${game.skillingBosses.beginnerQuests.size}`;
  document.getElementById(
    "beginner-quests-count"
  ).textContent = `(${beginnerQuestCount})`;
  beginnerQuestContainer.innerHTML = "";
  game.skillingBosses.beginnerQuests.forEach((quest, questNumber) => {
    // make sure the id is not already in the completed array
    if (!game.skillingBosses.beginnerQuestsCompleted.includes(quest.id)) {
      const questItem = buildSideQuestItem(ctx, quest);
      if (questItem) {
        beginnerQuestContainer.appendChild(questItem);
      } else {
        throw new Error("Beginner quest item not found!");
      }
    }
  });
}

function buildSideQuestItem(ctx, quest) {
  try {
    const questItem = document.createElement("div");
    questItem.classList.add("quest-item", `${quest.category}-quest-item`);

    // Build the quest item
    questItem.innerHTML = `
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
      <div class="objective-content">
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
      </div>
    `;
      objectivesContainer.appendChild(objectiveItem);
    });

    // Add claim button if all objectives are completed
    let canClaim = quest.objectives.every(
      (objective) => objective.checkProgress(game) === 1
    );
    if (canClaim) {
      const claimButton = document.createElement("button");
      claimButton.classList.add("quest-claim-btn");
      claimButton.innerHTML = "Claim Reward";
      questItem.appendChild(claimButton);
      // reward claiming
      claimButton.addEventListener("mousedown", (event) => {
        if (quest.category === "beginner") {
          game.skillingBosses.completeSideQuest(quest.id, "beginner");
          quest.rewards.forEach((reward) => reward.rewardFunc(game));
          buildBeginnerQuestSection(ctx);
        } else if (quest.category === "average") {
          game.skillingBosses.completeSideQuest(quest.id, "average");
          quest.rewards.forEach((reward) => reward.rewardFunc(game));
          buildAverageQuestSection(ctx);
        }
      });
    }

    // Insert the rewards
    const rewardsContainer = questItem.querySelector(".quest-rewards");
    quest.rewards.forEach((reward) => {
      const rewardItem = document.createElement("div");
      rewardItem.classList.add("quest-reward");
      rewardItem.innerHTML = `
      <div class="reward-icon">
        <img src="${reward.image}" />
      </div>
      <div class="reward-content">
        <div class="reward-info">
          <h4 class="reward-title">${reward.name}</h4>
          <p class="reward-description">${reward.description}</p>
        </div>
      </div>
    `;
      rewardsContainer.appendChild(rewardItem);
    });

    return questItem;
  } catch (error) {
    console.error("Error creating quest item:", error);
  }
}

export function buildAverageQuestSection(ctx) {
  const averageQuestContainer = document.getElementById("average-quests");
  if (!averageQuestContainer) {
    return;
  }
  const currentAverageQuesAmountContainer = document.getElementById(
    "average-quests-count"
  );
  currentAverageQuesAmountContainer.innerHTML = ` (${game.skillingBosses.averageQuestsCompleted.length}/${game.skillingBosses.averageQuests.size})`;
  averageQuestContainer.innerHTML = "";
  game.skillingBosses.averageQuests.forEach((quest, questNumber) => {
    // make sure the id is not already in the completed array
    if (!game.skillingBosses.averageQuestsCompleted.includes(quest.id)) {
      const questItem = buildSideQuestItem(ctx, quest);
      if (questItem) {
        averageQuestContainer.appendChild(questItem);
      }
    }
  });
}
