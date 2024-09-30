import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.js';
import CodeEditor from './components/CodeEditor.js';
import './App.css';
import { formatTask, getEventRegions } from './level-utils.mjs';

function isPositionInRegion(position, region){
  const { startLine, startColumn, endLine, endColumn } = region;
  const { lineNumber, column } = position;
 
  if (lineNumber < startLine || lineNumber > endLine) {
    return false;
  }

  if (lineNumber === startLine && lineNumber === endLine) {
    return column >= startColumn && column <= endColumn;
  }

  if (lineNumber === startLine) {
    return column >= startColumn;
  }

  if (lineNumber === endLine) {
    return column <= endColumn;
  }

  return true;
};

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
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);


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
    setSelectedTaskIndex(index);
    setEventsHappened([]);
    setTaskIndex(index);
    setCompleted(false);
    setShowTerminal(false);
    setDisabled(false);
    setWrongClickCount(0);
  };

  const handleCodeClick = (clickedPosition) => {
    if (disabled) return;
    if (completed) {
      handleNextTask();
      return;
    }
    let allEvents = [...new Set(tasks[selectedTaskIndex].blocks.map(b => b.eventId).filter(e => e !== undefined))];
    console.log("clickedPos:", clickedPosition);
    const currentTask = tasks[selectedTaskIndex];
    const eventRegions = getEventRegions(currentTask, eventsHappened);
    console.log("regions:", eventRegions);
    const clickedRegion = eventRegions.find(region => 
      isPositionInRegion(clickedPosition, region)
    );
    console.log("clicked:", clickedRegion);
  
    if (clickedRegion) {
      console.log(allEvents, eventsHappened.length);
      setEventsHappened([...eventsHappened, clickedRegion.eventId]);
      if (allEvents.length === eventsHappened.length + 1) {
        setTerminalMessage('Yes! You have completed the task.');
        setTerminalMessageColor('green');
        setCompleted(true);
        setCompletedTasks([...completedTasks, selectedTaskIndex]);
        setShowTerminal(true);
      }
    }
    else {
      setTerminalMessage('Error: You clicked on the wrong place.');
      setTerminalMessageColor('yellow');
      setShowTerminal(true);
      setDisabled(true);
      setTimer(3);
      setWrongClickCount(wrongClickCount + 1);

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

  let code = formatTask(tasks[taskIndex], eventsHappened);

  return (
    <div className="app">
      <Sidebar tasks={tasks.map((task, index) => ({
        ...task,
        completed: completedTasks.includes(index)
      }))} onSelectTask={handleTaskSelect} />
      <div className="content">
        <div className="header-bar">
          <div className="file-tab">
            <span>{tasks[taskIndex].filename}</span>
          </div>
        </div>

        <CodeEditor code={code} onCodeClick={handleCodeClick} disabled={disabled} levelId={taskIndex} />
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