import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contract: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  skillRequired: {
    type: [String],
    required: true,
  },
  preferredQualification: {
    type: String,
    required: true,
  },
  jobPostedDate: {
    type: Date,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Jobs", jobsSchema);
