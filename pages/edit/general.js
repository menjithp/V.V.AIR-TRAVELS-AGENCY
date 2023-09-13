import {useContext,useState,useRef,useEffect} from 'react'
import {Context} from '../App'

import HeaderEdit from './headerEdit'
import Redirect from './redirect'
export default (props)=>{


const {state,dispatch}=useContext(Context)
const [general,setgeneral]=useState(null)
const [file,setfile]=useState(null)

console.log("state.general",state.general)

    useEffect(()=>{
        setgeneral(state.general)
    },[state.general])

    const upload=(e)=>{
        e.preventDefault();
      
        let form=new FormData()
        form.append("General",JSON.stringify(general))


        
        if (file)form.append("General",file)




        
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

    const eventhandler=(e)=>{
        let obj={...general}

        console.log("obj",obj)


        if(e.target.name==="image"){
            setfile(e.target.files[0])
            obj[e.target.name]=URL.createObjectURL(e.target.files[0])
        }
        else obj[e.target.name]=e.target.value
      
        setgeneral(obj)
        
}

return <Redirect>
<form className="px-5 pb-5 mx-2 general-details-edit edit-body" onSubmit={upload}>
    <HeaderEdit title="General Edit" />
    <div className="row align-items-center my-3">
        <label className="col-md-3">Company Name: </label>
        <input className="col-md-9" required type="text" name="Name" value={general?.Name} onChange={eventhandler} />
    </div>
    <div className="row my-3">
        <label className="col-md-3">Company Quote: </label>
        <input className="col-md-9" required type="text" name="companyQuote" value={general?.companyQuote} onChange={eventhandler} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">Company Description: </label>
        <input  className="col-md-9" required type="text" name="companyDesc" value={general?.companyDesc} onChange={eventhandler} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">Instagram: </label>
        <input className="col-md-9" type="text" name="Instagram" value={general?.Instagram} onChange={eventhandler} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">Facebook: </label>
        <input className="col-md-9" type="text" name="Facebook" value={general?.Facebook} onChange={eventhandler} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">LinkedIn: </label>
        <input className="col-md-9" type="text" name="LinkedIn" value={general?.LinkedIn} onChange={eventhandler} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">Whatsapp: </label>
        <input className="col-md-9"  type="text" name="Whatsapp" value={general?.Whatsapp}  onChange={eventhandler} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">Mobile: </label>
        <input className="col-md-9" type="text" name="Mobile"  value={general?.Mobile} onChange={eventhandler} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">Company Address: </label>
        <textarea className="col-md-9" rows={4} type="address" name="Address" value={general?.Address} onChange={eventhandler} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">AgentName: </label>
        <input className="col-md-9" type="text" name="AgentName" value={general?.AgentName} onChange={eventhandler} />
    </div>
    <div className="row  my-2">
        <label className="col-md-3">Upload new Map Image: </label>
        <input className="ps-0 col-md-9" type="file" name="image" onChange={(e)=>{
            document.querySelector(`.general_image`).src=URL.createObjectURL(e.target.files[0])
            eventhandler(e)
        }}/>
    </div >
    <div className="row  align-items-center my-2">
        <label className="col-md-3">Uploaded Map Image: </label>
        <div className="col-md-9" style={{height:"100px",width:"100px"}}>
            {general? (general.image&&<img src={general.image} className={`general_image`}
             onError={(e)=>{
                e.target.style.textIndent="-10000px"
               }}
             style={{width:"100%",width:"100%",objectFit:"cover"}} 
             alt="" />):"Upload new image"}
        </div>
    </div>
    
    <div className="position-fixed bottom-0 start-0 end-0 bg-light">
    <button className="mx-auto" style={{width:"fit-content"}} type="submit">Submit</button>
    </div>

</form>
</Redirect>


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
  