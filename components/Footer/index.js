"use client"
import {RiWhatsappFill} from 'react-icons/ri'
import {BsFillTelephoneForwardFill} from 'react-icons/bs'


export default ()=>{
    return <footer>
        <div className="footer">
         <div className="container">
            <div className="contact-footer d-sm-flex justify-content-between">
               <div className="mobile-view">
                  <a href="tel:+917670800000" className="d-flex gap-3">
                     <div className="text-white"><RiWhatsappFill size={30}/></div>
                     <p className="text-white" >+91 7670 800 000</p>
                  </a>
               </div>
               
               <div>
                  <a href="https://wa.me/918802219999" target="_blank" className="d-flex gap-3">
                     <div className="text-white"><BsFillTelephoneForwardFill size={25}/></div>
                     <p className="text-white" >+91 880 221 9999</p>
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