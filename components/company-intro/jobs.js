"use client"
import { useState,useEffect, useContext } from 'react'
import {FaGreaterThan,FaLessThan} from 'react-icons/fa'
// import data from '../../data/jobs.json'

import {Context} from '../../pages/App'

export default ()=>{



const {state,dispatch}=useContext(Context)
const data=state.jobs
  


return <section className="jobs p-3">
  <h4 className="sub-headings text-center fw-bold">Occupations In Demand</h4>
    
<div id="carouselExampleDark" className="carousel observe-card-container carousel-dark slide" data-bs-ride="carousel">
 
  <div className="carousel-inner position-relative">
  <div className="carousel-indicators">
      {data.length && data.map((item,index)=><div key={index}>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to={index} className={`${index===0?"active":""} bg-dark`} aria-current="true" aria-label={`Slide ${index}`}></button>
      </div>)}
  </div>
{data.length && data.map((item,index)=><div key={index} 
className={`carousel-item pb-5 ${index===0 ?"active":""}`} data-bs-interval={3000}>
        <div className="position-relative overflow-hidden jobs-image-container ">
                <img src={`media/jobs/${item.image}`} className="d-block mx-auto" />
                <div class="carousel-caption pb-0 w-100 d-md-block">
                        <h5 className="work-name mb-0">{item.Name}</h5>
                </div>
        </div>
    </div>

)}

<button className="carousel-control-prev text-dark" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <FaLessThan size={15}/>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next text-dark" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <FaGreaterThan size={15}/>
    <span className="visually-hidden">Next</span>
  </button>

  </div>
 
</div>
</section>

}
