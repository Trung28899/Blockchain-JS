import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";
import fetchRoute from "./routes/fetchRoute.js";
import mongoose from "mongoose";
/*
  config to get access to environment variables
  Set up here, able to use process.env.SOMETHING
  anywhere in server file
*/
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/link", linkRoutes);
app.use("/", fetchRoute);

const CONNECTION_URL = process.env.MONGO_CONNECT;
const PORT = process.env.PORT;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));
