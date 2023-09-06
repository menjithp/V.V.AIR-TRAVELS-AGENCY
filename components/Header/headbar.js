"use client"
import {RiWhatsappFill} from 'react-icons/ri'
import {BsFillTelephoneForwardFill} from 'react-icons/bs'

export default ()=>{
    return <div className="head-bar">
        <div className="contact-head">
            <ul className="d-flex align-items-center gap-3 fs-6">
                <li>
                <BsFillTelephoneForwardFill size={20}/>
                </li>
                <li>
                    8349498768
                </li>
                <li>
                <RiWhatsappFill size={20}/>
                </li>
                <li>
                    8349498768
                </li>
            </ul>
        </div>
        
    </div>
}