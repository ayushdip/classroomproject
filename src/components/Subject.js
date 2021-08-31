import React, { useEffect,useState } from 'react'
import db from '../firebase'
import { Avatar } from '@material-ui/core';
import '../css/Sidebar.css'
import { Link } from 'react-router-dom';
const Subject = ({id}) => {
    const [classroom,setClassroom] = useState({});
    useEffect(()=>{
        db.collection('classrom').doc(id).onSnapshot((snapshot)=>(
            setClassroom({id:snapshot.id,data : snapshot.data()})
        ))
    },[])
    console.log(classroom);
    return (
        <div className="sidebar__item">
            <div className="sidebar__itemIcon">
                <Avatar src={classroom?.data?.background}/>
            </div>
            <Link to={`/classes/${id}`}>
            <div className="sidebar__itemInfo">
                <p><span style={{fontWeight : "600",color : "grey"}}>{classroom && classroom?.data?.title}</span><br />
                <span style={{fontWeight : "200",color : "grey"}}>{classroom && classroom?.data?.subtitle}</span>
                </p>
            </div>
            </Link>
            
        </div>
    )
}

export default Subject
