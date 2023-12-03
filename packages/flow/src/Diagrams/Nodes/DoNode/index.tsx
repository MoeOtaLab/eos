import { type NodeProps } from 'reactflow';
import { BaseNode } from '../components/BaseNode';
import css from './DoNode.module.less';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import { Editor } from '../../components/Editor';

export function DoNode(props: NodeProps<any>) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <BaseNode
        {...props}
        title={
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
        }
        className={css.container}
      />
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
