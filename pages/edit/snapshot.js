import {useContext,useState,useRef,useEffect} from 'react'
import {Context} from '../App'
import {AiFillDelete} from 'react-icons/ai'
import {FaSave} from 'react-icons/fa'
import HeaderEdit from './headerEdit'
import Redirect from './redirect'


export default ()=>{

// const [state,setState]=useState("")

const {state,dispatch}=useContext(Context)
 const [snapshot,setsnapshot]=useState([])

 useEffect(()=>{
     let a=state.snapshot.filter(item=>item.type==="Impact").concat(state.snapshot.filter(item=>item.type==="Office"))
     console.log("aaaaa",a)
    setsnapshot(a)
 },[state])

 const Add_new_snapshot=(e)=>{
    setsnapshot([{Name:"",value:"",type:""},...snapshot])
}

const eventhandler=(e,item,index)=>{
    let obj=[...snapshot]
    obj[index][e.target.name]=e.target.value
    setsnapshot(obj)

    dispatch({type:"SET_SNAPSHOT_DATA",data:obj})

}
const handledelete=async(e,item)=>{
        if(item._id){
            dispatch({type:"loading"})
            try{
                fetch(`/api/edit/snapshot?id=${item._id}`,{method:"DELETE"}).then(res=>{
                   if (res.status===200)return res.json()
                   throw new Error(res.json().message)
                }).then(res=>{
                   dispatch({type:"DELETE_DATA",data:{_id:item._id,section:"snapshot"}})
                   dispatch({type:"loading"})
                   dispatch({type:'toastgreen',data:"Data Deleted successfully"})
                })
            }catch(e){
                dispatch({type:"loading"})
                dispatch({type:'toastred',data:e.message})
            }
        }else{
            dispatch({type:"DELETE_DATA_TEMP",data:{_temp:item._temp,section:"snapshot"}})
        }
}
const handleupload=async(e,item)=>{

        const form=new FormData();
        let item_to_database={...item}
        let {_temp,...rest}=item_to_database
    console.log("item_to_database",item_to_database)
        form.append("Snapshot",JSON.stringify(item_to_database))

        dispatch({type:"loading"})
        try{
            fetch('/api/edit/snapshot',{method:"POST",body:form}).then(res=>{
               if (res.status===200)return res.json()
            
            }).then(res=>{
              if(item._id)dispatch({type:"UPDATE_DATA",data:{data:res.res,section:"snapshot",item}})
              else if(item._temp)dispatch({type:"UPDATE_DATA_TEMP",data:{data:res.res,section:"snapshot",item}})
              dispatch({type:"loading"})
              dispatch({type:'toastgreen',data:"Data updated successfully"})
            })
        }catch(e){
            dispatch({type:"loading"})
            dispatch({type:'toastred',data:e.message})
        }
}

 console.log(snapshot)
    return <Redirect><section className="impact-edit edit-body pt-4">
        <HeaderEdit title="Snapshot Edit" right_function={()=>dispatch({type:"INSERT_DATA",data:{Name:"",type:"",value:""},section:"snapshot"})} />
        <ul className="p-5 d-flex flex-column gap-2">
        {
            snapshot.map((item,index)=>{
               return <li key={item._id||item._temp}>
                   <form className="position-relative one-snapshot-edit p-2- row gap-3" onSubmit={(e)=>{e.preventDefault();handleupload(e,item)}}>
                  <div className="col-md row">
                        <div className="col">
                            <label>Name: </label>
                            <input required type="text" name="Name" value={item.Name} onChange={(e)=>eventhandler(e,item,index)}/>
                        </div>
                        <div className="col">
                            <label>Value: </label>
                            <input type="text" name="value" value={item.value} onChange={(e)=>eventhandler(e,item,index)}/>
                            </div>
                    </div>
                    <div className="col-md row">
                        
                        <label>Select Snapshot type: </label>
                        <select required name="type" value={item.type} onChange={(e)=>eventhandler(e,item,index)}>
                                <option disabled value="">please select snapshot type</option>
                                <option  value="Impact">Impact</option>
                                <option  value="Office">Office</option>
                            </select>
                        </div>
                    
                    <div style={{justifySelf:"flex-end"}} className="button-container d-flex gap-3">
                    <button type="submit" style={{border:"none",background:"transparent"}}><FaSave size={20} /></button>

                        <button onClick={(e)=>handledelete(e,item)} style={{border:"none",background:"transparent"}}><AiFillDelete size={20} /></button>
                    </div>
                    </form>
                </li>
            })
        }
    </ul>
    </section>
    </Redirect>
}