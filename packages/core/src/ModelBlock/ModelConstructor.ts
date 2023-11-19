import { type SetupFn, type InputOutputInterface } from './ModelTemplate';
import { Entity } from '../Entity';

export interface ModelConstructorOption<
  InputInterface extends InputOutputInterface = any,
  OutputInterface extends InputOutputInterface = any,
> {
  template: SetupFn<InputInterface, OutputInterface>;
  input?: InputInterface;
}

export class ModelConstructor<
  InputInterface extends InputOutputInterface = any,
  OutputInterface extends InputOutputInterface = any,
> extends Entity {
  protected template: SetupFn<InputInterface, OutputInterface>;

  /** raw data */
  output?: OutputInterface;

  protected input: InputInterface;

  constructor(
    options: ModelConstructorOption<InputInterface, OutputInterface>,
  ) {
    super();
    const { template, input } = options;
    this.template = template;
    this.input = input || ({} as InputInterface);
  }

  get name() {
    return this.template.meta?.name || this.template?.name;
  }

  protected log(message: string) {
    console.log(`[ModelBlock ${this.name} - ${this.uid}]: ${message}`);
  }
}
