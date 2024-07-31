import React, { useEffect, useState } from 'react';
import MonacoEditor, { loader } from '@monaco-editor/react';
import './CodeEditor.css';

const CodeEditor = ({ code, onVariableClick, disabled, isTyping }) => {
  const [displayedCode, setDisplayedCode] = useState(code);

  useEffect(() => {
    loader.init().then((monaco) => {
      window.monaco = monaco;
    });
  }, []);

  useEffect(() => {
    if (isTyping) {
      let index = 0;
      setDisplayedCode(''); // Clear the code before starting the animation
      const interval = setInterval(() => {
        setDisplayedCode((prev) => prev + code[index]);
        index++;
        if (index >= code.length) {
          clearInterval(interval);
        }
      }, 10); // Adjust timing as needed

      return () => clearInterval(interval);
    } else {
      setDisplayedCode(code);
    }
  }, [code, isTyping]);

  const handleEditorDidMount = (editor) => {
    editor.onMouseDown((e) => {
      console.log("Mouse down");
      if (disabled||isTyping) return;

      const position = e.target.position;
      if (!position) {
        onVariableClick(null); // Handle wrong click
        return;
      }

      const word = editor.getModel().getWordAtPosition(position);
      if (word) {
        console.log("Word");
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
        value={displayedCode}
        options={options}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;