"use client"
import {BsFacebook,BsInstagram,BsLinkedin,BsWhatsapp} from 'react-icons/bs'

import {useContext} from 'react'
import {Context} from '../../pages/App'
export default ()=>{
    const contextobj=useContext(Context)
    const{state,dispatch}=contextobj

    console.log("state00",contextobj)

    return <section className="company-intro p-3">
        <h4 className="text-center sub-headings fw-bold">Want to Work abroad?</h4>
        {/* <h5  className="company-detail-head">Trust India’s Best Career Consultant</h5> */}
        <p className="company-detail"><span className=" fs-4 fw-bolder fw-light">{state.companyName}</span> {state.companyDesc}</p>

        <div className="social-media-icons d-flex gap-4 align-items-center">
            <a href={state.Facebook}><BsFacebook  className="facebook" size={25} /></a>
            <a href={state.Instagram}><BsInstagram className="instagram" size={25}/></a>
            <a href={state.LinkedIn}><BsLinkedin className="Linkedin" size={25}/></a>
            <a href={state.Whatsapp}><BsWhatsapp  className="whatsapp-link" size={25}/></a>
        </div>
    </section>
}