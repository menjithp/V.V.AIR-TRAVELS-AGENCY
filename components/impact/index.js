"use client"
import office from '../../data/office.json'
import impact from '../../data/impact.json'

export default () => {
  return (
    <section className="impact-section">
      <h4 className="text-center sub-headings">Our snapshot</h4>
      <div className="company-impact">
        <div className="d-sm-flex gap-5 flex-wrap">
              <div className="office justify-content-center align-items-center">
                <h5 className="head-impact text-center">Impact</h5>
                <ul className="p-3 d-flex gap-4 flex-wrap justify-content-center align-items-center">
                {
                  impact.map((item,index)=> <li key={index}>
                  <div className="card_impact static__single">
                    <h3>{item.value}</h3>
                    <h4>{item.Name}</h4>
                  </div>
                </li>)
                }
                </ul>
              </div>
              <div className="office justify-content-center align-items-center">
                <h5 className="head-impact text-center">Office</h5>
                <ul className="p-3 d-flex gap-4 flex-wrap justify-content-center align-items-center">
              {
                  office.map((item,index)=> <li key={index}>
                  <div className="card_impact static__single">
                    <h3>{item.value}</h3>
                    <h4>{item.Name}</h4>
                  </div>
                </li>)
                }
              </ul>
              </div>
        </div>
      </div>
    </section>
  );
};
