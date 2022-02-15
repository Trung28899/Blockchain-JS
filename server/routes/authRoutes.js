import express from "express";
import {
  createPassword,
  getPassword,
  updatePassword,
  deletePassword,
} from "../controllers/authControllers.js";
const router = express.Router();

router.route("/create").post(createPassword);
router.route("/").post(getPassword);
router.route("/:currentPassword").put(updatePassword);
router.route("/:password").delete(deletePassword);

export default router;
