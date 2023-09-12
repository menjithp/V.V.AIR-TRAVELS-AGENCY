
const path=require('path')
const fs=require('fs')
export default async function handler(req,res){

    const{image}=req.query

  
    let filePath;
    let query
    if (image.includes("country-")){
        query=image.split("country-")
        filePath = path.join(process.cwd(),"public","media","country",query[1])
    } 
    else if (image.includes("job-")){
        query=image.split("job-")
        filePath = path.join(process.cwd(),"public","media","job",query[1])
    }
    else if (image.includes("general-")) {
        query=image.split("general-")
        filePath = path.join(process.cwd(),"public","media","general",query[1])
    }
    
    
    const imageBuffer = fs.readFileSync(filePath);
    res.setHeader("Content-Type", "image/jpg");
    return res.send(imageBuffer);
}