import React from 'react'
import HomeWorkRoundedIcon from '@material-ui/icons/HomeWorkRounded';
import { Avatar, Button} from '@material-ui/core';
import '../css/Sidebar.css'
import { CalendarTodayRounded } from '@material-ui/icons';
const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <div className="sidebar__item">
                    <div className="sidebar__itemIcon">
                        <HomeWorkRoundedIcon />
                    </div>
                    <div className="sidebar__itemInfo">
                        <p>Classes</p>
                    </div>
                </div>
                <div className="sidebar__item">
                    <div className="sidebar__itemIcon">
                        <CalendarTodayRounded />
                    </div>
                    <div className="sidebar__itemInfo">
                        <p>Calender</p>
                    </div>
                </div>
            </div>
            <div className="sidebar__middle">
                <div className="sidebar__header">
                    <p>Teaching</p>
                </div>
                <div className="sidebar__item">
                    <div className="sidebar__itemIcon">
                        <Avatar />
                    </div>
                    <div className="sidebar__itemInfo">
                        <p><span style={{fontWeight : "600",color : "grey"}}>EO-201 Network Analysis</span><br />
                        <span style={{fontWeight : "200",color : "grey"}}>Odd Semester 2021</span>
                        </p>
                    </div>
                </div>
                <div className="sidebar__item">
                    <div className="sidebar__itemIcon">
                        <Avatar />
                    </div>
                    <div className="sidebar__itemInfo">
                        <p><span style={{fontWeight : "600",color : "grey"}}>EO-201 Network Analysis</span><br />
                        <span style={{fontWeight : "200",color : "grey"}}>Odd Semester 2021</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="sidebar__end">
                <div className="sidebar__header">
                    <p>Enrolled</p>
                </div>
                <div className="sidebar__item">
                    <div className="sidebar__itemIcon">
                        <Avatar />
                    </div>
                    <div className="sidebar__itemInfo">
                        <p><span style={{fontWeight : "600",color : "grey"}}>EO-201 Network Analysis</span><br />
                        <span style={{fontWeight : "200",color : "grey"}}>Odd Semester 2021</span>
                        </p>
                    </div>
                </div>
                <div className="sidebar__item">
                    <div className="sidebar__itemIcon">
                        <Avatar />
                    </div>
                    <div className="sidebar__itemInfo">
                        <p><span style={{fontWeight : "600",color : "grey"}}>EO-201 Network Analysis</span><br />
                        <span style={{fontWeight : "200",color : "grey"}}>Odd Semester 2021</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
