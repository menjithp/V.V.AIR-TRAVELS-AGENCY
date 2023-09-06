import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const connection=await mongoose.connect(process.env.mongo_connection_string);
    return connection;
  } catch (error) {
    console.log(error);
  }

};

export default connectMongoDB;
