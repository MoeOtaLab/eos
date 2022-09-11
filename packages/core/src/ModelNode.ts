import { Model } from './types';
import { Ref, effect } from '@vue/reactivity';

export type LifecycleIndicator = Ref<boolean>;

export class ModelNode<
  ModelType extends Model = Model,
  ValueType extends ReturnType<ModelType> = ReturnType<ModelType>,
  PropsType extends Parameters<ModelType>['0'] = Parameters<ModelType>['0'],
  P extends LifecycleIndicator | undefined = undefined
> {
  protected model: Model;
  protected parent?: Model;
  protected props?: PropsType;
  protected mounted: boolean = false;

  value!: P extends undefined ? ValueType : ValueType | undefined;

  constructor(options: {
    model: ModelType;
    props?: PropsType;
    lifecycleIndicator?: P;
  }) {
    const { model, props, lifecycleIndicator } = options;
    this.model = model;
    this.props = props;

    if (lifecycleIndicator) {
      effect(() => {
        const willMount = lifecycleIndicator?.value;
        if (willMount) {
          this.mount();
        } else {
          this.unmount();
        }
      });
    } else {
      this.mount();
    }
  }

  protected updateValue() {
    this.value = this.model(this.props || {});
  }

  protected mount() {
    if (!this.mounted) {
      this.mounted = true;
      this.updateValue();
    }
  }

  protected unmount() {
    if (this.mounted) {
      this.mounted = false;
      this.value = undefined as ValueType;
    }
  }
}
