import React from "react";
import Todo from "./Todo";

function TodoList({ items, type }) {
    return (
        <div>
            {
                items.map((item) => {
                    return <Todo item={item} type={type} />
                }
                )
            }
        </div>
    );
}

export default TodoList;