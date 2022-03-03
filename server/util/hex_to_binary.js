const HEX_TO_BINARY_CONVERSION_TABLE = {
  0: "0000",
  1: "0001",
  2: "0010",
  3: "0011",
  4: "0100",
  5: "0101",
  6: "0110",
  7: "0111",
  8: "1000",
  9: "1001",
  a: "1010",
  b: "1011",
  c: "1100",
  d: "1101",
  e: "1110",
  f: "1111",
};

/*

    This function is used in ./util/crypto_hash.js
    to complicate the hash for mining. 
    
    Therefore, we can get the average time 
    to add block closer to the MINE_RATE (OVER TIME)

*/
const hex_to_binary = (hexValue) => {
  let binary_string = "";

  for (let i = 0; i < hexValue.length; i++) {
    binary_string += HEX_TO_BINARY_CONVERSION_TABLE[hexValue[i]];
  }

  return binary_string;
};

export { hex_to_binary };
