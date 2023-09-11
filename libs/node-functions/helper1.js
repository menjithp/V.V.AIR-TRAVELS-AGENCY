const fs=require('fs')
const path=require('path')
import {Formidable} from 'formidable'


export function movefile(oldPath,newPath){
    try{
        fs.renameSync(oldPath, newPath);
        return "success"
    }catch(e){
        return e
    }
  }
  
export function removefile_if_exists(path){
    if (fs.existsSync(path)) {
            try{
                fs.unlink(path,(err)=>{})
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
            fs.mkdirSync(working_dir,{ recursive: true})
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