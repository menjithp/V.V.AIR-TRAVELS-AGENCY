"use client"
import {useContext,useState,useRef,useEffect} from 'react'
import {Context} from '../App'
import {AiFillDelete} from 'react-icons/ai'
import {FaSave} from 'react-icons/fa'
import HeaderEdit from './headerEdit'

import { useSession } from 'next-auth/react'
import Router from 'next/router'
import Redirect from './redirect'



export  default ()=>{

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

        if(!item._id) dispatch({type:"INSERT_DATA",data:{data:{...item,_id:"temp"},section:"country"}})
        dispatch({type:"loading"})
        try{
            fetch('/api/edit/country',{method:"POST",body:form}).then(res=>{
               if (res.status===200)return res.json()
               throw new Error(res.json().message)
            }).then(res=>{
              
               dispatch({type:"UPDATE_DATA",data:{data:res.res,section:"country",item}})
               dispatch({type:"loading"})
               dispatch({type:'toastgreen',data:"Data updated successfully"})
            })
        }catch(e){
            dispatch({type:"loading"})
            dispatch({type:'toastred',data:e.message})
        }
   
    }

    

    return <Redirect>
    <section className="country-edit-section edit-body">
        <HeaderEdit title="Country Edit" right_function={Add_new_country} />
        
    <ul className="p-5 mt-2">
          { country.length && country.map((item,index)=>
        <li className="position-relative one-country-edit my-2" key={index}>
            <form className="p-2 pb-4" onSubmit={(e)=>e.preventDefault()}>
                <ul className="country-inside">
                    <li className="row">
                        <div className="col-6">
                            <label>Country Name: </label>
                            <input type="text" name="Name" value={item.Name} onChange={(e)=>eventhandler(e,index)}/>
                        </div>
                        <div className="col-6">
                            <label>Upload new Image: </label>
                            <input type="file" name="image" onChange={(e)=>{
                                    const ele=document.querySelector(`.countryimage${index}`)                    
                                eventhandler(e,index)
                                }}></input>
                        </div>
                    </li>
                    <li className="row">
                        <div className="d-flex flex-column col-6">
                            <label>Country Comments: </label>
                            <textarea className="flex-grow-1"  style={{width:"100%"}}type="text" name="Comments" value={item.Comments.join("\n")}
                             onChange={(e)=>eventhandler(e,index)}/>
                        </div>
                        <div className="col-6">
                            <label>Uploaded Image: </label>
                            <div style={{height:"100px",width:"100px"}}>
                               <img ref={imageref} 
                               onError={(e)=>{
                                e.target.style.textIndent="-10000px"
                               }}
                               className={`countryimage${index}`}
                                style={{height:"100%",width:"100%",objectFit:"contain"}}
                                 name="image" src={item.image} alt="" />                              
                            </div>
                        </div>
                    </li>
                </ul>

                <span className=" position-absolute end-0 d-flex gap-3 bottom-0 mb-3 me-3">
                <button onClick={(e)=>handleupload(e,item)} style={{border:"none",background:"transparent"}}><FaSave size={20} /></button>

                    <button onClick={(e)=>handledelete(e,item)} style={{border:"none",background:"transparent"}}><AiFillDelete size={20} /></button>

                </span>

            </form>
    
       </li>  )}
    </ul>
    </section>
    </Redirect>
}