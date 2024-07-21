import React ,{useState ,useEffect} from 'react';
import './App.css';
import api from '../api/todo';
import {BrowserRouter as Browser, Routes, Route} from 'react-router-dom';

//import Home,login and register
import Home from './Home';
import Login from './Login';
import Register from './Register';

function App() {

  return (
    <div className="App">
      <Browser>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login"  element={<Login/>}></Route>
        <Route path="/register"  element={<Register/>}></Route>
      </Routes>
      </Browser>
    </div>
  );
}

export default App;
