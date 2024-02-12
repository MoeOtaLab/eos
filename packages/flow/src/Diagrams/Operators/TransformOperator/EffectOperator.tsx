import { type Node } from 'reactflow';
import { type MetaOperator } from '../MetaOperator';
import { EndPoint, type IEffectOperatorData } from '../types';
import { TransformOperator } from './TransformOperator';

export class EffectOperator extends TransformOperator implements MetaOperator<IEffectOperatorData> {
  constructor() {
    super();
    this.defaultOperatorData.operatorName = 'Effect';
    this.defaultOperatorData.operatorType = 'EffectOperator';
  }

  create(): Node<IEffectOperatorData> {
    const node = super.create();
    const newNode = this.updateData(node, {
      endPointOptions: {
        endPointList: [
          new EndPoint({
            type: 'target',
            hint: 'input',
            label: 'input'
          })
        ]
      }
    });

    return newNode;
  }

  getInitCustomCode(): string {
    return 'module.exports = function effect(input) {\n\t\n}';
  }

  nodeColor?: string | undefined = '#F3F8FF';
}
