import { useDiagramsContext } from '../../State/DiagramsProvider';
import { Tree } from 'antd';
import { type Layer } from '../../State/Layer';
import React from 'react';
import type { TreeDataNode } from 'antd';

function convertLayerToTreeData(layer: Layer) {
  const data: TreeDataNode = {
    key: layer.id,
    title: layer.name,
    children: layer.children?.map((item) => {
      return convertLayerToTreeData(item);
    })
  };

  return data;
}

export function LayerPanel() {
  const { layer, activeLayerId, setActiveLayerId } = useDiagramsContext();

  const treeData: TreeDataNode[] = [convertLayerToTreeData(layer)];

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    if (selectedKeys?.[0]) {
      setActiveLayerId(String(selectedKeys?.[0]));
    }
  };

  return (
    <div>
      <div>Layer Panel</div>
      <Tree
        selectedKeys={[activeLayerId]}
        showLine={{ showLeafIcon: true }}
        showIcon={false}
        defaultExpandedKeys={[]}
        onSelect={onSelect}
        treeData={treeData}
      />
    </div>
  );
}
