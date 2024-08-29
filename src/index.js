import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

export let tasks = [];

const root = ReactDOM.createRoot(document.getElementById("root"));

/*
TODO Review:
1. Move all parsing code to a separate file
2. Fix linter errors (in the terminal window after npm start) about === vs ==
*/

function parsePythonLines(lines) {
  let currentLine = 0;

  function parseReplace() {
    // start parsing from lines[currentLine], increase currentLine,
    // return object describing the instruction
    let initialCode = "";
    let finalCode = "";
    let lastCommand = "";
    let eventId = "";
    let substr = "";
    let type = "";
    while (currentLine < lines.length) {
      if (lines[currentLine] === "## with") {
        lastCommand = "with";
      } else if (lines[currentLine] === "## end") {
        break;
      } else if (lines[currentLine][0] + lines[currentLine][1] === "##") {
        let allWords = lines[currentLine].split(" ");
        type = allWords[1];
        let id = 2;
        eventId = lines[currentLine].split(" ")[id];
        id += 1;
        while (id < allWords.length) {
          if (substr.length !== 0) {
            substr += " ";
          }
          substr += allWords[id];
          id += 1;
        }
        lastCommand = "replace";
      } else if (lastCommand === "replace") {
        initialCode += lines[currentLine];
      } else {
        finalCode += lines[currentLine];
      }
      currentLine += 1;
    }
    currentLine += 1;
    return {
      actionType: type,
      eventId: eventId,
      substring: substr,
      code: initialCode,
      replacementCode: finalCode,
    };
  }
  function parseRemove() {
    let initialCode = "";
    let eventId = "";
    let type = "";
    while (currentLine < lines.length) {
      if (lines[currentLine] === "## end") {
        break;
      } else if (lines[currentLine][0] + lines[currentLine][1] !== "##") {
        initialCode += lines[currentLine];
      } else {
        let allWords = lines[currentLine].split(" ");
        type = allWords[1];
        eventId = allWords[2];
      }
      currentLine += 1;
    }
    currentLine += 1;
    return {
      blockType: type,
      eventId: eventId,
      substring: null, //?
      code: initialCode,
      replacementCode: "",
    };
  }
  function parseAdd() {
    let finalCode = "";
    let eventId = "";
    let type = "";
    while (currentLine < lines.length) {
      if (lines[currentLine] === "## end") {
        break;
      } else if (lines[currentLine][0] + lines[currentLine][1] !== "##") {
        finalCode += lines[currentLine];
      } else {
        let allWords = lines[currentLine].split(" ");
        type = allWords[1];
        eventId = allWords[2];
      }
      currentLine += 1;
    }
    currentLine += 1;
    return {
      actionType: type,
      eventId: eventId,
      substring: null, //?
      code: "",
      replacementCode: finalCode,
    };
  }

  function getInstructionArgs(instruction) {
    const line = lines[currentLine];
    if (!line.startsWith(instruction))
      throw Error(
        "Expected instruction " + instruction + " but got " + lines[currentLine]
      );
    return lines[currentLine].slice(instruction.length + 1);
  }

  function parseReplaceInline() {
    let replaceArgs = getInstructionArgs("## replace-inline").split(" ", 2);
    currentLine++;
    let replacementCode = getInstructionArgs("## with");
    currentLine++;
    return {
      actionType: "replace-inline",
      eventId: replaceArgs[0],
      substring: null,
      code: replaceArgs[1],
      replacementCode: replacementCode,
    };
  }
  function parseBlock() {
    let curLine = lines[currentLine];
    if (
      curLine.startsWith("## replace ") ||
      curLine.startsWith("## replace-on ")
    ) {
      return parseReplace();
    } else if (
      curLine.startsWith("## remove ") ||
      curLine.startsWith("## remove-on ")
    ) {
      return parseRemove();
    } else if (curLine.startsWith("## replace-inline ")) {
      return parseReplaceInline();
    } else if (
      curLine.startsWith("## add ") ||
      curLine.startsWith("## add-on ")
    ) {
      return parseAdd();
    } else {
      let code = "";
      while (
        currentLine < lines.length &&
        !lines[currentLine].startsWith("## ")
      ) {
        code += lines[currentLine] + "\n";
        currentLine += 1;
      }
      return {
        actionType: "text",
        code: code,
      };
    }
  }

  function parseHeaderLine() {
    let spaceIndex = lines[currentLine].indexOf(" ");
    let line = lines[currentLine];
    currentLine += 1;
    return line.slice(spaceIndex + 1);
  }

  let title = parseHeaderLine();
  let filename = parseHeaderLine();
  let blocks = [];
  while (currentLine < lines.length) {
    blocks.push(parseBlock());
  }
  return {
    title: title,
    filename: filename,
    blocks: blocks,
  };
}

async function readFileLines(fileName) {
  let response = await fetch(fileName);
  let data = await response.text();
  return data.split(RegExp("\\r?\\n"));
}

async function loadTask(fileName) {
  let task = [];
  let lines = await readFileLines(fileName);
  task.push(parsePythonLines(lines));
  return task;
}

async function loadTasksTo(fileNames, tasks) {
  for (const curFile of fileNames) {
    let task = await loadTask(curFile);
    console.log(task);
    tasks.push(...task);
  }
}

await loadTasksTo(["01.py"], tasks);

root.render(
  <React.StrictMode>
    <App tasks={tasks} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
