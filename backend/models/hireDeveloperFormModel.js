import mongoose from "mongoose";

const hireDeveloperSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  companyWebsiteURL: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Hire-Developer", hireDeveloperSchema);
