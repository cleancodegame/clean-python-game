import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CodeEditor from './components/CodeEditor';
import './App.css';

const App = () => {
  const initialTasks = [
    {
      title: 'Task 1',
      fileName: 'task1.py',
      code: `
# Welcome to the Clean Code Game! Your task is to rename the badly named variables to more meaningful names.
# Click on the variable names to rename them. When all variables are renamed, you can proceed to the next task.

class VeryLongClassName:
  def __init__(self, x, y):
    self.x = x
    self.y = y

  def coordinates(self):
    return (self.x, self.y)

  def distancefrompointAtoB(self, other_point):
    dx = self.x - other_point.x
    dy = self.y - other_point.y
    distance = math.sqrt(dx**2 + dy**2)
    return distance
`,
      variables: {
        VeryLongClassName: 'ClassName',
        x: 'posX',
        y: 'posY',
        other_point: 'otherPoint'
      }
    },
    {
      title: 'Task 2',
      fileName: 'task2.py',
      code: `
def long_function_name(var_one, var_two, var_three):
    result = var_one + var_two + var_three
    return result
`,
      variables: {
        long_function_name: 'sum',
        var_one: 'a',
        var_two: 'b',
        var_three: 'c'
      }
    },
    {
      title: 'Task 3',
      fileName: 'task3.py',
      code: `
def bad_variable_names(a, b):
    c = a * b
    return c
`,
      variables: {
        bad_variable_names: 'multiply',
        a: 'num1',
        b: 'num2',
        c: 'result'
      }
    },
    {
      title: 'Task 4',
      fileName: 'task4.py',
      code: `
class BadClassName:
  def __init__(self, param1, param2):
    self.param1 = param1
    self.param2 = param2

  def calculate(self):
    return self.param1 + her param2
`,
      variables: {
        BadClassName: 'Addition',
        param1: 'addend1',
        param2: 'addend2'
      }
    },
    {
      title: 'Task 5',
      fileName: 'task5.py',
      code: `
def compute_values(value_one, value_two):
    return value_one - value_two
`,
      variables: {
        compute_values: 'subtract',
        value_one: 'minuend',
        value_two: 'subtrahend'
      }
    },
    {
      title: 'Task 6',
      fileName: 'task6.py',
      code: `
class LongMethodNames:
  def long_method_name_one(self, x):
    return x + 1

  def long_method_name_two(self, y):
    return y - 1
`,
      variables: {
        LongMethodNames: 'MathOperations',
        long_method_name_one: 'increment',
        long_method_name_two: 'decrement'
      }
    },
    {
      title: 'Task 7',
      fileName: 'task7.py',
      code: `
def another_bad_example(p1, p2):
    return p1 * p2
`,
      variables: {
        another_bad_example: 'multiply',
        p1: 'factor1',
        p2: 'factor2'
      }
    },
    {
      title: 'Task 8',
      fileName: 'task8.py',
      code: `
class IncorrectNames:
  def calculate_area(self, l, w):
    return l * w
`,
      variables: {
        IncorrectNames: 'Rectangle',
        calculate_area: 'area',
        l: 'length',
        w: 'width'
      }
    },
    {
      title: 'Task 9',
      fileName: 'task9.py',
      code: `
def messy_code(i, j, k):
    return i + j + k
`,
      variables: {
        messy_code: 'sum',
        i: 'a',
        j: 'b',
        k: 'c'
      }
    },
    {
      title: 'Task 10',
      fileName: 'task10.py',
      code: `
class ConfusingNames:
  def __init__(self, a1, a2):
    self.a1 = a1
    self.a2 = a2

  def calculate_total(self):
    return self.a1 + self.a2
`,
      variables: {
        ConfusingNames: 'SumClass',
        a1: 'num1',
        a2: 'num2'
      }
    }
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const [currentCode, setCurrentCode] = useState(tasks[0].code);
  const [renamedVariables, setRenamedVariables] = useState({});
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalMessage, setTerminalMessage] = useState('');
  const [terminalMessageColor, setTerminalMessageColor] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [wrongClickCount, setWrongClickCount] = useState(0);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (disabled && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [disabled, timer]);

  useEffect(() => {
    setCurrentCode(tasks[selectedTaskIndex].code);
    setRenamedVariables({});
  }, [selectedTaskIndex, tasks]);

  const handleTaskSelect = (index) => {
    setSelectedTaskIndex(index);
    setShowTerminal(false);
    setDisabled(false);
    setWrongClickCount(0);
  };

  const handleVariableClick = (oldName) => {
    if (disabled) return;

    const task = tasks[selectedTaskIndex];
    const variables = task.variables;

    if (variables[oldName]) {
      const newName = variables[oldName];
      const newCode = currentCode.replace(new RegExp(`\\b${oldName}\\b`, 'g'), newName);
      setCurrentCode(newCode);
      setRenamedVariables((prev) => ({ ...prev, [oldName]: true }));

      const allRenamed = Object.keys(variables).every((variable) => newCode.includes(variables[variable]));
      if (allRenamed) {
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
        setShowTerminal(false);
      }, 3000);

      if (wrongClickCount + 1 >= 5) {
        setTimeout(() => {
          setTerminalMessage('You clicked wrong too many times! Restarting the game...');
          setTerminalMessageColor('red');
          setShowTerminal(true);
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }, 5100);
      }
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
        <CodeEditor code={currentCode} onVariableClick={handleVariableClick} disabled={disabled} />
        {showTerminal && (
          <div className="terminal">
            <button className="close-button" onClick={handleCloseTerminal}>x</button>
            <div style={{ color: terminalMessageColor }}>{terminalMessage}</div>
            {disabled && <div>Try again in {timer} seconds...</div>}
            {wrongClickCount > 0 && <div>Mistakes: {wrongClickCount}</div>}
            {completedTasks.includes(selectedTaskIndex) && <button onClick={handleNextTask}>Next Task</button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
