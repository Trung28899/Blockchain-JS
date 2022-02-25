import crypto from "crypto";
import { Block } from "../models/block.js";

/*
  Return a sha-256 hash of the given arguments
        you can put 1, 2, 3 or as many arguments as you want to create 
        a hash for this function
        
  Has to:
    +, Make data a string before encoding it 
      => this is because if data is not a string (a number, object, array, etc.), 
          it won't be encoded
*/

function crypto_hash() {
  const argumentArr = [];

  // arguments is an object that contains all arguments of the function
  for (let i = 0; i < arguments.length; i++) {
    argumentArr.push(arguments[i].toString());
  }

  const dataString = argumentArr.sort().join("");

  const hash = crypto.createHash("sha256").update(dataString).digest("hex");

  return hash;
}

/*

Function that mine a valid hash that fit with the
difficulty of the proof of work

if difficulty is 3, the substring will be taken from 
index 0 to index 3 

if difficulty = 3
zeroString will be '000'
            
so this loop won't stop until there are 3 zeros
at the begining of the string

Function is run in mine_block() in ./models/block.js

*/
function hashMiner(last_block, data) {
  let last_hash = last_block.hash;

  let nonce = 0;
  let hash = "";
  let difficulty = 1;
  let timestamp = 0;

  let levelOfDifficulty = "";
  let zeroString = "";

  while (levelOfDifficulty !== zeroString || nonce === 0) {
    nonce += 1;
    timestamp = Date.now();

    // Change difficulty when mining if needed
    difficulty = Block.adjust_difficulty(last_block, timestamp);
    hash = crypto_hash(timestamp, last_hash, data, difficulty, nonce);

    /// Mechanism to end the loop
    zeroString = "0".repeat(difficulty);
    levelOfDifficulty = hash.substring(0, difficulty);
  }

  return {
    hash: hash,
    timestamp: timestamp,
    last_hash: last_hash,
    difficulty: difficulty,
    nonce: nonce,
  };
}

export { crypto_hash, hashMiner };
