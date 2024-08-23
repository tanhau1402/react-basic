
import React, { useState } from 'react';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);

    const addTask = (e) => {
        e.preventDefault();
        if (!task.trim()) return;

        if (isEditing) {
            setTodos(todos.map((todo) => 
                todo.id === currentTodo.id ? { ...todo, task: task } : todo
            ));
            setIsEditing(false);
            setCurrentTodo(null);
        } else {
            const newTask = {
                id: Date.now(),
                task: task
            };
            setTodos([...todos, newTask]);
        }

        setTask('');
    };

    const deleteTask = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const editTask = (todo) => {
        setIsEditing(true);
        setTask(todo.task);
        setCurrentTodo(todo);
    };

    return (
        <div className="container">
            <h1 className="text-center">Todo List</h1>
            <form onSubmit={addTask}>
                <div className="d-flex justify-content-center mt-4 mb-4">
                    <input
                        className="form-control"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        type="text"
                        placeholder="Add a new task"
                    />
                    <button type="submit" className="btn btn-primary ms-3">
                        {isEditing ? 'Update Task' : 'Add Task'}
                    </button>
                </div>
            </form>
            <ul className="list-group">
                {todos.map((todo, index) => (
                    <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{index + 1}. {todo.task}</span>
                        <div>
                            <button
                                className="btn btn-warning me-2"
                                onClick={() => editTask(todo)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => deleteTask(todo.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;

