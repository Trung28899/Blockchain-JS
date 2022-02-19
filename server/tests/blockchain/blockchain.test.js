import { Blockchain } from "../../models/blockchain";
import { GENESIS_DATA } from "../../models/block";

test("Test Blockchain Instance", () => {
  const blockChain = new Blockchain();

  expect(blockChain.chain[0].hash).toBe(GENESIS_DATA["hash"]);
});

test("Test Add Block", () => {
  const blockChain = new Blockchain();
  const data = "test-data";
  blockChain.add_block(data);

  expect(blockChain.chain[blockChain.chain.length - 1].data).toBe(data);
});
