import React, { useEffect } from 'react'
import { useParams } from 'react-router';
import Sidebar from './Sidebar';
import '../css/Navbar.css'
import { useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import db from '../firebase';
import { auth } from '../firebase';
const NavbarClass = () => {
    const [sidebar,setSidebar] = useState(false);
    const {id} = useParams();
    const [classroom,setClassroom] = useState({});
    const [{user},dispatch] = useStateValue();
    const [active,setActive] = useState(1);
    const history = useHistory();
    function signout(){
        if(user){
            dispatch({type : 'SET_USER',user : null})
            auth.signOut();
            history.push('/');
        }
    }
    useEffect(()=>{
        if(id){
        db.collection('classrom').doc(id)
        .onSnapshot((snapshot)=>(
            setClassroom({id : snapshot.id, data : snapshot?.data()})
        ))
        }
    },[id]) 
    return (
        <div className="navbarSidebar">
            <div className="navbar">
                <div onClick={()=>setSidebar(!sidebar)} className = "navbar__icon">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                </div>
                <Link to={`/classes/${id}`}>
                <div className="navbar__logo">
                    <h3 style={{color:"green"}}>{classroom?.data?.title.substr(0,20)}.......</h3>
                </div>
                </Link>
                <div className="navbar__mid">
                    <Link onClick={()=>setActive(1)} to={`/classes/${id}`}>
                    <p>Stream</p>
                    </Link>
                    {
                        active==1?<span className="spanline"></span>:<></>
                    }
                </div>
                <div className="navbar__mid">
                    <Link onClick={()=>setActive(2)} to={`/classes/${id}/classwork`}>
                    <p>Classwork</p>
                    </Link>
                    {
                        active==2?<span className="spanline"></span>:<></>
                    }
                </div>
                <div className="navbar__mid">
                    <Link onClick={()=>setActive(3)} to={`/classes/${id}/people`}>
                    <p>People</p>
                    </Link>
                    {
                        active==3?<span className="spanline"></span>:<></>
                    }
                </div>
                <div className="navbar__add">
                    <Link to="/new">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <AddIcon />
                    </IconButton>
                    </Link>
                </div>
                <div onClick={signout} style={{cursor : "pointer"}} className="navbar__avatar">
                    <Avatar src={user.photoURL}/>
                </div>
            </div>
            {
                sidebar?<Sidebar />:<></>
            }
        </div>
    )
}

export default NavbarClass
