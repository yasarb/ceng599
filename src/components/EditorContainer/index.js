import React from 'react';
import CodeEditor from 'components/CodeEditor';
import PageTabs from 'components/PageTabs';
import './EditorContainer.scss'

function EditorContainer() {
  return (
    <div className="editor-container">
      <PageTabs>
        <CodeEditor />
      </PageTabs>
    </div>
  );
}

export default EditorContainer;
