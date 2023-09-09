import connectMongoDB from "@/libs/mongodb";
import Snapshot from "@/models/snapshot";

const connection=await connectMongoDB();

export default async function Handler(request,response) {
 
  if (request.method==="POST"){
    const {id}=request.query
    let res=Snapshot.create(request.body);
    return response.json({ message: "Topic Created" }, { status: 201 });
  }
else if (request.method==="GET"){
    let res=await Snapshot.find();
     return response.json({ message: "Topic Created",res:res||[] }, { status: 201 });
}
else if (request.method==="DELETE"){
    
  const data=JSON.parse(request.body)
  const res=await Snapshot.deleteMany( { _id : { $in: data } } );

    return response.json({ message: "Topic deleted",res:res }, { status: 200 });
  }
else if (request.method==="PUT"){
  
  const data=JSON.parse(request.body)
  console.log("data_snapshot",request.body)
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

  const result=await Snapshot.bulkWrite(res)
  return response.json({ message: "Topic Updated",res:result }, { status: 200 });
}
}
