import { type Operator } from '../Operator';
import { type DiagramsContextType } from '../../State/DiagramsProvider';

type GetOperatorType<T> = T extends Operator<infer P> ? P : any;

export interface IAttributeControlOption<Op extends Operator<any>> {
  /** @deprecated */
  value: Op;
  node: Op;
  actions: {
    /** @deprecated */
    updateElement: any;
  } & Pick<
    DiagramsContextType<GetOperatorType<Op>>,
    'updateEdge' | 'updateNode'
  >;
}
