import express from "express";
import { createLink } from "../controllers/linkControllers.js";
const router = express.Router();

router.route("/create").post(createLink);

export default router;
