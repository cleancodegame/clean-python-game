function isMatch(text, startIndex, pattern) {
  for (let i = 0; i < pattern.length; i++) {
    if (text[startIndex + i] !== pattern[i]) {
      return false;
    }
  }
  if (startIndex > 0 && text[startIndex - 1].match(/[a-zA-Z0-9_']/)) {
    return false;
  }
  if (
    startIndex + pattern.length < text.length &&
    text[startIndex + pattern.length].match(/[a-zA-Z0-9_']/)
  ) {
    return false;
  }
  return true;
}

function processWithReplaceInline(text, eventsHappened, task) {
  let prevCode = text;
  while (1 > 0) {
    let i = 0;
    let processedText = "";

    let inlineReplaceBlocks = task.blocks.filter(
      (b) =>
        b.actionType === "replace-inline" && eventsHappened.includes(b.eventId)
    );

    while (i < prevCode.length) {
      let hasReplacement = false;
      for (const inlineReplaceBlock of inlineReplaceBlocks) {
        const pattern = inlineReplaceBlock.code;
        const replacement = inlineReplaceBlock.replacementCode;
        if (i + pattern.length <= prevCode.length) {
          if (isMatch(prevCode, i, pattern)) {
            processedText += replacement;
            i += pattern.length;
            hasReplacement = true;
            break;
          }
        }
      }
      if (!hasReplacement) {
        processedText += prevCode[i];
        i += 1;
      }
    }
    if (processedText === prevCode) {
      break;
    }
    prevCode = processedText;
  }
  return prevCode;
}

export function formatTask(task, eventsHappened) {
  let result = "";
  for (const block of task.blocks) {
    if (block.actionType === "text")
      result += processWithReplaceInline(block.code, eventsHappened, task);
    else if (
      block.actionType === "replace" ||
      block.actionType === "replace-on" ||
      block.actionType === "remove" ||
      block.actionType === "remove-on" ||
      block.actionType === "add-on"
    ) {
      if (eventsHappened.includes(block.eventId)) {
        result += processWithReplaceInline(
          block.replacementCode,
          eventsHappened,
          task
        );
      } else {
        result += processWithReplaceInline(block.code, eventsHappened, task);
      }
    } else if (
      block.actionType === "replace-inline" ||
      block.actionType === "explain"
    ) {
      // do nothing
    } else throw new Error("Unknown block type: " + block.actionType);
  }
  return result;
}

export function getEventRegions(task, eventsHappened) {
  let curLine = 1;
  let eventRegions = [];
  for (const block of task.blocks) {
    if (block.actionType === "text")
      curLine += block.code.split("\n").length - 1;
    else if (
      block.actionType === "replace" ||
      block.actionType === "remove" ||
      block.actionType === "add"
    ) {
      //let code = processWithReplaceInline(block.code, eventsHappened, task);
      //let replacementCode = processWithReplaceInline(block.replacementCode, eventsHappened, task);
      let code = block.code;
      let replacementCode = block.replacementCode;
      if (eventsHappened.includes(block.eventId)) {
        curLine += replacementCode.split("\n").length;
      } else {
        let blockLines = code.split("\n");
        if (block.substring === undefined) {
          let eventRegion = {
            startLine: curLine,
            startColumn: 1,
            endLine: curLine + blockLines.length - 1,
            endColumn: blockLines[blockLines.length - 1].length + 1,
            eventId: block.eventId,
          };
          eventRegions.push(eventRegion);
        } else {
          for (const line of blockLines) {
            let i = 0;
            while (i + block.substring.length <= line.length) {
              if (isMatch(line, i, block.substring)) {
                let eventRegion = {
                  startLine: curLine,
                  startColumn: i + 1,
                  endLine: curLine,
                  endColumn: i + 1 + block.substring.length,
                  eventId: block.eventId,
                };
                i += block.substring.length;
                eventRegions.push(eventRegion);
              } else {
                i += 1;
              }
            }
          }
        }
        curLine += code.split("\n").length;
      }
    } else if (
      block.actionType === "replace-inline" &&
      !eventsHappened.includes(block.eventId)
    ) {
      // TODO: Fix problems:
      // 1. curLine is not right for replace-inline regions.
      // 2. Replace-inline should search for regions in either code or replacementCode depending on list of happendEvents.
      //    Not just in code.
      // 3. Some bugs with lineIndex and columnIndex.
      // 4. lineNumber and columnNumber should start from 1
      let anotherLine = 1;
      for (const anotherBlock of task.blocks) {
        if (anotherBlock.code === undefined) continue;
        if (anotherBlock.actionType === "replace-inline") {
          continue;
        }
        let blockLines = anotherBlock.code.split("\n"); // Why only code?
        if (eventsHappened.includes(anotherBlock.eventId)) {
          if (
            anotherBlock.actionType === "remove" ||
            anotherBlock.actionType === "remove-on"
          ) {
            continue;
          }
          blockLines = anotherBlock.replacementCode.split("\n");
        } else {
          if (
            anotherBlock.actionType === "add" ||
            anotherBlock.actionType === "add-on"
          ) {
            continue;
          }
        }
        let numOfCheckedLines = 0;
        for (const initialLine of blockLines) {
          let line = processWithReplaceInline(
            initialLine,
            eventsHappened,
            task
          );
          console.log(line);
          let i = 0;
          while (i + block.code.length <= line.length) {
            if (isMatch(line, i, block.code)) {
              let startingLine = anotherLine;
              let eventRegion = {
                startLine: startingLine,
                startColumn: i + 1,
                endLine: startingLine,
                endColumn: i + 1 + block.code.length,
                eventId: block.eventId,
              };
              i += block.code.length;
              eventRegions.push(eventRegion);
            } else {
              i += 1;
            }
          }
          numOfCheckedLines += 1;
          if (line.length === 0 && numOfCheckedLines === blockLines.length) {
            anotherLine += 0;
          } else {
            anotherLine += 1;
          }
        }
      }
    }
  }
  return eventRegions;
}
