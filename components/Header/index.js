import HeadBar from './headbar'

export default()=>{

    return <header className="d-flex flex-column">
        {/* <HeadBar /> */}
        <div className="main-head d-flex flex-wrap justify-content-sm-center gap-0 gap-sm-5 align-items-center">
            <h6 className="company-name">V.V.AIR TRAVELS</h6>
            <p className="company-quote flex-grow-1 text-center pe-sm-5">India's Best Immigration Consultant</p>
          
        </div>
    </header>
}