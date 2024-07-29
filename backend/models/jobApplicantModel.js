import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
  url: String,
});

const jobAppSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  institution: {
    type: String,
    required: true,
  },
  cgpa: {
    type: Number,
    required: true,
  },
  certification: fileSchema,
  Workexperience: {
    type: String,
    required: true,
  },
  resume: fileSchema,
  coverLetter: fileSchema,
  designation: {
    type: String,
    required: true,
  },
  onlinePortfolio: {
    type: String,
    required: true,
  },
  videoURL: {
    type: String,
    required: true,
  },
  references: {
    type: String,
    required: true,
  },
  additionalComments: {
    type: String,
    required: false,
  },
  qa: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Job-Applicant", jobAppSchema);
