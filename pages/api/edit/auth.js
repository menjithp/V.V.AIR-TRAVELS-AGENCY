
import { getToken } from "next-auth/jwt"
import { RiNurseFill } from "react-icons/ri"


export default async function auth(req){

const token = await getToken({ req,secret:process.env.NEXTAUTH_SECRET })
return token
}