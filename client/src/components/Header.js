import React from 'react';

const Header = () => {


    return (
        <div className="ui secondary pointing menu">
            <a className="item active">Home</a>
            <div className="right menu">
                <a className="ui item" href='/logout' style={{color:"red"}}>Logout</a>
            </div>
        </div>
    );
    }

export default Header;