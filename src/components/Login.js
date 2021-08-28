import { Button } from '@material-ui/core'
import React from 'react'
import '../css/Login.css'
import { auth,provider } from '../firebase'
import { useStateValue } from '../StateProvider'
const Login = () => {
    const [{user},dispatch] = useStateValue();
    function signIn(){
        auth.signInWithPopup(provider).then(result =>
            dispatch({type: "SET_USER",
                    user : result.user})
            ).catch(error => alert(error.message));
        
    }
    return (
        <div className="login">
            <div className="login__container">
                <h1>Online Classroom</h1>
                <Button variant="contained" color="primary" onClick={signIn}>Sign In With Google</Button>
            </div>
        </div>
    )
}

export default Login
