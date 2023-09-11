import {TiArrowBack} from 'react-icons/ti'
import {AiFillPlusCircle} from 'react-icons/ai'

import Link from 'next/link'


export default ({right_function,title})=>{


    return <header className="d-flex start-0 align-items-center justify-content-between p-2">
         <Link href="/admin" className="me-4" style={{border:"none",padding:"10px",cursor:"pointer",background:"none",color:"white"}}>
             <TiArrowBack size={20}/>
        </Link>
        <h5 style={{letterSpacing:"1px"}} className="text-center flex-grow-1">{title}</h5>
        {right_function && <button onClick={right_function} className="me-4" style={{border:"none",background:"none",color:"white"}}>
            <AiFillPlusCircle size={20}/>
        </button>}
    </header>
}