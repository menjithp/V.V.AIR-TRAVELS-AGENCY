const fs=require('fs')
const path=require('path')
import {Formidable} from 'formidable'


export function movefile(oldPath,newPath){
    try{
      fs.copyFile(oldPath, newPath, function (err) {
        if (err) throw new Error("File Copy Failed");
    });
        return "success"
    }catch(e){
        return e
    }
  }
  
export function removefile_if_exists(path){
    if (fs.existsSync(path)) {
            try{
                fs.unlink(path,(err)=>{
                  if (err) throw new Error("File removal failed");
                })
                return "success"
            }catch(e){
                return e
            }
  }
  return "success"
  }
  
export function createdir_if_not(working_dir){
    try{
        if(!fs.existsSync(working_dir)){
            fs.mkdirSync(working_dir,{ recursive: true},(err)=>{
              if (err) throw new Error("folder creation failed");
            })
        } 
        return "success"
    }catch(e){
        return e;
    } 
  }
  
export async function formread(request){
    const data = await new Promise((resolve, reject) => {
      const form = new Formidable();
  
      form.parse(request, (err, fields, files) => {
        if (err) reject({ err })
        resolve({ err, fields, files })
      }) 
    })
    return data
  }
