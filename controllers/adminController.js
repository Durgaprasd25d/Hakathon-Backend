import Team from "../models/teamModel.js";

/** Verify Team Payment */
export const verifyTeamPayment = async (req, res) => {
  try {
    const { teamName } = req.params;
    const team = await Team.findOne({ teamName });

    if (!team) return res.status(404).json({ error: "Team not found" });

    // Toggle verification status
    team.isVerified = !team.isVerified;

    // Update confirmation slip only if verified
    team.confirmationSlip = team.isVerified 
      ? `http://localhost:8000/confirmation/${team._id}`
      : null;

    await team.save();

    res.json({ message: `Payment ${team.isVerified ? "verified" : "unverified"}`, team });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



/** Delete a Team */
export const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findByIdAndDelete(id);

    if (!team) return res.status(404).json({ error: "Team not found" });

    res.json({ message: "Team deleted successfully", teamId: id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};