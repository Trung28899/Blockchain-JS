import { crypto_hash } from "../util/crypto_hash.js";

const GENESIS_DATA = {
  timestamp: 1,
  last_hash: "genesis_last_hash",
  hash: "genesis_hash",
  data: [],
};

class Block {
  /*
        Block: a unit of storage
        Store transactions in a blockchain that supports a cryptocurrency
    */
  constructor(timestamp, last_hash, hash, data) {
    this.timestamp = timestamp;
    this.last_hash = last_hash;
    this.hash = hash;
    this.data = data;
  }

  static mine_block(last_block, data) {
    const timestamp = Date.now();
    const last_hash = last_block.hash;
    const hash = crypto_hash(timestamp, last_hash, data);

    return new Block(timestamp, last_hash, hash, data);
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
      GENESIS_DATA.data
    );
  }
}

// const genesis_block = Block.genesis();
// const newBlock = Block.mine_block(genesis_block, ["Array"]);
// console.log(newBlock);

export { Block, GENESIS_DATA };
