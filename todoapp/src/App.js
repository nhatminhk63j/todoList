import TodoList from "./components/TodoList";
import DetailTodo from "./components/DetailTodo";
import "./css/Todo.css";
import { useEffect, useState } from "react";

// css
import "./css/Todo.css";
import "./App.css";
import React from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const [isDoneBulkAction, setIsBulkAction] = useState(false);

  useEffect(() => {
    setTodoList(JSON.parse(localStorage.getItem("todoList")) || []);
  }, []);

  const setTodoListWithUpdate = (todoList) => {
    const tempList = [...todoList];
    // tempList && tempList.sort((a, b) => a.dueDate - b.dueDate);
    setTodoList(tempList);
    localStorage.setItem("todoList", JSON.stringify(todoList));
  };

  const updateTodoByID = (id, todoItem) => {
    const tempTodoList = [...todoList];
    const updateTodoList = tempTodoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, ...todoItem };
      } else {
        return todo;
      }
    });
    setTodoListWithUpdate(updateTodoList);
  };

  const removeTodoById = (id) => {
    setTodoListWithUpdate(todoList.filter((todo) => todo.id !== id));
  };

  const addTodo = (todoItem) => {
    const tempTodoList = [...todoList, todoItem];
    setTodoListWithUpdate(tempTodoList);
  };

  const completeTodoByID = (id, isDoneAll) => {
    const tempTodoList = [...todoList];
    const updateTodoList = tempTodoList.map((todo) => {
      if (todo.id === id) {
        if (isDoneAll) {
          todo.isDone = true;
          return todo;
        }
        todo.isDone = !todo.isDone;
        return todo;
      } else {
        return todo;
      }
    });
    setTodoListWithUpdate(updateTodoList);
  };
  const checkTodo = (isCheck, id) => {
    if (isCheck) {
      setIsBulkAction(false);
      const temp = [...checkList];
      temp.push(id);
      setCheckList(temp);
    } else {
      const temp = [...checkList];
      const pos = temp.indexOf(id);
      if (pos >= 0) {
        temp.splice(pos, 1);
        setCheckList(temp);
      }
    }
  };

  const completeBulkTodo = () => {
    setIsBulkAction(true);

    Array.from(checkList, (id) => {
      completeTodoByID(id, "1");
    });
    setCheckList([]);
  };
  const removeBulkTodo = () => {
    Array.from(checkList, (id) => {
      removeTodoById(id);
    });
    setCheckList([]);
  };
  const searchTodo = (text) => {
    const tempTodoList = todoList.filter((todo) => todo.title === text);
    setTodoList(tempTodoList);
  };
  const onChangeSearch = (e) => {
    setTextSearch(e.target.value);
    setTodoList(JSON.parse(localStorage.getItem("todoList")) || []);
  };

  return (
    <div className="todoapp">
      <div className="new-task">
        <p className="todo-title">New Task</p>
        <DetailTodo
          todo={[]}
          isEditing={false}
          addTodo={addTodo}
          updateTodoByID={updateTodoByID}
        />
      </div>
      <div className="todo-list">
        <p className="todo-title">Todo List</p>
        <div className="search-todo">
          <input
            type="input"
            placeholder="search..."
            className="search-input"
            value={textSearch}
            onChange={(e) => onChangeSearch(e)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && textSearch) {
                searchTodo(textSearch);
              }
            }}
          ></input>
        </div>
        <TodoList
          listTodos={todoList}
          updateTodoByID={updateTodoByID}
          removeTodoById={removeTodoById}
          checkTodo={checkTodo}
          completeTodoByID={completeTodoByID}
          isDoneBulkAction={isDoneBulkAction}
        />
        {checkList.length ? (
          <div>
            <p>Bulk Action</p>
            <button type="button" onClick={completeBulkTodo}>
              Done
            </button>
            <button type="button" onClick={removeBulkTodo}>
              Remove
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;
