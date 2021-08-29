import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Login from './components/Login';
import { useStateValue } from './StateProvider';
import NewClass from './components/NewClass';
import { useEffect } from 'react';
import { auth } from './firebase';
import NavbarClass from './components/NavbarClass';
import Stream from './components/Stream';
function App() {
  const [{user},dispatch] = useStateValue();
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      console.log(authUser);
      if(authUser){
        dispatch({
          type : 'SET_USER',
          user : authUser,
        })
      }
      else{
        dispatch({
          type : 'SET_USER',
          user : null,
        })
      }
    })
  },[])
  return (
    <div className="App">
      {
        !user?<Login />:<Router>
        <Switch>
          <Route path="/new">
            <Navbar />
            <NewClass />
          </Route>
          <Route path="/classes/:id">
            <NavbarClass />
            <Stream />
          </Route>
          <Route path="/">
            <Navbar />
            <Home />
          </Route>
        </Switch>
      </Router>
      }
    </div>
  );
}

export default App;
