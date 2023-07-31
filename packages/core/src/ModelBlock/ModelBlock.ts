import { Atom, ModelContainerAtom } from '../ModelAtom';
import { ModelBlockChildrenMap } from './ModelBlockChildrenMap';

type InputInterface = Record<string, any>;

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
  'start' | 'init' | 'preInit' | 'stop'
>;

type SetupFn<InputStruct extends Partial<Record<string, InputInterface>>> = (
  input: InputStruct,
  modelChildrenMap: ModelBlockChildrenMap
) => Record<string, Atom<any>>;

export class ModelBlock<
  InputStruct extends Partial<Record<string, InputInterface>> = any
> {
  name: string;

  /** output after handled */
  data: any;

  /** raw data */
  protected output?: Record<string, Atom<any>>;

  protected input: InputStruct;

  /** setup fn */
  protected setupFn: SetupFn<InputStruct>;

  protected childrenMap: ModelBlockChildrenMap;

  protected parent: ModelBlock | null = null;

  constructor(
    options: {
      name: string;
      setup: SetupFn<InputStruct>;
    },
    children: ModelBlock[]
  ) {
    const { name, setup } = options;

    this.name = name;

    this.childrenMap = new ModelBlockChildrenMap(children, {
      onChildrenCreate: async (children) => {
        await this.triggerChildrenLifecycle('start', children);
      },
      onChildrenRemove: async (children) => {
        await this.triggerChildrenLifecycle('unmount', children);
      },
    });

    this.input = {} as InputStruct;

    this.setupFn = setup;
  }

  // =============== Utils Start =================== //

  protected log(message: string) {
    console.log(`[ModelBlock]: ${message}`, this.name);
  }

  protected async doWithChildren(
    children: ModelBlock[],
    fn: (modelBlock: ModelBlock) => void,
    reverse = false
  ) {
    const childList = [...children];

    if (reverse) {
      childList.reverse();
    }

    for (const modelBlock of childList) {
      await fn(modelBlock);
    }
  }

  protected async triggerChildrenLifecycle(
    eventType: LifecycleEventType,
    children: ModelBlock[] = this.childrenMap.children
  ) {
    await this.doWithChildren(
      children,
      (modelBlock) => {
        modelBlock[eventType](this);
      },
      eventType.startsWith('post')
    );
  }

  protected triggerAtomLifecycleByAtoms(
    atoms: Atom<any>[],
    eventType: AtomLifecycleEventType,
    depth = 0,
    parentAtom?: Atom<any>
  ) {
    if (depth > 25) {
      throw new Error(
        `${
          parentAtom?.type || 'Atom'
        } Depth max than 25, please check if there is a circle dependence`
      );
    }

    for (const atom of atoms) {
      if (!atom) {
        continue;
      }

      atom?.[eventType]?.();
      if (ModelContainerAtom.isContainer(atom)) {
        const atomList = Object.values(atom.value);
        if (Array.isArray(atomList) && atomList?.length) {
          this.triggerAtomLifecycleByAtoms(
            atomList,
            eventType,
            depth + 1,
            atom
          );
        }
      }
    }
  }

  protected async triggerAtomLifecycle(eventType: AtomLifecycleEventType) {
    const atomList = Object.values(this.output || {});
    if (Array.isArray(atomList)) {
      this.triggerAtomLifecycleByAtoms(atomList, eventType);
    }
  }

  // =============== Utils End =================== //

  // =============== Self Start =================== //

  protected async preInitSelf() {
    this.log('preInitSelf');
    this.output = await this.setupFn(this.input, this.childrenMap);
    this.setupOutputToData();
  }

  protected async postInitSelf() {
    this.log('postInitSelf');
    await this.triggerAtomLifecycle('postInit');
  }

  protected async preMountSelf() {
    this.log('preMountSelf');
    await this.triggerAtomLifecycle('preMount');
  }

  protected async beforeMountSelf() {
    this.log('beforeMountSelf');
    await this.triggerAtomLifecycle('beforeMount');
  }

  protected async postMountSelf() {
    this.log('postMountSelf');
    await this.triggerAtomLifecycle('postMount');
  }

  protected async mountSelf() {
    this.log('mountSelf');
    await this.triggerAtomLifecycle('mount');
  }

  protected async preUnmountSelf() {
    this.log('preUnmountSelf');
    await this.triggerAtomLifecycle('preUnmount');
  }

  protected async beforeUnmountSelf() {
    this.log('beforeUnmountSelf');
    await this.triggerAtomLifecycle('beforeUnmount');
  }

  protected async postUnmountSelf() {
    this.log('postUnmountSelf');
    await this.triggerAtomLifecycle('postUnmount');
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

  async start() {
    await this.init(null);
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
    this.data = {};
    for (const [key, value] of Object.entries(this.output || {})) {
      Object.defineProperty(this.data, key, {
        get() {
          return value?.value;
        },
      });
    }
  }
  // =============== Output End =================== //

  // =============== Input Start =================== //
  async setupInput(input: InputStruct) {
    this.input = input || ({} as InputStruct);
  }
  // =============== Input End =================== //
}
