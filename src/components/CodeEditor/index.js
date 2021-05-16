import React from 'react';
import AceEditor from "react-ace";
import './CodeEditor.scss';
import Alg from 'algorithms/Calculator';

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";

function onChange(newValue) {
  console.log("change", newValue);
}

function CodeEditor() {

  return (
    <div className="code-editor">
      <AceEditor
        mode="java"
        theme="monokai"
        onChange={onChange}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
        value={Alg}
        readOnly={true}
      />
    </div>

  );
}

export default CodeEditor;
