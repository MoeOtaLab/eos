import { ModelBlock } from './ModelBlock';
import { type InputOutputInterface, type SetupFn } from './ModelTemplate';

export function start<
  I extends InputOutputInterface,
  O extends InputOutputInterface,
>(template: SetupFn<I, O>, input?: I) {
  const block = new ModelBlock({ template, input });
  block.mount();
  return block;
}
