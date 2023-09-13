import connectMongoDB from "@/libs/mongodb";
import Test from "@/models/test";
await connectMongoDB()

import {
  toBase64,
  movefile,
  removefile_if_exists,
  createdir_if_not,
  formread,
} from "@/libs/node-functions/helper1";

import auth from './auth'

const fs = require("fs");
const path = require("path");

let working_dir = path.join(process.cwd() + "/public/media/country");
const connection = await connectMongoDB();
const image_path=process.env.NEXT_PUBLIC_API_URL+"/api/image/country-"

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(request, response) {

  
    const form = await formread(request);

    let formfile = form.files.Country;
      formfile = formfile[0];
      let base64=fs.readFileSync(formfile.filepath).toString('base64');
      let final=`data:${formfile.mimetype};base64,${base64}`

    let res=await Test.findOneAndUpdate({
      _id:"65014de1a222a849a0350128"},{
        "image": final
    },{upsert:true, returnDocument: 'after' })

  // response.setHeader('Content-Type', res.image.contentType)
  // let a=Buffer.from(res.image.data, 'binary').toString('base64');
   response.json(res);
 // response.send("Hj")

}
