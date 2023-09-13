import mongoose, { Schema } from "mongoose";

const TestSchema = new Schema(
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

const Test = mongoose.models.Test || mongoose.model("Test", TestSchema);

export default Test;