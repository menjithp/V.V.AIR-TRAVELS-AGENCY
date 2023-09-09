import mongoose, { Schema } from "mongoose";

const GeneralSchema = new Schema(
  {
    companyName:String,
companyQuote:String,
companyDesc:String,
Instagram:String,
Facebook:String,
LinkedIn:String,
Whatsapp:String,
Mobile:String,
Address:String,
AgentName:String,
mapName:String
},
  {
    timestamps: true,
  }
);

const General = mongoose.models.General || mongoose.model("General", GeneralSchema);

export default General;