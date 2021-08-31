import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import db from '../firebase';
import '../css/Stream.css'
import { Avatar } from '@material-ui/core';
import { useStateValue } from '../StateProvider';
import { Button } from '@material-ui/core';
import firebase from 'firebase';
import Posts from './Posts';
import LectureCard from './LectureCard';
import AssignmentCard from './AssignmentCard';
const Stream = () => {
    const [classroom,setClassroom] = useState({});
    const [post,setPost] = useState([]);
    const {id} = useParams();
    const [{user},] = useStateValue()
    const [textbox,setTextbox] = useState(false);
    let [mesg,setMesg] = useState("");
    useEffect(()=>{
        if(id){
            db.collection('classrom').doc(id)
            .onSnapshot((snapshot)=>(
                setClassroom({id : snapshot.id, data : snapshot.data()})
            ))
            db.collection('classrom').doc(id).collection('posts')
            .orderBy('timestamp',"desc")
            .onSnapshot((snapshot)=>(
                setPost(snapshot.docs.map((post)=>(
                    {id : post.id, data : post.data()}
                )))
            ))
        }
    },[id])
    console.log(post);
    function sendPost(e){
        db.collection('classrom').doc(id).collection('posts').add({
            createdBy : user.displayName,
            photoURL : user.photoURL,
            body : mesg,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        })
        setMesg(false);
        setTextbox(false);

    }
    return (
        <div className="stream">
            <div className="stream__header">
                <img src={classroom?.data?.background}></img>
                <h1>{classroom?.data?.title}</h1>
                <p>Classroom code : {classroom?.id}</p>
            </div>
            <div className="stream__mid">
                <div className="stream__left">
                    <p>Upcoming</p>
                    <p>No due work</p>
                </div>
                <div className="stream__right">
                    {
                        !textbox?
                        <div onClick={()=>setTextbox(true)} className="stream__item">
                            <Avatar src={user?.photoURL}/>
                            <p>Announce something to class</p>
                        </div>:
                        <div className="stream__itemForm">
                            <textarea onChange={(e)=>setMesg(e.target.value)}  placeholder="Announce Something to Class"rows="15" cols="100"></textarea>
                            <div className="stream__itemBottom">
                                <Button onClick={sendPost} style={{marginRight : "10px"}} variant="contained" color="primary" disabled={mesg=="" && "true"}>Post</Button>
                                <Button onClick={()=>setTextbox(false)} variant="contained" color="secondary">Cancel</Button>
                            </div>
                        </div>

                    }
                    {
                        post.map((post)=>post.data.type==="study"?
                        <LectureCard postId={post.id} displayName={post.data.createdBy} timestamp={post.data.timestamp}/>
                        :post.data.type==="assign"?<AssignmentCard postId={post.id} displayName={post.data.createdBy} timestamp={post.data.timestamp}/>:
                        <Posts postId={post.id} photoURL={post.data.photoURL} displayName={post.data.createdBy} body={post.data.body} timestamp={post.data.timestamp}/>)
                    }
                
                </div>
            </div>
        </div>
    )
}

export default Stream
