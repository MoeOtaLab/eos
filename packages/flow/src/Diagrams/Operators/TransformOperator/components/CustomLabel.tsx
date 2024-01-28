import { type NodeProps } from 'reactflow';
import css from './CustomLabel.module.less';
import { Modal } from 'antd';
import { useRef, useState } from 'react';
import { Editor, type IEditorRefType } from '../../../components/Editor';
import { type ITranformOperatorData } from '../../types';
import { useDiagramsActions } from '../../../State/DiagramsProvider';
import { getOperatorFromNode } from '../../OperatorMap';
import { type TransformOperator } from '../TransformOperator';

export function CustomLabel(props: { node: NodeProps<ITranformOperatorData> }) {
  const { node } = props;
  const [visible, setVisible] = useState(false);
  const actions = useDiagramsActions();
  const [code, setCode] = useState('');
  const editorRef = useRef<IEditorRefType>(null);

  const operator = getOperatorFromNode<TransformOperator>(node);

  return (
    <div className={css.container}>
      <span
        style={{
          color: 'white',
          cursor: 'pointer',
          display: 'block',
          textAlign: 'center'
        }}
        onClick={() => {
          setCode(node.data?.customCode || operator?.getInitCustomCode() || '');
          setVisible(true);
        }}
      >
        点击编辑
      </span>
      <Modal
        title="Basic Modal"
        open={visible}
        onOk={() => {
          setVisible(false);
          actions.updateNode(
            node.id,
            (cur) =>
              operator?.updateData(cur, {
                customCode: editorRef.current?.editor?.getValue() || ''
              }) || cur
          );
        }}
        onCancel={() => {
          setVisible(false);
        }}
        destroyOnClose={true}
      >
        <Editor ref={editorRef} code={code} language="javascript" className={css.editor} />
      </Modal>
    </div>
  );
}
