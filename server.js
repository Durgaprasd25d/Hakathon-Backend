import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import userRoutes from "./routes/teamRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import Team from "./models/teamModel.js"; // ✅ Import this

dotenv.config();
connectDB();

const app = express();

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // make sure views folder exists

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/team", userRoutes);
app.use("/api/admin", adminRoutes);

// Confirmation Slip Route
app.get("/confirmation/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team || !team.isVerified) {
      return res.status(404).send("Team not found or not verified.");
    }

    res.render("confirmation", { team });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
