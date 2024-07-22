import React ,{useState ,useEffect} from 'react';
import api from '../api';
import {BrowserRouter as Browser, Routes, Route ,Navigate} from 'react-router-dom';



//import components
import Home from './Home';
import Login from './Login';
import Register from './Register';
import TodoList from './TodoList';
import ProtectedRoute from './ProtectedRoute';

//Logout function to clear the local storage
function Logout(){
  localStorage.clear();
  return <Navigate to="/login" />

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
        <Route path="/todo"  element={<ProtectedRoute><TodoList/></ProtectedRoute>}></Route>
        <Route path="/login"  element={<Login/>}></Route>
        <Route path="/logout"  element={<Logout/>}></Route>
        <Route path="/register"  element={<RegisterAndLogout/>}></Route>
      </Routes>
      </Browser>
    </div>
  );
}

export default App;
