import React ,{useState ,useEffect} from 'react';
import api from '../api';
import {BrowserRouter as Browser, Routes, Route} from 'react-router-dom';



//import Home,login and register
import Home from './Home';
import Login from './Login';
import Register from './Register';
import TodoList from './TodoList';

function App() {

  return (
    <div className="App">
      <Browser>
      <Routes>
        <Route path="/"  element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/register"  element={<Register/>}></Route>
        <Route path="/todo"  element={<TodoList/>}></Route>
      </Routes>
      </Browser>
    </div>
  );
}

export default App;
