import { Atom } from '../ModelAtom/Atom';
import { ModelBlockChildrenMap } from './ModelBlockChildrenMap';

export enum InputTypeEnum {}
// STATE = 'STATE',
// EVENT = 'EVENT',

type InputInterface = Record<string, any>;

type LifecycleEventType =
  | 'start'
  | 'init'
  | 'mount'
  | 'unmount'
  | 'preInit'
  | 'postInit'
  | 'preMount'
  | 'postMount'
  | 'preUnmount'
  | 'postUnmount';

type SetupFn<
  InputStruct extends Partial<Record<InputTypeEnum, InputInterface>>
> = (
  options: InputStruct,
  modelChildrenMap: ModelBlockChildrenMap
) => Record<string, Atom<any>>;

export class ModelBlock<
  InputStruct extends Partial<Record<InputTypeEnum, InputInterface>> = any
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

  protected async triggerAtomLifecycle(
    eventType: Exclude<
      LifecycleEventType,
      'start' | 'init' | 'mount' | 'unmount' | 'preInit'
    >
  ) {
    for (const atom of Object.values(this.output || {})) {
      await atom?.[eventType]?.();
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
    await this.triggerAtomLifecycle('postInit');
    this.log('postInitSelf');
  }

  protected async preMountSelf() {
    await this.triggerAtomLifecycle('preMount');
    this.log('preMountSelf');
  }

  protected async postMountSelf() {
    await this.triggerAtomLifecycle('postMount');
    this.log('postMountSelf');
  }

  protected async preUnmountSelf() {
    await this.triggerAtomLifecycle('preUnmount');
    this.log('preUnmountSelf');
  }

  protected async postUnmountSelf() {
    await this.triggerAtomLifecycle('postUnmount');
    this.log('postUnmountSelf');
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

  protected async mount() {
    await this.preMount();
    await this.postMount();
  }

  async start(parent: ModelBlock | null = null) {
    await this.init(parent);
    await this.mount();
  }

  async unmount() {
    await this.preUnmount();
    await this.postUnmount();
  }

  // =============== Outer Lifecycle End =================== //

  // =============== Output Start =================== //

  protected setupOutputToData() {
    this.data = this.output;
  }
  // =============== Output End =================== //
}
