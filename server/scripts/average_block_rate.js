import { Blockchain } from "../models/blockchain.js";
import { SECONDS } from "../config.js";
import { hex_to_binary } from "../util/hex_to_binary.js";

const BlockChain = new Blockchain();

const times = [];
let i = 0;

while (i < 100) {
  const start_time = Date.now();
  BlockChain.add_block(i);
  const end_time = Date.now();

  const time_to_mine = (end_time - start_time) / SECONDS;
  times.push(time_to_mine);

  const totalTime = times.reduce((a, b) => a + b, 0);
  const average_time = totalTime / times.length || 0;

  console.log(
    `\nNew Block Difficulty: ${
      BlockChain.chain[BlockChain.chain.length - 1].difficulty
    }`
  );
  console.log(
    `New Block Nonce: ${BlockChain.chain[BlockChain.chain.length - 1].nonce}`
  );
  console.log(`Time To mine: ${parseFloat(time_to_mine).toFixed(2)}s`);
  console.log(
    `Average time to add blocks:  ${parseFloat(average_time).toFixed(2)}s`
  );
  console.log(
    `Hash of new block:  ${BlockChain.chain[BlockChain.chain.length - 1].hash}`
  );
  console.log(
    `\nBinary Hash:  ${hex_to_binary(
      BlockChain.chain[BlockChain.chain.length - 1].hash
    )}\n`
  );
  console.log(`-----------------------------------`);
}
