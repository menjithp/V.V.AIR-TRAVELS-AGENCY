import mongoose, { Schema } from "mongoose";

const ImpactSchema = new Schema(
  {
    Name: String,
    value: String,
  },
  {
    timestamps: true,
  }
);

const OfficeSchema = new Schema(
    {
        Name: String,
        value: String,
      },
    {
      timestamps: true,
    }
  );

const Impact = mongoose.models.Impact || mongoose.model("Impact", ImpactSchema);
const Office = mongoose.models.Office || mongoose.model("Office", OfficeSchema);

export {Impact,Office};