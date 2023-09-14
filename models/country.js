import mongoose, { Schema } from "mongoose";

const CountrySchema = new Schema(
  { 
    Name: String,
    Comments:Array,
    image: 
    {
        data: Buffer,
        contentType: String
    },
  },
  {
    timestamps: true,
  }
);

const Country = mongoose.models.Country || mongoose.model("Country", CountrySchema);

export default Country;