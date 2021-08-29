import React, { useEffect } from 'react'
import PeopleIcon from '@material-ui/icons/People';
import '../css/PostComment.css'
import { Avatar } from '@material-ui/core';
import db from '../firebase';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
const PostComment = ({postId}) => {
    const {id} = useParams();
    const [comment,setComment] = useState([])
    useEffect(()=>{
        db.collection('classrom').doc(id).collection('posts').doc(postId).collection('comments')
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot)=>(
            setComment(snapshot.docs.map((c)=>({id:c.id,data:c.data()})))
        ))
    },[postId])
    console.log(comment);
    return (
        <div className="commentWrapper">
            <div className="comment">
                <PeopleIcon />
                <p style={{marginLeft : "10px", fontWeight:"600"}}>{comment.length} comments   
                </p>
            </div>
            {
                comment.map((item)=>(
                    <div className="commentuser">
                        <Avatar src={item.data.photoURL}/>
                        <div className="commentuserInfo">
                            <p style={{marginLeft : "10px"}}>
                            <span style={{fontWeight : "600",fontSize : "medium"}}>{item.data.createdBy}</span>
                            <span style={{marginLeft : "10px",fontWeight : "400",fontSize : "small",color : "gray"}}>{new Date(item.data.timestamp?.toDate()).toUTCString().substr(0,12) + new Date(item.data.timestamp?.toDate()).toLocaleTimeString()}</span>
                            <br />
                            <span style={{fontWeight : "400",fontSize : "medium"}}>{item.data.body}</span></p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default PostComment
