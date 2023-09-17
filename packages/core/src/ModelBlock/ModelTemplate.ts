import { type ModelBlockContext } from './ModelBlock';

export type MountType = 'group' | 'block';

export type InputOutputInterface = Record<string, any>;

export type SetupFn<
  InputInterface extends InputOutputInterface,
  OutputInterface extends InputOutputInterface
> = (input: InputInterface, context: ModelBlockContext) => OutputInterface;

interface ModelTemplateOption<
  InputInterface extends InputOutputInterface = any,
  OutputInterface extends InputOutputInterface = any
> {
  name: string;
  setup: SetupFn<InputInterface, OutputInterface>;
  /**
   * @default block
   */
  preferMountType?: MountType;
}

export class ModelTemplate<
  InputInterface extends InputOutputInterface = any,
  OutputInterface extends InputOutputInterface = any
> {
  name: string;

  setup: SetupFn<InputInterface, OutputInterface>;

  preferMountType: MountType;

  constructor(options: ModelTemplateOption) {
    const { name, setup, preferMountType = 'block' } = options;
    this.name = name;
    this.setup = setup;
    this.preferMountType = preferMountType;
  }
}
