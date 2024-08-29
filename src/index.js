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


  function parseUntilLine(endLine) {
    let code = "";
    while (currentLine < lines.length && lines[currentLine] !== endLine) {
      code += lines[currentLine] + "\n";
      currentLine++;
    }
    if (currentLine < lines.length)
      currentLine++; // skip the endLine
    return code;
  }

  function parseReplace() {
    // ## replace-on event-id
    // ...
    // ## with
    // ...
    // ## end
    // ## replace event-id [substring]
    // ...
    // ## with
    // ...
    // ## end
    let instructionName = lines[currentLine].split(" ")[1];
    let replaceArgs = parseInstruction("## " + instructionName, 2);
    if (instructionName === "replace-on"){
      if (replaceArgs.length != 1)
        throw Error("Expected 1 argument for replace-on, got " + replaceArgs.length);
    }
    let initialCode = parseUntilLine("## with");
    let finalCode = parseUntilLine("## end");
    return {
      actionType: instructionName,
      eventId: replaceArgs[0],
      substring: replaceArgs[1],
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

  function parseInstruction(instruction, argsCount) {
    const line = lines[currentLine];
    if (!line.startsWith(instruction))
      throw Error(
        "Expected instruction " + instruction + " but got " + lines[currentLine]
      );
    currentLine++;
    let argsLine = line.slice(instruction.length + 1);
    let args = [];
    for (let i = 0; i < argsCount-1; i++) {
      let spaceIndex = argsLine.indexOf(" ");
      if (spaceIndex === -1)
        break;
      args.push(argsLine.slice(0, spaceIndex));
      argsLine = argsLine.slice(spaceIndex + 1);
    }
    args.push(argsLine);
    return args;
  }

  function parseExplain() {
    // ## explain event-id explanation
    let args = parseInstruction("## explain", 2);
    return {
      actionType: "explain",
      eventId: args[0],
      explanation: args[1]
    };
  }

  function parseReplaceInline() {
    // ## replace-inline event-id code
    // ## with replacement
    let replaceArgs = parseInstruction("## replace-inline", 2);
    let replacementCode = parseInstruction("## with", 1);
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
    } else if (curLine.startsWith("## explain ")) {
      return parseExplain();
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

await loadTasksTo(["02.py"], tasks);

root.render(
  <React.StrictMode>
    <App tasks={tasks} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
