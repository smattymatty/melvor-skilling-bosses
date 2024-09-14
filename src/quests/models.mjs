export class Objective {
  constructor(name, description, image, checkProgress) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.checkProgress = checkProgress; // a function that returns a float between 0 and 1 indicating the progress of the objective
  }
}
export class Reward {
  constructor(name, description, image, rewardFunc) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.rewardFunc = rewardFunc; // a function that will be called when the reward is claimed
  }
}

export class Quest {
  constructor(
    name,
    description,
    category,
    image,
    objectives,
    rewards,
    requirements,
    isMainQuest = false,
    mainQuestNumber = null
  ) {
    this.name = name;
    this.description = description;
    this.category = category;
    this.image = image;
    this.objectives = objectives;
    this.rewards = rewards;
    this.requirements = requirements;
    this.isMainQuest = isMainQuest;
    this.mainQuestNumber = mainQuestNumber;
  }
}
