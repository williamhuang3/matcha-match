import mongoose from "mongoose";

const MatchaSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  origin: String,
  price: Number, // USD per 30g
  profile: {
    umami: { type: Number, default: 0 },
    grassy: { type: Number, default: 0 },
    nutty: { type: Number, default: 0 },
    astringency: { type: Number, default: 0 },
  },
  usage: [String], // e.g., ["koicha", "latte"]
});

export default mongoose.models.Matcha || mongoose.model("Matcha", MatchaSchema);
