import {useContext,useState,useRef,useEffect} from 'react'
import {Context} from '../App'
import {AiFillDelete,AiFillPlusCircle} from 'react-icons/ai'

export default ()=>{

const {state,dispatch}=useContext(Context)
const [jobs,setjobs]=useState([])
const[changedObjects,setchangedObjects]=useState({})
const[deletedObjects,setdeletedObjects]=useState([])

useEffect(()=>{
    setjobs(state.jobs)
},[state])

const Add_new_job=(e)=>{
    setjobs([...jobs,{Name:"",image:"",image_file:""}])
}
const eventhandler=(e,index,item)=>{
    let obj=[...jobs]

    console.log("jobs",jobs)

    obj[index][e.target.name]=e.target.value
    
    setjobs(obj)

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

        setjobs(jobs.filter(one_country=>JSON.stringify(one_country)!==JSON.stringify(item)))
}
const save=async(e)=>{

        let changedObjects1=Object.values(changedObjects).filter(item=>!deletedObjects.map(item1=>item1._id).includes(item._id))
        changedObjects1.push(...jobs.filter(one_country=>!one_country._id))
        let response=await fetch('/api/jobs',{method:"PUT",body:JSON.stringify(changedObjects1)})
        response=await response.json()
        console.log("response",response)

        console.log("changedObjects",changedObjects1)
        let deleting_ids=deletedObjects.map(item=>item._id)
        response=await  fetch('/api/jobs',{method:"DELETE",body:JSON.stringify(deleting_ids)})
        response=await response.json()
        console.log("response",response)
}
console.log("jobs",jobs)
return <section className="edit-jobs">
     <div className="d-flex position-fixed top-0 start-0 w-100 align-items-center bg-light">
        <h5 className="text-center flex-grow-1">Jobs Edit</h5>
        <button onClick={Add_new_job} className="me-4" style={{border:"none",background:"none",alignSelf:"flex-end"}}>
            <AiFillPlusCircle size={20}/>
        </button>
        </div>
    <ul className="p-5">
        {jobs.map((item,index)=><li className="d-flex align-items-center gap-3 my-2" key={index}>
            <input type="text" name="Name" value={item.Name} onChange={(e)=>eventhandler(e,index,item)}/>
            <input type="file" name="Image_file" value={item.name} onChange={(e)=>eventhandler(e,index,item)}/>
            <img src={`/media/jobs/${item.image}`} style={{height:"100px",width:"100px"}}/>
            <span className="d-flex gap-2">
            <button onClick={(e)=>handledelete(e,item)} style={{border:"none",background:"transparent"}}><AiFillDelete size={20} /></button>
      </span>
        </li>)}
    </ul>
    <button onClick={save}>Save All</button>
</section>


}