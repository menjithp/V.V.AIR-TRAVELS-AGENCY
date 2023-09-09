import {useContext} from 'react'
import {Context} from '../../pages/App'
export default ()=>{
    const contextobj=useContext(Context)
    const{state,dispatch}=contextobj

    const newstate=state.general

return (
  <section className="address">
    <h4 className="violet-color">{newstate.AgentName}</h4>
    <h6 className="violet-color">{newstate.CompanyName}</h6>
    <address>
    {newstate.Address}
    </address>
  </section>
);
}