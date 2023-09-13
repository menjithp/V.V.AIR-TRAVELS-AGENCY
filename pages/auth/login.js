"use client"
import { useContext ,useRef} from 'react';
import {Context} from '../App'

import Button from '@/Basic-components/Button'

import { useSession,signIn } from 'next-auth/react';
import Router from 'next/router';

export default ()=>{
    const {state,dispatch}=useContext(Context)
    const general=state.general

    let redirecturl;
    if (typeof window!=="undefined"){
        let {callbackUrl}=Router.query
        redirecturl=callbackUrl
    }

    const {status}=useSession()

    const passwordref=useRef()
    const usernameref=useRef();

    const formsubmit=(e)=>{
        e.preventDefault();

    }


    if (status==="authenticated"){
        Router.push('/auth/admin');
    }
    else if(status==="loading")return null
    else if (status=="unauthenticated")

    return <section className="admin-home">
        <h3 className="text-center position-absolute top-0 admin-welcome text-center fw-bold p-2 violet-color ">Welcome ,</h3>
        <form className="loginform" onSubmit={formsubmit}>
           <h5>Login</h5>
            {/*<label htmlFor={usernameref}>Password</label>
            <input type="email" name="email" placeholder="Enter email" ref={usernameref} required/>
            <label htmlFor={passwordref}>Password</label>
            <input type="password" name="password" required placeholder="Enter password" ref={passwordref}/>
            <button type="submit">Login</button> */}
            <Button onClick={()=>signIn("google",
            { callbackUrl: redirecturl?redirecturl:"/auth/admin" })}>Sign In With Google</Button>
        </form>
    </section>
}