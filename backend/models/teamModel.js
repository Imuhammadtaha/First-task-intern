import mongoose from "mongoose";
const teamSchema = new mongoose.Schema({
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
teamSchema.virtual("imageBase64").get(function () {
  return `data:${
    this.image.contentType
  };base64,${this.image.data.toString("base64")}`;
});

teamSchema.set("toJSON", { virtuals: true });
export default mongoose.model("team", teamSchema);
