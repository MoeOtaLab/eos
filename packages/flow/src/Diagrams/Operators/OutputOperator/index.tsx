import { Operator } from '../Operator';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { type Node } from 'reactflow';
import {
  OutputNodePortTypeEnum,
  type IOutputNodeData,
} from '../../Nodes/types';
import { type IGenerationOption } from '../../Compiler/graph';
import { EosCoreSymbol } from '../../Compiler/runtime';
import { type IAttributeControlOption } from '../types';

export class OutputOperator extends Operator<IOutputNodeData> {
  constructor(data?: Partial<Node<IOutputNodeData>>) {
    super('OutputOperator', {
      ...data,
      type: NodeTypeEnum.OutputNode,
    });

    this.unique = true;

    // init ports
    this.data = {
      ...this.data,
      sourcePorts: [],
      targetPorts: [
        // new NodePort({
        //   label: 'state',
        //   type: OutputNodePortTypeEnum.State,
        // }),
        // new NodePort({
        //   label: 'output-event',
        //   type: OutputNodePortTypeEnum.Event,
        // }),
      ],
      operatorName: 'OutputOperator',
      ...data?.data,
    } as IOutputNodeData;
  }

  static generateAttributeControl(
    options: IAttributeControlOption<Operator<any>>,
  ) {
    return <div>empty</div>;
  }

  static generateBlockDeclarations?(
    options: IGenerationOption<IOutputNodeData>,
  ): string[] {
    const { node, formatVariableName } = options;

    const eventPorts = node.data.targetPorts.filter(
      (port) => port.type === OutputNodePortTypeEnum.Event,
    );

    return [
      ...eventPorts.map(
        (port) =>
          `const ${formatVariableName(
            port.id,
          )} = new ${EosCoreSymbol}.ModelEvent()`,
      ),
    ];
  }

  static generateBlockRelation?(
    options: IGenerationOption<IOutputNodeData>,
  ): string[] {
    const { node, formatVariableName, nodeGraph } = options;

    const eventPorts = node.data.targetPorts
      .filter((port) => port.type === OutputNodePortTypeEnum.Event)
      .map((port) => {
        const sourceId = nodeGraph
          .findSourceNodes(node.id)
          ?.find((item) => item.handleId === port.id)?.relatedHandleId;
        const targetId = port.id;

        if (!sourceId || !targetId) {
          return '';
        }

        return `${formatVariableName(
          sourceId,
        )}.subscribe((value, extraInfo) => {
          ${formatVariableName(targetId)}.next(value, extraInfo.concat('${
            node.id
          }'))
        })`;
      });

    return [...eventPorts];
  }

  static generateBlockOutput?(
    options: IGenerationOption<IOutputNodeData>,
  ): string[] {
    const { node, formatVariableName, nodeGraph } = options;

    const eventPorts = node.data.targetPorts.filter(
      (port) => port.type === OutputNodePortTypeEnum.Event,
    );

    const statePorts = node.data.targetPorts.filter(
      (port) => port.type === OutputNodePortTypeEnum.State,
    );

    return [
      ...eventPorts.map(
        (port) => `['${port.label}']: ${formatVariableName(port.id)}`,
      ),
      ...statePorts.map((port) => {
        const sourceId = nodeGraph
          .findSourceNodes(node.id)
          ?.find((item) => item.handleId === port.id)?.relatedHandleId;
        return sourceId
          ? `['${port.label}']: ${formatVariableName(sourceId)}`
          : '';
      }),
    ];
  }
}
