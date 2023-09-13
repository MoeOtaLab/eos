import { ExtraInfo } from './ExtraInfo';

type CleanupCallback = () => void;
type Callback<T> = (value: T, extraInfo: ExtraInfo) => any;

export interface Subscribable<ValueType = any> {
  subscribe(callback: Callback<ValueType>): Subscription;
}

export class Subscription {
  #cleanupCallbacks: Set<CleanupCallback> = new Set();

  add(cleanupFn: CleanupCallback) {
    this.#cleanupCallbacks.add(cleanupFn);
  }

  unsubscribe() {
    for (const callback of this.#cleanupCallbacks.values()) {
      callback();
    }

    this.#cleanupCallbacks.clear();
  }
}

export class Observable<ValueType> implements Subscribable<ValueType> {
  get current(): ValueType {
    throw new Error('need override');
  }

  constructor() {
    this.subscribe = this.subscribe.bind(this);
    this.next = this.next.bind(this);
  }

  #subscribers: Set<Callback<ValueType>> = new Set();

  protected next(...args: Parameters<Callback<ValueType>>) {
    for (const callback of this.#subscribers.values()) {
      try {
        // eslint-disable-next-line node/no-callback-literal
        callback(...args);
      } catch (error) {
        // if error, skip
        setTimeout(() => {
          throw error;
        });
      }
    }
  }

  subscribe(callback: Callback<ValueType>) {
    this.#subscribers.add(callback);
    const subscription = new Subscription();
    subscription.add(() => {
      this.#subscribers.delete(callback);
    });
    return subscription;
  }
}
