import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import '../css/NewClass.css'
import db from '../firebase';
import { useStateValue } from '../StateProvider';
const NewClass = () => {
    const [join,setJoin] = useState(true);
    const [title,setTitle] = useState("");
    const [subtitle,setSubtitle] = useState("");
    const [code,setCode] = useState("");
    const [{user},] = useStateValue();
    const [people,setPeople] = useState([]);
    const [flag,setFlag] = useState(false);
    const [mesg,showMessage] = useState(false);
    const history = useHistory();
    const [mesg1,setmesg] = useState("Sorry Class code doesn't exist");
    let flag1 = false;
    useEffect(()=>{
        if(flag){
            people.push({
                name : user.displayName,
                email : user.email,
                photoURL : user.photoURL,
                role : "Student"
            })
            flag1=true;
            db.collection('classrom').doc(code).update({
                people : people,
            })
            db.collection('Users').add({
                name : user.displayName,
                email : user.email,
                classroom : db.doc('/classrom/'+code),
                role : "Student" ,
                photoURL : user.photoURL
            })
            history.push(`/classes/${code}`);
        }
    },[flag])
    useEffect(()=>{
        if(people.length==0 || flag1){
            return;
        }
        if(!people.some(p => p.email === user.email)){
            setFlag(true);
        }
        else{
            showMessage(true);
            setmesg("You are a part of this class");
        }
    },[people])
    function joinClass(e){
        e.preventDefault();
        db.collection('classrom').doc(code).onSnapshot((snapshot)=>{
            if(snapshot.data()){
                setPeople(snapshot.data().people);
            }
            else{
                showMessage(true);
            }    
                
        });
    }
    function createClass(e){
        e.preventDefault();
        if(title.length>0 && subtitle.length>0){
            let c = "";
            db.collection('classrom').add({
                title : title,
                subtitle : subtitle,
                background : "https://www.gstatic.com/classroom/themes/img_bookclub.jpg",
                people : [{
                    name : user.displayName,
                    email : user.email,
                    photoURL : user.photoURL,
                    role : "Teacher"
                }],
                createdBy : {
                    name : user.displayName,
                    email : user.email,
                    photoURL : user.photoURL
                }
            }).then((doc)=>{
                db.collection('Users').add({
                    name : user.displayName,
                    email : user.email,
                    classroom : db.doc('/classrom/'+doc.id),
                    role : "Teacher" ,
                    photoURL : user.photoURL
                })  
                history.push(`/classes/${doc.id}`);
            })
        }
    }
    return (
        <div className="newClass"> 
            <div className="newClass__top">
                <div onClick={()=>setJoin(false)}>
                    <h3>Create Class</h3>
                </div>
                <div onClick={()=>setJoin(true)}>
                    <h3>Join Class</h3>
                </div>
            </div>
            {
                join?
                <div className="newClass__mid">
                    <form>
                        {
                            mesg?<div className="newClass__midItem" style={{color:"Red"}}>
                            <p>{mesg1}</p>
                        </div>:<></>
                        }
                        <div className="newClass__midItem">
                            <p>Enter Class Code</p>
                            <input onChange={(e)=>setCode(e.target.value)} type="text"></input>
                        </div>
                        <div className="newClass__midItem">
                            <Button onClick={joinClass} type="submit" variant="contained" color="primary">Join Class</Button>
                        </div>
                    </form>
                </div>:
                <div className="newClass__mid">
                    <form>
                        <div className="newClass__midItem">
                            <p>Enter Class Title</p>
                            <input onChange={(e)=>setTitle(e.target.value)} type="text"></input>
                        </div>
                        <div className="newClass__midItem">
                            <p>Enter Class Subtitle</p>
                            <input onChange={(e)=>setSubtitle(e.target.value)} type="text"></input>
                        </div>
                        <div className="newClass__midItem">
                            <Button onClick={createClass} type="submit" variant="contained" color="primary">Create a new Class</Button>
                        </div>
                    </form>
                </div>
            }
        </div>
    )
}

export default NewClass
