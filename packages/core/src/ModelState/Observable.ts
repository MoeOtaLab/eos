import { Entity } from '../Entity';
import { Action } from './Action';

type CleanupCallback = () => void;
export type Callback<T> = (action: Action<T>) => any;

export interface Subscribable<ValueType = any> {
  subscribe: (callback: Callback<ValueType>) => Subscription;
}

export class Subscription {
  #cleanupCallbacks = new Set<CleanupCallback>();

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

export class Observable<ValueType> extends Entity implements Subscribable<ValueType> {
  protected get current(): ValueType {
    throw new Error('need override');
  }

  constructor() {
    super();
    this.subscribe = this.subscribe.bind(this);
    this.trigger = this.trigger.bind(this);
  }

  #subscribers = new Set<Callback<ValueType>>();

  protected trigger(...args: Parameters<Callback<ValueType>>) {
    for (const callback of this.#subscribers.values()) {
      try {
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

  pipe<T extends Observable<any>>(fn: (currentObservale: Observable<ValueType>) => T) {
    return fn(this);
  }
}
