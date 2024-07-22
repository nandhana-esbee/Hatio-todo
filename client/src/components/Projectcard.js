import React from 'react';

const Projectcard = (props) => {

    return (
        <div className="ui card">
            <div className="content">
                <div className="header">{props.projects.title}</div>
            </div>
            <div className="extra content">
                <div className="ui three buttons">
                    <a className="ui basic green button" href="/todo"><i class="list ul icon"></i></a>
                    <a className="ui basic blue button"><i class="download icon"></i></a>
                    <a className="ui basic red button"><i class="trash icon"></i></a>
                </div>
            </div>
        </div>
    );
}

export default Projectcard;