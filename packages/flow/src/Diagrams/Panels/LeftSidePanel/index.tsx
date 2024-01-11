import { Tabs } from 'antd';
import {
  ControlOutlined,
  FileAddOutlined,
  FunctionOutlined,
} from '@ant-design/icons';
import { OperatorPanel } from '../OperatorPanel';
import { LayerPanel } from '../LayerPanel';
import { CommandPanel } from '../CommandPanel';
import css from './LeftSidePanel.module.less';

export function LeftSidePanel() {
  return (
    <div className={css.container}>
      <Tabs
        size="small"
        tabPosition={'left'}
        items={[
          {
            label: <FunctionOutlined rev="" />,
            key: 'Operators',
            children: <OperatorPanel />,
          },
          {
            label: <FileAddOutlined rev="" />,
            key: 'Layers',
            children: <LayerPanel />,
          },
          {
            label: <ControlOutlined rev="" />,
            key: 'commands',
            children: <CommandPanel />,
          },
        ]}
      />
    </div>
  );
}
