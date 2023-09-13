import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { useState,useEffect } from 'react'
export default ({children})=>{

    const[islogin,setlogin]=useState(false)
    const {status}=useSession()


    console.log("Status",status)

     useEffect(()=>{
        if(status==="authenticated" )setlogin(true)
        else if(status==="unauthenticated")Router.push("/auth/login")
     },[status])
  
     if(islogin) return children
     if(status==="loading")return

    return <div style={{height:"100vh"}} className="d-flex redirect-page ">
        <p style={{letterSpacing:"1px",width:"fit-content"}} 
        className="m-auto text-center text-danger fw-bold fs-5 ">
            You are not logged in . Redirecting to login page ..... </p>
    </div>
}