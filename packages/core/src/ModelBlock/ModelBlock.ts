import { EventEmitter } from '../EventEmitter';
import { RelationHelper } from './RelationHelper';

type LifecycleEventType =
  | 'start'
  | 'stop'
  | 'beforeMount'
  | 'mount'
  | 'beforeUnmount'
  | 'unmount'
  | 'preInit'
  | 'postInit'
  | 'preMount'
  | 'postMount'
  | 'preUnmount'
  | 'postUnmount';

type SelfLifeCycleType =
  | 'preInitSelf'
  | 'postInitSelf'
  | 'preMountSelf'
  | 'postMountSelf'
  | 'beforeMountSelf'
  | 'mountSelf'
  | 'preUnmountSelf'
  | 'postUnmountSelf'
  | 'beforeUnmountSelf'
  | 'unmountSelf';

export type AtomLifecycleEventType = Exclude<
  LifecycleEventType,
  'start' | 'stop' | 'preInit'
>;

type ModelBlockContext = {
  onLifecycle: (
    lifecycleType: AtomLifecycleEventType,
    callback: () => void
  ) => void;
  mount: <I extends InputOutputInterface, O extends InputOutputInterface>(
    template: ModelBlockTemplate<I, O>,
    input: I
  ) => ModelBlock<I, O>;
};

type InputOutputInterface = Record<string, any>;

type SetupFn<
  InputInterface extends InputOutputInterface,
  OutputInterface extends InputOutputInterface
> = (input: InputInterface, context: ModelBlockContext) => OutputInterface;

export class ModelBlockTemplate<
  InputInterface extends InputOutputInterface = any,
  OutputInterface extends InputOutputInterface = any
> {
  name: string;

  setup: SetupFn<InputInterface, OutputInterface>;

  constructor(options: {
    name: string;
    setup: SetupFn<InputInterface, OutputInterface>;
  }) {
    const { name, setup } = options;
    this.name = name;
    this.setup = setup;
  }
}

export enum ModelBlockStatus {
  BeforeInited,
  Initing,
  Done,
}

export class ModelBlock<
  InputInterface extends InputOutputInterface = any,
  OutputInterface extends InputOutputInterface = any
