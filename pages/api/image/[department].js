import connectMongoDB from "@/libs/mongodb";
import Country from "@/models/country";
import Jobs from "@/models/Jobs";
import General from "@/models/General";
import Test from "@/models/Test";



await connectMongoDB();


export default async function handler(req,res){

  const { query } = req;
  let final_scheme;

  console.log("req",query)

  if(query.department==="country")final_scheme=Country
  else if(query.department==="general")final_scheme=General
  else if(query.department==="jobs")final_scheme=Jobs
  else if(query.department==="test")final_scheme=Test

  let result=await final_scheme.find( { _id: query._id }, { image: 1} )
  let data=result[0].image.data
  let type=result[0].image.contentType

  res.setHeader('content-type', type)
res.end(data)

}
