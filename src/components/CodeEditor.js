import React, { useEffect, useState, useRef } from 'react';
import MonacoEditor, { loader } from '@monaco-editor/react';
import './CodeEditor.css';

const CodeEditor = ({ code, onVariableClick, disabled, levelId }) => {
  const [lastIndex, setLastIndex] = useState(0)
  const editorRef = useRef(null);

  useEffect(() => {
    loader.init().then((monaco) => {
      window.monaco = monaco;
    });
  }, []);

  useEffect(() => {
      setLastIndex(0)
      const interval = setInterval(() => {
        setLastIndex((li) => {
          if (li >= code.length) {
            console.log("DONE!");
            clearInterval(interval);
            return li;
          }
          return li + 3
        })
      }, 10); // Adjust timing as needed

      return () => {
        clearInterval(interval);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [levelId]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    editor.onMouseDown((e) => {
      if (disabled) return;

      const position = e.target.position;
      if (!position) {
        onVariableClick(null);
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

    editor.onDidChangeCursorSelection((e) => {
      if (disabled && monaco) {
        editor.setSelection(new monaco.Selection(1, 1, 1, 1));
      }
    });
  };

  const options = {
    readOnly: true,
    renderLineHighlight: 'none',
    selectOnLineNumbers: false,
    cursorStyle: 'line',
  };

  return (
    <div className={`code-editor ${disabled ? 'disabled' : ''}`}>
      <MonacoEditor
        theme="vs-dark"
        height="90vh"
        language="python"
        value={code.slice(0, lastIndex)}
        options={options}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};

export default CodeEditor;