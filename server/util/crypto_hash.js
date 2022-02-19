import crypto from "crypto";

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

export { crypto_hash };
