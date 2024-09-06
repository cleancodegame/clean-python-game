import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CodeEditor from './components/CodeEditor';
import './App.css';
import { formatTask, getEventRegions } from './codeTasks';

// TODO move it to the App component state

const App = ({tasks}) => {

  const [taskIndex, setTaskIndex] = useState(0)
  const [eventsHappened, setEventsHappened] = useState([])  
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
    setEventsHappened([]);
    setTaskIndex(index);
    setCompleted(false);
    setShowTerminal(false);
    setDisabled(false);
    setWrongClickCount(0);
  };

  const handleVariableClick = (clickedVariable) => {
    if (disabled) return;
  
    // TODO:
    // find the region that contains the clickedPosition
    const task = tasks[selectedTaskIndex];
    const eventsHappened = new Set([...set]); // Clone the existing set of eventsHappened
  
    if (clickedVariable && task.bugs[clickedVariable]) {
      const newVariableName = task.bugs[clickedVariable];
      
      // Add corresponding event to eventsHappened
      eventsHappened.add(clickedVariable);
      setOfFixedErrors(eventsHappened);
      setRenamed((prev) => ({ ...prev, [clickedVariable]: true }));
  
      // Update the code with renamed variables
      const newFinalCode = parseCode(task.code);
      setCode(newFinalCode);
  
      // Check if all variables are renamed
      if (eventsHappened.size === task.number) {
        setCompleted(true);
        setCompletedTasks((prev) => [...prev, selectedTaskIndex]);
        setTerminalMessage('Success: All variables have been renamed!');
        setTerminalMessageColor('green');
        setShowTerminal(true);
      }
    } else {
      // Event not found, show an error message in the terminal
      setTerminalMessage('Error: You clicked on the wrong place.');
      setTerminalMessageColor('red');
      setShowTerminal(true);
  
      // Increment wrongClickCount
      setWrongClickCount((prev) => prev + 1);
  
      // Disable the editor for 3 seconds
      setDisabled(true);
      setTimer(3);
      
      setTimeout(() => {
        setDisabled(false);
        setShowTerminal(false);
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

  let code = formatTask(tasks[taskIndex], eventsHappened);

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

        <CodeEditor code={code} onVariableClick={handleVariableClick} disabled={disabled} levelId={taskIndex} />
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