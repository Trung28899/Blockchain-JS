import { Block, GENESIS_DATA } from "../../models/block.js";

test("Testing Block Mining", () => {
  const last_bock = Block.genesis();
  const data = "test-data";
  const block = Block.mine_block(last_bock, data);

  expect(block).toBeInstanceOf(Block);
});

test("Testing Genesis Block", () => {
  const genesis = Block.genesis();

  expect(genesis.timestamp).toBe(GENESIS_DATA.timestamp);
  expect(genesis.last_hash).toBe(GENESIS_DATA.last_hash);
  expect(genesis.hash).toBe(GENESIS_DATA.hash);
  expect(genesis.data).toBe(GENESIS_DATA.data);
});
