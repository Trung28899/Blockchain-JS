import express from "express";
import { getMainPage } from "../controllers/mainControllers.js";
const router = express.Router();

router.route("/").get(getMainPage);

export default router;
