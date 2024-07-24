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
import Taskedit from './Taskedit';

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


//delete the project card
// function DeleteProject(id) {
//    try{
//     const res = api.delete('/api/Project-list/'+id+'/');
//    }
//    catch(err){
//      console.log(err);
//    }
//    finally{
//      return <Navigate to="/" />
//    } 
// }

function App() {
  
  return (
    <div className="App">
      <Browser>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        {/* <Route path="/deleteproj" element={<ProtectedRoute><DeleteProject/></ProtectedRoute>}></Route> */}
        <Route path="/todo"  element={<ProtectedRoute><TodoList /></ProtectedRoute>}></Route>
        <Route path="/edittodo"  element={<ProtectedRoute><Taskedit /></ProtectedRoute>}></Route>
        <Route path="/login"  element={<Login/>}></Route>
        <Route path="/logout"  element={<Logout/>}></Route>
        <Route path="/register"  element={<RegisterAndLogout/>}></Route>
      </Routes>
      </Browser>
    </div>
  );
}

export default App;
