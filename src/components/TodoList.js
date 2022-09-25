import React, { useState } from "react";
import TodoListItem from "./TodoListItem";
import "./TodoList.css";

const TodoList = ({ todos, completeTodo, removeTodo, updateTodo, removeAll, removeCompleted }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: "",
  });

  const [view, setView] = useState('all');

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: "",
    });
  };

  const pendingTodo = [];
  const completedTodo = [];
  todos.forEach((item) => {
    if (item.isComplete === true) completedTodo.push(item);
    else pendingTodo.push(item);
  });

  return (
    <>
      <div className="todo-list">
        <h2>TodoList</h2>
        <div className="btn-group">
          <button className={view === 'all' ? 'green-btn' : 'view-btn'} onClick={() => setView('all')}>All</button>
          <button className={view === 'done' ? 'green-btn' : 'view-btn'} onClick={() => setView('done')}>Done</button>
          <button className={view === 'todo' ? 'green-btn' : 'view-btn'} onClick={() => setView('todo')}>Todo</button>
        </div>
        <div>
        {view === 'all' ? 
        todos?.map((todo, index) => (
          <div className={todo.isComplete === true ? 'todo-completed' : 'todo-pending'} key={index}>
            <TodoListItem
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
              removeAll={removeAll}
              removeCompleted={removeCompleted}
              submitUpdate={submitUpdate}
              edit={edit}
              setEdit={setEdit}
            />
          </div>
        )): view === 'done' ? completedTodo.map((todo, index) => (
          <div className='todo-completed' key={index}>
            <TodoListItem
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
            />
          </div>
        )) : 
        pendingTodo.map((todo, index) => (
          <div className='todo-pending' key={index}>
            <TodoListItem
              todo={todo}
              completeTodo={completeTodo}
              removeTodo={removeTodo}
              submitUpdate={submitUpdate}
              edit={edit}
              setEdit={setEdit}
            />
          </div>
        ))
        }
        </div>
        {todos.length > 0 ? 
          <div className="btn-group">
            <button onClick={() => removeCompleted()} className="del-btn">Delete done tasks</button>
            <button onClick={() => removeAll()} className="del-btn">Delete all tasks</button>
          </div> : 
          <div>TodoList is empty</div>
        }
      </div>
    </>
  );
};

export default TodoList;
