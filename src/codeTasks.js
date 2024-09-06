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
      if (i + pattern.length < text.length) {
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
  let curLine = 1;
  let eventRegions = [];
  for (const block of task.blocks) {
    if (block.actionType === "text") curLine += block.code.split("\n").length;
    else if (block.actionType === "replace") {
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
        //TODO: implement substring != null
        curLine += block.code.split("\n").length;
      }
    }
    //TODO: implement replace-on, remove-on, add-on (only update curLine if event happened)
    //TODO: implement replace-inline (create a region for all substrings)
    //TODO: implement remove (create a region same as with replace)
  }
  return eventRegions;
}
