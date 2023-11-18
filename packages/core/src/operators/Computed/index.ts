import { ComputedState, type GetObservableValueList } from '../../ModelState/ComputedState';
import { type ModelBlockContextType } from '../../ModelBlock';
import { type Atom } from '../../ModelState/State';

/** @deprecated */
export function Computed<ComputedValueType, ObservableSubjectList extends Array<Atom<any>>>(input: {
  inputs: ObservableSubjectList;
  defaultValue: ComputedValueType;
  computedFn: (...subjectValueList: GetObservableValueList<ObservableSubjectList>) => any;
}, context: ModelBlockContextType) {
  const computedState = new ComputedState(input.defaultValue);
  computedState.compute(input.inputs, input.computedFn);

  return computedState;
}
