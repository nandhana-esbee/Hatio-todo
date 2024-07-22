import React , {useState} from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginsubmit = (e) => {
    e.preventDefault();
    if(username === "" || password === ""){
      alert("Please fill all the fields");
      return;
    }
    fetch("http://127.0.0.1:8000/userconf/login/",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({username,password})
    }).then((res)=>{

      console.log(res.json());
      if(res.status === 200){
        alert("Login successful");
        navigate("/home");}
      else{
        alert("Invalid credentials");}
    }).catch((err)=>{
      console.log(err.message);
    });
    setPassword("");
    setUsername("");
  }
  
    return (
    <div className="ui blue segment" style={{width:"50rem",marginTop:"4rem",marginLeft:"28rem",paddingBottom:"2rem"}}>
    <div>
      <h2 className="ui center aligned icon header" style={{marginTop:"7px"}} >
      <i className="circular book icon" ></i>
      Hatio ToDo App
      </h2>
    </div>
    <div className="field" style={{display:'grid',margin:"1.5rem",marginBottom:"2rem"}}>
        <input type="username" placeholder="Username" value={username} onChange={e =>setUsername(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
    </div>
    <div  style={{marginBottom:"1rem",marginLeft:"21.1rem"}}>
    <button className="ui primary submit button" onClick={loginsubmit}>Submit</button>
    <p>Don't have an account ? <a href="/register">Register</a></p>
    </div>
    </div>
    );
    }

export default Login;