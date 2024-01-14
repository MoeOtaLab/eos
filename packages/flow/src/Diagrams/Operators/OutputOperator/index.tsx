import { MetaOperator } from '../Operator';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { type Node } from 'reactflow';
import { type IGenerationOption } from '../../Compiler/graph';
import { EosCoreSymbol } from '../../Compiler/runtime';
import { type IOutputOperatorData, EndPoint } from '../types';
export class OutputOperator
  extends MetaOperator<IOutputOperatorData>
  implements MetaOperator<IOutputOperatorData>
{
  isUnique: boolean = true;
  nodeColor: string = '#5D9C59';

  constructor() {
    super({
      operatorName: 'Output',
      operatorType: 'OutputOperator',
      nodeType: NodeTypeEnum.Node,
    });
  }

  create(): Node<IOutputOperatorData> {
    return super.create({
      endPointOptions: {
        endPointList: [
          new EndPoint({
            type: 'group',
            label: 'State',
            hint: 'state',
            allowAddAndRemoveChildren: true,
            defaultChildData: {
              type: 'target',
              hint: 'state',
            },
            children: [
              new EndPoint({
                type: 'target',
                hint: 'state',
              }),
            ],
          }),

          new EndPoint({
            type: 'group',
            label: 'Event',
            hint: 'event',
            allowAddAndRemoveChildren: true,
            defaultChildData: {
              type: 'target',
              hint: 'event',
            },
            children: [
              // new EndPoint({
              //   type: 'target',
              //   hint: 'event',
              // }),
            ],
          }),
        ],
      },
    });
  }

  public getEventPorts(node: Node<IOutputOperatorData>) {
    const eventPorts =
      node.data?.endPointOptions?.endPointList?.find(
        (item) => item.type === 'group' && item.hint === 'event',
      )?.children || [];

    return eventPorts;
  }

  public getStatePort(node: Node<IOutputOperatorData>) {
    const statePorts =
      node.data?.endPointOptions?.endPointList?.find(
        (item) => item.type === 'group' && item.hint === 'state',
      )?.children || [];

    return statePorts;
  }

  public generateBlockDeclarations(
    options: IGenerationOption<IOutputOperatorData>,
  ): string[] {
    const { node, formatVariableName } = options;

    const eventPorts = this.getEventPorts(node);

    return [
      ...eventPorts.map(
        (port) =>
          `const ${formatVariableName(
            port.id,
          )} = new ${EosCoreSymbol}.ModelEvent()`,
      ),
    ];
  }

  generateBlockRelation(
    options: IGenerationOption<IOutputOperatorData>,
  ): string[] {
    const { node, formatVariableName, nodeGraph } = options;

    const eventPorts = this.getEventPorts(node).map((port) => {
      const sourceId = nodeGraph
        .findSourceNodes(node.id)
        ?.find((item) => item.handleId === port.id)?.relatedHandleId;
      const targetId = port.id;

      if (!sourceId || !targetId) {
        return '';
      }

      return `${formatVariableName(sourceId)}.subscribe((value, extraInfo) => {
          ${formatVariableName(targetId)}.next(value, extraInfo.concat('${
            node.id
          }'))
        })`;
    });

    return [...eventPorts];
  }

  generateBlockOutput(
    options: IGenerationOption<IOutputOperatorData>,
  ): string[] {
    const { node, formatVariableName, nodeGraph } = options;

    const eventPorts = this.getEventPorts(node);
    const statePorts = this.getStatePort(node);

    return [
      ...eventPorts.map(
        (port) => `['${port.variableName}']: ${formatVariableName(port.id)}`,
      ),
      ...statePorts.map((port) => {
        const sourceId = nodeGraph
          .findSourceNodes(node.id)
          ?.find((item) => item.handleId === port.id)?.relatedHandleId;
        return sourceId
          ? `['${port.variableName}']: ${formatVariableName(sourceId)}`
          : '';
      }),
    ];
  }
}
