import React from 'react';
import { Diagram } from './Diagrams/Diagram';
// import { Demo } from './Link/Demo'
// import { DemoXtoX } from './Link/DemoXtoX'
import './Diagrams/reset.css';
import 'reactflow/dist/style.css';

function App() {
  return (
    <>
      <Diagram />
      {/* <Demo /> */}
      {/* <DemoXtoX /> */}
    </>
  );
}

export default App;
