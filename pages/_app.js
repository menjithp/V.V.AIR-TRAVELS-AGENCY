
//componenets css
import '@/styles/globals.css'
import '@/styles/App.css'
import '@/styles/components/country.css'
import '@/styles/components/Header.css'
import '@/styles/components/snapshot.css'
import '@/styles/components/Headbar.css'
import '@/styles/components/Footer.css'
import '@/styles/components/jobs.css'
import '@/styles/components/intro.css'
import '@/styles/components/company-description.css'
import '@/styles/components/map.css'
import '@/styles/components/contact-point.css'
import '@/styles/components/address.css'


// edit css imports
import '@/styles/edit/general.css'
import '@/styles/edit/country.css'
import '@/styles/edit/jobs.css'
import '@/styles/edit/snapshot.css'
import '@/styles/edit/common.css'

// admin css imports
import '@/styles/admin/admin.css'
import '@/styles/admin/login.css'

//bootstrap css imports
import "bootstrap/dist/css/bootstrap.min.css";

//import Loader
import Loader from '@/Basic-components/loader'
import Toast from '@/Basic-components/toast'

import {SessionProvider} from 'next-auth/react'

import Head from 'next/head'

import uid from '../Basic-components/uniqueId'

const initialstate={
  general:{
    "Name":"",
    "companyQuote":"",
    "companyDesc":"",
    "Instagram":"",
    "Facebook":"",
    "LinkedIn":"",
    "Whatsapp":"",
    "Mobile":"",
    "Address":"",
    "AgentName":"",
    "mapName":""
    },
    country:[],
    snapshot:[],
    jobs:[],
    loading:false,
    toast:{message:"",background:"",show:false},

}
import {Context} from './App'
import { useEffect,useId,useReducer } from 'react'

export default function App({ Component, pageProps,data }) {

  const [state,dispatch]=useReducer(reducer,initialstate)


  
  useEffect(()=>{
    import ("bootstrap/dist/js/bootstrap.min.js");
    dispatch({type:"INITIAL_STATE",data:data})

   

  },[])

  
  return<>
     <Head>
      <title>V.V.AIR TRAVELS | Foreign Job Consultancy | India's Best Immigration Agency</title>
        <meta name="description" content="V.V.Air Travels. India's Best Immigration Consultant.V.V.Air Travels is India’s Best
        foreign job consultancy and overseas job agency. Established in 2020, We are Licensed foreign Recruitment Agency 
         in India . As part of our services, we provide personal one-on-one counseling to about 100+ individual inquiries every 
         month for migration and work visas.Over 50% of our customers are through word-of-mouth. No other company understands
          overseas careers like we do. " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpg" />
      </Head>
  <SessionProvider >
  <Context.Provider value={{state,dispatch}}>
  {state?.loading && <Loader />}
  <Toast/>
  <Component {...pageProps} />    
    </Context.Provider> 
    </SessionProvider>
    </>
}

const reducer=(state,action)=>{

  switch (action.type) {
  case "INITIAL_STATE":
    return {...state,...action.data}
  case "SET_GENERAL_DATA":
    return {...state,general:action.data}
  case "INSERT_DATA":
    debugger
          if(action.section==="jobs"){
            return {...state,jobs:[{...action.data,_temp:uid()},...state.jobs]}
          }else if(action.section==="country"){
            return {...state,country:[{...action.data,_temp:uid()},...state.country]}
          }else if(action.section==="snapshot"){
            return {...state,snapshot:[{...action.data,_temp:uid()},...state.snapshot]}
           
          }  
  case "DELETE_DATA":
          if(action.data.section==="jobs"){
            return {...state,jobs:state.jobs.filter(item=>item._id!==action.data._id)}
          }else if(action.data.section==="country"){
            return {...state,country:state.country.filter(item=>item._id!==action.data._id)}
          }else if(action.data.section==="snapshot"){
            return {...state,snapshot:state.snapshot.filter(item=>item._id!==action.data._id)}
          }
  case "DELETE_DATA_TEMP":
    debugger
    if(action.data.section==="jobs"){
      return {...state,jobs:state.jobs.filter(item=>item._temp!==action.data._temp)}
    }else if(action.data.section==="country"){
      return {...state,country:state.country.filter(item=>item._temp!==action.data._temp)}
    }else if(action.data.section==="snapshot"){
      return {...state,snapshot:state.snapshot.filter(item=>item._temp!==action.data._temp)}
    }
  case "UPDATE_DATA":
    if(action.data.section==="jobs"){
      let particular_index=state.jobs.findIndex(item=>item._id===action.data.item._id)
      let new_obj=state.jobs
      if(particular_index!==-1) new_obj[particular_index]=action.data.item
      return {...state,jobs:new_obj}
    }else if(action.data.section==="country"){

      let particular_index=state.country.findIndex(item=>item._id===action.data.item._id)
      let new_obj=state.country
      if(particular_index!==-1) new_obj[particular_index]=action.data.item
      return {...state,country:new_obj}

    }else if(action.data.section==="snapshot"){

      let particular_index=state.snapshot.findIndex(item=>item._id===action.data.item._id)
      let new_obj=state.snapshot
      if(particular_index!==-1) new_obj[particular_index]=action.data.item
      return {...state,snapshot:new_obj}
    }
    case "UPDATE_DATA_TEMP":
      if(action.data.section==="jobs"){
        let particular_index=state.jobs.findIndex(item=>item._temp===action.data.item._temp)
        let new_obj=state.jobs
        if(particular_index!==-1) new_obj[particular_index]=action.data.item
        return {...state,jobs:new_obj}
      }else if(action.data.section==="country"){
  
        let particular_index=state.country.findIndex(item=>item._temp===action.data.item._temp)
        let new_obj=state.country
        if(particular_index!==-1) new_obj[particular_index]=action.data.item
        return {...state,country:new_obj}
  
      }else if(action.data.section==="snapshot"){
  
        let particular_index=state.snapshot.findIndex(item=>item._temp===action.data.item._temp)
        let new_obj=state.snapshot
        if(particular_index!==-1) new_obj[particular_index]=action.data.item
        return {...state,snapshot:new_obj}
      }
  case "loading":
    return {...state,loading:!state.loading}
  case "toastred":
    return {...state,toast:{message:action.data,show:!state.toast.show,background:"red"}}
  case "toastgreen":
    return {...state,toast:{message:action.data,show:!state.toast.show,background:"green"}}
  }
  return state
}


App.getInitialProps=async()=>{
  let data=await a();
  return {data};
}


export const a=async()=>{

  let url=process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
 let general=await fetch(`${url}/api/edit/general`);
 general= await general.json()
 general=general.res[0]

 let country=await fetch(`${url}/api/edit/country`)
 country=await country.json()
 country=country.res

 let snapshot=await fetch(`${url}/api/edit/snapshot`)
 snapshot=await snapshot.json();
 snapshot=snapshot.res

 let jobs=await fetch(`${url}/api/edit/jobs`)
 jobs=await jobs.json();
 jobs=jobs.res


 return {general,jobs,snapshot,country}

}
