import React ,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Projectcard = (props) => {

    const navigate = useNavigate();
    const pro = props.projects;
    const goToTodos = () => {
        navigate("/todo",{state:{pro}});
    }

    const deletecard = async () => {
        try{
            const response = await api.delete(`/api/Project-list/${pro.Project_id}/`);
            if(response.status === 204){
                console.log("Deleted successfully");
                window.location.reload()

            }
        }
        catch(err){
            console.log(err);
        }
    }
    const [todo,setTodo] = useState([]);
    useEffect( () =>{
      const getTodo = async () =>{
        const res = await api.get("/api/Todo-list/",{
                params: {
                  "Project_id": pro.Project_id,
                }});
        if(res.data) setTodo(res.data);
      };
      getTodo();
    },
    []

    );

    // 
    // console.log(todo.data);

    const count = todo.length;
    const truecount = todo.filter((todos) => todos.Status === true).length;  

    return (
        <div className="ui card" style={{width:"20.3rem"}}>
            <div className="content">
                <div className="header">{props.projects.title}</div>
                <div className="content" style={{fontFamily:"serif"}}>{truecount}/{count}</div>
            </div>
            <div className="extra content">
                <div className="ui three buttons">
                    <button className="ui basic green button" onClick={goToTodos}><i className="list ul icon"></i></button>
                    <button className="ui basic blue button"><i className="download icon"></i></button>
                    <button className="ui basic red button" onClick={deletecard}><i className="trash icon"></i></button>
                </div>
            </div>
        </div>
    );
}

export default Projectcard;