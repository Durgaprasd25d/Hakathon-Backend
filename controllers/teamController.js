import Team from "../models/teamModel.js";
import cloudinary from "../config/cloudinary.js";

/** Register a Team */
export const registerTeam = async (req, res) => {
  try {
    const { teamName, track } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    let members;
    try {
      members = JSON.parse(req.body.members);

      if (!Array.isArray(members)) throw new Error();

      const isValid = members.every(
        (m) => m.name && m.email && m.contactNo && m.gender
      );

      if (!isValid) {
        return res.status(400).json({ error: "All member fields are required." });
      }

    } catch (error) {
      return res.status(400).json({ error: "Invalid members format" });
    }

    if (members.length > 5) {
      return res.status(400).json({ error: "A team can have a maximum of 5 members." });
    }

    const uploadResponse = await cloudinary.uploader.upload(file.path, {
      folder: "hackathon_payments",
    });

    const newTeam = await Team.create({
      teamName,
      track,
      collagename,
      members,
      paymentScreenshot: uploadResponse.secure_url,
    });

    res.status(201).json({ success: true, team: newTeam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


/** Get All Teams */
export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** Get Team by Name */
export const getTeamByName = async (req, res) => {
  try {
    const { teamName } = req.params;
    const team = await Team.findOne({ teamName });

    if (!team) return res.status(404).json({ error: "Team not found" });

    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
