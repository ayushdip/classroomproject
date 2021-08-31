import { Class } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import ClassCard from './ClassCard'
import db from '../firebase'
import { useStateValue } from '../StateProvider'
import '../css/Home.css'
import { Link } from 'react-router-dom'
const Home = () => {
    const [classroom,setClassroom] = useState([])
    const [classId,setclassId] = useState([])
    const [{user},] = useStateValue();
    useEffect(()=>{
            if(user.email){
                db.collection('Users').where('email','==',user.email)
                .onSnapshot(snapshot=>
                    setClassroom(snapshot.docs.map(doc=>doc.data()))
                ) 
            }       
    },[user.email])
    useEffect(()=>{
        setclassId(classroom.map((item)=>item.classroom.id))
    },[classroom])
    return (
        <div className="classcard">
            {
                classId.length==0?<Link to="/new">Create or join class</Link>:classId.map((id)=><Link to={`classes/${id}`}><ClassCard id={id}/></Link>)
            }
        </div>
    )
}

export default Home
