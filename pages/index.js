import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect } from 'react'
import App from './App'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


  useEffect(()=>{
    fetch('api/hello')

  },[])
  return (
    <>
      <Head>
        <title>V.V.AIR TRAVELS | Foreign Job Consultancy | India's Best Immigration Agency</title>
        <meta name="description" content="V.V.Air Travels. India's Best Immigration Consultant.V.V.Air Travels is India’s Best
        foreign job consultancy and overseas job agency. Established in 2020, We are Licensed foreign Recruitment Agency 
         in India . As part of our services, we provide personal one-on-one counseling to about 100+ individual inquiries every 
         month for migration and work visas.Over 50% of our customers are through word-of-mouth. No other company understands
          overseas careers like we do. " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpg" />
      </Head>
      <main><App /></main>
    </>
  )
}
