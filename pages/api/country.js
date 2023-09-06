import connectMongoDB from "@/libs/mongodb";
import Country from "@/models/country";

const fs=require('fs')
const path=require('path')
const connection=await connectMongoDB();

export default async function Handler(request,response) {
 
  if (request.method==="POST"){
    const res=await Country.create(request.body)
    return response.json({ message: "Topic Created" }, { status: 201 });
  }
else if (request.method==="GET"){
    const res = await Country.find();
     return response.json({ message: "Topic Created",res:res }, { status: 201 });
}
else if (request.method==="DELETE"){
    const {id} = request.query;
    const res=await Country.findByIdAndDelete(id);
    return response.json({ message: "Topic deleted",res:res }, { status: 200 });
  }
else if (request.method==="PUT"){
  const { id } = request.query;
  const res=await Country.replaceOne({_id:id},request.body);
  return response.json({ message: "Topic Updated",res:res }, { status: 200 });
}
}
