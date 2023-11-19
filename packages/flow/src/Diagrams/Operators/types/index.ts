import { type Operator } from '../Operator';
import { type DiagramsContextType } from '../../State/DiagramsProvider';

type GetOperatorType<T> = T extends Operator<infer P> ? P : any;

export interface IAttributeControlOption<Op extends Operator<any>> {
  node: Op;
  actions: Pick<
    DiagramsContextType<GetOperatorType<Op>>,
    'updateEdge' | 'updateNode' | 'setLayer'
  >;
}

export interface IHookOption<Op extends Operator<any>> {
  node: Op;
  currentState: Pick<
    DiagramsContextType<GetOperatorType<Op>>,
    'activeLayerId' | 'layer' | 'nodes' | 'edges'
  >;
  actions: Pick<
    DiagramsContextType<GetOperatorType<Op>>,
    'updateEdge' | 'updateNode' | 'setLayer' | 'setActiveLayerId'
  >;
}
