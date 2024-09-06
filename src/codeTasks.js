function processWithReplaceInline(text, eventsHappened) {
  let id = 0
  let processedText = ""
  while (id < text.length) {
    let hasEvents = false
    for (const block of task.blocks) {
     if (block.actionType === "replace-inline" && id + block.code.length < text.length && block.eventId in eventsHappened) {
      if (text.substring(id, id + block.code.length) === block.code) {
        processedText += block.replacementCode
        id += block.code.length
        hasEvents = true
        break
      }
     }
    }
    if (!hasEvents) {
      processedText += text[id]
      id += 1
    }
  }
  return processedText
}

export function formatTask(task, eventsHappened) {
  let result = ""
  for (const block of task.blocks) {
    if (block.actionType === "text")
      result += processWithReplaceInline(block.code, eventsHappened)
    else if (block.actionType === "replace" 
      || block.actionType === "replace-on" 
      || block.actionType === "remove"
      || block.actionType === "remove-on"
    )
    {
      if (task.eventId in eventsHappened) {
          result += block.replacementCode;
    }
    else {
      result += block.code;
    }
  }
  }
  //DONE
  //TODO: implement replace-inline (create a region for all substrings)
  return result;
}

export function getEventRegions(task, eventsHappened){
  let curLine = 1;
  let eventRegions = [];
  for (const block of task.blocks) {
    if (block.actionType === "text")
      curLine += block.code.split("\n").length;
    else if (block.actionType === "replace") {
      if (block.eventId in eventsHappened) {
        curLine += block.replacementCode.split("\n").length;
      }
      else{
        if (block.substring === null){
          let blockLines = block.code.split("\n");
          let eventRegion = {
            startLine: curLine,
            startColumn: 1,
            endLine: curLine + blockLines.length - 1,
            endColumn: blockLines[blockLines.length-1].length + 1,
            eventId: block.eventId
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
