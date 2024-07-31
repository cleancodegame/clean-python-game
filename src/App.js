import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CodeEditor from './components/CodeEditor';
import './App.css';
//import {tasks} from './index.js'

let selectedTaskIndex = 0

const App = ({tasks}) => {
 /* const tasks = [
    //parserFromFile('01.py'),
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
    /*,
    {
      title: 'Task 1',
      fileName: 'task1.py',
      "bugs": {
            "another_bad_name": "name",
            "uppercase": "uppercase"
      },
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
    }/*,
    {
      title: 'Task 1',
      fileName: 'task1.py',
      "bugs": {
        "VeryLongClassName": "ClassName",
        "x": "posX",
        "y": "posY",
        "other_point" : "otherPoint"
      }
      "code": [`
# Welcome to the Clean Code Game! Your task is to rename the badly named variables to more meaningful names."
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
  `]
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
    return self.param1 + self.param2
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
    return
i + j + k
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
    },
    {
      title: 'Task 11',
      fileName: 'task11.py',
      code: `
      from datetime import datetime
genyyyymmddhhmmss = datetime.strptime('04/27/95 07:14:22', '%m/%d/%y %H:%M:%S')
`,
      variables: {
        genyyyymmddhhmmss: 'generation_datetime'
      }
    },
    {
      title: 'Task 12',
      fileName: 'task12.py',
      code: `
      def calculate_sum(a,b):
      return a +b
`,
      variables: {
        b:' b'
      }
    },
    {
      title: 'Task 13',
      fileName: 'task13.py',
      code: `
      for i in range(5):
print(i)
`,
      variables: {
        print: '      print'
      }
    },
    {
      title: 'Task 14',
      fileName: 'task14.py',
      code: `
      client_first_name = 'Bob'
customer_last_name = 'Smith'
`,
      variables: {
        customer_last_name: 'client_last_name'
      }
    },
    {
      title: 'Task 15',
      fileName: 'task15.py',
      code: `
      class Person:
    def __init__(self, person_first_name, person_last_name, person_age):
        self.person_first_name = person_first_name
        self.person_last_name = person_last_name
        self.person_age = person_age
`,
      variables: {
        person_first_name: 'first_name',
        person_last_name: 'last_name',
        person_age: 'age'
      }
    },
    {
      title: 'Task 16',
      fileName: 'task16.py',
      code: `
      def transform(text, uppercase):
    if uppercase:
        return text.upper()
    else:
        return text.lower()
`,
      variables: {
        def: `
         def uppercase(text):
    return text.upper()

def lowercase(text):
    return text.lower()
        `
      }
    },
    {
      title: 'Task 17',
      fileName: 'task17.py',
      code: `
      pi = 3.14159
r = 5.0
print(pi * r**2)
`,
      variables: {
        pi: 'PI'
      }
    },
    {
      title: 'Task 18',
      fileName: 'task18.py',
      code: `
      def calculate_sum(a, __name__):
      return a + __name__
`,
      variables: {
        __name__: 'name'
      }
    },
    {
      title: 'Task 19',
      fileName: 'task19.py',
      code: `
      class LongMethodNames:
  def a(self, first_element_in_function):
    return first_element_in_function + 1

  def b(self, second_element_in_function):
    return second_element_in_function - 1
`,
      variables: {
        'a': 'increment',
        'b': 'decrement',
        'first_element_in_function': 'x',
        'second_element_in_function': 'y'
      }
    },
    {
      title: 'Task 20',
      fileName: 'task20.py',
      code: `
      def BadName(a, b):
      return a + b
`,
      variables: {
        'BadName': 'sum'
      }
    }
  ];*/

  function parseCode(code) {
    if (code.length == 0) {
      return ""
    }
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
  ];

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