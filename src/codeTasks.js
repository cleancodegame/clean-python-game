function processWithReplaceInline(text, eventsHappened, task) {
  let i = 0;
  let processedText = "";

  let inlineReplaceBlocks = task.blocks.filter(
    b => b.actionType === "replace-inline"
      && b.eventId in eventsHappened
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
  let curLine = 2;
  let eventRegions = [];
  for (const block of task.blocks) {
    if (block.actionType === "text") curLine += block.code.split("\n").length;
    else if (block.actionType === "replace" || block.actionType === "remove" || block.actionType === "remove-on" || block.actionType === "replace-on" || block.actionType === "add" || block.actionType === "add-on") {
      if (block.eventId in eventsHappened) {
        curLine += block.replacementCode.split("\n").length;
      } else {
        if (block.substring === null) {
          let blockLines = block.code.split("\n");
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
          let blockLines = block.code.split("\n")
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
        if (block.actionType === "replace" || block.actionType === "remove" || block.actionType === "add") {
          curLine += block.code.split("\n").length;
        }
      }
    }
    else if (block.actionType === "replace-inline") {
      for (const anotherBlock of task.blocks) {
        let blockLines = anotherBlock.code.split("\n")
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
    }
    //TODO: implement replace-on, remove-on, add-on (only update curLine if event happened)
    //TODO: implement replace-inline (create a region for all substrings)
    //TODO: implement remove (create a region same as with replace)
  }
  return eventRegions;
}
