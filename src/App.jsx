import React, { useState,useEffect } from 'react';
import './App.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editedTodo, setEditedTodo] = useState(null);
  const [completed, setCompleted] = useState([]);

  useEffect(() => {
    // Load todos and completion status from localStorage
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const savedCompleted = JSON.parse(localStorage.getItem('completed')) || [];
    setTodos(savedTodos);
    setCompleted(savedCompleted);
  }, []);

  useEffect(() => {
    // Save todos and completion status to localStorage whenever they change
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('completed', JSON.stringify(completed));
  }, [todos, completed]);


  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setCompleted([...completed, false]); // Initialize as not completed
      setNewTodo('');
    }
  };

  const handleRemoveTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    const updatedCompleted = completed.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    setCompleted(updatedCompleted);
  };

  const handleEditTodo = (index) => {
    setEditedTodo(index);
    setNewTodo(todos[index]);
  };

  const handleUpdateTodo = () => {
    const updatedTodos = [...todos];
    updatedTodos[editedTodo] = newTodo;
    setTodos(updatedTodos);
    setNewTodo('');
    setEditedTodo(null);
  };

  const handleToggleTodo = (index) => {
    const updatedCompleted = [...completed];
    updatedCompleted[index] = !completed[index];
    setCompleted(updatedCompleted);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index} style={{ textDecoration: completed[index] ? 'line-through' : 'none' }} className='list'>
            {todo}
            <button onClick={() => handleEditTodo(index)}>Edit</button>
            <button onClick={() => handleRemoveTodo(index)}>Remove</button>
            <button onClick={() => handleToggleTodo(index)}>
              {completed[index] ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
          </li>
        ))}
      </ul>
      <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      {editedTodo !== null ? (
        <button onClick={handleUpdateTodo}>Update</button>
      ) : (
        <button onClick={handleAddTodo}>Add</button>
      )}
    </div>
  );
};

export default TodoList;