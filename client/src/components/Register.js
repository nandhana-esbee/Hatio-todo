import React from "react";

const Register = () => {
    return (
        <div className="ui form">
        <div className="field">
            <label>First Name</label>
            <input type="text" name="first-name" placeholder="First Name" />
        </div>
        <div className="field">
            <label>Last Name</label>
            <input type="text" name="last-name" placeholder="Last Name" />
        </div>
        <div className="field">
            <label>Email</label>
            <input type="text" name="email" placeholder="Email" />
        </div>
        <div className="field">
            <label>Password</label>
            <input type="text" name="password" placeholder="Password" />
        </div>
        <button className="ui button" type="submit">
            Submit
        </button>
        </div>
    );
    }

export default Register;