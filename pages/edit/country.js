import {useContext,useState,useRef,useEffect} from 'react'
import {Context} from '../App'
import {AiFillDelete,AiFillPlusCircle} from 'react-icons/ai'
import {GrEdit} from 'react-icons/gr'
import {BsFillCloudUploadFill} from 'react-icons/bs'



export default ()=>{

    const {state,dispatch}=useContext(Context)
    const[country,setCountry]=useState(state.country)
    const[changedObjects,setchangedObjects]=useState({})
    const[deletedObjects,setdeletedObjects]=useState([])

    useEffect(()=>{
        setCountry(state.country)
    },[state])

    const eventhandler=(e,item,index)=>{
            let obj=[...country]

            if(e.target.name!=="Comments")obj[index][e.target.name]=e.target.value
            else obj[index][e.target.name]=e.target.value.split(",")
            
            setCountry(obj)

            if (item._id){
                let temp={...changedObjects}
                temp[item._id]=item
                setchangedObjects(temp)
            }
            
            
    }
    const handledelete=async(e,item)=>{
        if(item._id){
            let temp=[...deletedObjects]
            temp.push(item)
             setdeletedObjects(temp)
        }
     
       setCountry(country.filter(one_country=>JSON.stringify(one_country)!==JSON.stringify(item)))
    }

    const save=async(e)=>{

        let changedObjects1=Object.values(changedObjects).filter(item=>!deletedObjects.map(item1=>item1._id).includes(item._id))
        changedObjects1.push(...country.filter(one_country=>!one_country._id))
        let response=await fetch('/api/country',{method:"PUT",body:JSON.stringify(changedObjects1)})
       response=await response.json()
       console.log("response",response)

       console.log("changedObjects",changedObjects1)
       let deleting_ids=deletedObjects.map(item=>item._id)
         response=await  fetch('/api/country',{method:"DELETE",body:JSON.stringify(deleting_ids)})
        response=await response.json()
        console.log("response",response)
    }

    return <section className="country-edit-section">
        <div className="d-flex position-fixed top-0 start-0 w-100 align-items-center bg-light">
        <h5 className="text-center flex-grow-1">Country Edit</h5>
        <button onClick={()=>{
            dispatch({type:"ADD_NEW_COUNTRY"})
            }} className="me-4" style={{border:"none",background:"none",alignSelf:"flex-end"}}>
            <AiFillPlusCircle size={20}/>
        </button>
        </div>
        
    <ul className="p-5 d-flex flex-column gap-5">
          { country.length && country.map((item,index)=>
        <li className="d-md-flex align-items-center gap-4" key={index}>
      <span> Country Name: <input type="text" name="Name" value={item.Name} onChange={(e)=>eventhandler(e,item,index)}/></span>
      <span className="flex-grow-1">Country Comments: <textarea value={item.Comments.join(",")} onChange={(e)=>eventhandler(e,item,index)} type="text" name="Comments" style={{width:"100%"}} /></span>
      <span>Image<input type="file" name="image" onChange={(e)=>eventhandler(e,item,index)}></input></span>
      <span>country Image: <img  style={{width:"100px",width:"100px"}} name="image" src={`/media/country/${item.image}`} /></span>
      <span className="d-flex gap-2">
          <button onClick={(e)=>handledelete(e,item)} style={{border:"none",background:"transparent"}}><AiFillDelete size={20} /></button>
          {/* <button style={{border:"none",background:"transparent"}}><GrEdit size={20}/></button> */}
          {/* <button style={{border:"none",background:"transparent"}}><BsFillCloudUploadFill size={20} /></button> */}
      </span>
       </li>  )}
    </ul>
    <button onClick={save}>Save All</button>
    </section>
}