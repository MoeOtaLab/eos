import { type Node } from 'reactflow';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { MetaOperator } from '../MetaOperator';
import {
  EndPoint,
  IAppContainersInfo,
  IAttributeControlOption,
  IHookOption,
  type IListModelOperatorData
} from '../types';
import { type IGenerationOption } from '../../Compiler';
import { getOperatorFromOperatorType } from '../OperatorMap';
import { CustomOperator } from '../CustomOperator';
import { ListModelOperatorAttributePanel } from './ListModelOperatorAttributePanel';
import { EosCoreSymbol } from '../../Compiler/runtime';
import { getNodeEndPointFromLayer, getInputPorts, getOutputPorts } from '../GroupOperator/utils';

export class ListModelOperator
  extends MetaOperator<IListModelOperatorData>
  implements MetaOperator<IListModelOperatorData>
{
  nodeColor?: string | undefined = '#C21292';

  constructor() {
    super({
      operatorName: 'ListModel',
      operatorType: 'ListModelOperator',
      nodeType: NodeTypeEnum.Node
    });
  }

  create(): Node<IListModelOperatorData<Record<string, any>>> {
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
        hint: 'listState',
        label: 'listState',
        children: [
          new EndPoint({
            hint: 'listState',
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
    options: IGenerationOption<IListModelOperatorData<Record<string, any>>>
  ): IAppContainersInfo[] {
    const { node } = options;
    const operator = getOperatorFromOperatorType<CustomOperator>(node?.data?.modelOperatorType);

    if (!operator) {
      return [];
    }

    return operator?.getExtraAppContainers();
  }

  getHintPorts(node: Node<IListModelOperatorData>, hint: string) {
    return node.data.endPointOptions?.endPointList?.find((item) => item.hint === hint)?.children;
  }

  generateBlockDeclarations(
    options: IGenerationOption<IListModelOperatorData<Record<string, any>>>
  ): string[] {
    const { formatVariableName, formatBlockVarName, node, nodeGraph } = options;
    const operator = getOperatorFromOperatorType<CustomOperator>(node?.data?.modelOperatorType);

    const listState = this.getHintPorts(node, 'listState') || [];
    const listStatePort = listState?.[0];
    const sourceListStatePortId = nodeGraph
      .findSourceNodes(node.id)
      ?.filter((item) => item.handleId === listStatePort.id)
      .map((item) => item.relatedHandleId)?.[0];

    const outputPorts = this.getHintPorts(node, 'output') || [];

    const modelOutputPorts = getOutputPorts(node);
    const modelInputPorts = getInputPorts(node);

    return [
      // model
      `const operators_${formatVariableName(node.id)} = new ${EosCoreSymbol}.ModelState(${formatBlockVarName(
        operator?.getOperatorId() || ''
      )})`,
      `const mstate__${formatVariableName(node.id)} = new ${EosCoreSymbol}.ListMState({
        templateState: operators_${formatVariableName(node.id)},
        listState: ${
          sourceListStatePortId
            ? formatVariableName(sourceListStatePortId || '')
            : `new ${EosCoreSymbol}.ModelState()`
        },
        key: '${node.data.dataKey || 'key'}',
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
        return `const ${formatVariableName(item.id)} = mstate__${formatVariableName(node.id)}['modelList']`;
      }),
      ...modelOutputPorts?.map((port) => {
        return `const ${formatVariableName(port.id)} = new ${EosCoreSymbol}.ModelEvent()`;
      })
    ];
  }

  generateBlockOutput(options: IGenerationOption<IListModelOperatorData<Record<string, any>>>): string[] {
    return [];
  }

  // TODO
  generateBlockRelation(options: IGenerationOption<IListModelOperatorData<Record<string, any>>>): string[] {
    const { node, formatVariableName } = options;
    const modelOutputPorts = getOutputPorts(node) || [];

    return [
      `const subscriptionMap__${formatVariableName(node.id)} = new Map()`,
      `const init__${formatVariableName(node.id)} = () => {
        const prevList = [...subscriptionMap__${formatVariableName(node.id)}.keys()];
        const prevSet = new WeakSet(prevList);
        const currentList = (mstate__${formatVariableName(
          node.id
        )}['modelList'].current || []).map(item => item.instance)
        const currentSet = new WeakSet(currentList);
        const newList = currentList.filter(item => !prevSet.has(item));
        const deleteList = prevList.filter(item => !currentSet.has(item));

        ${[
          ...(getOutputPorts(node) || [])?.map((port) => {
            return `
            if(deleteList?.length) {
              deleteList.forEach(item => {
                const subscription = subscriptionMap__${formatVariableName(node.id)}.get(item);
                subscription.unsubscribe();
                subscriptionMap__${formatVariableName(node.id)}.delete(item);
              })
            }
    
            if(newList?.length) {
              newList.forEach(item => {
                function subscribe() {
                  const subscription = item.output['${port.variableName}'].subscribe(action => {
                    ${formatVariableName(port.id)}.next(action)
                  })
                  subscriptionMap__${formatVariableName(node.id)}.set(item, subscription);
                }
                if (item.output) {
                  subscribe()
                } else {
                  item.on('postInit', subscribe)
                }
              })
            }
            `;
          })
        ].join('\n')}
      }`,

      `mstate__${formatVariableName(node.id)}['modelList'].subscribe((action) => {
        init__${formatVariableName(node.id)}()
      })`
      // `context.onLifecycle('postInit', () => {
      //   init__${formatVariableName(node.id)}()
      // })`
    ];
  }

  generateAttributeControl(
    options: IAttributeControlOption<Node<IListModelOperatorData<Record<string, any>>>>
  ): JSX.Element {
    this.updateNodeOptions;
    return (
      <div>
        {super.generateAttributeControl(options)}
        <ListModelOperatorAttributePanel operator={this} options={options} />
      </div>
    );
  }

  refreshNode(options: IHookOption<Node<IListModelOperatorData>>) {
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

  onNodeFocus(options: IHookOption<Node<IListModelOperatorData>>): void {
    this?.refreshNode(options);
  }
}
