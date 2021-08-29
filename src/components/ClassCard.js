import { Avatar, IconButton } from '@material-ui/core'
import { WorkOutline } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import '../css/ClassCard.css'
import db from '../firebase'
const ClassCard = ({id}) => {
    const [classroom,setClassroom] = useState();
    useEffect(()=>{
        if(id){
        db.collection('classrom').doc(id)
        .onSnapshot(snapshot=>setClassroom(snapshot.data()))
        }
    },[id])
    console.log(classroom);
    return (
            <div className="classcard__class">
                <div className="classcard__header">
                    <img src={classroom?.background}></img>
                    <p className="classcard__headerTitle">{classroom?.title}</p>
                    <p className="classcard__headersubTitle">{classroom?.subtitle}</p>
                    <div className="classcard__avatar">
                        <Avatar src={classroom?.createdBy?.photoURL}/>
                    </div>
                </div>
                <div className="classcard__status">
                    <p>Assignement 1 Due Today</p>
                </div>
                <div className="classcard__footer">
                    <IconButton>
                        <WorkOutline />
                    </IconButton>
                </div>
            </div>
    )
}

export default ClassCard
