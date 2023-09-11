"use client"
import {useContext,useState,useRef,useEffect} from 'react'
import {Context} from '../App'
import {AiFillDelete} from 'react-icons/ai'
import {FaSave} from 'react-icons/fa'
import HeaderEdit from './headerEdit'



export default ()=>{
    const {state,dispatch}=useContext(Context)
    const[country,setCountry]=useState(state.country)
    const imageref=useRef()

    useEffect(()=>{
        setCountry(state.country)
    },[state])

    const eventhandler=(e,index)=>{
            let obj=[...country]


            if(e.target.name==="image"){
                obj[index]["imagedata"]=e.target.files[0]
                obj[index][e.target.name]=URL.createObjectURL(e.target.files[0])
                console.log("country",obj)
            }
            else if(e.target.name==="Comments"){
                obj[index][e.target.name]=e.target.value.split("\n")
            }
            else obj[index][e.target.name]=e.target.value
          
            setCountry(obj)
            
    }
    const handledelete=async(e,item)=>{
        e.preventDefault()

       if(item._id){
        dispatch({type:"loading"})
        try{
            fetch(`/api/edit/country?id=${item._id}`,{method:"DELETE"}).then(res=>{
               if (res.status===200)return res.json()
               throw new Error(res.json().message)
            }).then(res=>{
               dispatch({type:"DELETE_DATA",data:{_id:item._id,section:"country"}})
               dispatch({type:"loading"})
               dispatch({type:'toastgreen',data:"Data Deleted successfully"})
            })
        }catch(e){
            dispatch({type:"loading"})
            dispatch({type:'toastred',data:e.message})
        }
    }
    else{
        setCountry(country.filter(one_country=>JSON.stringify(one_country)!==JSON.stringify(item)))

    }


    }

    const Add_new_country=(e)=>{
        setCountry([{Name:"",image:"",Comments:[]},...country])
    }
  
    const handleupload=async(e,item)=>{
        e.preventDefault()
        const form=new FormData();
        form.append("Country",JSON.stringify(item))
        if (item["imagedata"])form.append("Country",item["imagedata"])

        dispatch({type:"loading"})
        try{
            fetch('/api/edit/country',{method:"POST",body:form}).then(res=>{
               if (res.status===200)return res.json()
               throw new Error(res.json().message)
            }).then(res=>{
               dispatch({type:"INSERT_DATA",data:{data:res.res,section:"country"}})
               dispatch({type:"loading"})
               dispatch({type:'toastgreen',data:"Data updated successfully"})
            })
        }catch(e){
            dispatch({type:"loading"})
            dispatch({type:'toastred',data:e.message})
        }
   
    }

    return <section className="country-edit-section edit-body">
        <HeaderEdit title="Country Edit" right_function={Add_new_country} />
        
    <ul className="p-5 mt-2">
          { country.length && country.map((item,index)=>
        <li className="position-relative one-country-edit my-2" key={index}>
            <form className="p-2" onSubmit={(e)=>e.preventDefault()}>
                <ul className="country-inside">
                    <li className="row">
                        <div className="col-6">
                            <label>Country Name: </label>
                            <input type="text" name="Name" value={item.Name} onChange={(e)=>eventhandler(e,index)}/>
                        </div>
                        <div className="col-6">
                            <label>Upload new Image: </label>
                            <input type="file" name="image" onChange={(e)=>{
                                imageref.current.src=URL.createObjectURL(e.target.files[0])
                                eventhandler(e,index)
                                }}></input>
                        </div>
                    </li>
                    <li className="row">
                        <div className="col-6">
                            <label>Country Comments: </label>
                            <textarea  style={{width:"100%"}}type="text" name="Comments" value={item.Comments.join("\n")}
                             onChange={(e)=>eventhandler(e,index)}/>
                        </div>
                        <div className="col-6">
                            <label>Uploaded Image: </label>
                            <div style={{height:"100px",width:"100px"}}>
                                <img ref={imageref} style={{height:"100%",width:"100%",objectFit:"contain"}} name="image" src={item.image} alt="upload country image" />                              
                            </div>
                        </div>
                    </li>
                </ul>

                <span className=" position-absolute end-0 d-flex gap-2 top-0">
                    <button onClick={(e)=>handledelete(e,item)} style={{border:"none",background:"transparent"}}><AiFillDelete size={20} /></button>
                    <button onClick={(e)=>handleupload(e,item)} style={{border:"none",background:"transparent"}}><FaSave size={20} /></button>

                </span>

            </form>
    
       </li>  )}
    </ul>
    </section>
}