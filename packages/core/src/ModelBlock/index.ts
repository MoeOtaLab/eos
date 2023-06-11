type PostInitFn = () => void;
type PreInitFn = () => {
  output?: any;
  outputEvents?: any;
  postInitFn?: PostInitFn;
};

export class ModelBlock<Children extends ModelBlock[] = ModelBlock<any>[]> {
  name: string;

  preInitFn: PreInitFn;
  postInitFn?: PostInitFn;

  children: Children;

  parent: ModelBlock | null = null;

  state?: any;

  constructor(name: string, initFn: PreInitFn, children: Children) {
    this.name = name;
    this.children = children;
    this.preInitFn = initFn;
  }

  private log(message: string) {
    console.log(`[ModelBlock]: ${message}`, this.name);
  }

  private async doWithChildren(
    fn: (modelBlock: ModelBlock) => void,
    reverse = false
  ) {
    const children = [...this.children];

    if (reverse) {
      children.reverse();
    }

    for (const modelBlock of children) {
      await fn(modelBlock);
    }
  }

  private async preInitSelf() {
    this.log('preInitSelf');
    const { postInitFn, ...state } = await this.preInitFn();
    this.postInitFn = postInitFn;
    this.state = state;
  }

  private async postInitSelf() {
    this.log('postInitSelf');
    await this.postInitFn?.();
  }

  // TBD: should be async or not?
  async preInit(parent: ModelBlock | null) {
    this.parent = parent;
    await this.preInitSelf();
    await this.doWithChildren(async (modelBlock) => {
      await modelBlock.preInit(this);
    });
  }

  async postInit() {
    await this.doWithChildren(async (modelBlock) => {
      await modelBlock.postInit();
    }, true);
    await this.postInitSelf();
  }

  async start() {
    await this.init(null);
    await this.mount();
  }

  async init(parent: ModelBlock | null) {
    await this.preInit(parent);
    await this.postInit();
  }

  private async preMountSelf() {
    this.log('preMountSelf');
  }

  private async postMountSelf() {
    this.log('postMountSelf');
  }

  async preMount() {
    await this.preMountSelf();
    await this.doWithChildren(async (modelBlock) => {
      await modelBlock.preMount();
    });
  }

  async postMount() {
    await this.doWithChildren(async (modelBlock) => {
      await modelBlock.postMount();
    }, true);
    await this.postMountSelf();
  }

  async mount() {
    await this.preMount();
    await this.postMount();
  }

  private async preUnmountSelf() {
    this.log('preUnmountSelf');
  }

  private async preUnmount() {
    await this.preUnmountSelf();
    await this.doWithChildren(async (modelBlock) => {
      await modelBlock.preUnmount();
    });
  }

  private async postUnmountSelf() {
    this.log('postUnmountSelf');
  }

  private async postUnmount() {
    await this.doWithChildren(async (modelBlock) => {
      await modelBlock.postUnmount();
    }, true);
    await this.postUnmountSelf();
  }

  async unmount() {
    await this.preUnmount();
    await this.postUnmount();
  }
}
