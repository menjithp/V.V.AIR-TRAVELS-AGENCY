import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const connection=await mongoose.connect("mongodb+srv://menjithchandra2000:kIWdNdyBM7vrGqBo@cluster0.fxsddyz.mongodb.net/VV-AIRTRAVELS");
    return connection;
  } catch (error) {
    console.log(error);
  }

};

export default connectMongoDB;