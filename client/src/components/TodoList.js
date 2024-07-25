import Todotable from "./Todotable";
import { useLocation } from "react-router-dom";
import { useEffect ,useState} from "react";
import api from "../api";
import TodoCreate from "./TodoCreate";


const TodoList = () => {
    const [Todolist,SetTodolist] = useState([]);
    const location = useLocation();
    const[projecttodo,setProjecttodo] = useState([]);

    const proj_id = location.state.pro.Project_id;

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

    const todolistrender = Todolist.map((todo) => {
        return <Todotable todoos={todo} key={todo.todo_id}/>
    })

return (
    <div >
        <a className="ui icon button" href="/"><i class="left chevron icon"></i></a>
        <h2 className="ui center aligned icon header" style={{marginTop:"0.5rem"}} >
            <i className="circular list ul icon"></i>
            {location.state.pro.title}
            <h5>Summary = {truecount}/{count}</h5><hr/>
        </h2>
    <TodoCreate addtodohandler={addtodohandler}/>
    <div className="ui unstackable table" style={{width:"50rem",marginLeft:"27rem"}}>{todolistrender}</div>
    </div>
);
}

export default TodoList;