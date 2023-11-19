import React, { useState } from 'react';
import { useDiagramsState } from '../../State/DiagramsProvider';
import { convertToGraph, compile } from '../../Compiler';
import { LinkRuntimeContextProvider } from '../../Compiler/runtime';
import { Demo } from './Demo';
import { Button } from 'antd';

export const ConsolePanel: React.FC = () => {
  const { nodes, edges } = useDiagramsState();
  const [output, setOutput] = useState('');

  return (
    <div>
      <div>Console</div>
      <br />
      <div
        style={{
          display: 'grid',
          gap: 16,
          gridAutoFlow: 'column',
          justifyContent: 'start',
        }}
      >
        <Button
          type="link"
          onClick={() => {
            console.log(convertToGraph(nodes, edges));
            console.log({
              nodes,
              edges,
            });
          }}
        >
          Console Graph
        </Button>

        <Button
          type="link"
          onClick={() => {
            setOutput(compile(nodes, edges));
          }}
        >
          Compile and Run
        </Button>
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
