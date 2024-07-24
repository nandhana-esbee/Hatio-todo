import React , {useState} from 'react';
import { Navigate ,useLocation,useNavigate} from 'react-router-dom';
import api from '../api';
import TodoList from './TodoList';

const Taskedit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const props = location.state.todo;
    const [statuses,setStatuses] = useState(props.Status);
    const [description,setDescription] = useState(props.Description);

    const isCompleted = (e) => {
        if(statuses === true){
            setStatuses(false);   
        }
        else{
        setStatuses(true);
        }
    }
  
    const Edittodo = async (e) => {
        e.preventDefault(); 
        try{
            const res = await api.put(`/api/Todo-list/${props.todo_id}/`,{"Description":description,"Status":statuses});
            if(res.data){
                console.log("Todo edited successfully");
                navigate(-1)
            }
        }
        catch(err){
            alert(err);
        }
    }

    return(
        <form className="ui segment" style={{border:"0"}} onSubmit={Edittodo}>
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
export default Taskedit;