import {parsePythonLines} from './parser';

it('replace-on', () => {
  console.log(123);
  let res = parsePythonLines(["## replace-on event-id", "a", "## with", "b", "## end"]);
  console.log(123);
  expect(res.blocks.length).toEqual(1);
  let block = res.blocks[0];
  expect(block.eventId).toEqual("event-id");
  expect(block.blockType).toEqual("replace-on");
  expect(block.code).toEqual("a");
  expect(block.replacementCode).toEqual("b");
  expect(block.substring).toEqual(undefined);
});