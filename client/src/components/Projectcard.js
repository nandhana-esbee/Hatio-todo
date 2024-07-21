import React from 'react';

const Projectcard = (props) => {

    return (
        <div className="ui card">
            <div className="content">
                <div className="header">{props.projects.title}</div>
            </div>
            <div className="extra content">
                <div className="ui two buttons">
                    <div className="ui basic green button">Edit</div>
                    <div className="ui basic red button">Delete</div>
                </div>
            </div>
        </div>
    );
}

export default Projectcard;