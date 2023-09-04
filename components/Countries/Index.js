"use client"
import { useEffect, useState } from 'react';
import country from '../../data/country.json'
import Image from 'next/image'

export default ()=>{
   const[state,setState]=useState("")

   useEffect(()=>{
      fetch('api/getCountry/').then(res=>res.json()).then(res=>setState(res))
   },[])

   console.log("state",state)
    
    return <section className="country p-3">
       <h4 className="text-center sub-headings">Most Popular Countries</h4>
    <ul className="w-layout-grid">
       {country.map((item,index)=> <li key={index} className="one-country">

<div className="vflex-left">
   <div className="icon-hold w-100"><img src={`/media/country/${item.image}`} alt=""/></div>
   <div className="details-country">
         <h5 className="country-title">{item.Name}</h5>
         {item.Comments.map((item2,index2)=> 
         <div className="vflex-left">
            <div className="flex-mid">
               <div className="purple-sep-small tiny"></div>
               <div className="wrap-sep"></div>
               <div key={index2} className="div-block-38">
                  <p className="comments-country">{item2}</p>
               </div>
            </div>
   </div>)}
   </div>
</div>

</li>)}
      
    </ul>
 </section>
}