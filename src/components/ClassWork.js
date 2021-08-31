import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import db, { storage } from '../firebase';
import firebase from 'firebase';
import { useStateValue } from '../StateProvider';
import "../css/ClassWork.css"
import { Button } from '@material-ui/core';
import { fontWeight } from '@material-ui/system';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import AttachmentIcon from '@material-ui/icons/Attachment';
import { SettingsOutlined } from '@material-ui/icons';
const ClassWork = () => {
    const {id} = useParams();
    const [{user},] = useStateValue();
    const [role,setRole] = useState("");
    const [show,setShow] = useState(false);
    const [fileURL,setFileURL] = useState([]);
    const [curr,setCurr] = useState(null);
    const [inp,setInp] = useState("");
    const [postType,setpostType] = useState("study");
    const history = useHistory();
    const [title,setTitle] = useState();
    const [study,setStudy] = useState([]);
    const [assign,setAssign] = useState([]);
    useEffect(()=>{
        db.collection('Users').where("email","==",user.email).where("classroom","==",db.doc('/classrom/'+id))
        .onSnapshot((snapshot)=>snapshot.docs.map((data)=>setRole(data.data().role)))
        db.collection('classrom').doc(id).collection('posts').where('type','==',"study").orderBy("timestamp","desc")
        .onSnapshot((snapshot)=>(
            setStudy(snapshot.docs.map((doc)=>({id : doc.id,data : doc.data()})))
        ))
        db.collection('classrom').doc(id).collection('posts').where('type','==',"assign").orderBy("timestamp","desc")
        .onSnapshot((snapshot)=>(
            setAssign(snapshot.docs.map((doc)=>({id : doc.id,data : doc.data()})))
        ))
    },[id])
    useEffect(async()=>{
        async function uploadFile(file){
            if(file){
            const storageRef = storage.ref();
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            let allUploaded = fileURL;
            await allUploaded.push({URL : await fileRef.getDownloadURL(),name : file.name})
            setFileURL(allUploaded);
            }
        }
        await uploadFile(curr);
        setCurr(null);
    },[curr])
    async function onChangeFile(e){
        const file = e.target.files[0];
        const storageRef = storage.ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        let allUploaded = fileURL;
        await allUploaded.push({URL : await fileRef.getDownloadURL(),name : file.name})
        setFileURL(allUploaded);
    }
    console.log(fileURL); 
    function postItem(){
        db.collection('classrom').doc(id).collection('posts').add({
            body : inp,
            title : title,
            type : postType,
            files : fileURL,
            createdBy : user.displayName,
            photoURL : user.photoURL,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        })
        history.push(`/classes/${id}`)
    }
    return (
        <div className="classwork">  
            {
                role=="Teacher"?
                <div className="classworkMaterial">
                    <h1 onClick={()=>setShow(!show)} style={{backgroundColor:"whitesmoke",padding:"10px",textAlign:"left",cursor:"pointer"}}>Add a new Material</h1>
                
                {
                    show?<div className="classworkMaterial">
                    <input onChange={(e)=>setTitle(e.target.value)} placeholder="title"/>
                    <select onChange={(e)=>setpostType(e.target.value)}>
                        <option value="study">Study Material</option>
                        <option value="assign">Assignment</option>
                    </select>
                    <textarea onChange={(e)=>setInp(e.target.value)} rows="10" cols="100" placeholder="A brief discription of the material"/>
                    <div className="uploaded">
                        <p>Files Uploaded</p>
                        {  
                            fileURL && fileURL.map((item)=>(
                                <div className="uploaded__fileName">
                                    <a target="_blank" href={item.URL}>{item.name}</a>
                                </div>
                            ))
                        }
                    </div>
                    <input type="file" onChange={(e)=>setCurr(e.target.files[0])}></input>
                    <Button onClick={postItem} variant="contained" color="primary">Post</Button>
                    </div>:<></>
                }</div>
                :<></>
            }    
            <div className="studymaterial">
                <h1 style={{textAlign : "left"}}>Study Material</h1>
                {
                    study.map((item)=>(
                        <Link to={`/classes/${id}/lec/${item.id}`}>
                        <div style={{backgroundColor : "lightcyan"}} className="studymaterial__info">
                            <ChromeReaderModeIcon />
                            <p>{item.data.title}</p>
                        </div>
                        </Link>
                    ))
                }
            </div>
            <div className="assignment">
                <h1 style={{textAlign : "left"}}>Assignment</h1>
                {
                    assign.map((item)=>(
                        <Link to={`/classes/${id}/assign/${item.id}`}>
                        <div style={{backgroundColor : "wheat"}} className="assignment__info">
                            <AssignmentIcon />
                            <p>{item.data.title}</p>
                        </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default ClassWork
