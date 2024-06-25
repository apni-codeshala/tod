import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addTodo, updateTodo, clearTodos } from '../features/todoSlice';
import './TodoForm.css';

const TodoForm = ({ todoToUpdate }) => {
    const [text, setText] = useState(todoToUpdate ? todoToUpdate.text : '');
    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        if (!text.trim()) return;
        if (todoToUpdate) {
            dispatch(updateTodo({ id: todoToUpdate.id, updatedText: text }));
        } else {
            dispatch(addTodo({ id: nanoid(), text: text }));
        }
        setText('');
    };

    const handleClearTodos = () => {
        dispatch(clearTodos());
    };

    return (
        <>
            <form className="todo-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your todo"
                    value={text}
                    onChange={e => setText(e.target.value)}
                />
                <button type="submit">{todoToUpdate ? 'Update Todo' : 'Add Todo'}</button>
            </form>
            <button type="clear" onClick={handleClearTodos}>Clear all todos</button>
        </>
    );
};

export default TodoForm;
