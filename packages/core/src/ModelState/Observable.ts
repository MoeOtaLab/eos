import { Entity } from '../Entity';
import { type ExtraInfo } from './ExtraInfo';

type CleanupCallback = () => void;
type Callback<T> = (value: T, extraInfo: ExtraInfo) => any;

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

export class Observable<ValueType>
  extends Entity
  implements Subscribable<ValueType>
{
  protected get current(): ValueType {
    throw new Error('need override');
  }

  constructor() {
    super();
    this.subscribe = this.subscribe.bind(this);
    this.next = this.next.bind(this);
  }

  #subscribers = new Set<Callback<ValueType>>();

  protected next(...args: Parameters<Callback<ValueType>>) {
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

  pipe<T extends Observable<any>>(
    fn: (currentObservale: Observable<ValueType>) => T,
  ) {
    return fn(this);
  }
}
