import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CodeEditor from './components/CodeEditor';
import './App.css';

// TODO move it to the App component state
let selectedTaskIndex = 0

const App = ({tasks}) => {
  //TODO: parseCode is strange name. It does a lot of very different things.
  function parseCode(code) {
    if (code.length == 0) {
      return ""
    }
    // TODO: function named parseCode is wrong place for this code.
    if (wrongClickCount >= 5) {
      setTimeout(() => {
        setTerminalMessage('You clicked wrong too many times! Restarting the game...');
        setTerminalMessageColor('red');
        setShowTerminal(true);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }, 5100);
    }
    const map = code.map(item => (typeof item === 'string' ? item : (set.has(item.error) ? item.fixed : item.initial)))
    let answer = ""
    for (const item of map) {
      let line = item
      for (const changedVariable of set) {
        line = line.replaceAll(new RegExp(`\\b${changedVariable}\\b`, 'g'), renamedVariables[changedVariable])
      }
      answer += line + '\n'
    }
    return answer
  }

  //TODO: look at the linter warnings (in the terminal window after npm start). Remove unused state variables
  //TODO: `set` is too generic name
  const [set, setOfFixedErrors] = useState(new Set())  
  const [renamedVariables, setRenamedVariables] = useState(tasks[0].bugs);
  const [wrongClickCount, setWrongClickCount] = useState(0);
  const [code, setCode] = useState(parseCode(tasks[0].code));
  const [renamed, setRenamed] = useState({});
  const [completed, setCompleted] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalMessage, setTerminalMessage] = useState('');
  const [terminalMessageColor, setTerminalMessageColor] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    handleTaskSelect(0);
  }, []);

  useEffect(() => {
    if (disabled && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [disabled, timer]);

  const handleTaskSelect = (index) => {
    set.clear()
    selectedTaskIndex = index
    setRenamedVariables(tasks[index].bugs);
    setCompleted(false);
    setRenamed({});
    setShowTerminal(false);
    setDisabled(false);
    setWrongClickCount(0);
    setIsTyping(true);
    setCode('');
    const newCode = parseCode(tasks[index].code);
    setCode(newCode);

    // Set a timeout to end the typing animation
    const typingDuration = newCode.length * 50; // Adjust based on your typing speed
    setTimeout(() => {
      setIsTyping(false);
    }, typingDuration);

  };

  const handleVariableClick = (oldName) => {
    if (disabled) return;
    if (oldName && tasks[selectedTaskIndex].bugs[oldName] && !set.has(oldName)) {
      const newName = tasks[selectedTaskIndex].bugs[oldName];
      if (oldName === newName) {
       const newSet = set.add(oldName)
       setOfFixedErrors(newSet)
       setRenamed((prev) => ({ ...prev, [oldName]: true }));
      }
      else {
      const newSet = set.add(oldName)
      setOfFixedErrors(newSet)
      setRenamed((prev) => ({ ...prev, [oldName]: true }));
      }
      const newFinalCode = parseCode(tasks[selectedTaskIndex].code)
      setCode(newFinalCode)
      if (set.size === tasks[selectedTaskIndex].number) {
        setCompleted(true);
        setCompletedTasks((prev) => [...prev, selectedTaskIndex]);
        setTerminalMessage('Success: All variables have been renamed!');
        setTerminalMessageColor('green');
        setShowTerminal(true);
      }
    } else {
      setTerminalMessage('Error: You clicked on the wrong place.');
      setTerminalMessageColor('yellow');
      setShowTerminal(true);
      setDisabled(true);
      setTimer(3);
      setWrongClickCount((prev) => prev + 1);

      setTimeout(() => {
        setDisabled(false);
        setShowTerminal(true);
      }, 3000);
    }
  };

  const handleNextTask = () => {
    if (selectedTaskIndex < tasks.length - 1) {
      handleTaskSelect(selectedTaskIndex + 1);
    } else {
      alert('You have completed all the tasks!');
    }
  };

  const handleCloseTerminal = () => {
    setShowTerminal(false);
  };

  return (
    <div className="app">
      <Sidebar tasks={tasks.map((task, index) => ({
        ...task,
        completed: completedTasks.includes(index)
      }))} onSelectTask={() => {}} />
      <div className="content">
        <div className="header-bar">
          <div className="file-tab">
            <span>{tasks[selectedTaskIndex].fileName}</span>
          </div>
        </div>
        <CodeEditor code={parseCode(tasks[selectedTaskIndex].code)} onVariableClick={handleVariableClick} disabled={disabled} levelId={selectedTaskIndex} />
        {showTerminal && (
          <div className="terminal">
            <button className="close-button" onClick={handleCloseTerminal}>x</button>
            <div style={{ color: terminalMessageColor }}>{terminalMessage}</div>
            {disabled && <div>Try again in {timer} seconds...</div>}
            {wrongClickCount > 0 && <div>Mistakes: {wrongClickCount}</div>}
            {completed && <button onClick={handleNextTask}>Next Task</button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;