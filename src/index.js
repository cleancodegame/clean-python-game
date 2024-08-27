import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

/*
TODO Review:
1. Move all parsing code to a separate file
2. Reformat the code to fix indentation problems (Ctrl+Shift+P + Format Document)
3. makeArray, makeFinalArray - too generic name
4. Fix linter errors (in the terminal window after npm start) about === vs ==
*/

export let tasks = [];
function parserFromPython(dataInArray) {
  let currentLine = 0;
  let lines = dataInArray;
  function parseReplace() {
    // start parsing from lines[currentLine], increase currentLine,
    // return object describing the instruction
    let initialCode = ""
    let finalCode = ""
    let lastCommand = ""
    let eventId = ""
    while (currentLine < lines.length) {
      if (lines[currentLine] === "## with") {
        lastCommand = "with"
      }
      else if (lines[currentLine] === "## end") {
        break
      }
      else if (lines[currentLine][0] + lines[currentLine][1] === "##") {
        eventId = lines[currentLine].split(" ")[2]
        lastCommand = "replace"
      }
      else if (lastCommand === "replace") {
        initialCode += lines[currentLine]
      }
      else {
        finalCode += lines[currentLine]
      }
      currentLine += 1
    }
    return {
      actionType: "replace",
      eventId: eventId,
      substring: null, //?
      code: initialCode,
      replacementCode: finalCode,
    };
  }
  function parseRemove() {
    let initialCode = ""
    let eventId = ""
    while (currentLine < lines.length) {
      if (lines[currentLine] === "## end") {
        break
      }
      else if (lines[currentLine][0] + lines[currentLine][1] !== "##") {
        initialCode += lines[currentLine]
      }
      else {
        eventId = lines[currentLine].split(" ")[2]
      }
      currentLine += 1
    }
    return {
      actionType: "remove",
      eventId: eventId,
      substring: null, //?
      code: initialCode,
      replacementCode: "",
    };
  }
  function parseAdd() {
    let finalCode = ""
    let eventId = ""
    while (currentLine < lines.length) {
      if (lines[currentLine] == "## end") {
        break
      }
      else if (lines[currentLine][0] + lines[currentLine][1] !== "##") {
        finalCode += lines[currentLine]
      }
      else {
        eventId = lines[currentLine].split(" ")[2]
      }
      currentLine += 1
    }
    return {
      actionType: "add",
      eventId: eventId,
      substring: null, //?
      code: "",
      replacementCode: finalCode,
    };
  }

  // function parseAdd and others

  let finalCode = [];
  let bugsFound = {};
  let prevWord = "";
  let num = 0;
  let levelTitle = "";
  let levelFilename = "";
  let curInitialCode = "";
  let curFixedCode = "";
  let curMistaken = "";
  let initialCode = false;
  let blockOfIncorrectLines = false;
  for (const lineIndex in dataInArray) {
    const item = dataInArray[lineIndex];
    let words = item.split(" ");
    if (words[0] !== "##" && !blockOfIncorrectLines) {
      finalCode.push(item);
      continue;
    }
    if (words[0] !== "##") {
      if (initialCode === true) {
        curInitialCode += item + "\n";
      } else {
        curFixedCode += item + "\n";
      }
      continue;
    }
    if (lineIndex === 0) {
      levelTitle = words[1] + " " + words[2];
    } else if (lineIndex === 1) {
      levelFilename = words[1];
    } else if (words[1] === "error") {
      curMistaken = words[2];
      initialCode = true;
      blockOfIncorrectLines = true;
    } else if (words[1] === "fix") {
      initialCode = false;
    } else if (words[1] === "end") {
      if (typeof bugsFound[curMistaken] == "undefined") {
        num = num + 1;
      }
      bugsFound[curMistaken] = curMistaken;
      finalCode.push({
        error: curMistaken,
        initial: curInitialCode,
        fixed: curFixedCode,
      });
      curMistaken = "";
      initialCode = false;
      blockOfIncorrectLines = false;
      curInitialCode = "";
      curFixedCode = "";
    } else if (words[1] === "mistake") {
      prevWord = words[words.length - 1];
    } else if (words[1] === "correct") {
      bugsFound[prevWord] = words[words.length - 1];
      num = num + 1;
    }
  }
  //TODO: do not create an object twice:
  const item = {
    title: levelTitle,
    fileName: levelFilename,
    bugs: bugsFound,
    number: num,
    code: finalCode,
  };
  if (typeof item !== "undefined") {
    return item;
  }
}
async function parserFromFile(fileName) {
  let response = await fetch(fileName);
  let data = await response.text();
  return data.split(RegExp("\\r?\\n"));
}

async function makeArray(fileName) {
  let anotherTasks = [];
  let queryAnswer = await parserFromFile(fileName);
  anotherTasks.push(parserFromPython(queryAnswer));
  return anotherTasks;
}

async function makeFinalArray(fileNames) {
  for (const curFile of fileNames) {
    let task = await makeArray(curFile);
    tasks.push(...task);
  }
}

await makeFinalArray(["01.py"]);

root.render(
  <React.StrictMode>
    <App tasks={tasks} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
