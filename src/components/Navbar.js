import { Avatar, IconButton } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react'
import '../css/Navbar.css'
import AddIcon from '@material-ui/icons/Add';
import Sidebar from './Sidebar';
const Navbar = () => {
    const [sidebar,setSidebar] = useState(false);

    return (
        <div className="navbarSidebar">
            <div className="navbar">
                <div onClick={()=>setSidebar(!sidebar)} className = "navbar__icon">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                </div>
                <div className="navbar__logo">
                    <h3>Online Classroom</h3>
                </div>
                <div className="navbar__add">
                <IconButton edge="start" color="inherit" aria-label="menu">
                        <AddIcon />
                    </IconButton>
                </div>
                <div className="navbar__avatar">
                    <Avatar />
                </div>
            </div>
            {
                sidebar?<Sidebar />:<></>
            }
        </div>
       
    )
}

export default Navbar
