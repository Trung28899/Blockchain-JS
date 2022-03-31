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
import { Blockchain } from "./models/blockchain.js";
import { PubSub } from "./pubsub.js";
import axios from "axios";

dotenv.config();
const app = express();

request.blockchain = new Blockchain();
request.pubsub = new PubSub(request.blockchain);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(bodyParser.json());

app.use("/blockchain", blockchainRoute);

const ROOT_PORT = process.env.PORT || 6000;
let PORT = ROOT_PORT;

/*
  If peer is running, run a random port from 6001 to 7000
*/
if (process.env.PEER === "true") {
  PORT = Math.floor(Math.random() * (7000 - 6001) + 6001);
  axios
    .get(`http://localhost:${ROOT_PORT}/blockchain`)
    .then((response) => {
      request.blockchain.replace_chain(response.data.chain);
      console.log("-- Successfully synchronized the local chain");
    })
    .catch((error) => {
      console.log(`-- Error Synchronizing: ${error}`);
    });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
