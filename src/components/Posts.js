import { Avatar } from '@material-ui/core'
import React from 'react'
import '../css/Posts.css'
import SendIcon from '@material-ui/icons/Send';
import PostComment from './PostComment';
import { useState } from 'react';
import { useStateValue } from '../StateProvider';
import db from '../firebase';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
const Posts = ({photoURL,body,displayName,timestamp,postId}) => {
    const [inp,setInp] = useState("")
    const [{user},] = useStateValue();
    const {id} = useParams()
    function addComment(){
        console.log(inp)
        if(inp!=""){
        db.collection('classrom').doc(id).collection('posts').doc(postId).collection('comments').add({
            createdBy : user.displayName,
            body : inp,
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            photoURL : user.photoURL
        })
        setInp("");
        }
    }
    return (
        <div className="stream__itemPost">
            <div className="stream__itemTop">
                <div className="stream__itemTopLeft">
                    <Avatar src={photoURL}/>
                </div>
                <div className="stream__itemTopRight">
                    <p><span style={{marginLeft:"10px",fontSize:"medium",fontWeight:"600"}}>{displayName}</span><br />
                    <span style={{marginLeft:"10px",fontSize:"small",fontWeight:"400",alignSelf:"start"}}>{new Date(timestamp?.toDate()).toUTCString().substr(0,12) + new Date(timestamp?.toDate()).toLocaleTimeString()}</span></p>
                </div>
            </div>
            <div className="stream__itemMid">
                <p>{body}</p>
            </div>
            <PostComment postId={postId}/>
            <div className="stream__itemEnd">
                <Avatar src={user.photoURL}/>
                <input onChange={(e)=>setInp(e.target.value)} value={inp} type="text"></input>
                <div onClick={addComment} style={{marginLeft : "5px",cursor:"pointer"}}><SendIcon /></div>
            </div>
        </div>
    )
}

export default Posts
