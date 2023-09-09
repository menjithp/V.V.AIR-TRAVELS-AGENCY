import HeadBar from './headbar'
import {useContext} from 'react'
import {Context} from '../../pages/App'
export default ()=>{
    const contextobj=useContext(Context)
    const{state,dispatch}=contextobj

    let newstate=state.general


    return <header className="d-flex flex-column">
        {/* <HeadBar /> */}
        <div className="main-head d-flex flex-wrap justify-content-sm-center gap-0 gap-sm-5 align-items-center">
            <h6 className="company-name">{newstate.companyName}</h6>
            <p className="company-quote flex-grow-1 text-center pe-sm-5">{newstate.companyQuote}</p>
          
        </div>
    </header>
}