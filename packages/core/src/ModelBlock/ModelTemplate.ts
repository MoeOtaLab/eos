import { ModelBlockContext } from './ModelBlock';

export type InputOutputInterface = Record<string, any>;

export type SetupFn<
  InputInterface extends InputOutputInterface,
  OutputInterface extends InputOutputInterface
> = (input: InputInterface, context: ModelBlockContext) => OutputInterface;

type ModelTemplateOption<
  InputInterface extends InputOutputInterface = any,
  OutputInterface extends InputOutputInterface = any
> = {
  name: string;
  setup: SetupFn<InputInterface, OutputInterface>;
};

export class ModelTemplate<
  InputInterface extends InputOutputInterface = any,
  OutputInterface extends InputOutputInterface = any
> {
  name: string;

  setup: SetupFn<InputInterface, OutputInterface>;

  constructor(options: ModelTemplateOption) {
    const { name, setup } = options;
    this.name = name;
    this.setup = setup;
  }
}
