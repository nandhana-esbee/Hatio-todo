import React from 'react';
import api from '../api';
import {BrowserRouter as Browser, Routes, Route ,Navigate} from 'react-router-dom';
import { REFRESH_TOKEN ,ACCESS_TOKEN } from '../constants';


//import components
import Home from './Home';
import Login from './Login';
import Register from './Register';
import TodoList from './TodoList';
import ProtectedRoute from './ProtectedRoute';
// import GistCreator from './Secretgist'

//Logout function to clear the local storage
function Logout(){
  try{
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if(refreshToken && accessToken){
      const res = api.post('/userconf/logout/',{"refresh":refreshToken},{
        headers:{
          Authorization: `Bearer ${accessToken}`  
        }
      })
      return res.data;
    }
  }
  catch(err){
    console.log(err);
  }
  finally{
    localStorage.clear();
    return <Navigate to="/login" />
  }

}

//clear the local storage if the user is registering
function RegisterAndLogout(){
  localStorage.clear();
  return <Register />
}

function App() {
  
  return (
    <div className="App">
      <Browser>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path="/todo"  element={<ProtectedRoute><TodoList /></ProtectedRoute>}></Route>
        {/* <Route path="/sgist"  element={<ProtectedRoute><GistCreator /></ProtectedRoute>}></Route> */}
        <Route path="/login"  element={<Login/>}></Route>
        <Route path="/logout"  element={<Logout/>}></Route>
        <Route path="/register"  element={<RegisterAndLogout/>}></Route>
      </Routes>
      </Browser>
    </div>
  );
}

export default App;
