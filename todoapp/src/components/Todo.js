import React, {useEffect, useState} from "react";
import DetailTodo from "./DetailTodo";

const Todo = (props) => {
    const {
        todo,
        removeTodoById,
        updateTodoByID,
        checkTodo,
        completeTodoByID,
        checkList
    } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        if (todo.isDone) setIsChecking(false);
    }, [todo])

    useEffect(() => {
        if (!checkList.length) setIsChecking(false);
    }, [checkList])

    const editTodo = () => {
        setIsEditing(!isEditing);
    };

    const removeTodo = () => {
        removeTodoById(todo.id);
    };
    const onCheck = () => {
        checkTodo(!isChecking, todo.id);
        setIsChecking(isChecking => !isChecking);
    }
    const doneTodo = () => {
        completeTodoByID(todo.id);
    };

    return (
        <div key={todo.id} className="todo-view">
            <div>
                <input
                    type="checkbox"
                    checked={isChecking}
                    onChange={onCheck}
                />
                <label>{todo.title}</label>
                <div className="button-todo">
                    <button onClick={() => editTodo()} type="button">
                        Detail
                    </button>
                    <button onClick={removeTodo} type="button">
                        Remove
                    </button>
                    <button
                        className={todo.isDone ? "done-todo" : ""}
                        onClick={doneTodo}
                        type="button"
                    >
                        Done
                    </button>
                </div>
            </div>

            {isEditing ? (
                <DetailTodo
                    todo={todo}
                    isEditing={isEditing}
                    updateTodoByID={updateTodoByID}
                />
            ) : null}
        </div>
    );
}


export default Todo;
