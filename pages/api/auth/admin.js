import connectMongoDB from "@/libs/mongodb";
import Admin from "@/models/Admin";

const connection = await connectMongoDB();

export default async function handler(request, response) {
  let result, status;
  if (request.method === "POST") {
    try {
      result = await Admin.create(request.body);
      status=200
    } catch (e) {
      result =e
      status=500
    }
  } 
  return response.status(status).json({res: result });
}
