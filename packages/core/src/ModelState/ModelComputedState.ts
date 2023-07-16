import {
  ModelState,
  Callback,
  Subscription,
  SuccessCallback,
} from './ModelState';

export class ModelComputedState<T extends any, P extends any> {
  private _originState?: ModelState<T>;
  private computedFn: (value: T) => P;

  private _current?: P;
  private subscription?: Subscription;

  private subscriptionsMap: Set<Callback<P>> = new Set();

  get current() {
    return this._current;
  }

  constructor(computedFn: (value: T) => P, modelState?: ModelState<T>) {
    this._originState = modelState;
    this.computedFn = computedFn;

    this._updateSubscription();
  }

  setOriginState(modelState: ModelState<T>) {
    this._originState = modelState;
    this._updateSubscription();
  }

  private getComputedValue(value: T) {
    return this.computedFn(value);
  }

  private triggerCallback(...args: Parameters<SuccessCallback<P>>) {
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

  private _updateSubscription() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }

    if (this._originState) {
      this._current = this.getComputedValue(this._originState.current);
      this.subscription = this._originState.subscribe((value, extraDeta) => {
        this._current = this.getComputedValue(value);
        this.triggerCallback(this._current, extraDeta);
      });
    }
  }

  subscribe(callback: Callback<P>): Subscription {
    this.subscriptionsMap.add(callback);

    return {
      unsubscribe: () => {
        this.subscriptionsMap.delete(callback);
      },
    };
  }
}
