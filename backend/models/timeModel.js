import mongoose from "mongoose";
const timeSchema = new mongoose.Schema({
  image: {
    data: Buffer,
    contentType: String,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
});
timeSchema.virtual("imageBase64").get(function () {
  return `data:${
    this.image.contentType
  };base64,${this.image.data.toString("base64")}`;
});

timeSchema.set("toJSON", { virtuals: true });
export default mongoose.model("time", timeSchema);
