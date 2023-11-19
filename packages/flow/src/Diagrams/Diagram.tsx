import React from 'react';
import { DiagramsContextProvider } from './State/DiagramsProvider';
import { LeftSidePanel } from './Panels/LeftSidePanel';
import { FlowDiagram } from './Panels/FlowDiagram';
import { AttributePanel } from './Panels/AttributePanel';
import { ConsolePanel } from './Panels/ConsolePanel';
import css from './Diagram.module.less';

export const Diagram: React.FC = () => {
  return (
    <div className={css.container}>
      <DiagramsContextProvider>
        <LeftSidePanel />
        <FlowDiagram />
        <AttributePanel />
        <div className={css.console}>
          <ConsolePanel />
        </div>
      </DiagramsContextProvider>
    </div>
  );
};
