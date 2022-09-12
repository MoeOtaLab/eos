import { Model, Context } from './types';
import { Ref, effect } from '@vue/reactivity';
import { runInContext } from './runInContext';

export type LifecycleIndicator = Ref<boolean>;

export class ModelNode<
  ModelType extends Model = Model,
  ValueType extends ReturnType<ModelType> = ReturnType<ModelType>,
  PropsType extends Parameters<ModelType>['0'] = Parameters<ModelType>['0'],
  P extends LifecycleIndicator | undefined = undefined
> {
  protected model: Model;
  protected _parent?: ModelNode;
  protected props?: PropsType;
  protected lifecycleIndicator?: P;

  protected mounted: boolean = false;
  protected initialized: boolean = false;

  protected unmountCallbackSet: Set<() => void> = new Set();

  protected contextMap: WeakMap<Context, Context> = new WeakMap();

  value!: P extends undefined ? ValueType : ValueType | undefined;

  constructor(options: {
    model: ModelType;
    props?: PropsType;
    lifecycleIndicator?: P;
    parent?: ModelNode;
  }) {
    const { model, props, lifecycleIndicator, parent } = options;
    this.model = model;
    this.props = props;
    this.lifecycleIndicator = lifecycleIndicator;
    this._parent = parent;

    this._parent?.addUnmountCallback(() => {
      this.unmount();
    });
  }

  getContext<T>(context: Context<T>) {
    return this.contextMap.get(context) as Context<T> | undefined;
  }

  setContext<T>(context: Context<T>, value: Context<T>) {
    this.contextMap.set(context, value);
    return value;
  }

  public get parent() {
    return this._parent;
  }

  public initialize() {
    if (this.initialized) {
      return;
    }

    if (this.lifecycleIndicator) {
      effect(() => {
        const willMount = this.lifecycleIndicator?.value;
        if (willMount) {
          this.mount();
        } else {
          this.unmount();
        }
      });
    } else {
      this.mount();
    }
    this.initialized = true;
  }

  public addUnmountCallback(fn?: () => void) {
    if (fn) {
      this.unmountCallbackSet.add(fn);
    }
  }

  protected runUnmountCallbacks() {
    for (const cb of this.unmountCallbackSet.values()) {
      cb?.();
    }
  }

  protected updateValue() {
    this.value = this.model(this.props || {});
  }

  protected mount() {
    if (!this.mounted) {
      this.mounted = true;
      runInContext(this, () => {
        this.updateValue();
      });
    }
  }

  public unmount() {
    if (this.mounted) {
      this.runUnmountCallbacks();
      this.unmountCallbackSet.clear();
      this.mounted = false;
      this.value = undefined as ValueType;
    }
  }
}
