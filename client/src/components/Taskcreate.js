import React , {useState} from 'react';
import api from '../api';

const Taskcreate = (props) => {
    
    const [statuses,setStatuses] = useState(false);
    const [description,setDescription] = useState("");
    const[projecttodo,setProjecttodo] = useState([props.proj]);
    const isCompleted = (e) => {
        if(statuses === true){
            setStatuses(false);   
        }
        else{
        setStatuses(true);
        }
    }
    
    const UpdateProjectTodo = async (todo_id) => {
        try{
            const response = await api.post(`/api/Todo-list/${todo_id}/projecttodoupdate/`,{"Project_id":props.proj});
            if(response.status === 201){
                console.log("Todo added to project successfully");
                setProjecttodo([...projecttodo,response.data]);
            }
        }
        catch(err){
            console.log(err);
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
                setProjecttodo([...projecttodo,res.data]);
                UpdateProjectTodo(res.data.todo_id);
            }
        }
        catch(err){
            alert(err);
        }
        finally{
            setDescription("");
            setStatuses(false);
        }
    }

    return(
        <form className="ui segment" style={{border:"0"}} onSubmit={Addtodo}>
                        <div className="ui input" style={{marginLeft:"11px", paddingBottom:"20px" ,marginTop:"0px"}}>
                        <input placeholder="Todo description" type="text" value={description} 
                        onChange={e=>setDescription(e.target.value)} />
                         </div>
                         <div className='ui checkbox' style={{paddingLeft:"3rem" , paddingRight:"1rem"}}>
                        <div className='ui input'><input type="checkbox" name="example" value={statuses} checked={statuses===true}
                        onChange={e=>isCompleted(e.target.value)} style={{width:"2rem"}} />
                        <label>Completed?</label></div>
                        </div>
                        <div className="ui icon buttons">
                        <button className="ui primary button" style={{marginLeft:"10px"}}><i className="plus icon"/></button>
                        </div>
            </form>
    );
}
export default Taskcreate;