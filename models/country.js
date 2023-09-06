import mongoose, { Schema } from "mongoose";

const CountrySchema = new Schema(
  {
    Name: String,
    image: String,
    Comments:Array
  },
  {
    timestamps: true,
  }
);

const Country = mongoose.models.Country || mongoose.model("Country", CountrySchema);

export default Country;