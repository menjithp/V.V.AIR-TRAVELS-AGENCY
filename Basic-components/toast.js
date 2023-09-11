"use client"
import { useContext,useEffect } from "react"
import {Context} from '../pages/App'


export default ()=>{

  const {state,dispatch}=useContext(Context)
  const{background,message,show}=state.toast


  useEffect(()=>{
    let Toast=require('bootstrap').Toast
    window.Toast=new Toast(document.getElementById('myToast'),{autohide:true,delay:2500})
  },[])

  useEffect(()=>{
    window.Toast.show()

  },[show])

    return <div className="position-fixed" style={{backgroundColor:background,top:"20%",left:"75%"}}>
      <div role="alert" id="myToast" aria-live="assertive" 
    style={{color:"white",width:"fit-content",
    backgroundColor:"inherit",
    padding:"0px 15px 0px 2px",
    border:"none",
    boxShadow:"none"}} aria-atomic="true"
     className="toast"
      >
    <div className="toast-body" style={{borderRadius:"none",padding:0}}>
      {message}
    </div>
    </div>
  </div>
}