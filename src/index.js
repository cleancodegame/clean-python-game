import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

export let tasks = []

function parserFromPython(dataInArray) {
  let finalCode = []
  let bugsFound = {}
  let prevWord = ""
  let num = 0
  let levelTitle = ""
  let levelFilename = ""
  let curInitialCode = ""
  let curFixedCode = ""
  let curMistaken = ""
  let initialCode = false
  let blockOfIncorrectLines = false
  for (const lineIndex in dataInArray) {
    const item = dataInArray[lineIndex]
    let words = item.split(" ")
    if (words[0] != "##" && blockOfIncorrectLines == false) {
      finalCode.push(item)
      continue
    }
    if (words[0] != "##") {
      if (initialCode == true) {
        curInitialCode += item + "\n"
      }
      else {
        curFixedCode += item + "\n"
      }
      continue
    }
    if (lineIndex == 0) {
      levelTitle = words[1] + " " + words[2]
    }
    else if (lineIndex == 1) {
      levelFilename = words[1]
    }
    else if (words[1] == "error") {
      curMistaken = words[2]
      initialCode = true
      blockOfIncorrectLines = true
    }
    else if (words[1] == "fix") {
      initialCode = false
    }
    else if (words[1] == "end") {
      if (typeof bugsFound[curMistaken] == "undefined") {
        num = num + 1
      }
      bugsFound[curMistaken] = curMistaken
      finalCode.push({
        "error": curMistaken,
        "initial": curInitialCode,
        "fixed": curFixedCode
      })
      curMistaken = ""
      initialCode = false
      blockOfIncorrectLines = false
      curInitialCode = ""
      curFixedCode = ""
    }
    else if (words[1] == "mistake") {
      prevWord = words[words.length - 1]
    }
    else if (words[1] == "correct") {
      bugsFound[prevWord] = words[words.length - 1]
      num = num + 1
    }
  }
  const item = {
    title: levelTitle,
    fileName: levelFilename,
    'bugs': bugsFound,
    'number': num,
    'code': finalCode
  }
  if (typeof item !== "undefined") {
  return {
    title: levelTitle,
    fileName: levelFilename,
    bugs: bugsFound,
    number: num,
    code: finalCode
  }
}
}
async function parserFromFile(fileName) {
let response = await fetch(fileName)
let data = await response.text()
return data.split("\n")
}

async function makeArray(fileName) {
  let anotherTasks = []
  let queryAnswer = await parserFromFile(fileName)
  anotherTasks.push(parserFromPython(queryAnswer))
  return anotherTasks
}

async function makeFinalArray(fileNames) {
  for (const curFile of fileNames) {
  let task = await makeArray(curFile);
  tasks.push(...task);
  }
  return tasks
}

await makeFinalArray(["01.py", "02.py"]).then(() => {
  console.log(tasks);
})

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
