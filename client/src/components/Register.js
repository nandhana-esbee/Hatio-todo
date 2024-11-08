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

    const handlesubmit = async (e) => {
        e.preventDefault();
        if(username === "" || email === "" || password === "" || password2 === ""){
            alert("Please fill all the fields");
            return;}
        if(password !== password2){
            alert("Passwords do not match");
            return;
        }
        if(password.length < 8){
            alert("Password should be atleast 8 characters long");
            return;
        }
        if(username.length < 4){
            alert("Username should be atleast 4 characters long");
            return;
        }
        
        try{
            const res = await api.post("userconf/register/",{username,email,password});
            navigate("/login");
            return res;
        }
        catch(err){
            alert("Registration failed, email already exists");
            console.log(err.response.data);
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