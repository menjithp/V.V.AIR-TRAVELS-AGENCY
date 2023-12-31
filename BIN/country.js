import connectMongoDB from "@/libs/mongodb";
import Country from "@/models/country";

import {
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
  let result, status, desc, message;

  if(request.method==="POST"){
    if(await auth(request)===null)return response.status(401).json("Unauthorized access")
  }

  if (request.method === "GET") {
    try {
      result = await Country.find();
      final_result = { res: result, status: 200 };
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

    console.log("----------------------------mona")
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

    let newpath;
    let newfilename
    if (formfile) {
      formfile = formfile[0];

      const dir = createdir_if_not(working_dir);
      if (typeof dir !== "string")
        return response
          .status(500)
          .json({ message: "directory creation failed", desc: dir, res: {} });
      let oldpath = formfile.filepath;
      newfilename = formdata.Name + path.extname(formfile.originalFilename);
      working_dir=process.cwd()
      newpath = path.join(working_dir, "public",newfilename);
      const removedfile = removefile_if_exists(newpath);
      if (typeof removedfile !== "string")
        return response
          .status(500)
          .json({
            message: "file deletion failed",
            desc: removedfile,
            res: {},
          });
      const movedfile = movefile(oldpath, newpath);
      if (typeof movedfile !== "string")
      return response
        .status(500)
        .json({
          message: "File failed to move from temporary location to desired location",
          desc: movedfile,
          res: {},
        });
    }

    const url = require("url");
    let dynamic_path;

    if (newpath && newfilename) {
    //  let newpath_url = url.pathToFileURL(newpath).pathname;
     // let cwd_url = url.pathToFileURL(process.cwd()).pathname;
      dynamic_path =
      image_path+newfilename
        //newpath_url.split(cwd_url)[1].replace("/public", "");

    
    }

    let data_to_database = { ...formdata };
    if (dynamic_path) data_to_database.image = dynamic_path;

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
