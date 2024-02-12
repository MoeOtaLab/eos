import { type Node } from 'reactflow';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { MetaOperator } from '../MetaOperator';
import {
  EndPoint,
  IAppContainersInfo,
  IAttributeControlOption,
  IHookOption,
  type IConditionModelOperatorData
} from '../types';
import { type IGenerationOption } from '../../Compiler';
import { getOperatorFromOperatorType } from '../OperatorMap';
import { CustomOperator } from '../CustomOperator';
import { ConditionModelOperatorAttributePanel } from './ConditionModelOperatorAttributePanel';
import { EosCoreSymbol } from '../../Compiler/runtime';
import { getNodeEndPointFromLayer, getInputPorts, getOutputPorts } from '../GroupOperator/utils';

export class ConditionModelOperator
  extends MetaOperator<IConditionModelOperatorData>
  implements MetaOperator<IConditionModelOperatorData>
{
  nodeColor?: string | undefined = '#C21292';

  constructor() {
    super({
      operatorName: 'ConditionModel',
      operatorType: 'ConditionModelOperator',
      nodeType: NodeTypeEnum.Node
    });
  }

  create(): Node<IConditionModelOperatorData<Record<string, any>>> {
    return super.create({
      endPointOptions: {
        endPointList: [...this.getDefaultEndPointList()]
      }
    });
  }

  getDefaultEndPointList() {
    return [
      new EndPoint({
        type: 'group',
        hint: 'model',
        label: 'model',
        children: [
          new EndPoint({
            hint: 'model',
            type: 'target',
            isConnectable: false
          })
        ]
      }),
      new EndPoint({
        type: 'group',
        hint: 'condition',
        label: 'condition',
        children: [
          new EndPoint({
            hint: 'condition',
            type: 'target'
          })
        ]
      }),
      new EndPoint({
        type: 'group',
        hint: 'output',
        children: [
          new EndPoint({
            label: 'output',
            hint: 'output',
            variableType: 'array',
            type: 'source'
          })
        ]
      })
    ];
  }

  getExtraAppContainers(
    options: IGenerationOption<IConditionModelOperatorData<Record<string, any>>>
  ): IAppContainersInfo[] {
    const { node } = options;
    const operator = getOperatorFromOperatorType<CustomOperator>(node?.data?.modelOperatorType);

    if (!operator) {
      return [];
    }

    return operator?.getExtraAppContainers();
  }

  getHintPorts(node: Node<IConditionModelOperatorData>, hint: string) {
    return node.data.endPointOptions?.endPointList?.find((item) => item.hint === hint)?.children;
  }

  generateBlockDeclarations(
    options: IGenerationOption<IConditionModelOperatorData<Record<string, any>>>
  ): string[] {
    const { formatVariableName, formatBlockVarName, node, nodeGraph } = options;
    const operator = getOperatorFromOperatorType<CustomOperator>(node?.data?.modelOperatorType);

    const conditions = this.getHintPorts(node, 'condition') || [];
    const conditionPort = conditions?.[0];
    const sourceConditionPortId = nodeGraph
      .findSourceNodes(node.id)
      ?.filter((item) => item.handleId === conditionPort.id)
      .map((item) => item.relatedHandleId)?.[0];

    const outputPorts = this.getHintPorts(node, 'output') || [];

    const modelOutputPorts = getOutputPorts(node);
    const modelInputPorts = getInputPorts(node);

    return [
      // model
      `const operators_${formatVariableName(node.id)} = new ${EosCoreSymbol}.ModelState(${formatBlockVarName(
        operator?.getOperatorId() || ''
      )})`,
      `const mstate__${formatVariableName(node.id)} = new ${EosCoreSymbol}.ConditionMState({
        templateState: operators_${formatVariableName(node.id)},
        state: ${
          sourceConditionPortId
            ? formatVariableName(sourceConditionPortId || '')
            : `new ${EosCoreSymbol}.ModelState()`
        },
        ${modelInputPorts
          .map((port) => {
            const sourceId = nodeGraph
              .findSourceNodes(node.id)
              ?.find((item) => item.handleId === port.id)?.relatedHandleId;

            if (!sourceId) {
              return '';
            }

            return `['${port.variableName}']: ${formatVariableName(sourceId)},`;
          })
          .join('\n')}
      }, context)`,
      ...outputPorts.map((item) => {
        return `const ${formatVariableName(item.id)} = mstate__${formatVariableName(node.id)}['modelState']`;
      }),
      ...modelOutputPorts?.map((port) => {
        return `const ${formatVariableName(
          port.id
        )} = new ${EosCoreSymbol}.ModelProxy({ throwErrorBeforeProxy: false })`;
      })
    ];
  }

  generateBlockOutput(
    options: IGenerationOption<IConditionModelOperatorData<Record<string, any>>>
  ): string[] {
    return [];
  }

  generateBlockRelation(
    options: IGenerationOption<IConditionModelOperatorData<Record<string, any>>>
  ): string[] {
    const { node, formatVariableName } = options;
    return [
      `const init__${formatVariableName(node.id)} = () => {
        if (mstate__${formatVariableName(node.id)}['modelState'].current) {
          ${[
            ...(getOutputPorts(node) || [])?.map((port) => {
              return `${formatVariableName(port.id)}.proxy(mstate__${formatVariableName(
                node.id
              )}['modelState'].current.output['${port.variableName}'])`;
            })
          ].join('\n')}
        } else {
          ${[
            ...(getOutputPorts(node) || [])?.map((port) => {
              return `${formatVariableName(port.id)}.unproxy()`;
            })
          ].join('\n')} 
        }
      }`,
      `mstate__${formatVariableName(node.id)}['modelState'].subscribe((action) => {
        init__${formatVariableName(node.id)}()
      })`,
      `context.onLifecycle('postInit', () => {
        init__${formatVariableName(node.id)}()
      })`
    ];
  }

  generateAttributeControl(
    options: IAttributeControlOption<Node<IConditionModelOperatorData<Record<string, any>>>>
  ): JSX.Element {
    this.updateNodeOptions;
    return (
      <div>
        {super.generateAttributeControl(options)}
        <ConditionModelOperatorAttributePanel operator={this} options={options} />
      </div>
    );
  }

  refreshNode(options: IHookOption<Node<IConditionModelOperatorData>>) {
    const { node, currentState } = options;

    const operator = getOperatorFromOperatorType<CustomOperator>(node.data.modelOperatorType);

    if (!operator) {
      return;
    }

    const { endPointList } = getNodeEndPointFromLayer(operator.content.layer, node.id);

    if (endPointList) {
      options.actions.updateNode(
        node.id,
        (v) =>
          this.updateData(v, {
            endPointOptions: {
              endPointList: [
                ...(node.data.endPointOptions?.endPointList?.filter((item) =>
                  this.getDefaultEndPointList()
                    .map((item) => item.hint)
                    .includes(item.hint)
                ) || []),
                ...endPointList
              ]
            }
          }),
        {
          updateInternal: true,
          layerId: currentState.layer?.id
        }
      );
    }
  }

  onNodeFocus(options: IHookOption<Node<IConditionModelOperatorData>>): void {
    this?.refreshNode(options);
  }
}
