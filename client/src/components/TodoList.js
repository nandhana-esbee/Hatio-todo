import Todotable from "./Todotable";
import { useLocation } from "react-router-dom";
import { useEffect ,useState} from "react";
import api from "../api";


const TodoList = () => {
    const [Todolist,SetTodolist] = useState([]);
    const location = useLocation();
    const proj_id = location.state.pro;
    
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
        
    const todolistrender = Todolist.map((todo) => {
        return <Todotable todoos={todo} key={todo.todo_id}/>
    })
return <div className="table">{todolistrender}</div>;
}

export default TodoList;