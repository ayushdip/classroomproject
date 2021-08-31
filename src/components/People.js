import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../css/People.css'
import db from '../firebase';
const People = () => {
    const [classroom,setClassroom] = useState([]);
    const {id} = useParams();
    useEffect(()=>{
        db.collection('classrom').doc(id)
        .onSnapshot((snapshot)=>setClassroom({id : snapshot.id,data : snapshot.data()}))
    },[id])
    console.log(classroom);
    return (
        <div className="people">
            <div className="teacher">
                <h1>Teachers</h1>
                {
                    classroom?.data?.people.map((person)=>person.role=="Teacher"?
                    <div className="teacher__info">
                        <Avatar src={person.photoURL}/>
                        <p>{person.name}</p>
                    </div>:<></>
                    )
                }
                
            </div>
            <div className="student">
                <h1>Students</h1>
                {
                    classroom?.data?.people.map((person)=>person.role=="Student"?
                    <div className="teacher__info">
                        <Avatar src={person.photoURL}/>
                        <p>{person.name}</p>
                    </div>:<></>
                    )
                }
            </div>
        </div>
    )
}

export default People
