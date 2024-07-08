import React from 'react';
import './CodeEditor.css';

const CodeEditor = ({ code, onVariableClick }) => {
  const handleClick = (e) => {
    if (e.target.classList.contains('variable')) {
      onVariableClick(e.target.textContent);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className="code-editor" onClick={handleClick}>
      {lines.map((line, index) => (
        <div key={index} className="code-line">
          <span className="line-number">{index + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: line.replace(/\b(\w+)\b/g, '<span class="variable">$1</span>') }} />
        </div>
      ))}
    </div>
  );
};

export default CodeEditor;