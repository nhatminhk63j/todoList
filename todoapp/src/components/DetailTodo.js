import React, { useState } from "react";
import FormError from "./FormError";

const DetailTodo = ({ todo, isEditing, addTodo, updateTodoByID }) => {
  const today = new Intl.DateTimeFormat("fr-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(Date.now());
  const [title, setTitle] = useState(todo.title || "");
  const [description, setDescription] = useState(todo.description || "");
  const [priority, setPriority] = useState(todo.priority || "normal");
  const [dueDate, setDueDate] = useState(todo.dueDate || today);
  const [isValid, setIsValid] = useState({ title: true, description: true });

  const onChangePriority = (e) => {
    setPriority(e.target.value);
  };

  const onChangeDate = (e) => {
    setDueDate(e.target.value);
  };

  const onChangeTitle = (e) => {
    if (e.target.value) {
      setIsValid({ ...isValid, title: true });
    }
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    if (e.target.value) {
      setIsValid({ ...isValid, description: true });
    }
    setDescription(e.target.value);
  };

  const handleAdd = () => {
    if (!title && !description) {
      setIsValid({ title: false, description: false });
    } else if (!title && description) {
      setIsValid({ title: false, description: true });
    } else if (title && !description) {
      setIsValid({ title: true, description: false });
    } else if (isValid.title && isValid.description) {
      addTodo({
        id: Date.now(),
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
        isDone: 0,
      });
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("normal");
    }
  };

  const handleUpdate = () => {
    updateTodoByID(todo.id, {
      id: todo.id,
      title: title,
      description: description,
      dueDate: dueDate,
      priority: priority,
      isDone: todo.isDone,
    });
  };

  const handleInputValidation = (e) => {
    const { name } = e.target;
    const temp = name === "title" ? { title: false } : { description: false };
    if (e.target.value) {
      setIsValid({ title: true, description: true });
    } else {
      setIsValid({ ...isValid, ...temp });
    }
    console.log(isValid);
  };

  return (
    <form>
      <div>
        <p className="todo-detail-label">Title</p>
        <input
          name="title"
          className="input-todo-title"
          value={title}
          onChange={(e) => onChangeTitle(e)}
          onBlur={(e) => handleInputValidation(e)}
        />
        <FormError isHidden={isValid.title}></FormError>
      </div>
      <div>
        <p className="todo-detail-label">Description</p>

        <textarea
          name="description"
          className="desscription-todo"
          value={description}
          onChange={(e) => onChangeDescription(e)}
          onBlur={(e) => handleInputValidation(e)}
        ></textarea>
        <FormError isHidden={isValid.description}></FormError>
      </div>

      <div className="todo-select-box">
        <p className="todo-detail-label">Due Date</p>
        <input
          className="due-date-todo"
          type="date"
          value={dueDate}
          onChange={(e) => onChangeDate(e)}
        />
      </div>
      <div className="todo-select-box">
        <p className="todo-detail-label">Priority</p>
        <select
          className="priority-todo"
          value={priority}
          onChange={(e) => onChangePriority(e)}
        >
          <option>low</option>
          <option>normal</option>
          <option>high</option>
        </select>
      </div>

      {isEditing ? (
        <button
          className="todo-detail-button"
          type="button"
          onClick={() => handleUpdate()}
        >
          Update
        </button>
      ) : (
        <button
          className="todo-detail-button"
          type="button"
          onClick={() => handleAdd()}
        >
          Add
        </button>
      )}
    </form>
  );
};

export default DetailTodo;
