import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
import api from '../api';


import './App.css';
const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const navigate = useNavigate();

    const handlesubmit = (e) => {
        e.preventDefault();
        if(username === "" || email === "" || password === "" || password2 === ""){
            alert("Please fill all the fields");
            return;}
        if(password !== password2){
            alert("Passwords do not match");
            return;
        }
    
        // fetch("http://127.0.0.1:8000/userconf/register/",{
        //     method:"POST",
        //     headers:{"Content-Type":"application/json"},
        //     body:JSON.stringify({username,email,password})
        // }).then((res)=>{
        //     console.log(res);
        //     alert("User registered successfully");
        //     navigate("/login");
        // }).catch((err)=>{
        //     console.log(err);
        // });

        try{
            const res = api.post("userconf/register/",{username,email,password});
            navigate("/login");
            return res;
        }
        catch(err){
            alert(err);
        }
        finally{
        setUsername("");
        setEmail("");
        setPassword("");
        setPassword2("");
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
    <form onSubmit={handlesubmit}>
    <div className="field" style={{display:'grid',margin:"1.5rem",marginBottom:"2rem"}}>
        <input type="username" placeholder="Username" autoComplete="name" value={username} onChange={e =>setUsername(e.target.value)}/>
        <input type="email" placeholder="Email" autoComplete="email" value={email} onChange={e =>setEmail(e.target.value)}/>
        <input type="password" placeholder="Password" value={password} onChange={e =>setPassword(e.target.value)} />
        <input type="password" placeholder="Confirm Password" value={password2} onChange={e =>setPassword2(e.target.value)} />
    </div>
    <div  style={{marginBottom:"1rem",marginLeft:"21.1rem"}}>
    <button className="ui primary submit button" >Submit</button>
    <p>Already have account ? <a href='/login'>Login</a></p>
    </div>
    </form>
    </div>
    );
    }

export default Register;