import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useContext, useEffect } from 'react'
import App from './App'

import {Context} from './App'

const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {

  const{state,dispatch}=useContext(Context)
  

  console.log("billa ranga basa",props)

  useEffect(()=>{
    if(props){
      dispatch({type:"INITIAL_STATE",data:props})
    }
  },[])


  return (
    <App />
  )
}

// export async function getStaticProps({ params }) {

//   const whole_app_data=await a()

//   return {
//     props:whole_app_data,
//   }
// }


export const a=async()=>{

  let url=process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
  let general=await fetch(`${url}/api/general`);
  general= await general.json()
  general=general.res[0]

  let country=await fetch(`${url}/api/country`)
  country=await country.json()
  country=country.res

  let snapshot=await fetch(`${url}/api/snapshot`)
  snapshot=await snapshot.json();
  snapshot=snapshot.res

  let jobs=await fetch(`${url}/api/jobs`)
  jobs=await jobs.json();
  jobs=jobs.res



  return {general,jobs,snapshot,country}


  //dispatch({type:"INITIAL_STATE",data:state})
}
