import {useContext,useState,useRef,useEffect} from 'react'
import {Context} from '../App'
import {AiFillDelete} from 'react-icons/ai'
import {FaSave} from 'react-icons/fa'
import HeaderEdit from './headerEdit'


export default ()=>{

const {state,dispatch}=useContext(Context)
const [jobs,setjobs]=useState([])
const imageref=useRef()

useEffect(()=>{
    setjobs(state.jobs)
},[state])

const Add_new_job=(e)=>{
    setjobs([{Name:"",image:""},...jobs])
}
const eventhandler=(e,index,item)=>{
    let obj=[...jobs]

    if(e.target.name==="image"){
        obj[index]["imagedata"]=e.target.files[0]
        obj[index][e.target.name]=URL.createObjectURL(e.target.files[0])
    }else  obj[index][e.target.name]=e.target.value

    setjobs(obj)
}
const handledelete=async(e,item)=>{
    e.preventDefault()
        if(item._id){
        dispatch({type:"loading"})
        try{
            fetch(`/api/edit/jobs?id=${item._id}`,{method:"DELETE"}).then(res=>{
               if (res.status===200)return res.json()
               throw new Error(res.json().message)
            }).then(res=>{
               dispatch({type:"DELETE_DATA",data:{_id:item._id,section:"jobs"}})
               dispatch({type:"loading"})
               dispatch({type:'toastgreen',data:"Data Deleted successfully"})
            })
        }catch(e){
            dispatch({type:"loading"})
            dispatch({type:'toastred',data:e.message})
        }
    }else{
        setjobs(jobs.filter(one_country=>JSON.stringify(one_country)!==JSON.stringify(item)))

    }
}
const handleupload=async(e,item)=>{
        const form=new FormData();
        form.append("Jobs",JSON.stringify(item))
        if (item["imagedata"])form.append("Jobs",item["imagedata"])

        dispatch({type:"loading"})
        try{
            fetch('/api/edit/jobs',{method:"POST",body:form}).then(res=>{
               if (res.status===200)return res.json()
               throw new Error(res.json().message)
            }).then(res=>{
               dispatch({type:"INSERT_DATA",data:{data:res.res,section:"jobs"}})
               dispatch({type:"loading"})
               dispatch({type:'toastgreen',data:"Data updated successfully"})
            })
        }catch(e){
            dispatch({type:"loading"})
            dispatch({type:'toastred',data:e.message})
        }
      
}

return <section className="edit-jobs">
    <HeaderEdit title="Jobs Edit" right_function={Add_new_job} />
    <ul className="p-5 edit-body">
        {jobs.map((item,index)=><li className="row one-job gap-2 my-2" key={index}>
            <div className="col">
            <label>Job</label>
            <input type="text" name="Name" value={item.Name} onChange={(e)=>eventhandler(e,index,item)}/>

            </div>
            <div className="col">
            <label>Upload Job Image</label>
            <input type="file" name="image" value={item.name} onChange={(e)=>{
                 imageref.current.src=URL.createObjectURL(e.target.files[0])
                eventhandler(e,index,item)
            }}/>

            </div>
            <div className="col">
            <label>Uploaded Image</label>
            <div style={{height:"100px",width:"100px"}}>
               <img ref={imageref} src={item.image?item.image:""} style={{height:"100%",width:"100%",objectFit:"contain"}} alt="Upload Job Image"/>
            </div>
            </div>
            <div className="col d-flex gap-2">
                <button onClick={(e)=>handledelete(e,item)} style={{border:"none",background:"transparent"}}><AiFillDelete size={20} /></button>
                <button onClick={(e)=>handleupload(e,item)} style={{border:"none",background:"transparent"}}><FaSave size={20} /></button>
            </div>
        </li>)}
    </ul>
</section>


}