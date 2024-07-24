import Todotable from "./Todotable";
import { useLocation } from "react-router-dom";
import { useEffect ,useState} from "react";
import api from "../api";
import Taskcreate from './Taskcreate';


const TodoList = () => {
    const [Todolist,SetTodolist] = useState([]);
    const location = useLocation();
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
    <Taskcreate proj={proj_id}/>
    <div className="ui unstackable table" style={{width:"50rem",marginLeft:"27rem"}}>{todolistrender}</div>
    </div>
);
}

export default TodoList;