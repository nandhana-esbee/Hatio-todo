import React from "react";
import Todotable from "./Todotable";

const TodoList = (props) => {
    const todolistrender = props.todo.map((todo) => {
        return <Todotable todos={todo}/>
    })
return <div>{todolistrender}</div>;
}

export default TodoList;