import express from "express";
import { verifyTeamPayment, deleteTeam } from "../controllers/adminController.js";

const router = express.Router();

router.put("/verify/:teamName", verifyTeamPayment);
router.delete("/delete/:id", deleteTeam);


export default router;
