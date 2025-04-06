import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true },
    track: { type: String, required: true },
    collegeName: { type: String, required: true },
    members: [
      {
        name: { type: String, required: true },
        email: { type: String, required: true },
        contactNo: { type: String, required: true },
        gender: { type: String, required: true },
      },
    ],
    paymentScreenshot: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    confirmationSlip: { type: String, default: "" },
    teamId: { type: String, default: null },
    verificationDate: { type: Date, default: null },
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);
export default Team;
