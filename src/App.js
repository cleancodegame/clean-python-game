import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CodeEditor from './components/CodeEditor';
import './App.css';

let selectedTaskIndex = 0

const App = () => {
  const tasks = [
    {
      title: 'Task 1',
      fileName: 'task1.py',
      "bugs": {
        "LongClassName": "ClassName",
        "x": "posX",
        "y": "posY",
        "other_point" : "otherPoint"
      },
      "number": 4,
      "code": [
"# Welcome to the Clean Code Game! Your task is to rename the badly named variables to more meaningful names.",
"# Click on the variable names to rename them. When all variables are renamed, you can proceed to the next task.",
"class LongClassName:",
"  def __init__(self, x, y):",
"    self.x = x",
"    self.y = y",

"  def coordinates(self):",
"    return (self.x, self.y)",

"  def distancefrompointAtoB(self, other_point):",
"    dx = self.x - other_point.x",
"    dy = self.y - other_point.y",
"    distance = math.sqrt(dx**2 + dy**2)",
"    return distance"
      ]
    },
    {
      title: 'Task 2',
      fileName: 'task2.py',
      "bugs": {
            "another_bad_name": "name",
            "uppercase": "uppercase"
      },
      "number": 2,
      "code": [
        "# Level 2",
        {
            "error": "uppercase",
            "initial": `def transform(text, uppercase):
    if uppercase:
        return text.upper()
    else:
        return text.lower()
            `,
            "fixed": `
def uppercase(text):
    return text.upper()

def lowercase(text):
    return text.lower()`
        },
        "print(\"Hello\")",
        {
            "error": "uppercase",
            "initial": "print(transform(another_bad_name, True))",
            "fixed": "print(uppercase(another_bad_name))"
        },
        "print(\"1213212\")"
      ]
    }
  ];

  const [set, setOfFixedErrors] = useState(new Set())  
  const [renamedVariables, setRenamedVariables] = useState(tasks[0].bugs);
  const [wrongClickCount, setWrongClickCount] = useState(0);
  const [code, setCode] = useState('');
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

  function parseCode(code, fixedErrors, renamedVars) {
    const map = code.map(item => (typeof item === 'string' ? item.trim() : (fixedErrors.has(item.error) ? item.fixed.trim() : item.initial.trim())))
    let answer = ""
    for (const item of map) {
      let line = item
      for (const changedVariable of fixedErrors) {
        line = line.replaceAll(new RegExp(`\\b${changedVariable}\\b`, 'g'), renamedVars[changedVariable])
      }
      answer += line + '\n'
    }
    return answer
  }

  const handleTaskSelect = (index) => {
    setOfFixedErrors(new Set());
    selectedTaskIndex = index;
    setRenamedVariables(tasks[index].bugs);
    setCompleted(false);
    setRenamed({});
    setShowTerminal(false);
    setWrongClickCount(0);
    setIsTyping(true);
    setCode('');  // Clear the code before typing animation

    const newCode = parseCode(tasks[index].code, new Set(), tasks[index].bugs);
    setCode(newCode);

    // The typing animation is now handled in the CodeEditor component
  };

  const handleVariableClick = (oldName) => {
    if (isTyping) return;
    if (oldName && tasks[selectedTaskIndex].bugs[oldName] && !set.has(oldName)) {
      const newSet = new Set(set);
      newSet.add(oldName);
      setOfFixedErrors(newSet);
      setRenamed((prev) => ({ ...prev, [oldName]: true }));
      
      const newFinalCode = parseCode(tasks[selectedTaskIndex].code, newSet, tasks[selectedTaskIndex].bugs)
      setCode(newFinalCode);
      
      if (newSet.size === tasks[selectedTaskIndex].number) {
        setCompleted(true);
        setCompletedTasks((prev) => [...prev, selectedTaskIndex]);
        setTerminalMessage('Success: All variables have been renamed!');
        setTerminalMessageColor('green');
        setShowTerminal(true);
      }
    } else if (oldName) {
      setTerminalMessage('Error: You clicked on the wrong place.');
      setTerminalMessageColor('yellow');
      setShowTerminal(true);
      setDisabled(true);
      setTimer(3);
      setWrongClickCount((prev) => prev + 1);

      setTimeout(() => {
        setDisabled(false);
        setShowTerminal(false);
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
      }))} onSelectTask={handleTaskSelect} />
      <div className="content">
        <div className="header-bar">
          <div className="file-tab">
            <span>{tasks[selectedTaskIndex].fileName}</span>
          </div>
        </div>
        <CodeEditor 
          code={code} 
          onVariableClick={handleVariableClick} 
          disabled={disabled}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
          bugs={tasks[selectedTaskIndex].bugs}
        />
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