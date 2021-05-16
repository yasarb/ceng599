import React from 'react';
import AceEditor from "react-ace";
import './CodeEditor.scss';
import { Algorithm } from 'algorithms/ConvexHull';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";

function CodeEditor() {

  return (
    <div className="code-editor">
      <AceEditor
        mode="java"
        theme="monokai"
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        value={Algorithm}
        readOnly={true}
      />
    </div>
  );
}

export default CodeEditor;
