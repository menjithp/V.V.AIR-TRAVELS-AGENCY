import connectMongoDB from "@/libs/mongodb";
import Country from "@/models/country";
import { formread,toBase64,toBuffer} from "@/libs/node-functions/helper1";

import auth from './auth'


const connection = await connectMongoDB();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(request, response) {
  let result, status, desc, message,final;

  // if(request.method==="POST"){
  //   if(await auth(request)===null)return response.status(401).json("Unauthorized access")
  // }

  if (request.method === "GET") {
    try {
      result = await Country.find({},{image:0});
      status=200
    } catch (e) {
      desc = e;
      message = "data fetch failed";
      status = 404;
    }
  } 
  
  
  
  
  else if (request.method === "DELETE") {
    const { id } = request.query;
    try {
      result = await Country.deleteOne({ _id: id });
      status = 200;
    } catch (e) {
      desc = e;
      message = "data deletion failed";
      status = 404;
    }
  } 
  
  
  
  
  
  else if (request.method === "POST" ||request.method === "PUT") {
    const form = await formread(request);

    //check if form parsed successfully
    if (form.err) {
      return response
        .status(404)
        .json({ message: "Form parsing failed", desc: err, res: {} });
    }

    let formfile = form.files.Country;
    let formdata = form.fields.Country;

    if (!formdata) {
      return response
        .status(400)
        .json({ message: "Country object missing", desc: form.err, res: {} });
    }
   
    formdata = JSON.parse(formdata[0]);
    let data_to_database = { ...formdata };

    if (formfile) {
        formfile=formfile[0]
      if(formfile){
        data_to_database.image={
          data:toBuffer(formfile.filepath),
          contentType:formfile.mimetype
        }
      }
    }
   


    try {
      result =
      !data_to_database._id
          ? await Country.create(data_to_database)
          : await Country.findOneAndUpdate(
              { _id: data_to_database._id },
              { $set: data_to_database },
              {upsert:true, returnDocument: 'after' }
            );
    
            if(!result._id){
                return response.status(404).json({res:{},message:"Data failed to upload",desc:{}})
            }
      status = 200;

      result=JSON.parse(JSON.stringify(result))
      result.image=null

    } catch (e) {
      status = 404;
      message =
      !data_to_database._id
          ? "Country Creation failed"
          : "Country updation failed";
      desc = e;
   
   
   
    }
  }

  return response.status(status).json({ message: "", desc: {}, res: result });
}
