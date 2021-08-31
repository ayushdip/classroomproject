import { Avatar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react'
import '../css/Navbar.css'
import AddIcon from '@material-ui/icons/Add';
import Sidebar from './Sidebar';
import { useStateValue } from '../StateProvider';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
const Navbar = () => {
    const [sidebar,setSidebar] = useState(false);
    const [{user},dispatch] = useStateValue();
    function signout(){
        if(user){
            dispatch({type : 'SET_USER',user : null})
            auth.signOut();
        }
    }
    return (
        <div className="navbarSidebar">
            <div className="navbar">
                <div onClick={()=>setSidebar(!sidebar)} className = "navbar__icon">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                </div>
                <Link to="/">
                <div className="navbar__logo">
                    <h3>Online Classroom</h3>
                </div>
                </Link>
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

export default Navbar
