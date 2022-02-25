import { Block, GENESIS_DATA } from "../../models/block.js";
import { MINE_RATE } from "../../config.js";

const sleepFunction = (timeSet) => {
  return new Promise((resolve) => setTimeout(resolve, timeSet));
};

test("Testing Block Mining", () => {
  const last_bock = Block.genesis();
  const data = "test-data";
  const block = Block.mine_block(last_bock, data);

  // Checking if block is a instance of Block class
  expect(block).toBeInstanceOf(Block);

  // Checking to see if the block data is the same as data
  expect(data).toBe(block.data);

  // Checking to see if the last_hash of the new block matched the
  // hash of the previous block
  expect(block.last_hash).toBe(last_bock.hash);

  // Test to see if the hash is valid Proof Of Work
  expect(block.hash.substring(0, block.difficulty)).toBe(
    "0".repeat(block.difficulty)
  );
});

test("Testing Genesis Block", () => {
  const genesis = Block.genesis();

  expect(genesis.timestamp).toBe(GENESIS_DATA.timestamp);
  expect(genesis.last_hash).toBe(GENESIS_DATA.last_hash);
  expect(genesis.hash).toBe(GENESIS_DATA.hash);
  expect(genesis.data).toBe(GENESIS_DATA.data);
  expect(genesis.difficulty).toBe(GENESIS_DATA.difficulty);
  expect(genesis.nonce).toBe(GENESIS_DATA.nonce);
});

/*
  2 block mined instantly so difficulty should increased by 1
*/
test("Test Quickly Mined Block", () => {
  const last_block = Block.mine_block(Block.genesis(), "foo");
  const mined_block = Block.mine_block(last_block, "foo2");

  expect(mined_block.difficulty).toBe(last_block.difficulty + 1);
});

/*
  Test to make sure that the difficulty for 
  Proof Of Work decreased based on MINE_RATE
  
  Expect difficulty to decrease
*/
test("Test Slowly Mined Block", async () => {
  const last_block = Block.mine_block(Block.genesis(), "foo");

  await sleepFunction(MINE_RATE);

  const mined_block = Block.mine_block(last_block, "foo2");
  expect(mined_block.difficulty).toBe(last_block.difficulty - 1);
});

/*
  Test to make sure that the difficulty for 
  Proof Of Work doesn't go to 0 no matter what
*/

test("Test Mined Block Difficulty Limit at 0", async () => {
  const last_block = new Block(
    Date.now(),
    "test_last_hash",
    "test_hash",
    "test_data",
    1,
    0
  );

  await sleepFunction(MINE_RATE);

  const mined_block = Block.mine_block(last_block, "bar");
  expect(mined_block.difficulty).toBe(1);
});
