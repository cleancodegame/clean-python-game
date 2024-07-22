import React, { useEffect, useState } from 'react';
import MonacoEditor, { loader } from '@monaco-editor/react';
import './CodeEditor.css';

const CodeEditor = ({ code, onVariableClick, disabled, isTyping, setIsTyping, bugs }) => {
  const [displayedCode, setDisplayedCode] = useState('');

  useEffect(() => {
    loader.init().then((monaco) => {
      window.monaco = monaco;
    });
  }, []);

  useEffect(() => {
    if (isTyping) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < code.length) {
          setDisplayedCode((prev) => prev + code[index]);
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 20); // Adjust timing as needed

      return () => clearInterval(interval);
    } else {
      setDisplayedCode(code);
    }
  }, [code, isTyping, setIsTyping]);

  const handleEditorDidMount = (editor) => {
    editor.onMouseDown((e) => {
      if (disabled || isTyping) return;

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
        if (Object.keys(bugs).includes(variableName)) {
          onVariableClick(variableName);
        } else {
          onVariableClick(null); // Handle wrong click
        }
      }
    });

    // Disable text selection
    editor.onDidChangeCursorSelection((e) => {
      if ((disabled || isTyping) && window.monaco) {
        editor.setSelection(new window.monaco.Selection(1, 1, 1, 1));
      }
    });
  };

  const options = {
    readOnly: true, 
    renderLineHighlight: 'none', 
    selectOnLineNumbers: false,
    cursorStyle: 'line',
    minimap: { enabled: false },
    scrollbar: {
      vertical: 'hidden',
      horizontal: 'hidden'
    }
  };

  return (
    <div className={`code-editor ${disabled || isTyping ? 'disabled' : ''}`}>
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