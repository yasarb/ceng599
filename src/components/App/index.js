import { Sidebar, EditorContainer, VizContainer } from 'components';
import React from 'react';
import SplitPane from "react-split-pane";
import './App.scss';

function App() {
  return (
    <div className="App">
    <SplitPane split="vertical" defaultSize="15%" allowResize={false}>
      <Sidebar />
      <SplitPane split="vertical" defaultSize="50%">
        <EditorContainer />
        <VizContainer />
      </SplitPane>
    </SplitPane>      
      
    </div>
  );
}

export default App;
