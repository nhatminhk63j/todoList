import React, { useState } from "react";
import DetailTodo from "./DetailTodo";

const Todo = (props) => {
  const {
    todo,
    removeTodoById,
    updateTodoByID,
    checkTodo,
    completeTodoByID,
    isDoneBulkAction,
  } = props;
  console.log("done", isDoneBulkAction);
  const [isEditing, setIsEditing] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  console.log(todo.title, isChecking);

  const editTodo = () => {
    setIsEditing(!isEditing);
  };

  const removeTodo = () => {
    removeTodoById(todo.id);
  };
  const onCheck = () => {
    if (isDoneBulkAction) {
      checkTodo(true, todo.id);
      setIsChecking(true);
    } else {
      checkTodo(!isChecking, todo.id);
      setIsChecking(!isChecking);
    }
  };
  const doneTodo = () => {
    completeTodoByID(todo.id, 0);
  };
  return (
    <div key={todo.id} className="todo-view">
      <div>
        <input
          type="checkbox"
          checked={isDoneBulkAction ? false : isChecking}
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
      ) : (
        ""
      )}
    </div>
  );
};

export default Todo;
