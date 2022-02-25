import { hashMiner } from "../util/crypto_hash.js";
import { MINE_RATE } from "../config.js";

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
    const { timestamp, last_hash, hash } = hashMiner(last_block, data);
    const { difficulty, nonce } = hashMiner(last_block, data);

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
}

// const genesis_block = Block.genesis();
// const newBlock = Block.mine_block(genesis_block, ["Array"]);
// const newBlock2 = Block.mine_block(newBlock, ["Array2"]);
// console.log(newBlock2);

export { Block, GENESIS_DATA };
