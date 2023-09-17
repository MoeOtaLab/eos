import { ModelConstructor, type ModelConstructorOption } from './ModelConstructor';
import { type InputOutputInterface, type ModelTemplate } from './ModelTemplate';
import type {
  ModelBlock,
  ModelBlockContextType,
  MountTemplateOption
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

  protected get context(): ModelBlockContextType {
    const parentContext = this.getParentContext();

    return {
      // transport lifecycle relative context
      id: this.id,
      onLifecycle: parentContext?.onLifecycle,
      mount: this.mountTemplate.bind(this),
      unmount: parentContext?.unmount
    };
  }

  protected mountTemplate<
    I extends InputOutputInterface,
    O extends InputOutputInterface
  >(template: ModelTemplate<I, O>, input?: I, options?: MountTemplateOption) {
    const parentContext = this.getParentContext();

    return parentContext?.mount<I, O>(template, input, {
      ...options,
      currentParent: this
    });
  }

  protected mount() {
    this.output = this.template.setup(this.input, this.context);
  }
}
