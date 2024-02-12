import { Observable } from './Observable';
import type { ModelEvent } from './ModelEvent';
import type { ModelState } from './ModelState';
import { Action } from './Action';

export class ModelStateProxy<T = any> extends Observable<T> {
  protected instance?: ModelState<T>;

  isInited?: boolean;

  get current(): T {
    if (!this.isInited) {
      throw new Error('ModelStateProxy: should read value after initialization');
    }
    return this.instance?.current as T;
  }

  proxy(instance: ModelState<T>) {
    this.instance = instance;
    // init;
    super.trigger(
      new Action({
        payload: this.instance?.current,
        path: 'ModelProxyInit'
      })
    );

    this.instance.subscribe((action) => {
      super.trigger(action);
    });
    this.isInited = true;
  }

  next(action: Action<T>) {
    this.instance?.next(action);
  }
}

export class ModelEventProxy<T = any> extends Observable<T> {
  protected instance?: ModelEvent<T>;

  isInited?: boolean;

  proxy(instance: ModelEvent<T>) {
    this.instance = instance;
    this.instance.subscribe((action) => {
      super.trigger(action);
    });

    this.isInited = true;
  }

  next(action?: Action<T>) {
    this.instance?.next(action);
  }
}
