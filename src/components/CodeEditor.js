import React, { useEffect } from 'react';
import MonacoEditor, { loader } from '@monaco-editor/react';
import './CodeEditor.css'; // Ensure you include the CSS file

const CodeEditor = ({ code, onVariableClick, disabled }) => {
  useEffect(() => {
    loader.init().then((monaco) => {
      window.monaco = monaco;
    });
  }, []);

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
      }
    });

    // Disable text selection
    editor.onDidChangeCursorSelection((e) => {
      if (disabled && window.monaco) {
        editor.setSelection(new window.monaco.Selection(1, 1, 1, 1)); // Reset the selection to the beginning
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
        language="python"
        value={code}
        options={options}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;
