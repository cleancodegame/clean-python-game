function processWithReplaceInline(text, eventsHappened, task) {
  let i = 0;
  let processedText = "";

  let inlineReplaceBlocks = task.blocks.filter(
    b => b.actionType === "replace-inline"
      && eventsHappened.includes(b.eventId)
  );

  while (i < text.length) {
    let hasReplacement = false;
    for (const inlineReplaceBlock of inlineReplaceBlocks) {
      const pattern = inlineReplaceBlock.code;
      const replacement = inlineReplaceBlock.replacementCode;
      if (i + pattern.length <= text.length) {
        if (text.substring(i, i + pattern.length) === pattern) {
          processedText += replacement;
          i += pattern.length;
          hasReplacement = true;
          break;
        }
      }
    }
    if (!hasReplacement) {
      processedText += text[i];
      i += 1;
    }
  }
  return processedText;
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
      if (eventsHappened.indexOf(block.eventId) >= 0) {
        result += processWithReplaceInline(block.replacementCode, eventsHappened, task);
      } else {
        result += processWithReplaceInline(block.code, eventsHappened, task);
      }
    }
    else if (block.actionType === "replace-inline" || block.actionType === "explain") {
      // do nothing
    }
    else
      throw new Error("Unknown block type: " + block.actionType);
  }
  return result;
}

export function getEventRegions(task, eventsHappened) {
  let curLine = 0;
  let eventRegions = [];
  for (const block of task.blocks) {
    if (block.actionType === "text") curLine += block.code.split("\n").length;
    else if (block.actionType === "replace" || block.actionType === "remove" 
      || block.actionType === "remove-on" || block.actionType === "replace-on" 
      || block.actionType === "add" || block.actionType === "add-on") {
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
        }
        else {
          for (const line of blockLines) {
            let i = 0
            while (i + block.substring.length <= line.length) {
              if (line.substring(i, i + block.substring.length) === block.substring) {
                let eventRegion = {
                  startLine: curLine,
                  startColumn: i,
                  endLine: curLine,
                  endColumn: i + block.substring.length - 1,
                  eventId: block.eventId
                }
                i += block.substring.length
                eventRegions.push(eventRegion)
              }
              else {
                i += 1
              }
            }
          }
        }
        curLine += code.split("\n").length;
      }
    }
    else if (block.actionType === "replace-inline" && !eventsHappened.includes(block.eventId)) {
      // TODO: Fix problems:
      // 1. curLine is not right for replace-inline regions.
      // 2. Replace-inline should search for regions in either code or replacementCode depending on list of happendEvents.
      //    Not just in code.
      // 3. Some bugs with lineIndex and columnIndex.
      // 4. lineNumber and columnNumber should start from 1
      let anotherLine = 1
      for (const anotherBlock of task.blocks) {
        if (anotherBlock.code === undefined) continue;
        if (anotherBlock.actionType === "replace-inline") {
          continue
        }
        let blockLines = anotherBlock.code.split("\n") // Why only code?
        if (eventsHappened.includes(anotherBlock.eventId)) {
          blockLines = anotherBlock.replacementCode.split("\n")
        }
        for (const line of blockLines) {
          let i = 0
          while (i + block.code.length <= line.length) {
            if (line.substring(i, i + block.code.length) === block.code) {
              let startingLine = anotherLine
              if (Math.round(startingLine) !== startingLine) {
                startingLine += 0.5
              }
              let eventRegion = {
                startLine: startingLine, // This is not right.
                startColumn: i,
                endLine: startingLine,
                endColumn: i + block.code.length - 1,
                eventId: block.eventId
              }
              i += block.code.length
              eventRegions.push(eventRegion)
            }
            else {
              i += 1
            }
          }
          if (line.length === 0) {
            anotherLine += 0.5
          }
          else {
          anotherLine += 1
          }
        }
      }
    }
  }
  return eventRegions;
}
