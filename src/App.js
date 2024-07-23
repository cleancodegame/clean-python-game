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

  function parserFromPython() { //easy version of parser
    fetch('02.py')
     .then(response => response.text())
     .then((data) => {
      const dataInArray = data.split("\n")
      let finalCode = []
      let bugs = {}
      let prevWord = ""
      let num = 0
      let levelTitle = ""
      let levelFilename = ""
      let curInitialCode = ""
      let curFixedCode = ""
      let curMistaken = ""
      let curFlag = 0
      for (const id in dataInArray) {
        const item = dataInArray[id]
        let words = item.split(" ")
        if (words[0] !== "##" && curFlag === 0) {
          finalCode.push(item)
          continue
        }
        if (words[0] !== "##") {
          if (curFlag === 1) {
            curInitialCode += words.toString + "\n"
          }
          else {
            curFixedCode += words.toString + "\n"
          }
          continue
        }
        if (id === 0) {
          levelTitle = words[1]
        }
        else if (id === 1) {
          levelFilename = words[1]
        }
        else if (words.includes("error")) {
          curMistaken = words[2]
          curFlag = 1
        }
        else if (words.includes("fix")) {
          curFlag = 2
        }
        else if (words.includes("end")) {
          bugs[curMistaken] = curMistaken
          num = num + 1
          finalCode.push({
            "error": curMistaken,
            "initial": curInitialCode,
            "fixed": curFixedCode
          })
          curMistaken = ""
          curFlag = 0
          curInitialCode = ""
          curFixedCode = ""
        }
        else if (words.includes("mistake")) {
          prevWord = words[words.length - 1]
          curFlag = 1
        }
        else if (words.includes("correct")) {
          bugs[prevWord] = words[words.length - 1]
          num = num + 1
          curFlag = 0
        }
      }
      console.log( {
        title: levelTitle,
        fileName: levelFilename,
        "bugs": bugs,
        "number": num,
        "code": finalCode
      })
    })
    }
  
    function parseCode(code) {
      console.log(parserFromPython())
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
      const map = code.map(item => (typeof item === 'string' ? item.trim() : (set.has(item.error) ? item.fixed.trim() : item.initial.trim())))
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
    console.log(oldName)
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
        <CodeEditor code={parseCode(tasks[selectedTaskIndex].code)} onVariableClick={handleVariableClick} disabled={disabled} />
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