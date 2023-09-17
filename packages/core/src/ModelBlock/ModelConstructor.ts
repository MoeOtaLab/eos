import { v4 as uuid } from 'uuid';
import { type ModelTemplate, type InputOutputInterface } from './ModelTemplate';

export interface ModelConstructorOption<
  InputInterface extends InputOutputInterface = any,
  OutputInterface extends InputOutputInterface = any
> {
  template: ModelTemplate<InputInterface, OutputInterface>;
  input?: InputInterface;
}

export class ModelConstructor<
  InputInterface extends InputOutputInterface = any,
  OutputInterface extends InputOutputInterface = any
> {
  id = uuid();

  protected template: ModelTemplate<InputInterface, OutputInterface>;

  /** raw data */
  output?: OutputInterface;

  protected input: InputInterface;

  constructor(
    options: ModelConstructorOption<InputInterface, OutputInterface>
  ) {
    const { template, input } = options;
    this.template = template;
    this.input = input || ({} as InputInterface);
  }

  get name() {
    return this.template?.name;
  }

  protected log(message: string) {
    console.log(`[ModelBlock ${this.name} - ${this.id}]: ${message}`);
  }
}
