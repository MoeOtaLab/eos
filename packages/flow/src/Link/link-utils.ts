import {
  getBlurSource,
  getInstantValueSource,
  Field,
  getValueSource,
  getBlurValueSource,
  getChangeSource,
  setValue,
} from './link';
import { combineLatest, Observable } from 'rxjs';
import { withLatestFrom, map, filter } from 'rxjs/operators';

/** begin a stream */
export function selectSource(
  field: Field,
  sourceType: 'blur' | 'instantValue' | 'value' | 'blurValue' | 'change'
) {
  switch (sourceType) {
    case 'blur':
      return getBlurSource(field);
    case 'instantValue':
      return getInstantValueSource(field);
    case 'value':
      return getValueSource(field);
    case 'blurValue':
      return getBlurValueSource(field);
    case 'change':
      return getChangeSource(field);
    default:
      throw new Error('should provide a sourceType');
  }
}

export function resetValue() {
  return '';
}

/** update value for a field */
export function updateValue(value: any, field: Field) {
  setValue(field, value);
}

export function syncValue(field: Field) {
  return selectSource(field, 'value');
}

export function logicCombine(
  inputs: Observable<any>[],
  subInputs: Observable<any>[],
  passFn: (inputsValue: any[], subValues: any[]) => boolean = () => true,
  combineFn: (inputsValue: any[], subValues: any[]) => any = (inputsValue) => {
    if (inputsValue?.length === 1) {
      return inputsValue[0];
    }
    return inputsValue;
  }
) {
  return combineLatest(inputs)
    .pipe(withLatestFrom(...subInputs))
    .pipe(
      filter(([inputsValue, ...subValues]) => passFn(inputsValue, subValues))
    )
    .pipe(
      map(([inputsValue, ...subValues]) => combineFn(inputsValue, subValues))
    );
}
