import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import Login from './components/Login';
import { useStateValue } from './StateProvider';
function App() {
  const [{user},] = useStateValue();
  return (
    <div className="App">
      {
        !user?<Login />:<Router>
        <Switch>
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
