import React from 'react';
import { DiagramsContextProvider } from './State/DiagramsProvider';
import { OperatorProvider } from './State/OperatorProvider';
import { LeftSidePanel } from './Panels/LeftSidePanel';
import { FlowDiagram } from './Panels/FlowDiagram';
import { AttributePanel } from './Panels/AttributePanel';
import { ConsolePanel } from './Panels/ConsolePanel';
import css from './Diagram.module.less';

export const Diagram: React.FC = () => {
  return (
    <div className={css.container}>
      <OperatorProvider>
        <DiagramsContextProvider>
          <LeftSidePanel />
          <FlowDiagram />
          <AttributePanel />
          <div className={css.console}>
            <ConsolePanel />
          </div>
        </DiagramsContextProvider>
      </OperatorProvider>
    </div>
  );
};
