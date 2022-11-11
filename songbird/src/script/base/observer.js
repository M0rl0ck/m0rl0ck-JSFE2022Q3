class Observer {
  constructor() {
    this.events = {};
  }

  addEvent = (eventName, callback) => {
    this.events[eventName] ??= [];
    this.events[eventName].push(callback);
  }

  startEvents = (eventName, ...arg) => {
    if (this.events[eventName]?.length) {
      this.events[eventName].forEach(callback => {
        callback(...arg)
      });
    }
  }
}

const observer = new Observer;
export default observer;