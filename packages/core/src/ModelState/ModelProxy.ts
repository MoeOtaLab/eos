import { Observable } from './Observable';
import type { ModelEvent } from './ModelEvent';
import type { ModelState } from './ModelState';
import { Action } from './Action';

export class ModelStateProxy<T = any> extends Observable<T> {
  protected instance?: ModelState<T>;

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
  }

  next(action: Action<T>) {
    this.instance?.next(action);
  }
}

export class ModelEventProxy<T = any> extends Observable<T> {
  protected instance?: ModelEvent<T>;

  proxy(instance: ModelEvent<T>) {
    this.instance = instance;
    this.instance.subscribe((action) => {
      super.trigger(action);
    });
  }

  next(action?: Action<T>) {
    this.instance?.next(action);
  }
}
