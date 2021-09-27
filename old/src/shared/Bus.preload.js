class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (typeof this.events[event] !== "object") {
      this.events[event] = [];
    }

    this.events[event].push(listener);
  }

  removeListener(event, listener) {
    let idx;

    if (typeof this.events[event] === "object") {
      idx = this.events[event].indexOf(listener);

      if (idx > -1) {
        this.events[event].splice(idx, 1);
      }
    }
  }

  emit(event) {
    var i,
      listeners,
      length,
      args = [].slice.call(arguments, 1);

    if (typeof this.events[event] === "object") {
      listeners = this.events[event].slice();
      length = listeners.length;

      for (i = 0; i < length; i++) {
        listeners[i].apply(this, args);
      }
    }
  }

  once(event, listener) {
    this.on(event, function g() {
      this.removeListener(event, g);
      listener.apply(this, arguments);
    });
  }
}

class IPCBus extends EventEmitter {
  fnMap = {};
  handle = (name, fn) => {
    this.fnMap[name] = fn;
  };
  invoke = async (channel, ...args) => {
    const fn = this.fnMap[channel];
    return await fn(...args);
  };
  send = (channel, ...args) => {
    this.emit(channel, ...args);
  };
  subscribe = (channel, callback) => {
    const listener = (...args) => {
      callback(...args);
    };
    this.on(channel, listener);
    return () => this.removeListener(channel, listener);
  };
}

if (!window.ipcBus) {
  window.ipcBus = new IPCBus();
}
