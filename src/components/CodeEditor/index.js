import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AceEditor from "react-ace";
import './CodeEditor.scss';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import { AlgorithmService } from 'algorithms';

function CodeEditor() {
  const { activeAlgorithm } = useSelector(state => state.app);
  const [code, setCode] = useState('\n\n<-- Select an algorithm from the left to start.\n\n');

  useEffect(() => {
    setCode(AlgorithmService.getAlgoCode(activeAlgorithm));
  }, [activeAlgorithm]);

  return (
    <div className="code-editor">
      <AceEditor
        mode="java"
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
