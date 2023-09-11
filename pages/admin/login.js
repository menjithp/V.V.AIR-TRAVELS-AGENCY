import Link from 'next/link';
import { useContext ,useRef} from 'react';
import {Context} from '../App'

export default ()=>{
    const {state,dispatch}=useContext(Context)
    const general=state.general

    const passwordref=useRef()
    const usernameref=useRef();

    const formsubmit=(e)=>{
        e.preventDefault();

    }

    return <section className="admin-home">
        <h3 className="text-center position-absolute top-0 admin-welcome text-center fw-bold p-2 violet-color ">Welcome ,</h3>
        <form className="loginform" onSubmit={formsubmit}>
            <label htmlFor={usernameref}>Email</label>
            <input type="email" name="email" placeholder="Enter email" ref={usernameref} required/>
            <label htmlFor={passwordref}>Password</label>
            <input type="password" name="password" required placeholder="Enter password" ref={passwordref}/>
            <button type="submit">Login</button>
        </form>
    </section>
}