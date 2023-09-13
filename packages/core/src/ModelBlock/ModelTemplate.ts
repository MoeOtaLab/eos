import { InputOutputInterface, ModelBlockContext } from './ModelBlock';

export type SetupFn<
  InputInterface extends InputOutputInterface,
  OutputInterface extends InputOutputInterface
> = (input: InputInterface, context: ModelBlockContext) => OutputInterface;

export class ModelTemplate<
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
