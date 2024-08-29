import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CodeEditor from './components/CodeEditor';
import './App.css';

// TODO move it to the App component state

const App = ({tasks}) => {
  //TODO: parseCode is strange name. It does a lot of very different things.
  function processCode(code) {
    if (code.length === 0) {
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
    const map = code.map(item => (typeof item === 'string' ? item : (setOfFixedErrors.has(item.error) ? item.fixed : item.initial)))
    let answer = ""
    for (const item of map) {
      let line = item
      for (const changedVariable of setOfFixedErrors) {
        line = line.replaceAll(new RegExp(`\\b${changedVariable}\\b`, 'g'), renamedVariables[changedVariable])
      }
      answer += line + '\n'
    }
    return answer
  }


  function renderCode(task, eventsHappened){
    // renders all the blocks from task.blocks according to eventsHappened
    return {
      code: "code to display",
      codemap: [
        {startIndex: 1, endIndex: 20, eventId: "badNameClick"},
        // ...
      ]

    };
  }

  const [taskIndex, setTaskIndex] = useState(0)
  const [eventsHappened, setEventsHappened] = useState([])  
  //TODO: next two states should not be used:
  const [setOfFixedErrors, updateSetOfFixedErrors] = useState(new Set())  
  const [renamedVariables, setRenamedVariables] = useState(tasks[0].bugs);

  const [wrongClickCount, setWrongClickCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalMessage, setTerminalMessage] = useState('');
  const [terminalMessageColor, setTerminalMessageColor] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    handleTaskSelect(0);
    // eslint-disable-next-line
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
    setOfFixedErrors.clear()
    taskIndex = index
    setRenamedVariables(tasks[index].bugs);
    setCompleted(false);
    setShowTerminal(false);
    setDisabled(false);
    setWrongClickCount(0);
  };

  const handleVariableClick = (oldName) => {
    if (disabled) return;
    if (oldName && tasks[taskIndex].bugs[oldName] && !setOfFixedErrors.has(oldName)) {
      const newName = tasks[taskIndex].bugs[oldName];
      if (oldName === newName) {
       const newSet = setOfFixedErrors.add(oldName)
       updateSetOfFixedErrors(newSet)
      }
      else {
      const newSet = setOfFixedErrors.add(oldName)
      updateSetOfFixedErrors(newSet)
      }
      if (setOfFixedErrors.size === tasks[taskIndex].number) {
        setCompleted(true);
        setCompletedTasks((prev) => [...prev, taskIndex]);
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
    if (taskIndex < tasks.length - 1) {
      handleTaskSelect(taskIndex + 1);
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
            <span>{tasks[taskIndex].fileName}</span>
          </div>
        </div>

        { /* TODO use renderCode here: */ }
        <CodeEditor code={processCode(tasks[taskIndex].code)} onVariableClick={handleVariableClick} disabled={disabled} levelId={taskIndex} />
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