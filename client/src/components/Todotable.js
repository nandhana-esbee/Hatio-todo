import React from "react";

const Todotable = (props) => {

    return (
        <table className="ui celled table">
            <tr>
            <td>{props.todos.Status}</td>
            <td>{props.todos.Description}</td>
            <td>{props.todos.Updated_Date}</td>
            </tr>
        </table>
    );
    };

export default Todotable;