import mongoose, { Schema } from "mongoose";

const CountrySchema = new Schema(
  {
    Name: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const Country = mongoose.models.Jobs || mongoose.model("Jobs", CountrySchema);

export default Country;