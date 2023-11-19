import { type Node } from 'reactflow';
import { getRandomId } from '../utils';
import { type IBaseNodeData, NodePort } from '../Nodes/types';
import { type IAttributeControlOption } from './types';
import { type IGenerationOption } from '../Compiler/graph';

export { NodePort };

export interface OperatorNodeData extends IBaseNodeData {
  operatorType: string;
  [key: string]: any;
}

export class Operator<T = any> implements Node<T> {
  unique?: boolean;

  static generateOperatorIcon?() {
    return <div>{this.name}</div>;
  }

  static generateAttributeControl?(
    options: IAttributeControlOption<Operator<any>>,
  ) {
    const { value, actions } = options;
    function handleChange(val: string) {
      value.data.label = val;
      actions.updateElement(value.id, value);
    }
    return (
      <>
        <input
          placeholder="input label"
          style={{ width: '100%', maxWidth: 'none' }}
          value={value.data.label}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
      </>
    );
  }

  static generateBlockDeclarations?(options: IGenerationOption): string[] {
    return [];
  }

  static generateBlockRelation?(options: IGenerationOption): string[] {
    return [];
  }

  static generateBlockOutput?(options: IGenerationOption): string[] {
    return [];
  }

  // 1. should generate the attributes that can modified by user
  // 2. should generate the nodes
  // 3. should generate the ports in graph
  // 4. should generate the funtion which will be used in later code piping
  id: Node['id'] = getRandomId();
  position: Node['position'] = {
    x: 0,
    y: 0,
  };

  type: string = 'OperatorNode';
  data: T = {} as any;
  style?: Node['style'];
  className?: Node['className'];
  targetPosition?: Node['targetPosition'];
  sourcePosition?: Node['sourcePosition'];
  hidden?: boolean;
  draggable?: boolean;
  selectable?: boolean;
  connectable?: boolean;

  constructor(operatorType: string = 'Operator', data?: Partial<Node<T>>) {
    Object.assign(this, {
      ...data,
      data: {
        operatorType,
        ...this.data,
        ...data?.data,
      },
    });
  }
}
