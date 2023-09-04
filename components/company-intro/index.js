import Jobs from './jobs'
import Intro from './company-description'

export default ()=>{

    return <section style={{background:"transparent url(/media/intro/intro1.jpg) no-repeat"}} className="introduction position-relative d-md-flex justify-content-between px-3">
        <div className="position-relative col col-md-5 h-100 intro z-index-2"><Intro /></div>
        <div className="position-relative col col-md-7 z-index-2"><Jobs /></div>
        <div className="position-absolute top-0 start-0 bottom-0 end-0 backdrop-hero"></div>
    </section>
}