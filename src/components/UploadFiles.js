import React, { useState } from 'react'
import DeleteIcon from '@material-ui/icons/Delete';
const UploadFiles = ({URL,name,setFileURL,fileURL,setCurr}) => {
    const [show,setShow] = useState(true);
    function deleteFile(){
        const index = fileURL.findIndex(
            (file)=>file.URL === URL
        )
        let fileURLcopy = fileURL;  
        if(index>=0){
            fileURLcopy.splice(index,1);
        }
        setFileURL(fileURLcopy);
        setShow(false);
        console.log(fileURLcopy);
    }
    if(show){
        return (
            <div className="uploaded__fileName">
                <a target="_blank" href={URL}>{name}</a>
                <div onClick={deleteFile} style={{cursor : "pointer"}}><DeleteIcon /></div>
            </div>
        )
    }
    else{
        return <></>
    }
}

export default UploadFiles
