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

  /*
    Validate the incoming chain
    Enforce the following rules of the blockchain
        - The chain must start with the genesis block
        - blocks must be formatted correctly
    
    => the idea is to validate every single the blocks
  */
  static is_valid_chain(chain) {
    /*
      chain[0] === Block.genesis() wont work because these are 2 different instances
      even though their attributes and values are the same
    */
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      throw "The genesis block must be valid";
    }

    for (let i = 1; i < chain.length; i++) {
      Block.is_valid_block(chain[i - 1], chain[i]);
    }
  }

  replace_chain(chain) {
    if (chain.length <= this.chain.length) {
      throw "Cannot replace. The incoming chain must be longer";
    }

    try {
      Blockchain.is_valid_chain(chain);
      // if not valid > will go to catch block. else replace the chain
      this.chain = chain;
    } catch (error) {
      throw `Cannot replace. The incoming is invalid`;
    }
  }
}

const blockchain = new Blockchain();
blockchain.add_block("one");
blockchain.add_block("two");

const blockChain2 = new Blockchain();
blockChain2.add_block("three");
blockChain2.add_block("four");
blockChain2.add_block("five");

blockchain.replace_chain(blockChain2.chain);

// console.log(blockchain);

export { Blockchain };
