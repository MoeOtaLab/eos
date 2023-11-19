import React, { useState } from 'react';
import { useDiagramsState } from '../../State/DiagramsProvider';
import { complie, NodeGraph } from '../../Compiler';
import { LinkRuntimeContextProvider } from '../../Compiler/runtime';
import { Demo } from './Demo';
import { Button } from 'antd';
import { type Edge, type Node } from 'reactflow';
import { cloneDeep } from 'lodash';

export const ConsolePanel: React.FC = () => {
  const { nodes, edges } = useDiagramsState();
  const [output, setOutput] = useState('');
  const [code, setCode] = useState('');
  const [cacheData, setCacheData] = useState<{
    nodes: Node[];
    edges: Edge[];
  }>({
    nodes: [],
    edges: [],
  });

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
            console.log(new NodeGraph(nodes, edges));
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
            setOutput(complie({ nodes, edges }));
          }}
        >
          Compile
        </Button>

        <Button
          type="link"
          onClick={() => {
            const code = complie({ nodes, edges });
            setCacheData(cloneDeep({ nodes, edges }));
            setOutput(code);
            setCode(code);
          }}
        >
          Compile and Run
        </Button>
      </div>

      <div>
        <br />
        <LinkRuntimeContextProvider
          value={code}
          nodes={cacheData.nodes}
          edges={cacheData.edges}
        >
          <Demo />
        </LinkRuntimeContextProvider>
      </div>

      <pre>{output}</pre>
    </div>
  );
};
