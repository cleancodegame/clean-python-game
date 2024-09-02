
export function formatTask(task, eventsHappened) {
  let result = ""
  for (const block of task.blocks) {
    if (block.actionType === "text")
      result += block.code
    else if (block.actionType === "replace" 
      || block.actionType === "replace-on" 
      || block.actionType === "remove"
      || block.actionType === "remove-on"
      || block.actionType === "text"
    ) {
      //TODO: use block.code OR block.replacementCode depending on whether event happened
      result += block.code;
    }
    return result;
  }
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
