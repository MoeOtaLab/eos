import { type Node } from 'reactflow';
import { getRandomId } from '../utils';
import { type IBaseNodeData, NodePort } from '../Nodes/types';
import {
  type IHookOption,
  type IAttributeControlOption,
  type IMetaOperatorData,
} from './types';
import { type IGenerationOption } from '../Compiler/graph';
import { pick } from 'lodash';

export { NodePort };

export interface OperatorNodeData extends IBaseNodeData {
  operatorType: string;
  [key: string]: any;
}

/** @deprecated 请用 MetaOperator 替代 */
export class Operator<T = any> implements Node<T> {
  unique?: boolean;

  static generateOperatorIcon?() {
    return <div>{this.name}</div>;
  }

  static generateAttributeControl?(
    options: IAttributeControlOption<Operator<any>>,
  ) {
    const { node, actions } = options;
    function handleChange(val: string) {
      node.data.label = val;
      actions.updateNode(node.id, node);
    }
    return (
      <>
        <input
          placeholder="input label"
          style={{ width: '100%', maxWidth: 'none' }}
          value={node.data.label}
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

  static onAfterCreate?(options: IHookOption<Operator<any>>) {
    // nothing
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

  constructor(
    operatorType: string = 'Operator',
    data?: Partial<Node<Partial<T>>>,
  ) {
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

export abstract class MetaOperator<
  T extends IMetaOperatorData = IMetaOperatorData,
> {
  // ============ START: Instance Meta Data ============= //
  defaultOperatorData: IMetaOperatorData;

  // ============ START: Operator Meta Data(static) ============= //
  isUnique?: boolean;
  nodeColor?: string;

  constructor(defaultOperatorData: IMetaOperatorData) {
    this.defaultOperatorData = defaultOperatorData;
  }

  // ============ START: Instance Operations ============= //
  create(data?: T, defaultProps?: Partial<Node<T>>): Node<T> {
    return {
      // 1. should generate the attributes that can modified by user
      // 2. should generate the nodes
      // 3. should generate the ports in graph
      // 4. should generate the funtion which will be used in later code piping
      position: {
        x: 0,
        y: 0,
      },
      ...defaultProps,
      id: defaultProps?.id || getRandomId(),
      type: this.defaultOperatorData.nodeType,
      data: {
        ...this.defaultOperatorData,
        ...defaultProps?.data,
        ...data,
        operatorName: this.defaultOperatorData.operatorName,
        operatorType: this.defaultOperatorData.operatorType,
        nodeType: this.defaultOperatorData.nodeType,
        nodeOptions: this.defaultOperatorData.nodeOptions,
      } as T,
    };
  }

  updateNodeMeta(
    currentNode: Node<T>,
    patch: Omit<Node<T>, 'data' | 'id'>,
  ): Node<T> {
    return {
      ...currentNode,
      ...patch,
      ...pick(currentNode, 'id', 'data'),
    };
  }

  updateData(
    currentNode: Node<T>,
    patch: Partial<Omit<Node<T>['data'], keyof IMetaOperatorData>>,
  ): Node<T> {
    const metaDataPropList: (keyof IMetaOperatorData)[] = [
      'nodeOptions',
      'nodeType',
      'operatorName',
      'operatorType',
    ];

    return {
      ...currentNode,
      data: {
        ...currentNode.data,
        ...patch,
        ...pick(currentNode.data, ...metaDataPropList),
      },
    };
  }

  updateNodeOptions(
    currentNode: Node<T>,
    patch: Partial<Node<T>['data']['nodeOptions']>,
  ): Node<T> {
    return {
      ...currentNode,
      data: {
        ...currentNode?.data,
        nodeOptions: {
          ...currentNode?.data?.nodeOptions,
          ...patch,
        },
      },
    };
  }

  // ============ START: Code Generation ============= //
  abstract generateBlockDeclarations?(options: IGenerationOption): string[];

  abstract generateBlockRelation?(options: IGenerationOption): string[];

  abstract generateBlockOutput?(options: IGenerationOption): string[];

  // ============ START: Hooks handler ============= //
  abstract onAfterCreate?(options: IHookOption<Node<T>>): void;

  // ============ START: Panel Relative ============= //
  generateOperatorIcon(): React.ReactNode {
    return <div>{this.defaultOperatorData.operatorName}</div>;
  }

  generateAttributeControl(options: IAttributeControlOption<Node<T>>) {
    const { node, actions } = options;
    function handleChange(val: string) {
      node.data.nodeLabel = val;
      actions.updateNode(node.id, node);
    }
    return (
      <>
        <input
          placeholder="input label"
          style={{ width: '100%', maxWidth: 'none' }}
          value={node.data.nodeLabel}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        />
      </>
    );
  }

  // ============ START: Node Render Relative ============= //
}
