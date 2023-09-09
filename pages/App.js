
import Header from '../components/Header/index'
import Snapshot from '../components/snapshot/index'
import Countries from '../components/Countries/Index';
import Hero from '../components/hero/index'
import Footer from '../components/Footer/index'
import Jobs from '../components/company-intro'
import Office from '../components/contact-point'


import Image from 'next/image'
import { useEffect,createContext,useContext  } from 'react';

export const Context=createContext()


export default()=>{


  console.log("ooooolu macha")
   

   const{state,dispatch}=useContext(Context)
   const newstate=state.general
   
   return <div className="App">
    <Header />
    <div style={{marginTop:"3.7rem"}}/>
    {/* <Hero /> */}
    <Jobs/>
    <Countries />
    <Snapshot />
    <Office />
    <Footer />
    <a href={`https://wa.me/${newstate.Whatsapp}`} className="position-fixed bottom-0  bg-transparent end-0 mb-4 me-3">
      <Image height={50} width={50} src="/media/general/whatsappg.webp" />
    </a>
  </div>
}

