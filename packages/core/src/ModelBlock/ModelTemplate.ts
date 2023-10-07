import { type ModelBlockContextType } from './ModelBlock';

export type InputOutputInterface = Record<string, any>;

export interface SetupFn<
  InputInterface extends InputOutputInterface,
  OutputInterface extends InputOutputInterface
> {
  (input: InputInterface, context: ModelBlockContextType): OutputInterface;

  meta?: {
    name?: string;
  };
}
