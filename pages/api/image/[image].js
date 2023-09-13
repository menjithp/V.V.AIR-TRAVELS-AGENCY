
const path=require('path')
const fs=require('fs')

import { getToken } from "next-auth/jwt"


// export const config = {
//     runtime: 'edge',
//   };

export default async function handler(req,res){



    
    // const{image}=req.query

  
    // let filePath;
    // let query
    // if (image.includes("country-")){
    //     query=image.split("country-")
    //     console.log("query",query)
    //     filePath = path.join(process.cwd(),"public","media","country",query[1])
    // } 
    // else if (image.includes("job-")){
    //     query=image.split("job-")
    //     filePath = path.join(process.cwd(),"public","media","job",query[1])
    // }
    // else if (image.includes("general-")) {
    //     query=image.split("general-")
    //     filePath = path.join(process.cwd(),"public","media","general",query[1])
    // }
    
    
    // const imageBuffer = fs.readFileSync(filePath);
    // res.setHeader("Content-Type", "image/jpg");
    // return res.send(imageBuffer);


//    const form =await req.formData();
// //const form=await req.json()
   
//     const file = form.getAll('one');
//     // console.log("form",form)

//     console.log("form",file)

const token = await getToken({ req,secret:process.env.NEXTAUTH_SECRET })
  if (token) {
    // Signed in
    console.log("JSON Web Token", JSON.stringify(token, null, 2))
    res.status(200).json({ message: "", desc: {}, res: token });
  } else {
    // Not Signed in
    res.status(200).json({ message: "", desc: {}, res: token });
  }
  return res


}