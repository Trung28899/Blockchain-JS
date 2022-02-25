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
    3. 4th Commit:

## COMMIT HISTORY

    <h1>1. 2nd Commit: Start A Blockchain Application</h1>

        - Start A Blockchain Application:
            +, See ./server/models/block.js
            +, ./server/models/blockchain.js
            +, ./util/crypto_hash.js

        - Section 1 - Section 3 Udemy course

    2. 3rd Commit: Unit Testing With Jest - Section 4: Test the Application

        - Set up commands:

            +, `$ cd server`

            +, `$ npm install --save-dev jest`

            +, See script in packages.json for test

        - If cannot import anything into .test.js file, see:
            +, packages.json > look for "dependencies" > must have all the babel dependencies and jest
            +, See .bablerc file  > must be configured exactly like it

        - All methods for expect():
            +, https://jestjs.io/docs/expect

        - Unit Testing:

                +, Run: `$ npm run test`

                +, See folder: ./server/tests/

                +, All the files with extension: .test.js will automatically
                    be run for testing

    3. 4th Commit:

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
