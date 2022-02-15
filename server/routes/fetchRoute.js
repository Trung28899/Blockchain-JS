import express from "express";
import { fetchLink, getMainPage } from "../controllers/linkControllers.js";
const router = express.Router();

router.route("/:accessName").get(fetchLink);
router.route("/").get(getMainPage);

export default router;
