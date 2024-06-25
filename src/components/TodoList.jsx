import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, toggleComplete, updateTodo, selectTodos } from '../features/todoSlice';
import './TodoList.css';

const TodoList = () => {
    const todos = useSelector(selectTodos);
    const dispatch = useDispatch();
    const [editText, setEditText] = useState('');
    const [editId, setEditId] = useState(null);

    const handleDelete = id => {
        dispatch(deleteTodo(id));
    };

    const handleToggleComplete = id => {
        dispatch(toggleComplete({ id: id }));
    };

    const handleEdit = todo => {
        setEditText(todo.text);
        setEditId(todo.id);
    };

    const handleUpdate = () => {
        if (!editText.trim()) return;
        dispatch(updateTodo({ id: editId, updatedText: editText }));
        setEditText('');
        setEditId(null);
    };

    return (
        <ul className="todo-list">
            {todos.map(todo => (
                <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                    <div className='todoContent'>
                    {editId === todo.id ? (
                        <input
                            type="text"
                            value={editText}
                            onChange={e => setEditText(e.target.value)}
                        />
                    ) : (
                        <span>{todo.text}</span>
                    )}
                    </div>
                    <div>
                        {editId === todo.id ? (
                            <button className="update-button" onClick={handleUpdate}>Update</button>
                        ) : (
                            <>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleToggleComplete(todo.id)}
                                />
                                <button className="edit-button" onClick={() => handleEdit(todo)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(todo.id)}>Delete</button>
                            </>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
