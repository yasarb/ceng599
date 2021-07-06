import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Sidebar, EditorContainer, VizContainer } from 'components';
import SplitPane from "react-split-pane";
import { updateAlgorithm } from 'components/App/App.slice';
import './App.scss';

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.match.params.algorithm) {
      dispatch(updateAlgorithm(props.match.params.algorithm));
    }
  }, [props, dispatch]);
  
  return (
    <div className="App">
      <SplitPane split="vertical" defaultSize="15%" allowResize={false}>
        <Sidebar />
        <SplitPane split="vertical" defaultSize="45%">
          <EditorContainer />
          <VizContainer />
        </SplitPane>
      </SplitPane>  
    </div>
  );
}

export default App;
