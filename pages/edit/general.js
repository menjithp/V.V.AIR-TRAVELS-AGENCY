import {useContext,useState,useRef,useEffect} from 'react'
import {Context} from '../App'

export default (props)=>{

// const [state,setState]=useState("")

const {state,dispatch}=useContext(Context)
 let res=state.general

console.log("State",res)
    const companyName=useRef();
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

    useEffect(()=>{
        companyName.current.value=res.companyName
        companyQuote.current.value=res.companyQuote
        companyDesc.current.value=res.companyDesc
        Instagram.current.value=res.Instagram
        Facebook.current.value=res.Facebook
        LinkedIn.current.value=res.LinkedIn
        Whatsapp.current.value=res.Whatsapp
        Mobile.current.value=res.Mobile
        Address.current.value=res.Address
        AgentName.current.value=res.AgentName
        mapName.current.value=res.mapName
    },[res])

    const upload=(e)=>{
        e.preventDefault();
        let obj={
            [companyName.current.name]:companyName.current.value,
            [companyQuote.current.name]:companyQuote.current.value,
            [companyDesc.current.name]:companyDesc.current.value,
            [Instagram.current.name]:Instagram.current.value,
            [Facebook.current.name]:Facebook.current.value,
            [LinkedIn.current.name]:LinkedIn.current.value,
            [Whatsapp.current.name]:Whatsapp.current.value,
            [Mobile.current.name]:Mobile.current.value,
            [Address.current.name]:Address.current.value,
            [AgentName.current.name]:AgentName.current.value,
            [mapName.current.name]:mapName.current.value
        }

   let id="64f85ee382a6d8a3458c9ef6"
    fetch(`/api/general?id=${id}`,{method:"PUT",
body:JSON.stringify(obj)}).then(res=>res.json()).then(res=>{
})
    }

return <form className="d-flex flex-column p-5" onSubmit={upload}>
    Company Name: <input type="text" name="companyName" ref={companyName} />
    Company Quote: <input type="text" name="companyQuote" ref={companyQuote} />
    Company Description: <input type="text" name="companyDesc" ref={companyDesc} />
    Instagram: <input type="text" name="Instagram" ref={Instagram} />
    Facebook: <input type="text" name="Facebook" ref={Facebook} />
    LinkedIn: <input type="text" name="LinkedIn" ref={LinkedIn} />
    Whatsapp: <input type="text" name="Whatsapp" ref={Whatsapp} />
    Mobile: <input type="text" name="Mobile" ref={Mobile} />
    Company Address: <textarea type="text" name="Address" ref={Address} />
    AgentName: <input type="text" name="AgentName" ref={AgentName} />
    mapName: <input type="text" name="mapName" ref={mapName} />

    <button type="submit">Submit</button>

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
  