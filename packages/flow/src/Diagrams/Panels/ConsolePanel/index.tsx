import React, { useState } from 'react';
import { useDiagramsState } from '../../State/DiagramsProvider';
import { convertToGraph, compile } from '../../Compiler';
import { LinkRuntimeContextProvider } from '../../Compiler/runtime';
import { Demo } from './Demo';

export const ConsolePanel: React.FC = () => {
  const { elements } = useDiagramsState();
  const [output, setOutput] = useState('');

  return (
    <div>
      <div>Console Panel</div>
      <br />
      <div
        style={{
          display: 'grid',
          gap: 16,
          gridAutoFlow: 'column',
          justifyContent: 'start',
        }}
      >
        <button
          onClick={() => {
            console.log(convertToGraph(elements));
          }}
        >
          console graph
        </button>

        <button onClick={() => setOutput(compile(elements))}>
          Compile And Run
        </button>
      </div>

      <div>
        <br />
        <LinkRuntimeContextProvider value={output}>
          <Demo />
        </LinkRuntimeContextProvider>
      </div>

      <pre>{output}</pre>
    </div>
  );
};
