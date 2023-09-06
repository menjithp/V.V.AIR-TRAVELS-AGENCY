import {useContext} from 'react'
import {Context} from '../../pages/App'
export default ()=>{
    const contextobj=useContext(Context)
    const{state,dispatch}=contextobj

return (
  <section className="address">
    <h4 className="violet-color">{state.AgentName}</h4>
    <h6 className="violet-color">{state.CompanyName}</h6>
    <address>
    {state.Address}
    </address>
  </section>
);
}