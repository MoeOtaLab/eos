import { Button, Input, message } from 'antd';
import { type Node } from 'reactflow';
import { useLinkRuntimeContext } from '../../Compiler/runtime';
import { NodeGraph } from '../../Compiler';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import {
  type IInputNodeData,
  type IOutputNodeData,
  OutputNodePortTypeEnum,
  InputNodePortTypeEnum,
} from '../../Nodes/types';
import { useEffect, useState } from 'react';
import { formatVariableName } from '../../Compiler/graph';

export const Demo: React.FC = () => {
  const { store, nodes, edges } = useLinkRuntimeContext();

  const nodeGraph = new NodeGraph(nodes, edges);

  const inputNode = nodes.find(
    (item): item is Node<IInputNodeData> =>
      item.type === NodeTypeEnum.InputNode,
  );
  const outputNode = nodes.find(
    (item): item is Node<IOutputNodeData> =>
      item.type === NodeTypeEnum.OutputNode,
  );

  useEffect(() => {
    const outputPorts = outputNode?.data.targetPorts.filter(
      (item) => item.type === OutputNodePortTypeEnum.Event,
    );

    outputPorts?.forEach((port) => {
      store.exports.output.var_container.output[
        formatVariableName(port.id)
      ]?.subscribe((value: any, extraInfo: any) => {
        message.info(`value: ${value}`);
        console.log('events', port, value, extraInfo);
      });
    });
  }, [store]);

  const [inputValue, setInputValue] = useState('');
  const [, forceUpdate] = useState([]);

  const outputValueIds = outputNode?.data.targetPorts
    .filter((item) => item.type === OutputNodePortTypeEnum.State)
    .map((item) => {
      const handleId = nodeGraph
        .findSourceNodes(outputNode.id)
        ?.find((con) => con.handleId === item.id)?.relatedHandleId;
      return { port: item, handleId };
    });

  useEffect(() => {
    outputValueIds
      ?.map(({ handleId }) => {
        return store.exports?.output?.var_container?.output?.[
          formatVariableName(handleId || '')
        ];
      })
      .forEach((value) => {
        value?.subscribe((value: any, extraInfo: any) => {
          console.log(value, extraInfo);
          forceUpdate([]);
        });
      });
  }, [outputValueIds]);

  return (
    <div
      style={{
        display: 'grid',
        gap: 16,
        gridAutoFlow: 'column',
        justifyContent: 'start',
      }}
    >
      {store.exports.output && (
        <>
          <div>
            <div>Input</div>
            <div style={{ display: 'grid', gap: 12 }}>
              <Input
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                }}
                size="small"
                placeholder="发送事件的参数（请填写 JSON）"
              />
              <div style={{ display: 'grid', gap: 12 }}>
                {inputNode?.data.sourcePorts
                  .filter((item) => item.type === InputNodePortTypeEnum.Event)
                  .map((item) => (
                    <Button
                      key={item.id}
                      onClick={() => {
                        store.exports?.output?.var_container?.output?.[
                          formatVariableName(item.id || '')
                        ]?.next(JSON.parse(inputValue));
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
          <div>
            <div>Output</div>
            {outputValueIds?.map(({ port, handleId }) => {
              return (
                <div key={port.id}>
                  {port.label}:
                  {JSON.stringify(
                    store.exports?.output?.var_container?.output?.[
                      formatVariableName(handleId || '')
                    ]?.current,
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
