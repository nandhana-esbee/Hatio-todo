import React , {useState} from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api';

const Taskcreate = () => {
    const [statuses,setStatuses] = useState(false);
    const [description,setDescription] = useState("");

    const isCompleted = (e) => {
        if(statuses === true){
            setStatuses(false);   
        }
        else{
        setStatuses(true);
        }
    }

    const Addtodo = async (e) => {
        e.preventDefault();
        if(description === ""){
            alert("Please enter a todo description");
            return;
        }
        try{
            const res = await api.post("/api/Todo-list/",{"Description":description,"Status":statuses});
            if(res.status === 201){
                console.log("Todo added successfully");
                const response = api.put("/api/Project-list/3/",{"ListofTodo":res.data.todo_id,"title":"Project 3"});
            }
        }
        catch(err){
            alert(err);
        }
        finally{
            setDescription("");
            setStatuses(false);
            Navigate("/todo");
        }
    }

    return(
        <form className="ui segment" style={{border:"0"}} onSubmit={Addtodo}>
                        <div className="ui input" style={{marginLeft:"11px", paddingBottom:"20px" ,marginTop:"0px"}}>
                        <input placeholder="Todo description" type="text" value={description} 
                        onChange={e=>setDescription(e.target.value)} />
                         </div>
                         <div className='ui input' style={{paddingLeft:"1rem" , paddingRight:"1rem"}}>
                        <input type="checkbox" name="example" value={statuses} checked={statuses===true}
                        onChange={e=>isCompleted(e.target.value)} style={{width:"1.6rem"}} />
                        <label>Completed?</label>
                        </div>
                        <div className="ui icon buttons">
                        <button className="ui primary button" style={{marginLeft:"10px"}}><i className="plus icon"/></button>
                        </div>
            </form>
    );
}
export default Taskcreate;