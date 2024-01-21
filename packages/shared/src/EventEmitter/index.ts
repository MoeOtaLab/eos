export type Listener<T> = (eventPayload: T) => void;

export class EventEmitter<T = any> {
  listenerMap = new Map<string, Set<Listener<T>>>();

  on(event: string, callback: Listener<T>) {
    const listenerSet = this.listenerMap.get(event);
    if (!listenerSet) {
      this.listenerMap.set(event, new Set([callback]));
    } else {
      listenerSet.add(callback);
    }
  }

  off(event: string, callback: Listener<T>) {
    const listenerSet = this.listenerMap.get(event);
    if (listenerSet?.has(callback)) {
      listenerSet.delete(callback);
    }
  }

  emit(event: string, payload: T) {
    const listenerSet = this.listenerMap.get(event);
    if (listenerSet) {
      for (const callback of listenerSet?.values()) {
        callback(payload);
      }
    }
  }
}
