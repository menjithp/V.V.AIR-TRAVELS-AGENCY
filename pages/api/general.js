import connectMongoDB from "@/libs/mongodb";
import General from "@/models/general";

const fs=require('fs')
const path=require('path')
const connection=await connectMongoDB();

export default async function Handler(request,response) {
 
  if (request.method==="POST"){
    const res=await General.create(request.body)
    return response.json({ message: "Topic Created" }, { status: 201 });
  }
else if (request.method==="GET"){
    const res = await General.find();

    console.log("get_general",res)
     return response.json({ message: "Topic Created",res:res }, { status: 201 });
}
else if (request.method==="DELETE"){
    const {id} = request.query;
    const res=await General.findByIdAndDelete(id);
    return response.json({ message: "Topic deleted",res:res }, { status: 200 });
  }
else if (request.method==="PUT"){
  const { id } = request.query;
  const data=JSON.parse(request.body)
  const res=await General.replaceOne({_id:id},data);
  return response.json({ message: "Topic Updated",res:res }, { status: 200 });
}
}
