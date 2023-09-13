import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { signIn } from 'next-auth/react'

import connectMongoDB from "@/libs/mongodb";
import Admin from "@/models/admin";

const connection = await connectMongoDB();

export default NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    secret:process.env.NEXTAUTH_SECRET,
    callbacks:{
        async signIn({user,account}){
            let result
            try{
                 result = await Admin.findOne(user)//{id:user.id,email:user.email,name:user.name,image:user.image});
            }catch(e){
                console.log("USER NOT FOUND !!",e)
            }
            if (result) return user
            else return null
        },
    },
    pages:{
        signIn:'/auth/login',
        signOut:"/auth/login"
    }
  
})
  // pages: {
    //     signIn: '/auth/signin',
    //     signOut: '/auth/signout',
    //     error: '/auth/error', // Error code passed in query string as ?error=
    //     verifyRequest: '/auth/verify-request', // (used for check email message)
    //     newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    //   }
