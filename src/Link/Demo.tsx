import React, { useState } from 'react';

import { combineLatest } from 'rxjs';
import { useObservable } from 'rxjs-hooks';
import { delay, map, tap } from 'rxjs/operators';
import {
  getBlurValueSource,
  setValue,
  Field,
  getValueSource,
  Wrap,
  getInstantValueSource,
} from './link';

function createBlurLink(field1: string, field2: string) {
  const blurValue$ = getBlurValueSource<string>(field1);
  const value2$ = blurValue$.pipe(
    tap(console.log),
    map((value) => 2 * (Number(value) || 0) + '')
  );

  value2$.subscribe((value) => {
    setValue(field2, value);
  });

  return value2$;
}

function createTotalCount(...fields: Field[]) {
  const valueSources = fields.map((name) => getValueSource<number>(name));
  const value$ = combineLatest(valueSources).pipe(
    map((values) => values.reduce((prev, cur) => prev + Number(cur), 0))
  );
  return value$;
}

function awaitChange(field: string) {
  getInstantValueSource<string>(field)
    .pipe(tap(console.log), delay(2000), tap(console.log))
    .subscribe((val) => setValue(field, val));
}

const log$ = createBlurLink('value', 'value2');

// createBlurLink('value3', 'value4')
// createBlurLink('value2', 'value3')

const total1$ = createTotalCount('value', 'value2');
const total2$ = createTotalCount('value', 'value3');
const totalAll$ = createTotalCount('value', 'value2', 'value3', {
  name: 'value4',
  namespace: 'test',
});

// awaitChange('value')
export const Demo: React.FC = () => {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');

  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');

  const [select, setSelect] = useState('');

  const total1 = useObservable(() => total1$);
  const total2 = useObservable(() => total2$);
  const totalAll = useObservable(() => totalAll$);
  const log = useObservable(() => log$);

  return (
    <div>
      <div>
        <li>total1: {total1}</li>
        <li>total2: {total2}</li>
        <li>totalAll: {totalAll}</li>
      </div>

      <div>log: {log}</div>
      <Wrap name="select" value={select} onChange={setSelect}>
        <select>
          <option value="">0</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
      </Wrap>
      <br />
      <Wrap name="value" value={value} onChange={setValue}>
        <input />
      </Wrap>
      <Wrap name="value2" value={value2} onChange={setValue2}>
        <input type="number" />
      </Wrap>

      <br />

      <Wrap name="value3" value={value3} onChange={setValue3}>
        <input type="number" />
      </Wrap>
      <Wrap name="value4" value={value4} onChange={setValue4} namespace="test">
        <input type="number" />
      </Wrap>
    </div>
  );
};
