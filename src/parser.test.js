import { parsePyLevel } from './parser.mjs'; // Assuming the parser is in 'parser.js'

describe('parsePyLevel function', () => {
  test('parses a basic replace-on block', () => {
    const lines = [
      "## replace-on event-1",
      "def oldFunc():",
      "    return oldValue",
      "## with",
      "def newFunc():",
      "    return newValue",
      "## end"
    ];

    const result = parsePyLevel(lines);
    expect(result.blocks[0].actionType).toBe("replace-on");
    expect(result.blocks[0].eventId).toBe("event-1");
    expect(result.blocks[0].code).toContain("def oldFunc()");
    expect(result.blocks[0].replacementCode).toContain("def newFunc()");
  });

  test('parses an explain block', () => {
    const lines = [
      "## explain event-1 The function is outdated",
    ];

    const result = parsePyLevel(lines);
    expect(result.blocks[0].actionType).toBe("explain");
    expect(result.blocks[0].eventId).toBe("event-1");
    expect(result.blocks[0].explanation).toBe("The function is outdated");
  });

  test('handles mixed blocks of code and instructions', () => {
    const lines = [
      "## replace-on event-1",
      "def oldFunc():",
      "## with",
      "def newFunc():",
      "## end",
      "print('Hello, world!')",
      "## explain event-2 This is a simple print statement"
    ];

    const result = parsePyLevel(lines);
    expect(result.blocks.length).toBe(3); // replace-on, code, and explain blocks
    expect(result.blocks[1].actionType).toBe("text");
    expect(result.blocks[1].code).toContain("print('Hello, world!')");
  });
});
