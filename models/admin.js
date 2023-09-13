import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema(
  {
    id: String,
    name: String,
    email:String,
    image:String
  },
  {
    timestamps: true,
  }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

export default Admin;