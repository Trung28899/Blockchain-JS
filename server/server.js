import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fetchRoute from "./routes/mainRoute.js";
/*
  config to get access to environment variables
  Set up here, able to use process.env.SOMETHING
  anywhere in server file
*/
import dotenv from "dotenv";
import { Block } from "./models/block.js";
import { Blockchain } from "./models/blockchain.js";

dotenv.config();
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(bodyParser.json());

app.use("/", fetchRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
