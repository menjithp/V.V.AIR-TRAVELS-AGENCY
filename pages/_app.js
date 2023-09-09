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

import "bootstrap/dist/css/bootstrap.min.css";
import Head from 'next/head'

import {a} from './index'

const initialstate={
  general:{
    "companyName":"",
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
    jobs:[]
}
import {Context} from './App'
import { useEffect,useReducer } from 'react'

export default function App({ Component, pageProps,data }) {

  const [state,dispatch]=useReducer(reducer,initialstate)

  
console.log("initial-props",data)
  useEffect(()=>{
    import ("bootstrap/dist/js/bootstrap.min.js");
    dispatch({type:"INITIAL_STATE",data:data})

  },[])

  console.log("srk",state.country)
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
  
  <Context.Provider value={{state,dispatch}}>
   
    <Component {...pageProps} />
    
    </Context.Provider> 
    </>
}

const reducer=(state,action)=>{

  switch (action.type) {
    case "ADD_NEW_COUNTRY":
      let draft={...state}
      draft.country.push({
        "Name":"",
        "Comments":[],
        "image":"",
    })

    console.log("draft",draft)

    return draft
  case "INITIAL_STATE":
    return action.data
     
      
  }
}


App.getInitialProps=async()=>{
  let data=await a();

  return {data};
}