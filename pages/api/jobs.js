import connectMongoDB from "@/libs/mongodb";
import Jobs from "@/models/jobs";

const connection=await connectMongoDB();

export default async function Handler(request,response) {
 
  if (request.method==="POST"){
    const res=await Jobs.create(request.body)
    return response.json({ message: "Topic Created" }, { status: 201 });
  }
else if (request.method==="GET"){
    const res = await Jobs.find();
     return response.json({ message: "Topic Created",res:res }, { status: 201 });
}
else if (request.method==="DELETE"){
  const data=JSON.parse(request.body)
  const res=await Jobs.deleteMany( { _id : { $in: data } } );
    return response.json({ message: "Topic deleted",res:res }, { status: 200 });
  }
else if (request.method==="PUT"){
  const data=JSON.parse(request.body)

  const res=data.map(item=>{
      return {
        updateOne:{
          filter:item._id?{_id:item._id}:{"Name":""},
          update:{$set:item},
          upsert:true,
          new:true
        }
      }
  })

  const result=await Jobs.bulkWrite(res)
  return response.json({ message: "Topic Updated",res:res }, { status: 200 });
}
}
