import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import { AlgorithmService } from 'algorithms';
import './CodeEditor.scss';

function CodeEditor() {
  const { activeAlgorithm, activeFile } = useSelector(state => state.app);
  const [code, setCode] = useState('\n\n<-- Select an algorithm from the left to start.\n\n');
  const [mode, setMode] = useState('javascript');

  useEffect(() => {
    let pages = AlgorithmService.getAlgoPages(activeAlgorithm);

    if (pages) {
      setCode(pages[activeFile]['content']);
      setMode(pages[activeFile]['type']);
    }
  }, [activeAlgorithm, activeFile]);

  return (
    <div className="code-editor">
      <AceEditor
        mode={mode}
        wrapEnabled={mode === 'markdown'}
        theme="monokai"
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        value={code}
        readOnly={true}
      />
    </div>
  );
}

export default CodeEditor;
