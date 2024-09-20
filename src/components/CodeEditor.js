import React, { useEffect, useState, useRef } from 'react';
import MonacoEditor, { loader } from '@monaco-editor/react';
import './CodeEditor.css';

const CodeEditor = ({ code, onCodeClick, disabled, levelId }) => {
  const [lastIndex, setLastIndex] = useState(0)
  const editorRef = useRef(null);
  const onMouseUpHandlerRef = useRef(null);

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
            return 10000000;
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

  function setMouseUp(){
    if(onMouseUpHandlerRef.current)
      onMouseUpHandlerRef.current.dispose();
    if (editorRef.current) {
      onMouseUpHandlerRef.current = editorRef.current.onMouseUp((e) => {
        if (disabled) return;
  
        const position = e.target.position;
        if (!position) {
          onCodeClick(null);
          return;
        }
        onCodeClick(position);
      });
    }
  }

  setMouseUp();


  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // set a pointer as a mouse cursor (no editor API for this)
    // mouseStyle option has only 'copy' value, but not 'pointer'
    const editorDom = editorRef.current.getDomNode();
    const viewLines = editorDom.querySelector('.view-lines');
    viewLines.classList.add('monaco-mouse-cursor-pointer');
    viewLines.classList.remove('monaco-mouse-cursor-text');

    setMouseUp();
    editor.onDidChangeCursorSelection((e) => {
      if (monaco) {
        editor.setSelection(new monaco.Selection(1, 1, 1, 1));
      }
    });
  };

  const options = {
    readOnly: true,
    renderLineHighlight: 'none',
    selectOnLineNumbers: false,
    occurrencesHighlight: false,
    matchBrackets: false,
    minimap: { enabled: false, },
    scrollbar: { vertical: 'hidden', horizontal: 'hidden', },
  };

  // TODO: Remove ugly vertical scrollbar
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