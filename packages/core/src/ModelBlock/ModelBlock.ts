import { Atom, ModelContainerAtom } from '../ModelAtom';
import { ModelBlockChildrenMap } from './ModelBlockChildrenMap';
import { EventEmitter } from '../EventEmitter';

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

type InputOutputInterface = Record<string, Atom<any> | ModelBlock>;

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

enum ModelBlockStatus {
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

  /** output after handled */
  current: any;

  protected eventEmitter: EventEmitter = new EventEmitter();

  /** raw data */
  protected output?: OutputInterface;

  protected input: InputInterface;

  protected childrenMap: ModelBlockChildrenMap;

  protected parent: ModelBlock | null = null;

  protected status: ModelBlockStatus = ModelBlockStatus.BeforeInited;

  protected pendingChildren: ModelBlock[] = [];

  constructor(options: {
    template: ModelBlockTemplate<InputInterface, OutputInterface>;
    input?: InputInterface;
  }) {
    const { template, input } = options;
    this.template = template;
    this.input = input || ({} as InputInterface);

    this.childrenMap = new ModelBlockChildrenMap([]);
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

  protected mountChild<
    I extends InputOutputInterface,
    O extends InputOutputInterface
  >(template: ModelBlockTemplate<I, O>, input: I) {
    /** @ts-ignore */
    if (template === this.template) {
      throw new Error('can not mount yourself');
    }

    let self = this.parent;
    while (self) {
      if (template === self.template) {
        throw new Error('loop');
      }
      self = self.parent;
    }
    const block = new ModelBlock({ template, input });

    if (this.status === ModelBlockStatus.Done) {
      this.triggerChildrenLifecycle('start', [block]);
      this.childrenMap.add(block);
    } else if (this.status === ModelBlockStatus.Initing) {
      this.pendingChildren.push(block);
    } else if (this.status === ModelBlockStatus.BeforeInited) {
      this.childrenMap.add(block);
    }

    return block;
  }

  protected log(message: string) {
    console.log(`[ModelBlock ${this.name} - ${this.id}]: ${message}`);
  }

  protected async doWithChildren(
    children: ModelBlock[],
    fn: (modelBlock: ModelBlock) => void
  ) {
    const childList = [...children];

    for (const modelBlock of childList) {
      await fn(modelBlock);
    }
  }

  protected async triggerChildrenLifecycle(
    eventType: LifecycleEventType,
    children: ModelBlock[] = this.childrenMap.children
  ) {
    await this.doWithChildren(children, async (modelBlock) => {
      await modelBlock[eventType](this);
    });
  }

  // protected triggerAtomLifecycleByAtoms(
  //   atoms: Atom<any>[],
  //   eventType: AtomLifecycleEventType,
  //   depth = 0,
  //   parentAtom?: Atom<any>
  // ) {
  //   if (depth > 25) {
  //     throw new Error(
  //       `${
  //         parentAtom?.type || 'Atom'
  //       } Depth max than 25, please check if there is a circle dependence`
  //     );
  //   }

  //   for (const atom of atoms) {
  //     if (!atom) {
  //       continue;
  //     }

  //     atom?.[eventType]?.();
  //     if (ModelContainerAtom.isContainer(atom)) {
  //       const atomList = Object.values(atom.value);
  //       if (Array.isArray(atomList) && atomList?.length) {
  //         this.triggerAtomLifecycleByAtoms(
  //           atomList,
  //           eventType,
  //           depth + 1,
  //           atom
  //         );
  //       }
  //     }
  //   }
  // }

  protected async triggerAtomLifecycle(eventType: AtomLifecycleEventType) {
    this.eventEmitter.emit(eventType);
    // const atomList = Object.values(this.output || {});
    // if (Array.isArray(atomList)) {
    //   this.triggerAtomLifecycleByAtoms(atomList, eventType);
    // }
  }

  // =============== Utils End =================== //

  // =============== Self Start =================== //

  protected async preInitSelf() {
    this.log('preInitSelf');
    this.output = await this.template.setup(this.input, this.context);
    this.setupOutputToData();
    this.status = ModelBlockStatus.Initing;
  }

  protected async postInitSelf() {
    this.log('postInitSelf');
    await this.triggerAtomLifecycle('postInit');
  }

  protected async preMountSelf() {
    this.log('preMountSelf');
    await this.triggerAtomLifecycle('preMount');
  }

  protected async postMountSelf() {
    this.log('postMountSelf');
    await this.triggerAtomLifecycle('postMount');

    // handle pending children
    this.status = ModelBlockStatus.Done;
    if (this.pendingChildren?.length) {
      this.log('pendingChildren');
      await this.triggerChildrenLifecycle('start', this.pendingChildren);
      this.pendingChildren = [];
    }
  }

  protected async beforeMountSelf() {
    this.log('beforeMountSelf');
    await this.triggerAtomLifecycle('beforeMount');
  }

  protected async mountSelf() {
    this.log('mountSelf');
    await this.triggerAtomLifecycle('mount');
  }

  protected async preUnmountSelf() {
    this.log('preUnmountSelf');
    await this.triggerAtomLifecycle('preUnmount');
  }

  protected async postUnmountSelf() {
    this.log('postUnmountSelf');
    await this.triggerAtomLifecycle('postUnmount');
  }

  protected async beforeUnmountSelf() {
    this.log('beforeUnmountSelf');
    await this.triggerAtomLifecycle('beforeUnmount');
  }

  protected async unmountSelf() {
    this.log('unmountSelf');
    await this.triggerAtomLifecycle('unmount');
  }

  // =============== Self End =================== //

  // =============== Inner Lifecycle Start =================== //
  // TBD: should be async or not?
  protected async preInit(parent: ModelBlock<any> | null) {
    this.parent = parent;
    await this.preInitSelf();
    await this.triggerChildrenLifecycle('preInit');
  }

  protected async postInit() {
    await this.triggerChildrenLifecycle('postInit');
    await this.postInitSelf();
  }

  protected async preMount() {
    await this.preMountSelf();
    await this.triggerChildrenLifecycle('preMount');
  }

  protected async postMount() {
    await this.triggerChildrenLifecycle('postMount');
    await this.postMountSelf();
  }

  protected async beforeMount() {
    await this.beforeMountSelf();
    await this.triggerChildrenLifecycle('beforeMount');
  }

  protected async mount() {
    await this.triggerChildrenLifecycle('mount');
    await this.mountSelf();
  }

  protected async beforeUnmount() {
    await this.beforeUnmountSelf();
    await this.triggerChildrenLifecycle('beforeUnmount');
  }

  protected async unmount() {
    await this.triggerChildrenLifecycle('unmount');
    await this.unmountSelf();
  }

  protected async preUnmount() {
    await this.preUnmountSelf();
    await this.triggerChildrenLifecycle('preUnmount');
  }

  protected async postUnmount() {
    await this.triggerChildrenLifecycle('postUnmount');
    await this.postUnmountSelf();
  }
  // =============== Inner Lifecycle End =================== //

  // =============== Outer Lifecycle Start =================== //

  protected async init(parent: ModelBlock | null) {
    await this.preInit(parent);
    await this.postInit();
  }

  protected async doMount() {
    await this.preMount();
    await this.postMount();
    await this.beforeMount();
    await this.mount();
  }

  async start(parent?: ModelBlock | null) {
    await this.init(parent || null);
    await this.doMount();
  }

  async stop() {
    await this.beforeUnmount();
    await this.unmount();
    await this.preUnmount();
    await this.postUnmount();
  }

  // =============== Outer Lifecycle End =================== //

  // =============== Output Start =================== //

  protected setupOutputToData() {
    this.current = {};
    for (const [key, value] of Object.entries(this.output || {})) {
      Object.defineProperty(this.current, key, {
        get() {
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
  await block.start();
  return block;
}
