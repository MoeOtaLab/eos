import { EventEmitter } from '../EventEmitter';
import { RelationHelper } from './RelationHelper';
import {
  type SetupFn,
  type InputOutputInterface,
} from './ModelTemplate';
import { ModelConstructor, type ModelConstructorOption } from './ModelConstructor';

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

export interface ModelBlockContextType {
  id: string;
  onLifecycle: <CallbackType extends () => any>(
    lifecycleType: AtomLifecycleEventType,
    callback: CallbackType
  ) => any;
  mount: <I extends InputOutputInterface, O extends InputOutputInterface>(
    template: SetupFn<I, O>,
    input?: I,
  ) => ModelConstructor<I, O>;
  unmount: (node: ModelConstructor) => void;
}

export enum ModelBlockStatus {
  BeforeInited,
  Initing,
  Done
}

export class ModelBlock<
  InputInterface extends InputOutputInterface = any,
  OutputInterface extends InputOutputInterface = any
> extends ModelConstructor<InputInterface, OutputInterface> {
  /**
   * @deprecated
   * @private
   * 下一个子节点
   * */
  next?: ModelBlock<any, any> | null = null;

  /**
   * @deprecated
   * @private
   * 下一个兄弟节点
   * */
  nextSibling?: ModelBlock<any, any> | null = null;

  /**
   * @deprecated
   * @private
   * 父节点
   * */
  return: ModelBlock | null = null;

  protected eventEmitter: EventEmitter = new EventEmitter();

  protected status: ModelBlockStatus = ModelBlockStatus.BeforeInited;

  protected pendingChildren: ModelBlock[] = [];

  protected relationHelper: RelationHelper;

  constructor(options: ModelConstructorOption<InputInterface, OutputInterface>) {
    super(options);
    this.relationHelper = new RelationHelper(this);
  }

  protected setNext(next: ModelBlock<any, any> | null | undefined) {
    this.next = next;
  }

  protected setNextSibling(nextSibling: ModelBlock<any, any> | null | undefined) {
    this.nextSibling = nextSibling;
  }

  protected setReturn(parent: ModelBlock<any, any> | null | undefined) {
    this.return = parent ?? null;
  }

  /**
   * @deprecated should not be use outside
   * @private
   */
  _getInnerHandler() {
    return {
      getContext: this.getContext.bind(this),
    };
  }

  protected getContext(): ModelBlockContextType {
    return {
      id: this.uid,
      onLifecycle: this.onLifecycle.bind(this),
      mount: this.mountTemplate.bind(this),
      unmount: this.unmountChild.bind(this),
    };
  }

  // =============== Utils Start =================== //

  protected onLifecycle<CallbackType extends (
  ) => any>(
    lifecycleType: AtomLifecycleEventType,
    callback: CallbackType
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

  protected mountTemplate<
    I extends InputOutputInterface,
    O extends InputOutputInterface
  >(
    template: SetupFn<I, O>,
    input?: I
  ): ModelConstructor<I, O> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    /** @ts-expect-error */
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

    const block = new ModelBlock({
      template,
      input,
    });

    this.mountChild(block);

    return block;
  }

  protected mountChild<
    I extends InputOutputInterface,
    O extends InputOutputInterface
  >(block: ModelBlock<I, O>) {
    console.log('mount::status', this.status);

    if (this.status === ModelBlockStatus.Done) {
      this.mountChildOnly(block);
    } else if (this.status === ModelBlockStatus.Initing) {
      this.pendingChildren.push(block);
    } else if (this.status === ModelBlockStatus.BeforeInited) {
      this.relationHelper.addNextChildren(block);
    }
  }

  protected unmountChild(block: ModelConstructor) {
    if (block instanceof ModelBlock) {
      this.relationHelper.removeChild(block);
      block.unmount();
    }
  }

  protected triggerLifecycle(eventType: AtomLifecycleEventType) {
    this.eventEmitter.emit(eventType, undefined);
  }

  // =============== Utils End =================== //

  // =============== Self Start =================== //

  protected preInitSelf() {
    this.log('preInitSelf');
    this.output = this.template(this.input, this.getContext());
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
}
