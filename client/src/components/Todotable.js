import React from "react";

const Todotable = (props) => {

    return (
        <table className="ui celled table">
            <tr>
            <td>{props.todoos.Status}</td>
            <td>{props.todoos.Description}</td>
            <td>{props.todoos.Updated_Date}</td>
            </tr>
        </table>
    );
    };

export default Todotable;