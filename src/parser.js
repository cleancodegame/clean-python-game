function parserFromPython(fileName) {
    fetch(fileName)
     .then(response => response.text())
     .then((data) => {
      const dataInArray = data.split("\n")
      let finalCode = []
      let bugs = {}
      let prevWord = ""
      let num = 0
      let levelTitle = ""
      let levelFilename = ""
      let curInitialCode = ""
      let curFixedCode = ""
      let curMistaken = ""
      let initialCode = false
      let blockOfIncorrectLines = false
      for (const lineIndex in dataInArray) {
        const item = dataInArray[lineIndex]
        let words = item.split(" ")
        if (words[0] !== "##" && blockOfIncorrectLines === false) {
          finalCode.push(item)
          continue
        }
        if (words[0] !== "##") {
          if (initialCode === true) {
            curInitialCode += words.toString + "\n"
          }
          else {
            curFixedCode += words.toString + "\n"
          }
          continue
        }
        if (lineIndex === 0) {
          levelTitle = words[1]
        }
        else if (lineIndex === 1) {
          levelFilename = words[1]
        }
        else if (words[1] === "error") {
          curMistaken = words[2]
          initialCode = true
          blockOfIncorrectLines = true
        }
        else if (words[1] === "fix") {
          initialCode = false
        }
        else if (words[1] === "end") {
          bugs[curMistaken] = curMistaken
          num = num + 1
          finalCode.push({
            "error": curMistaken,
            "initial": curInitialCode,
            "fixed": curFixedCode
          })
          curMistaken = ""
          initialCode = false
          blockOfIncorrectLines = false
          curInitialCode = ""
          curFixedCode = ""
        }
        else if (words[1] === "mistake") {
          prevWord = words[words.length - 1]
        }
        else if (words[1] === "correct") {
          bugs[prevWord] = words[words.length - 1]
          num = num + 1
        }
      }
      console.log({
        title: levelTitle,
        fileName: levelFilename,
        "bugs": bugs,
        "number": num,
        "code": finalCode
      })
      return {
        title: levelTitle,
        fileName: levelFilename,
        "bugs": bugs,
        "number": num,
        "code": finalCode
      }
    })
}