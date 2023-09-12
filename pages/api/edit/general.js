import connectMongoDB from "@/libs/mongodb";
import General from "@/models/general";

import {
  movefile,
  removefile_if_exists,
  createdir_if_not,
  formread,
} from "@/libs/node-functions/helper1";

const fs = require("fs");
const path = require("path");

const working_dir = path.join(process.cwd() + "/public/media/general");
const connection = await connectMongoDB();
const image_path=process.env.NEXT_PUBLIC_API_URL+"/api/image/general-"


export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(request, response) {
  let result, status, desc, message;



  if (request.method === "GET") {
    try {
      result = await General.find();
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
      result = await General.deleteOne({ _id: id });
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

    let formfile = form.files.General;
    let formdata = form.fields.General;


    if (!formdata) {
      return response
        .status(400)
        .json({ message: "General object missing", desc: form.err, res: {} });
    }
    formdata = JSON.parse(formdata[0]);

    let newpath;
    if (formfile) {
      formfile = formfile[0];

      const dir = createdir_if_not(working_dir);
      if (typeof dir !== "string")
        return response
          .status(500)
          .json({ message: "directory creation failed", desc: dir, res: {} });
      let oldpath = formfile.filepath;
      let newfilename = formdata.Name + path.extname(formfile.originalFilename);
      newpath = path.join(working_dir, newfilename);
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
      if (typeof removedfile !== "string")
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
      // let newpath_url = url.pathToFileURL(newpath).pathname;
      // let cwd_url = url.pathToFileURL(process.cwd()).pathname;
      // dynamic_path =
      //   process.env.NEXT_PUBLIC_API_URL +
      //   newpath_url.split(cwd_url)[1].replace("/public", "");
      dynamic_path =
      image_path+newfilename
    }

    let data_to_database = { ...formdata };
    if (dynamic_path) data_to_database.image = dynamic_path;

    try {
      result =
      !data_to_database._id
          ? await General.create(data_to_database)
          : await General.findOneAndUpdate(
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
          ? "General Creation failed"
          : "General updation failed";
      desc = e;
    }
  }




  return response.status(status).json({ message: "", desc: {}, res: result });
}
