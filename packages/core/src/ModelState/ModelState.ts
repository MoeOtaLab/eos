import { produceWithPatches, enablePatches, enableMapSet, Patch } from 'immer';

enablePatches();
enableMapSet();

export type SuccessCallback<T extends any> = (
  currentValue: T,
  extraDeta: {
    patches: Patch[];
    inversePatches: Patch[];
  }
) => void;

// type ErrorCallback<T extends any> = (error: Error) => void;

export type Callback<T extends any> = SuccessCallback<T>;

export type Subscription = {
  unsubscribe: () => void;
};

export class ModelState<T extends any> {
  // indicate this is a container, but a actual value.
  // if use `value`, may confuse
  private _current: T;

  get current() {
    return this._current;
  }

  subscriptionsMap: Set<Callback<T>> = new Set();

  constructor(defaultValue: T) {
    this._current = defaultValue;
  }

  private triggerCallback(...args: Parameters<SuccessCallback<T>>) {
    for (const callback of this.subscriptionsMap.values()) {
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

  subscribe(callback: Callback<T>): Subscription {
    if (!this.subscriptionsMap.has(callback)) {
      this.subscriptionsMap.add(callback);
    }

    return {
      unsubscribe: () => {
        this.subscriptionsMap.delete(callback);
      },
    };
  }

  update(updateAction: (currentValue: T) => T) {
    const [nextState, patches, inversePatches] = produceWithPatches(
      this.current,
      updateAction
    );

    this._current = nextState;

    if (patches?.length) {
      // something changed
      this.triggerCallback(this._current, { patches, inversePatches });
    }
  }
}
