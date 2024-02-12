import { Observable, Subscription } from './Observable';
import type { ModelEvent } from './ModelEvent';
import type { ModelState } from './ModelState';
import { Action } from './Action';

type IModelProxyOptions = {
  throwErrorBeforeProxy?: boolean;
  initWhenProxy?: boolean;
};

export class ModelProxy<T = any> extends Observable<T> {
  protected instance?: ModelState<T> | ModelEvent<T>;

  isInited?: boolean;

  cleanupSubscription?: Subscription;

  options: IModelProxyOptions;

  constructor(options?: IModelProxyOptions) {
    super();
    this.options = {
      throwErrorBeforeProxy: options?.throwErrorBeforeProxy ?? true,
      initWhenProxy: options?.initWhenProxy ?? false
    };
  }

  get current(): T | undefined {
    if (!this.isInited && this.options?.throwErrorBeforeProxy) {
      throw new Error('ModelProxy: should read value after initialization');
    }
    return this.instance?.current;
  }

  proxy(instance: ModelState<T> | ModelEvent<T>) {
    this.unproxy();

    this.instance = instance;
    // init;
    if (this.options?.initWhenProxy) {
      super.trigger(
        new Action({
          payload: this.instance?.current,
          path: 'ModelProxyInit'
        })
      );
    }

    console.log('proxy ==> ', instance);
    this.cleanupSubscription = this.instance.subscribe((action) => {
      super.trigger(action);
    });
    this.isInited = true;
  }

  unproxy() {
    this.cleanupSubscription?.unsubscribe();
    this.instance = undefined;
    this.isInited = false;
  }

  next(action: Action<T>) {
    this.instance?.next(action);
  }
}
