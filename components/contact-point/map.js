
import {useContext} from 'react'
import {Context} from '../../pages/App'
export default ()=>{
    const contextobj=useContext(Context)
    const{state,dispatch}=contextobj

    const newstate=state.general

    const googleMapsImageURL = newstate.mapName;

  let lat=11.374307735428973
  let long=78.00465513540651



  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${lat},${long}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={googleMapsImageURL} alt="Google Maps" style={{width:"100%",height:"200px",objectFit:"contain"}} />
    </a>
  );
}

