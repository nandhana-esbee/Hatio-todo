import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import api from "../api";
import './App.css';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginsubmit = async (e) => {
    e.preventDefault();
    if(username === "" || password === ""){
      alert("Please fill all the fields");
      return;
    }
    
    try{
    const res = await api.post("userconf/login/",{username , password});
    localStorage.setItem(ACCESS_TOKEN,res.data.tokens['access']);
    localStorage.setItem(REFRESH_TOKEN,res.data.tokens['refresh']);
    navigate("/");
  }
    catch(err){
      alert(err);
      console.log(err.response.data);
    }
    finally{
      setUsername("");
      setPassword("");
    }
    
  }
  
    return (
    <div className="ui blue segment" style={{width:"50rem",marginTop:"4rem",marginLeft:"28rem",paddingBottom:"2rem"}}>
    <div>
      <h2 className="ui center aligned icon header" style={{marginTop:"7px"}} >
      <i className="circular book icon" ></i>
      Hatio ToDo App
      </h2>
    </div>
    <form  onSubmit={loginsubmit}>
    <div className="field" style={{display:'grid',margin:"1.5rem",marginBottom:"2rem"}}>
        <input type="username" placeholder="Username" autoComplete="name" value={username} onChange={e =>setUsername(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
    </div>
    <div  style={{marginBottom:"1rem",marginLeft:"21.1rem"}}>
    <button className="ui primary submit button">Submit</button>
    <p>Don't have an account ? <a href="/register">Register</a></p>
    </div>
    </form>
    </div>
    );
    }

export default Login;