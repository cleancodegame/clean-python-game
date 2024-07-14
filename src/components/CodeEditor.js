import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import './CodeEditor.css'; // Ensure you include the CSS file

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
        e.preventDefault(); // Prevent default text selection behavior
      }
    });
  };

  const options = {
    readOnly: true, // Make the editor read-only
    renderLineHighlight: 'none', // Remove line highlight
    selectOnLineNumbers: false, // Prevent selection on line numbers
    cursorStyle: 'line', // Set cursor style
  };

  return (
    <div className={`code-editor ${disabled ? 'disabled' : ''}`}>
      <MonacoEditor
        theme="vs-dark"
        height="90vh"
        language="python" // Set the language to Python
        value={code}
        options={options}
        editorDidMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;