import { type NodeProps } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import { type ICustomNodeData } from '../types';
import { useDiagramsContext } from '../../State/DiagramsProvider';
import { OperatorMap } from '../../Operators';
import { type CustomOperator } from '../../Operators/CustomOperator';
import css from './CustomNode.module.less';

export function CustomNode(props: NodeProps<ICustomNodeData>) {
  const { data } = props;
  const { setActiveLayerId, layer, updateNode } = useDiagramsContext();

  return (
    <BaseNode
      onFocus={() => {
        const Operator = OperatorMap.get(
          data.operatorType,
        ) as typeof CustomOperator;
        Operator?.refreshNode(props, {
          layer,
          updateNode,
        });
      }}
      description={data.description}
      onDoubleClick={() => {
        setActiveLayerId(data.layerId);
      }}
      {...props}
      className={css.container}
    />
  );
}
