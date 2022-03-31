## BLOCKCHAIN WITH JAVASCRIPT

    1, Introduction:
        - A clone repository of:
            https://github.com/Trung28899/BlockChain-Course-1

        - The original repository is written in Python, this repo is written
            in Node.js

        - Goal:
            +, Learn and review content on blockchain course. Course link:
                https://www.udemy.com/course/python-js-react-blockchain/

## REPOSITORY TABLE OF CONTENTS:

    1. 2nd Commit: Start A Blockchain Application
    2. 3rd Commit: Unit Testing With Jest - Section 4: Test the Application
    3. 4th Commit: Proof Of Work

## COMMIT HISTORY

1. 2nd Commit: Start A Blockchain Application

   - Start A Blockchain Application:
     +, See ./server/models/block.js
     +, ./server/models/blockchain.js
     +, ./util/crypto_hash.js

   - Section 1 - Section 3 Udemy course

##

2.  3rd Commit: Unit Testing With Jest - Section 4: Test the Application

    - Set up commands:

      +, `$ cd server`

      +, `$ npm install --save-dev jest`

      +, See script in packages.json for test

    - If cannot import anything into .test.js file, see:
      +, packages.json > look for "dependencies" > must have all the babel dependencies and jest
      +, See .bablerc file > must be configured exactly like it

    - All methods for expect():
      +, https://jestjs.io/docs/expect

    - Unit Testing:

      +, Run: `$ npm run test`

      +, See folder: ./server/tests/

      +, All the files with extension: .test.js will automatically
      be run for testing

##

3. 4th Commit: Proof Of Work

   - SECTION 5: Proof Of Work

   - Implementing Proof Of Work System:

     +, See ./models/block.js > mine_block()

     +, See ./util/crypto_hash.js > hashMiner()

     +, See ./scripts/average_block_rate.js > see script on testing the system

   => This is how to implement proof of work to mine block

   - Testing:

     +, See ./tests/blockchain/block.test.js

   - Commands:

     +, For testing:

   `$ npm run test`

   +, For running scripts:

   `$ node scripts/average_block_rate.js`

##

4. 5th Commit: Collaboration (Chain Replacement)

   - SECTION 6: Collaboration

   - Implementing methods to validate blocks, blockchain and replace the whole chain:

     +, See ./models/block.js > is_valid_block()

     +, See ./models/blockchain.js > is_valid_chain()

   - Testing:

     +, See ./tests/blockchain/block.test.js

     +, See ./tests/blockchain/blockchain.test.js

   - Commands:

   `$ npm run test`
   `$ node models/blockchain.js`
   `$ node models/block.js`

##

5.  6th Commit: Setting up PubNub for NodeJS

    - SECTION 7: Blockchain API

    - Installation:

      +, version: 4.27.2

      +, Installation link: https://www.npmjs.com/package/pubnub/v/4.27.2

      +, Note: this version won't require uuid, later version will require uuid

      - Getting Started Documentation:

        +, https://www.pubnub.com/docs/sdks/javascript/nodejs#putting-it-all-together

        +, click on "show all ... lines of code"

      - Code base instruction:

        +, visit ./server/pubsub.js

        +, This code show how to setup, publish and subscribe to a channel

        +, cd to server and run command: `$ node pubsub.js`

        +, Code is equivalent to original repo 20th Commit:
        https://github.com/Trung28899/BlockChain-Course-1

##

6.  7th Commit: Complete the blockchain API

a. SECTION 7: Blockchain API

b. Content:

- 21st - 24th Commit in this repo:
  https://github.com/Trung28899/BlockChain-Course-1

c. Code base instruction:

- Set up Peer instances:

  +, Visist server.js to see how this is set up
  +, Every peer is setup on a differnt port in localhost to
  stimulate differnt peer in a network
  +, COMMANDS: cd to server and
  `$ npm start` > start the primary node
  `$ npm run peer` > start a new peer

- When a block is added: broadcast the block to all the peer and add the
  new block locally

  +, See blockchainControllers.js in mineBlock() to see how to broadcast new block
  +, See pubsub.js in message(messageEvent) in the Listener class to
  see how a new block is added locally

- Synchronizing a peer on start up:

  +, When a peer is started, it needs to have the lastest instance
  of the blockchain
  +, see server.js under if (process.env.PEER === "true") to see how
  this is setup

- Notes:

  +, Need to use postman to hit the route to test the peer network

  +, At start up, if the blockchain only has the genesis block, peer
  console will show error: "-- Error Synchronizing: Cannot replace. The incoming chain must be longer" > this is normal because the peer doesn't need update
  its local blockchain. There was no updates on the network

  +, When mine a new block, the primary node will have an error message:
  -- Did not replace chain:
  Cannot replace. The incoming is invalid

  => this is normal because the blockchain of the primary node is already
  up to date > no need to replace
