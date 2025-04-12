import mongoose from "mongoose";

const suggestedMatchaSchema = new mongoose.Schema(
  {
    brand: String,
    name: String,
    link: String,
    notes: String,
  },
  { timestamps: true }
);

export const SuggestedMatcha =
  mongoose.models.SuggestedMatcha ||
  mongoose.model("SuggestedMatcha", suggestedMatchaSchema);
