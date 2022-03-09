import { hashMiner } from "../util/crypto_hash.js";
import { crypto_hash } from "../util/crypto_hash.js";
import { MINE_RATE } from "../config.js";
import { hex_to_binary } from "../util/hex_to_binary.js";

const GENESIS_DATA = {
  timestamp: 1,
  last_hash: "genesis_last_hash",
  hash: "genesis_hash",
  data: [],
  difficulty: 3,
  nonce: "genesis_nonce",
};

class Block {
  /*
        Block: a unit of storage
        Store transactions in a blockchain that supports a cryptocurrency
    */
  constructor(timestamp, last_hash, hash, data, difficulty, nonce) {
    this.timestamp = timestamp;
    this.last_hash = last_hash;
    this.hash = hash;
    this.data = data;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }

  static mine_block(last_block, data) {
    const newBlockData = hashMiner(last_block, data);
    const { timestamp, last_hash, hash } = newBlockData;
    const { difficulty, nonce } = newBlockData;

    return new Block(timestamp, last_hash, hash, data, difficulty, nonce);
  }

  static genesis() {
    /*
        Generate the genesis block
        Genesis block: the first block in a chain
      */
    return new Block(
      GENESIS_DATA.timestamp,
      GENESIS_DATA.last_hash,
      GENESIS_DATA.hash,
      GENESIS_DATA.data,
      GENESIS_DATA.difficulty,
      GENESIS_DATA.nonce
    );
  }

  static adjust_difficulty(last_block, new_timestamp) {
    if (new_timestamp - last_block.timestamp < MINE_RATE) {
      return last_block.difficulty + 1;
    }

    if (last_block.difficulty - 1 > 0) {
      return last_block.difficulty - 1;
    }

    return 1;
  }

  /*
    Validate a block by enforcing the following rules: 
      - The block must have the proper last_hash reference
      - The block must meet the proof of work requirement
      - The difficulty must only adjust by 1
      - The block hash must be a valid combination of the block fields
  */
  static is_valid_block(last_block, block) {
    const difficulty = block.difficulty;
    const reconstructed_hash = crypto_hash(
      block.timestamp,
      block.last_hash,
      block.data,
      block.difficulty,
      block.nonce
    );

    if (last_block.hash !== block.last_hash)
      throw "The block last_hash must be correct";

    if (
      hex_to_binary(block.hash).substring(0, difficulty) !==
      "0".repeat(difficulty)
    ) {
      throw "The proof of work requirement was not met";
    }

    if (Math.abs(last_block.difficulty - block.difficulty) > 1)
      throw "The block difficulty must only adjust by 1";

    if (reconstructed_hash !== block.hash)
      throw "The block hash must be correct !";
  }
}

// let genesis_block = Block.genesis();
// let bad_block = Block.mine_block(genesis_block, "foo");

// bad_block.last_hash = "evil_data";
// genesis_block.difficulty = 7;
// bad_block.nonce = 1;

// try {
//   Block.is_valid_block(genesis_block, bad_block);
//   console.log("No Error, Blocks validated");
// } catch (error) {
//   console.log(error);
// }

export { Block, GENESIS_DATA };
