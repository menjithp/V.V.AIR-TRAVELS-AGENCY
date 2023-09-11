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
  
  // useEffect(()=>{
  //   if(props){
  //     dispatch({type:"INITIAL_STATE",data:props})
  //   }
  // },[])


  return (
      <App /> 
     //<></>
      )
}

// export async function getStaticProps({ params }) {

//   const whole_app_data=await a()

//   return {
//     props:whole_app_data,
//   }
// }

