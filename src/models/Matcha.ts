import mongoose from "mongoose";

const matchaSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number },
  experience: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
  profile: {
    umami: { type: Number, required: true },
    grassy: { type: Number, required: true },
    nutty: { type: Number, required: true },
    sweetness: { type: Number, required: true },
  },
  usage: [String],
  cultivars: [String],
});

export default mongoose.models.Matcha || mongoose.model("Matcha", matchaSchema);
