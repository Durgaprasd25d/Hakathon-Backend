import Team from "../models/teamModel.js";

// Auto-increment utility
const assignTeamId = async () => {
  const totalVerified = await Team.countDocuments({ isVerified: true });
  return `Team ${totalVerified + 1}`;
};

export const verifyTeamPayment = async (req, res) => {
  try {
    const { teamName } = req.params;
    const team = await Team.findOne({ teamName });

    if (!team) return res.status(404).json({ error: "Team not found" });

    team.isVerified = !team.isVerified;

    if (team.isVerified) {
      // Assign sequential team ID only once
      if (!team.teamId) team.teamId = await assignTeamId();
      team.verificationDate = new Date();
      team.confirmationSlip = `https://gietx.onrender.com/confirmation/${team._id}`;
    } else {
      // If unverified, clear confirmation details
      team.confirmationSlip = null;
      team.verificationDate = null;
      team.teamId = null;
    }

    await team.save();

    res.json({
      message: `Payment ${team.isVerified ? "verified" : "unverified"}`,
      team,
    });
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
