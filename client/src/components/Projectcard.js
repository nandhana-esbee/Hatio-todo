import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Projectcard = (props) => {

    const navigate = useNavigate();
    const pro = props.projects.Project_id
    const goToTodos = () => {
        navigate("/todo",{state:{pro}});
    }

    return (
        <div className="ui card">
            <div className="content">
                <div className="header">{props.projects.title}</div>
            </div>
            <div className="extra content">
                <div className="ui three buttons">
                    <button className="ui basic green button" onClick={goToTodos}><i className="list ul icon"></i></button>
                    <button className="ui basic blue button"><i className="download icon"></i></button>
                    <button className="ui basic red button"><i className="trash icon"></i></button>
                </div>
            </div>
        </div>
    );
}

export default Projectcard;