import React,{useState} from "react";
import api from "../api";

const Todotable = (props) => {
    const dateString = props.todoos.Updated_Date;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-IN'); 
    const formattedTime = date.toLocaleTimeString('en-IN');
    const [checked, setChecked] = useState(props.todoos.Status);

    const ApichangeStatus = async (status) => {
        const todo_id = props.todoos.todo_id;
        try{
            const response = await api.put(`/api/Todo-list/${todo_id}/`,{Status:status});
            if(response.status === 200){
                console.log("Status changed successfully");
            }
        }
        catch(err){
            console.log(err);
        }
    }
    
    const isCompleted = (e) => {
        if(checked === true){
            setChecked(false);  
            ApichangeStatus(false); 
        }
        else{
        setChecked(true);
        ApichangeStatus(true);
        }
    }

    const deletetodo = async () => {
        const todo_id = props.todoos.todo_id;
        try{
            const response = await api.delete(`/api/Todo-list/${todo_id}/`);
            if(response.status === 204){
                console.log("Deleted successfully");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const edittodo = () => {
        console.log("Edit todo");
    }

    return (
        <table className="ui blue table">
            <tr >
            <td><input type="checkbox" value={checked} checked={checked===true} onChange={e=>isCompleted(e.target.value)}
            style={{width:"1.5rem"}} className="left aligned checkbox"/></td>
            <th>{props.todoos.Description}</th>
            <td>{formattedDate}</td>
            <td>{formattedTime}</td>
            <td className="right aligned">
            <div className="ui buttons">
            <button className="ui green button" onClick={edittodo}>Edit</button>
            <button className="ui red button" onClick={deletetodo}>Delete</button>
            </div>
            </td>
            </tr>
        </table>
    );
    };

export default Todotable;