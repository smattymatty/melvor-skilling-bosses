export class Effect {
  constructor(
    id,
    name,
    description,
    duration,
    activationEvent,
    activationFunc,
    tickEvent,
    tickFunc,
    clearEvent,
    clearFunc
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.activationEvent = activationEvent;
    this.activationFunc = activationFunc;
    this.tickEvent = tickEvent;
    this.tickFunc = tickFunc;
    this.clearEvent = clearEvent;
    this.clearFunc = clearFunc;
    this.extraData = null; // For storing additional effect-specific data
  }

  setExtraData(data) {
    this.extraData = data;
  }
}
