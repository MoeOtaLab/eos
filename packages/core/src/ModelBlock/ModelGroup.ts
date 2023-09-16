import { ModelConstructor, ModelConstructorOption } from './ModelConstructor';
import { InputOutputInterface, ModelTemplate } from './ModelTemplate';
import type {
  ModelBlock,
  ModelBlockContext,
  MountTemplateOption,
} from './ModelBlock';

export class ModelGroup<
  InputInterface extends InputOutputInterface = any,
  OutputInterface extends InputOutputInterface = any
> extends ModelConstructor<InputInterface, OutputInterface> {
  protected return: ModelConstructor;
  protected parentBlock: ModelBlock;

  constructor(
    options: ModelConstructorOption<InputInterface, OutputInterface> & {
      parent: ModelConstructor;
      parentBlock: ModelBlock;
    }
  ) {
    const { template, input, parent, parentBlock } = options;
    super({ template, input });
    this.input = input || ({} as InputInterface);

    this.parentBlock = parentBlock;
    this.return = parent;

    this.mount();
  }

  protected getParentContext() {
    return this.parentBlock?._getInnerHandler().getContext();
  }

  protected get context(): ModelBlockContext {
    const parentContext = this.getParentContext();

    return {
      // transport lifecycle relative context
      id: this.id,
      onLifecycle: parentContext?.onLifecycle,
      mountBlock: this.mountBlockTemplate.bind(this),
      mountGroup: this.mountGroupTemplate.bind(this),
      unmount: parentContext?.unmount,
    };
  }

  protected mountBlockTemplate<
    I extends InputOutputInterface,
    O extends InputOutputInterface
  >(template: ModelTemplate<I, O>, input?: I, options?: MountTemplateOption) {
    const parentContext = this.getParentContext();

    return parentContext?.mountBlock<I, O>(template, input, {
      ...options,
      currentParent: this,
    });
  }

  protected mountGroupTemplate<
    I extends InputOutputInterface,
    O extends InputOutputInterface
  >(template: ModelTemplate<I, O>, input?: I, options?: MountTemplateOption) {
    const parentContext = this.getParentContext();

    return parentContext?.mountGroup<I, O>(template, input, {
      ...options,
      currentParent: this,
    });
  }

  protected async mount() {
    this.output = this.template.setup(this.input, this.context);
  }
}
