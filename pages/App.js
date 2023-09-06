
import Header from '../components/Header/index'
import Impact from '../components/impact/index'
import Countries from '../components/Countries/Index';
import Hero from '../components/hero/index'
import Footer from '../components/Footer/index'
import Jobs from '../components/company-intro'
import Office from '../components/contact-point'

import "bootstrap/dist/css/bootstrap.min.css";

import Image from 'next/image'
import { useEffect,createContext, useReducer } from 'react';

export const Context=createContext()

const initialstate={
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
}
export default()=>{
   

  const [state,dispatch]=useReducer(reducer,initialstate)
   useEffect(()=>{
    import ("bootstrap/dist/js/bootstrap.min.js");


    fetch("api/general").then(res=>res.json()).then(res=>dispatch(res.res))

   },[])
   
   
   
   return <Context.Provider value={{state,dispatch}}><div className="App">
    <Header />
    <div style={{marginTop:"3.7rem"}}/>
    {/* <Hero /> */}
    <Jobs/>
    <Countries />
    <Impact />
    <Office />
    <Footer />
    <div className="position-fixed bottom-0  bg-transparent end-0 mb-4 me-3"><Image height={50} width={50} src="/media/general/whatsappg.webp" /></div>
  </div>
  </Context.Provider>
}

const reducer=(state,action)=>{
  return action[0]
}