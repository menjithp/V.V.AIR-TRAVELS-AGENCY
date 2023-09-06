import Map from './map'
import Address from './office-address'

export default ()=>{



    return<section className="">
        <h4 className="sub-headings text-center mt-4">Office Location & Contact Point</h4>
        <div className="contact-section row align-items-center ">
        <div className="address-head col-md-4 p-5"><Address/></div>
        <div className="map-head col-md-8 p-2"><Map/></div>
        </div>
        </section>
}