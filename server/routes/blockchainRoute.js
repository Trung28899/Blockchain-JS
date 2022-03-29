import express from "express";
import {
  getBlockchain,
  mineBlock,
} from "../controllers/blockchainControllers.js";
const router = express.Router();

router.route("/").get(getBlockchain);
router.route("/mine").post(mineBlock);

export default router;
