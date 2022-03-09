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

const create_three_block = () => {
  const blockchain = new Blockchain();
  for (let i = 0; i < 3; i++) {
    blockchain.add_block(i);
  }

  return blockchain;
};

test("Test is valid chain", () => {
  const blockchain_three_block = create_three_block();
  Blockchain.is_valid_chain(blockchain_three_block.chain);
});

test("Test is valid chain bad genesis", () => {
  let blockchain_three_block = create_three_block();
  blockchain_three_block.chain[0].hash = "evil_hash";

  try {
    Blockchain.is_valid_chain(blockchain_three_block.chain);
    expect(1).toBe(2);
  } catch (error) {
    expect(error).toBe("The genesis block must be valid");
  }
});

test("Test replace chain", () => {
  const blockchain_three_block = create_three_block();
  const blockchain = new Blockchain();

  blockchain.replace_chain(blockchain_three_block.chain);

  expect(blockchain.chain).toBe(blockchain_three_block.chain);
});

test("Test replace chain: Not Longer", () => {
  const blockchain_three_block = create_three_block();
  const blockchain = new Blockchain();

  try {
    blockchain_three_block.replace_chain(blockchain.chain);
    expect(1).toBe(2);
  } catch (error) {
    expect(error).toBe("Cannot replace. The incoming chain must be longer");
  }
});

test("Test replace chain: Invalid Chain", () => {
  let blockchain_three_block = create_three_block();
  const blockchain = new Blockchain();

  blockchain_three_block.chain[1].hash = "evil_hash";

  try {
    blockchain.replace_chain(blockchain_three_block.chain);
    expect(1).toBe(2);
  } catch (error) {
    expect(error).toBe("Cannot replace. The incoming is invalid");
  }
});
