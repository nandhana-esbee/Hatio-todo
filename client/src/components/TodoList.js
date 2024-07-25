import Todotable from "./Todotable";
import {useNavigate, useLocation } from "react-router-dom";
import { useEffect ,useState} from "react";
import api from "../api";
import TodoCreate from "./TodoCreate";


const TodoList = () => {
    const [Todolist,SetTodolist] = useState([]);
    const location = useLocation();
    const[projecttodo,setProjecttodo] = useState([]);
    const [projname,setProjname] = useState(location.state.pro.title);
    const navigate = useNavigate();
    const proj_id = location.state.pro.Project_id;

    const Editprojecto = async () => {
        const res = await api.put(`/api/Project-list/${proj_id}/`, {"title" :projname})
        if(res.status === 200)
        {
            console.log("project title changed");
            navigate(-1)
        }
    }

    //retrieve the todo list from the database
    const RetreiveTodo = async (proj_id) => {
        try{
            const response = await api.get("/api/Todo-list/",{
                params: {
                  Project_id: proj_id,
                }});
            if(response.status === 200){
                return response.data;
            }
        }
        catch(err){
            console.log(err);
        }}
    
    //Update the projectTOdo model
    const UpdateProjectTodo = async (todo_id) => {
        try{
            const response = await api.post(`/api/Todo-list/${todo_id}/projecttodoupdate/`,{"Project_id":proj_id});
            if(response.status === 201){
                console.log("Todo added to project successfully");
                setProjecttodo([...projecttodo,response.data]);
            }
        }
        catch(err){
            console.log(err);
        }
    }

    //Add Todo to the database
    const addtodohandler = async (todo) => {
      console.log(todo);
      const response = await api.post("/api/Todo-list/",{"Description":todo.Description,"Status":todo.Status});
      SetTodolist([...Todolist,response.data]);
      UpdateProjectTodo(response.data.todo_id)
    };

    useEffect(() =>{
        const getAllTodos = async () => {
            const allTodos = await RetreiveTodo(proj_id);
            if(allTodos) SetTodolist(allTodos)
          };
         getAllTodos();
    },[]);

    const count = Todolist.length;
    const truecount = Todolist.filter((todo) => todo.Status === true).length;  

    const todolistpendingrender = Todolist.map((todo) => {
        if(todo.Status===false)
            return <Todotable todoos={todo} key={todo.todo_id}/>
    })

    const todolistcompletedrender = Todolist.map((todo) => {
        if(todo.Status===true)
         return <Todotable todoos={todo} key={todo.todo_id}/>
    })

return (
    <div >
           <h2 class="ui block header">
           <a className="ui left floated subheader"  href="/"><i class="left chevron icon"></i></a>
            <div class="ui center aligned subheader" style={{alignItems:"center"}}>
            <div class="ui transparent icon input" style={{marginLeft:"2rem",paddingTop:"1rem"}}>
                <button className="circular mini ui icon button" onClick={Editprojecto}> <i class="pencil alternate icon"/></button>
               <input className=" ui primary header" type="text" value={projname} placeholder="" onChange={e=>setProjname(e.target.value)} style={{marginLeft:"2rem"}}/>
                </div>
            </div>
            <h5 align="right" style={{paddingRight:"3rem"}}>Summary = {truecount}/{count}</h5>
          </h2>
    <TodoCreate addtodohandler={addtodohandler}/>
    <h3 align="center">Pending</h3>
    <div className="ui unstackable table" style={{width:"50rem",marginLeft:"27rem"}}>{todolistpendingrender}</div>
    <h3 align="center">Completed</h3>
    <div className="ui unstackable table" style={{width:"50rem",marginLeft:"27rem"}}>{todolistcompletedrender}</div>
    </div>
);
}

export default TodoList;