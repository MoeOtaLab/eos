import { Tabs } from 'antd';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { OperatorPanel } from '../OperatorPanel';
import { LayerPanel } from '../LayerPanel';
import css from './LeftSidePanel.module.less';

export function LeftSidePanel() {
  return (
    <div className={css.container}>
      <Tabs
        size="small"
        tabPosition={'left'}
        items={[
          {
            label: <AppleOutlined rev="" />,
            key: 'Operators',
            children: <OperatorPanel />,
          },
          {
            label: <AndroidOutlined rev="" />,
            key: 'Layers',
            children: <LayerPanel />,
          },
        ]}
      />
    </div>
  );
}
