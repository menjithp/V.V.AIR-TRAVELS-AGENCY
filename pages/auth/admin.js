import Link from 'next/link';
import { useContext } from 'react';
import {Context} from '../App'
import Button from '@/Basic-components/Button'
import {signOut} from 'next-auth/react'
import Redirect from '../edit/redirect';

export default ()=>{
    const {state,dispatch}=useContext(Context)
    const general=state.general


    return <Redirect><section className="admin-home linear-gradient-violet">
        <h3 className="position-absolute top-0 admin-welcome text-center fw-bold p-2 violet-color ">Welcome {general.AgentName} ,</h3>
        <nav>
            <ul>
               <li className="fs-4 fw-bolder"> <Link href="/edit/general">General</Link></li>
               <li className="fs-4 fw-bolder"> <Link href="/edit/country">Country</Link></li>
               <li className="fs-4 fw-bolder"> <Link href="/edit/jobs">Jobs</Link></li>
               <li className="fs-4 fw-bolder"> <Link href="/edit/snapshot">Snapshots</Link></li>
            </ul>
        </nav>
        <Button className="mt-5" onClick={()=>signOut()}>Sign Out</Button>
    </section>
    </Redirect>
}