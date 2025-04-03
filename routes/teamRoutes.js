import express from "express";
import upload from "../middleware/upload.js";
import { registerTeam, getAllTeams, getTeamByName } from "../controllers/teamController.js";

const router = express.Router();

router.post("/register", upload.single("paymentScreenshot"), registerTeam);
router.get("/", getAllTeams);
router.get("/:teamName", getTeamByName);

export default router;
