import React from 'react';
import CodeEditor from 'components/CodeEditor';
import './EditorContainer.scss'

function EditorContainer() {
  return (
    <div className="editor-container">
      <div className="content">
        <CodeEditor />
      </div>
    </div>
  );
}

export default EditorContainer;
