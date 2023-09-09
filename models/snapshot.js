import mongoose, { Schema } from "mongoose";

const SnapshotSchema = new Schema(
  {
    Name: String,
    value: String,
    type:String
  },
  {
    timestamps: true,
  }
);

const Snapshot = mongoose.models.Snapshot || mongoose.model("Snapshot", SnapshotSchema);

export default Snapshot;