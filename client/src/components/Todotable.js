import React,{useState} from "react";
import api from "../api";


const Todotable = (props) => {
    const dateString = props.todoos.Updated_Date;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-IN'); 
    const [checked, setChecked] = useState(props.todoos.Status);
    const [desc ,setDesc] = useState(props.todoos.Description)
    const todo_id = props.todoos.todo_id;

    const ApichangeStatus = async (status) => {
        try{
            const response = await api.put(`/api/Todo-list/${todo_id}/`,{Status:status});
            if(response.status === 200){
                console.log("Status changed successfully");
                window.location.reload();
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
                window.location.reload();
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const edittodo = async (e) => {
        e.preventDefault(); 
        try{
            const res = await api.put(`/api/Todo-list/${todo_id}/`,{"Description":desc,"Status":checked});
            if(res.data){
                console.log("Todo edited successfully");
            }
        }
        catch(err){
            alert(err);
        }
    }
    return (
        <>
        <table className="ui blue table">
            <tr >
            <td><input type="checkbox" value={checked} checked={checked===true} onChange={e=>isCompleted(e.target.value)}
            style={{width:"1.5rem",margin:"0px"}} className="left aligned checkbox"/></td>
            <th className="ui transparent input" style={{margin:"0rem", padding:0, marginTop:"0.8rem",width:"28rem"}}>
               <input type="text" value={desc} onChange={e=>setDesc(e.target.value)}/>
                </th>
            <td className="right aligned" style={{fontFamily:"san-serif",fontStyle:"italic"}}>{formattedDate}</td>
            <td className="right aligned">
            <div className="ui buttons">
            <button className="ui green button" onClick={edittodo}>Edit</button>
            <button className="ui red button" onClick={deletetodo}>Delete</button>
            </div>
            </td>
            </tr>
        </table>
        </>
    );
    };

export default Todotable;