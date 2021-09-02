import React,{useState} from 'react'
import '../css/LecturCard.css'
import { useStateValue } from '../StateProvider';
import { Avatar } from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import PostComment from './PostComment';
import db from '../firebase';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
import Assignment from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';
const AssignmentCard = ({postId,displayName,timestamp}) => {
    const [{user},] = useStateValue();
    const [inp,setInp] = useState();
    const {id} = useParams();
    function addComment(){
        if(inp){
            db.collection('classrom').doc(id).collection('posts').doc(postId).collection('comments').add({
                createdBy : user.displayName,
                body : inp,
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                photoURL : user.photoURL
            })
        }
        setInp("")
    }
    return (
        <div className="lecture">
            <Link to={`/classes/${id}/assign/${postId}`}>
            <div style={{backgroundColor : "wheat"}}className="lecture__details">
                <div className="lecture__icon">
                    <Assignment />
                </div>
                <p class="first">{displayName} added a new Assignment</p>
                <p class="second">{new Date(timestamp?.toDate()).toUTCString().substr(0,12)}</p>
            </div>
            </Link>
            <PostComment postId={postId}/>
            <div className="stream__itemEnd">
                <Avatar src={user.photoURL}/>
                <input onChange={(e)=>setInp(e.target.value)} value={inp} type="text"></input>
                <div onClick={addComment} style={{marginLeft : "5px",cursor:"pointer"}}><Send /></div>
            </div>
        </div>
    )
}

export default AssignmentCard
