import {useContext,useState,useRef,useEffect} from 'react'
import {Context} from '../App'

import HeaderEdit from './headerEdit'
export default (props)=>{

// const [state,setState]=useState("")

const {state,dispatch}=useContext(Context)
 let res=state.general

 
    const Name=useRef();
    const companyQuote=useRef();
    const companyDesc=useRef();
    const Instagram=useRef();
    const Facebook=useRef();
    const LinkedIn=useRef();
    const Whatsapp=useRef();
    const Mobile=useRef();
    const Address=useRef();
    const AgentName=useRef();
    const mapName=useRef();
    const imageref=useRef()

    useEffect(()=>{
        Name.current.value=res.Name
        companyQuote.current.value=res.companyQuote
        companyDesc.current.value=res.companyDesc
        Instagram.current.value=res.Instagram
        Facebook.current.value=res.Facebook
        LinkedIn.current.value=res.LinkedIn
        Whatsapp.current.value=res.Whatsapp
        Mobile.current.value=res.Mobile
        Address.current.value=res.Address
        AgentName.current.value=res.AgentName
      //  mapName.current.value=res.mapName
    },[res])

    const upload=(e)=>{
        e.preventDefault();
        let obj={... res,
            [Name.current.name]:Name.current.value,
            [companyQuote.current.name]:companyQuote.current.value,
            [companyDesc.current.name]:companyDesc.current.value,
            [Instagram.current.name]:Instagram.current.value,
            [Facebook.current.name]:Facebook.current.value,
            [LinkedIn.current.name]:LinkedIn.current.value,
            [Whatsapp.current.name]:Whatsapp.current.value,
            [Mobile.current.name]:Mobile.current.value,
            [Address.current.name]:Address.current.value,
            [AgentName.current.name]:AgentName.current.value,
        }
        let form=new FormData()
        form.append("General",JSON.stringify(obj))
        if (mapName.current.files)form.append("General",mapName.current.files[0])
        
        dispatch({type:"loading"})
        try{
            fetch('/api/edit/general',{method:"POST",body:form}).then(res=>{
               if (res.status===200)return res.json()
               throw new Error(res.json().message)
            }).then(res=>{
               dispatch({type:"SET_GENERAL_DATA",data:res.res})
               dispatch({type:"loading"})
               dispatch({type:'toastgreen',data:"Data updated successfully"})
            })
        }catch(e){
            dispatch({type:"loading"})
            dispatch({type:'toastred',data:e.message})
        }
        
    }

return <form className="px-5 pb-5 mx-2 general-details-edit edit-body" onSubmit={upload}>
    <HeaderEdit title="General Edit" />
    <div className="row align-items-center my-3">
        <label className="col-md-3">Company Name: </label>
        <input className="col-md-9" required type="text" name="Name" ref={Name} />
    </div>
    <div className="row my-3">
        <label className="col-md-3">Company Quote: </label>
        <input className="col-md-9" required type="text" name="companyQuote" ref={companyQuote} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">Company Description: </label>
        <input  className="col-md-9" required type="text" name="companyDesc" ref={companyDesc} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">Instagram: </label>
        <input className="col-md-9" type="text" name="Instagram" ref={Instagram} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">Facebook: </label>
        <input className="col-md-9" type="text" name="Facebook" ref={Facebook} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">LinkedIn: </label>
        <input className="col-md-9" type="text" name="LinkedIn" ref={LinkedIn} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">Whatsapp: </label>
        <input className="col-md-9"  type="text" name="Whatsapp" ref={Whatsapp} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">Mobile: </label>
        <input className="col-md-9" type="text" name="Mobile" ref={Mobile} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">Company Address: </label>
        <textarea className="col-md-9" rows={4} type="address" name="Address" ref={Address} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">AgentName: </label>
        <input className="col-md-9" type="text" name="AgentName" ref={AgentName} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">Upload new Map Image: </label>
        <input className="ps-0 col-md-9" type="file" name="image" ref={mapName} onChange={(e)=>{
            imageref.current.src=URL.createObjectURL(e.target.files[0])
        }}/>
    </div >
    <div className="row  align-items-center my-2">
        <label className="col-md-3">Uploaded Map Image: </label>
        <div className="col-md-9" style={{height:"100px",width:"100px"}}>
            {res.image?<img src={res.image} ref={imageref}
             onError={(e)=>{
                e.target.style.textIndent="-10000px"
               }}
             style={{width:"100%",width:"100%",objectFit:"cover"}} 
             alt="" />:"Upload new image"}
        </div>
    </div>
    
    <div className="position-fixed bottom-0 start-0 end-0 bg-light">
    <button className="mx-auto" style={{width:"fit-content"}} type="submit">Submit</button>
    </div>

</form>



}


// export async function getStaticProps({ params }) {

//     const whole_app_data=await a()
  
//     return {
//       props:whole_app_data,
//     }
//   }
  
  
//   const a=async()=>{
//   console.log("urlllllllllllll",process.env.url)
//     let general=await fetch(`${process.env.url}/api/general`);
//     general= await general.json()
//     general=general.res[0]
  
   
  
  
  
//     return general
  
  
//     //dispatch({type:"INITIAL_STATE",data:state})
//   }
  