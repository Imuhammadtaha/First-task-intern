import mongoose from "mongoose";
const areaExpSchema = new mongoose.Schema({
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
areaExpSchema.virtual("imageBase64").get(function () {
  return `data:${
    this.image.contentType
  };base64,${this.image.data.toString("base64")}`;
});

areaExpSchema.set("toJSON", { virtuals: true });
export default mongoose.model("Area-Of-Exp", areaExpSchema);
