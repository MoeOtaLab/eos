import React, { useState } from 'react';
import { Wrap } from '../../../Link/link';
import { useValue } from '../../Compiler/runtime';

export const Demo: React.FC = () => {
  const [value, setValue] = useState('');
  const [value2, setValue2] = useState('');
  const output = useValue<string>('$flow_slgum');

  return (
    <div
      style={{
        display: 'grid',
        gap: 16,
        gridAutoFlow: 'column',
        justifyContent: 'start',
      }}
    >
      <Wrap name="value" value={value} onChange={setValue}>
        <input type="number" />
      </Wrap>
      <Wrap name="value2" value={value2} onChange={setValue2}>
        <input type="number" />
      </Wrap>
      <output>{output}</output>
    </div>
  );
};
