import React from "react";
import Todo from "./Todo";

const TodoList = ({
                      listTodos,
                      setTodoByIdWithUpdate,
                      removeTodoById,
                      checkTodo,
                      completeTodoByID,
                      isDoneBulkAction,
                      checkList
                  }) => {
    return (
        <section>
            <ul className="todo-list">
                {listTodos.map((todo, index) =>
                    todo ? (
                        <Todo
                            index={index}
                            key={index}
                            todo={todo}
                            checkList={checkList}
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