> {
  protected id = Math.random().toString(36).slice(2, 7);

  protected template: ModelBlockTemplate<InputInterface, OutputInterface>;

  /** 下一个 */
  next?: ModelBlock<any, any> | null = null;

  /** 下一个兄弟节点 */
  nextSibling?: ModelBlock<any, any> | null = null;

  /** 父节点 */
  return: ModelBlock | null = null;

  /** output after handled */
  current: any;

  protected eventEmitter: EventEmitter = new EventEmitter();

  /** raw data */
  protected output?: OutputInterface;

  protected input: InputInterface;

  protected status: ModelBlockStatus = ModelBlockStatus.BeforeInited;

  protected pendingChildren: ModelBlock[] = [];

  protected relationHelper: RelationHelper;

  constructor(options: {
    template: ModelBlockTemplate<InputInterface, OutputInterface>;
    input?: InputInterface;
  }) {
    const { template, input } = options;
    this.template = template;
    this.input = input || ({} as InputInterface);
    this.relationHelper = new RelationHelper(this);
  }

  protected get context(): ModelBlockContext {
    return {
      onLifecycle: this.onLifecycle.bind(this),
      mount: this.mountChild.bind(this),
    };
  }

  get name() {
    return this.template?.name;
  }

  // =============== Utils Start =================== //

  protected onLifecycle(
    lifecycleType: AtomLifecycleEventType,
    callback: () => void
  ) {
    this.eventEmitter.on(lifecycleType, callback);
    return {
      unsubscribe: () => {
        this.eventEmitter.off(lifecycleType, callback);
      },
    };
  }

  protected childrenAction(
    type: 'pre' | 'post',
    eventType: SelfLifeCycleType,
    child: ModelBlock
  ) {
    this.relationHelper.action(type, child, (model) => {
      model[eventType]?.();
    });
  }

  protected mountChildOnly(child: ModelBlock) {
    this.relationHelper.addNextChildren(child);
    this.childrenAction('pre', 'preInitSelf', child);
    this.childrenAction('post', 'postInitSelf', child);

    this.childrenAction('pre', 'preMountSelf', child);
    this.childrenAction('post', 'postMountSelf', child);

    this.childrenAction('pre', 'beforeMountSelf', child);
    this.childrenAction('post', 'mountSelf', child);
  }

  protected mountChild<
    I extends InputOutputInterface,
    O extends InputOutputInterface
  >(template: ModelBlockTemplate<I, O>, input: I) {
    /** @ts-ignore */
    if (template === this.template) {
      throw new Error('can not mount yourself');
    }

    let self = this.return;
    while (self) {
      if (template === self.template) {
        throw new Error('loop mount!');
      }
      self = self.return;
    }

    const block = new ModelBlock({ template, input });
    console.log('mount::status', this.status);

    if (this.status === ModelBlockStatus.Done) {
      this.mountChildOnly(block);
    } else if (this.status === ModelBlockStatus.Initing) {
      this.pendingChildren.push(block);
    } else if (this.status === ModelBlockStatus.BeforeInited) {
      this.relationHelper.addNextChildren(block);
    }

    return block;
  }

  protected log(message: string) {
    console.log(`[ModelBlock ${this.name} - ${this.id}]: ${message}`);
  }

  protected triggerLifecycle(eventType: AtomLifecycleEventType) {
    this.eventEmitter.emit(eventType);
  }

  // =============== Utils End =================== //

  // =============== Self Start =================== //

  protected preInitSelf() {
    this.log('preInitSelf');
    this.output = this.template.setup(this.input, this.context);
    this.setupOutputToData();
    this.status = ModelBlockStatus.Initing;
  }

  protected postInitSelf() {
    this.log('postInitSelf');
    this.triggerLifecycle('postInit');
  }

  protected preMountSelf() {
    this.log('preMountSelf');
    this.triggerLifecycle('preMount');
  }

  protected postMountSelf() {
    this.log('postMountSelf');
    this.triggerLifecycle('postMount');

    // handle pending children
    this.status = ModelBlockStatus.Done;
    if (this.pendingChildren?.length) {
      this.log('pendingChildren');
      this.pendingChildren.forEach((child) => {
        this.mountChildOnly(child);
      });
      this.pendingChildren = [];
    }
  }

  protected beforeMountSelf() {
    this.log('beforeMountSelf');
    this.triggerLifecycle('beforeMount');
  }

  protected mountSelf() {
    this.log('mountSelf');
    this.triggerLifecycle('mount');
  }

  protected preUnmountSelf() {
    this.log('preUnmountSelf');
    this.triggerLifecycle('preUnmount');
  }

  protected postUnmountSelf() {
    this.log('postUnmountSelf');
    this.triggerLifecycle('postUnmount');
  }

  protected beforeUnmountSelf() {
    this.log('beforeUnmountSelf');
    this.triggerLifecycle('beforeUnmount');
  }

  protected unmountSelf() {
    this.log('unmountSelf');
    this.triggerLifecycle('unmount');
  }

  // =============== Self End =================== //

  // =============== Inner Lifecycle Start =================== //
  protected preAction(eventType: SelfLifeCycleType) {
    this.relationHelper.preAction(this, (model) => {
      model[eventType]?.();
    });
  }

  protected postAction(eventType: SelfLifeCycleType) {
    this.relationHelper.postAction(this, (model) => {
      model[eventType]?.();
    });
  }
  // =============== Inner Lifecycle End =================== //

  // =============== Outer Lifecycle Start =================== //
  mount() {
    this.preAction('preInitSelf');
    this.postAction('postInitSelf');

    this.preAction('preMountSelf');
    this.postAction('postMountSelf');

    this.preAction('beforeMountSelf');
    this.postAction('mountSelf');
  }

  unmount() {
    this.preAction('beforeUnmountSelf');
    this.postAction('unmountSelf');

    this.preAction('preUnmountSelf');
    this.postAction('postUnmountSelf');
  }

  // =============== Outer Lifecycle End =================== //

  // =============== Output Start =================== //

  protected setupOutputToData() {
    this.current = {};
    for (const [key, value] of Object.entries(this.output || {})) {
      Object.defineProperty(this.current, key, {
        get() {
          // TODO: 判断
          return value?.current;
        },
      });
    }
  }
  // =============== Output End =================== //
}

export async function start<
  I extends InputOutputInterface,
  O extends InputOutputInterface
>(template: ModelBlockTemplate<I, O>, input?: I) {
  const block = new ModelBlock({ template, input });
  block.mount();
  return block;
}
