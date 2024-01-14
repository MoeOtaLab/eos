import { type NodeProps, type Node } from 'reactflow';
import {
  formatVariableName,
  type IGenerationOption,
} from '../../Compiler/graph';
import { NodeTypeEnum } from '../../Nodes/NodeTypeEnum';
import { MetaOperator } from '../Operator';
import { EndPoint, type ITranformOperatorData } from '../types';
import { CustomLabel } from './components/CustomLabel';
import { EosOperatorsSymbol } from '../../Compiler/runtime';

export class TransformOperator
  extends MetaOperator<ITranformOperatorData>
  implements MetaOperator<ITranformOperatorData>
{
  constructor() {
    super({
      operatorName: 'Transform',
      operatorType: 'TransformOperator',
      nodeType: NodeTypeEnum.Node,
    });
  }

  create(): Node<ITranformOperatorData<Record<string, any>>> {
    return super.create({
      endPointOptions: {
        endPointList: [
          new EndPoint({
            type: 'source',
            hint: 'output',
            label: 'output',
          }),
          new EndPoint({
            type: 'target',
            hint: 'input',
            label: 'input',
          }),
        ],
      },
    });
  }

  nodeColor?: string | undefined = '#F3F8FF';

  generateBlockDeclarations(
    options: IGenerationOption<ITranformOperatorData>,
  ): string[] {
    const { node, nodeGraph } = options;
    const handleId =
      node.data.endPointOptions?.endPointList?.find(
        (item) => item.hint === 'output',
      )?.id || '';

    const inputPortId =
      node.data.endPointOptions?.endPointList?.find(
        (item) => item.hint === 'input',
      )?.id || '';

    const sourceId =
      nodeGraph
        .findSourceNodes(node.id)
        ?.find((item) => item.handleId === inputPortId)?.relatedHandleId || '';

    return [
      `const ${formatVariableName(handleId)} = ${EosOperatorsSymbol}.transform(
        ${formatVariableName(sourceId)},
        (...args) => {
          const module = { exports: {} };
          ((module) => {
            ${node.data.customCode || this.getInitCustomCode()}
          })(module)
          return typeof module.exports === 'function' ? module.exports(...args) : module.exports.default(...args);
        }
      )`,
    ];
  }

  generateBlockOutput(
    options: IGenerationOption<ITranformOperatorData>,
  ): string[] {
    return [];
  }

  generateBlockRelation(
    options: IGenerationOption<ITranformOperatorData>,
  ): string[] {
    return [];
  }

  getInitCustomCode() {
    return 'module.exports = function transform(input) {\n\treturn input;\n}';
  }

  renderCustomLabel(currentNode: NodeProps<ITranformOperatorData>) {
    return <CustomLabel node={currentNode} />;
  }
}
