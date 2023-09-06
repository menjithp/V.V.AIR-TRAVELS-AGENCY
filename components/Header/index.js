import HeadBar from './headbar'
import {useContext} from 'react'
import {Context} from '../../pages/App'
export default ()=>{
    const contextobj=useContext(Context)
    const{state,dispatch}=contextobj


    return <header className="d-flex flex-column">
        {/* <HeadBar /> */}
        <div className="main-head d-flex flex-wrap justify-content-sm-center gap-0 gap-sm-5 align-items-center">
            <h6 className="company-name">{state.companyName}</h6>
            <p className="company-quote flex-grow-1 text-center pe-sm-5">{state.companyQuote}</p>
          
        </div>
    </header>
}