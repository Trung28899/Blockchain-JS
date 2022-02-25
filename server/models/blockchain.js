import { Block, GENESIS_DATA } from "./block.js";

class Blockchain {
  /*
        Blockchain: a public ledger of transactions. 
        Implemented as a list of block - data set of transactions
    */
  constructor() {
    this.chain = [Block.genesis()];
  }

  add_block(data) {
    const lastBlock = this.chain[this.chain.length - 1];
    this.chain.push(Block.mine_block(lastBlock, data));
  }
}

// UN-COMMENT THE CODE DOWN BELOW TO SEE HOW IT WORKS

// This code get execute because it is imported in server.js
// timestamp of the lastest 2 block will be the same because it was
// executed at the same time. Try setTimeout to see the differences

// const newBlockChain = new Blockchain();
// newBlockChain.add_block("new block here baby");
// newBlockChain.add_block("another new block here yo");
// console.log(newBlockChain);

export { Blockchain };
