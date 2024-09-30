export function parsePyLevel(lines) {
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
      if (replaceArgs.length !== 1)
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
    let instructionName = lines[currentLine].split(" ")[1]
    let replaceArgs = parseInstruction("## " + instructionName, 2)
    let initialCode = parseUntilLine("## end")
    return {
      actionType: instructionName,
      eventId: replaceArgs[0],
      substring: replaceArgs[1],
      code: initialCode,
      replacementCode: ""
    }
  }
  function parseAdd() {
    let instructionName = lines[currentLine].split(" ")[1];
    let replaceArgs = parseInstruction("## " + instructionName, 1);
    let addedCode = parseUntilLine("## end")
    return {
      actionType: instructionName,
      eventId: replaceArgs[0],
      substring: undefined,
      code: "",
      replacementCode: addedCode
    }
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
      if (spaceIndex === -1){
        break;
      }
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
    let withArgs = parseInstruction("## with", 1);
    return {
      actionType: "replace-inline",
      eventId: replaceArgs[0],
      substring: undefined,
      code: replaceArgs[1],
      replacementCode: withArgs[0],
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
    } else if (curLine.startsWith("## ")) {
      throw Error("Unknown block type: " + curLine);
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

async function loadLevel(fileName) {
  let lines = await readFileLines(fileName);
  return parsePyLevel(lines);
}

export async function loadLevelsTo(fileNames, tasks) {
  for (const curFile of fileNames) {
    let task = await loadLevel(curFile);
    tasks.push(task);
  }
}

