import React, { useState } from 'react';
import { Wrap } from './link';
import { map, tap } from 'rxjs/operators';
import {
  selectSource,
  resetValue,
  updateValue,
  syncValue,
  logicCombine,
} from './link-utils';

// selectSource('country', 'change')
//   .pipe(map(resetValue))
//   .pipe(map((val) => updateValue(val, 'city')))
//   .subscribe(() => {})

logicCombine(
  [selectSource('country', 'blurValue')],
  [selectSource('city', 'value')],
  (_input, [city]) => !city
)
  .pipe(tap(console.log))
  .pipe(map((val) => updateValue(val, 'city')))
  .subscribe(() => {});

export const DemoXtoX: React.FC = () => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  return (
    <div>
      <div>
        <label>country</label>
        <Wrap name="country" onChange={setCountry} value={country}>
          <input placeholder="country" />
        </Wrap>
        <Wrap name="city" onChange={setCity} value={city}>
          <input placeholder="city" />
        </Wrap>
      </div>
    </div>
  );
};
