import React, { useEffect, useState } from 'react'
import HomeWorkRoundedIcon from '@material-ui/icons/HomeWorkRounded';
import { Avatar, Button} from '@material-ui/core';
import '../css/Sidebar.css'
import { CalendarTodayRounded } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import db, { auth } from '../firebase';
import { useStateValue } from '../StateProvider';
import Subject from './Subject';
const Sidebar = () => {
    const [{user},] = useStateValue();
    const [teach,setTeach] = useState([]);
    const [teacher,setTeacher] = useState([]);
    const [stud,setStud] = useState([]);
    const [student,setStudent] = useState([])
    useEffect(()=>{
        db.collection('Users').where('email','==',user.email).where('role','==','Teacher')  
        .onSnapshot((snapshot)=>(
            setTeach(snapshot.docs.map((item)=>({id : item.id,data : item.data()})))
        ))
        db.collection('Users').where('email','==',user.email).where('role','==','Student')
        .onSnapshot((snapshot)=>(
            setStudent(snapshot.docs.map((item)=>({id : item.id,data : item.data()})))
        ))
    },[user])
    console.log(teach)
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <Link to="/">
                <div className="sidebar__item">
                    <div className="sidebar__itemIcon">
                        <HomeWorkRoundedIcon />
                    </div>
                    <div className="sidebar__itemInfo">
                        <p>Classes</p>
                    </div>
                </div>
                </Link>
            </div>
            <div className="sidebar__middle">
                <div className="sidebar__header">
                    <p>Teaching</p>
                </div>
                {
                    teach.map((sub)=>(
                        <Subject id={sub.data.classroom.id} />
                    ))
                }
            </div>
            <div className="sidebar__end">
                <div className="sidebar__header">
                    <p>Enrolled</p>
                </div>
                {
                    student.map((sub)=>(
                        <Subject id={sub.data.classroom.id} />
                    ))
                }
            </div>
        </div>
    )
}

export default Sidebar
