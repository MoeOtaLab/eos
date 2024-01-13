import { type NodeProps } from 'reactflow';
import css from './DoNode.module.less';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { Editor } from '../../components/Editor';

/** @deprecated */
export function DoNode(props: NodeProps<any>) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button
        type="text"
        tabIndex={-1}
        style={{ color: 'white' }}
        onClick={() => {
          setVisible(true);
        }}
      >
        点击编辑
      </Button>
      <Modal
        title="Basic Modal"
        open={visible}
        onOk={() => {
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Editor
          language="javascript"
          className={css.editor}
          code="function() {}"
        />
      </Modal>
    </>
  );
}
