"use client"
import {RiWhatsappFill} from 'react-icons/ri'
import {BsFillTelephoneForwardFill} from 'react-icons/bs'
import { Context } from '../../pages/App'
import { useContext } from 'react'
export default ()=>{

   const {state,dispatch}=useContext(Context);
   const newstate=state.general
    return <footer>
        <div className="footer">
         <div className="container">
            <div className="contact-footer d-sm-flex justify-content-between">
               <div className="mobile-view">
                  <a href={`https://wa.me/${newstate.Whatsapp}`} className="d-flex gap-3">
                     <div className="text-white"><RiWhatsappFill size={30}/></div>
                     <p className="text-white" >{newstate.Whatsapp}</p>
                  </a>
               </div>
               
               <div>
                  <a href={`tel:+91${newstate.Mobile}`} target="_blank" className="d-flex gap-3">
                     <div className="text-white"><BsFillTelephoneForwardFill size={25}/></div>
                     <p className="text-white" >{newstate.Mobile}</p>
                  </a>
               </div>
            </div>
            <br />
            <div>
               <p className="footer-font text-white text-center" > ©V.V.AIR TRAVELS. ALL RIGHTS RESERVED. </p>
            </div>
         </div>
      </div>

    </footer>
}