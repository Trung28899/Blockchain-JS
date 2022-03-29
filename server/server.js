import express, { request } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import blockchainRoute from "./routes/blockchainRoute.js";
/*
  config to get access to environment variables
  Set up here, able to use process.env.SOMETHING
  anywhere in server file
*/
import dotenv from "dotenv";
import { Block } from "./models/block.js";
import { Blockchain } from "./models/blockchain.js";
import PubNub from "pubnub";

dotenv.config();
const app = express();

request.blockchain = new Blockchain();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(bodyParser.json());

app.use("/blockchain", blockchainRoute);

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
