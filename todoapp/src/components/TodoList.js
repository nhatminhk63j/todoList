import React from "react";
import Todo from "./Todo";

const TodoList = ({
  listTodos,
  setTodoByIdWithUpdate,
  removeTodoById,
  checkTodo,
  completeTodoByID,
  isDoneBulkAction,
}) => {
  return (
    <section>
      <ul className="todo-list">
        {listTodos.map((todo, index) =>
          todo ? (
            <Todo
              index={index}
              todo={todo}
              setTodoByIdWithUpdate={setTodoByIdWithUpdate}
              removeTodoById={removeTodoById}
              checkTodo={checkTodo}
              completeTodoByID={completeTodoByID}
              isDoneBulkAction={isDoneBulkAction}
            />
          ) : (
            ""
          )
        )}
      </ul>
    </section>
  );
};

export default TodoList;
