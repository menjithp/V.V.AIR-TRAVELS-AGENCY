
import Header from '../components/Header/index'
import Impact from '../components/impact/index'
import Countries from '../components/Countries/Index';
import Hero from '../components/hero/index'
import Footer from '../components/Footer/index'
import Jobs from '../components/company-intro'

import "bootstrap/dist/css/bootstrap.min.css";

import Image from 'next/image'
import { useEffect } from 'react';
export default()=>{
   
   useEffect(()=>{
    import ("bootstrap/dist/js/bootstrap.min.js");

   },[])
   
   
   
   return <div className="App">
    <Header />
    <div style={{marginTop:"4rem"}}/>
    {/* <Hero /> */}
    <Jobs/>
    <Countries />
    <Impact />
    <Footer />
    <div className="position-fixed bottom-0  bg-transparent end-0 mb-4 me-3"><Image height={50} width={50} src="/media/general/whatsappg.webp" /></div>
  </div>
}