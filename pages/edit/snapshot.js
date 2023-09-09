import {useContext,useState,useRef,useEffect} from 'react'
import {Context} from '../App'
import {AiFillDelete,AiFillPlusCircle} from 'react-icons/ai'

export default ()=>{

// const [state,setState]=useState("")

const {state,dispatch}=useContext(Context)
 const [snapshot,setsnapshot]=useState([])
 const[changedObjects,setchangedObjects]=useState({})
const[deletedObjects,setdeletedObjects]=useState([])

 useEffect(()=>{
     let a=state.snapshot.filter(item=>item.type==="Impact").concat(state.snapshot.filter(item=>item.type==="Office"))
     console.log("aaaaa",a)
    setsnapshot(a)
 },[state])

 const Add_new_snapshot=(e)=>{
    setsnapshot([...snapshot,{Name:"",value:"",type:""}])
}

const eventhandler=(e,item,index)=>{
    let obj=[...snapshot]

    obj[index][e.target.name]=e.target.value
    
    setsnapshot(obj)

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

        setsnapshot(snapshot.filter(one_country=>JSON.stringify(one_country)!==JSON.stringify(item)))
}
const save=async(e)=>{

        let changedObjects1=Object.values(changedObjects).filter(item=>!deletedObjects.map(item1=>item1._id).includes(item._id))
        changedObjects1.push(...snapshot.filter(one_country=>!one_country._id))
        let response=await fetch('/api/snapshot',{method:"PUT",body:JSON.stringify(changedObjects1)})
        response=await response.json()
        console.log("response",response)

        console.log("changedObjects",changedObjects1)
        let deleting_ids=deletedObjects.map(item=>item._id)
        response=await  fetch('/api/snapshot',{method:"DELETE",body:JSON.stringify(deleting_ids)})
        response=await response.json()
        console.log("response",response)
}

 console.log(snapshot)
    return <section className="impact-edit p-5">
        <div className="d-flex position-fixed top-0 start-0 w-100 align-items-center bg-light">
        <h5 className="text-center flex-grow-1">Snapshot Edit</h5>
        <button onClick={Add_new_snapshot} className="me-4" style={{border:"none",background:"none",alignSelf:"flex-end"}}>
            <AiFillPlusCircle size={20}/>
        </button>
        </div>
        <ul className="p-5 d-flex flex-column gap-2">
        {
            snapshot.map((item,index)=>{
               return <li key={index} className="d-flex gap-3">
                    <span>Name: <input type="text" name="Name" value={item.Name} onChange={(e)=>eventhandler(e,item,index)}/></span>
                    <span>Value: <input type="text" name="value" value={item.value} onChange={(e)=>eventhandler(e,item,index)}/></span>
                    <span>Select Snapshot type: <select  name="type" value={item.type} onChange={(e)=>eventhandler(e,item,index)}>
                            <option disabled value="">please select snapshot type</option>
                            <option  value="Impact">Impact</option>
                            <option  value="Office">Office</option>
                        </select>
                    </span> 
                </li>
            })
        }
    </ul>
   
    <button onClick={save}>Save All</button>
    </section>
}