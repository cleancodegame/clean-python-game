import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import './CodeEditor.css';

const CodeEditor = ({ code, onVariableClick, disabled }) => {
  const handleEditorDidMount = (editor) => {
    editor.onMouseDown((e) => {
      if (disabled) return;

      const position = e.target.position;
      if (!position) {
        onVariableClick(null); // Handle wrong click
        return;
      }

      const word = editor.getModel().getWordAtPosition(position);
      if (word) {
        const variableName = editor.getModel().getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endLineNumber: position.lineNumber,
          endColumn: word.endColumn,
        });

        onVariableClick(variableName);
      } else {
        onVariableClick(null); // Handle wrong click
      }
    });
  };

  return (
    <div className={`code-editor ${disabled ? 'disabled' : ''}`}>
      <MonacoEditor
        theme="vs-dark"
        height="90vh"
        language="python"
        value={code}
        options={{
          readOnly: true, // Make the editor read-only
          minimap: { enabled: false },
          scrollbar: { vertical: 'hidden' },
        }}
        editorDidMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
