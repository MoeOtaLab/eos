type Listener = () => void;

export class EventEmitter {
  listenerMap = new Map<string, Set<Listener>>();

  on(event: string, callback: Listener) {
    const listenerSet = this.listenerMap.get(event);
    if (!listenerSet) {
      this.listenerMap.set(event, new Set([callback]));
    } else {
      listenerSet.add(callback);
    }
  }

  off(event: string, callback: Listener) {
    const listenerSet = this.listenerMap.get(event);
    if (listenerSet?.has(callback)) {
      listenerSet.delete(callback);
    }
  }

  emit(event: string) {
    const listenerSet = this.listenerMap.get(event);
    if (listenerSet) {
      for (const callback of listenerSet?.values()) {
        callback();
      }
    }
  }
}
