"use client"
import {BsFacebook,BsInstagram,BsLinkedin,BsWhatsapp} from 'react-icons/bs'
export default ()=>{


    return <section className="company-intro p-3">
        <h4 className="text-center sub-headings fw-bold">Want to Work abroad?</h4>
        {/* <h5  className="company-detail-head">Trust India’s Best Career Consultant</h5> */}
        <p className="company-detail"><span className=" fs-4 fw-bolder fw-light">V.V.Air Travels</span> is India’s Best Overseas Career Consultant and largest B2C immigration firm. 
            Established in 2020, We are Licensed Recruitment Agents
             in India . As part of our services, we provide personal one-on-one counseling to about 100+ 
             individual inquiries every month for migration and work visas.Over 50% of our customers are through
              word-of-mouth. No other company understands overseas careers like we do.</p>

        <div className="social-media-icons d-flex gap-4 align-items-center">
            <a href="#"><BsFacebook  className="facebook" size={25} /></a>
            <a href="#"><BsInstagram className="instagram" size={25}/></a>
            <a href="#"><BsLinkedin className="Linkedin" size={25}/></a>
            <a href="#"><BsWhatsapp  className="whatsapp-link" size={25}/></a>
        </div>
    </section>
}