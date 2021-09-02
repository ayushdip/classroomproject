import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import db from '../firebase';
import PostComment from './PostComment';
import '../css/Lecture.css'
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../StateProvider';
import Send from '@material-ui/icons/Send';
import firebase from 'firebase';
const Lecture = () => {
    const {id,lecId} = useParams()
    const [{user},] = useStateValue();
    const [inp,setInp] = useState("");
    const [mat,setMat] = useState({});
    const [comment,setComment] = useState([]);
    function addComment(){
        if(inp){
            db.collection('classrom').doc(id).collection('posts').doc(lecId).collection('comments').add({
                createdBy : user.displayName,
                body : inp,
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                photoURL : user.photoURL
            })
        }
        setInp("")
    }
    useEffect(()=>{
        db.collection('classrom').doc(id).collection('posts').doc(lecId)
        .onSnapshot((snapshot)=>setMat({id : snapshot.id,data : snapshot.data()}))
        db.collection('classrom').doc(id).collection('posts').doc(lecId).collection('comments')
        .onSnapshot((snapshot)=>setComment(snapshot.docs.map((doc)=>({id:doc.id,data : doc.data()}))))
    },[lecId])
    console.log(mat);
    console.log(comment);
    return (
        <div className="material">
            <div clasName="material__item">
                <h1>{mat?.data?.title}</h1>
                <p style={{whiteSpace : "pre-line", textAlign : "left"}}>{mat?.data?.body}</p>
                {
                    mat?.data?.files.map((file)=><a style={{backgroundColor : "whitesmoke",padding : "10px"}}target="_blank" href={file.URL}>{file.name}</a>)
                }
            </div>
            <PostComment postId={lecId}/>
            <div className="stream__itemEnd">
                <Avatar src={user.photoURL}/>
                <input onChange={(e)=>setInp(e.target.value)} value={inp} type="text"></input>
                <div onClick={addComment} style={{marginLeft : "5px",cursor:"pointer"}}><Send /></div>
            </div>
        </div>
    )
}

export default Lecture
