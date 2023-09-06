import connectMongoDB from "@/libs/mongodb";
import {Impact,Office} from "@/models/impact_office";

const connection=await connectMongoDB();

export default async function Handler(request,response) {
 
  if (request.method==="POST"){
    const {id}=request.query
    let res;
    if (id==="Impact")res=Impact.create(request.body);
    else res=Office.create(request.body);
    return response.json({ message: "Topic Created" }, { status: 201 });
  }
else if (request.method==="GET"){
    const {id}=request.query
    let res;
    if (id==="Impact"){
        res=await Impact.find();
    }
    else{
       res=await Office.find();
    } 

     return response.json({ message: "Topic Created",res:res||[] }, { status: 201 });
}
else if (request.method==="DELETE"){
    const {delete_id,id} = request.query;
    let res;
    if (id==="Impact")res=Impact.findByIdAndDelete(delete_id);
    else res=Office.findByIdAndDelete(delete_id);

    return response.json({ message: "Topic deleted",res:res }, { status: 200 });
  }
else if (request.method==="PUT"){
  const {put_id, id } = request.query;

  let res;
  if (id==="Impact")res=Impact.replaceOne({_id:put_id},request.body);
  else res=Office.replaceOne({_id:put_id},request.body);

  return response.json({ message: "Topic Updated",res:res }, { status: 200 });
}
}
