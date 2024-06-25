// src/features/todosSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: loadTodosFromStorage(), // Initialize todos from localStorage
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
            saveTodosToStorage(state.todos); // Save todos to localStorage
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            saveTodosToStorage(state.todos); // Save todos to localStorage
        },
        updateTodo: (state, action) => {
            const { id, updatedText } = action.payload;
            const todoToUpdate = state.todos.find(todo => todo.id === id);
            if (todoToUpdate) {
                todoToUpdate.text = updatedText;
                saveTodosToStorage(state.todos); // Save todos to localStorage
            }
        },
        toggleComplete: (state, action) => {
            const { id } = action.payload;
            const todoToUpdate = state.todos.find(todo => todo.id === id);
            if (todoToUpdate) {
                todoToUpdate.completed = !todoToUpdate.completed;
                saveTodosToStorage(state.todos); // Save todos to localStorage
            }
        },
        clearTodos: (state) => {
            state.todos = [];
            saveTodosToStorage(state.todos); // Clear todos in localStorage
        },
    },
});

export const { addTodo, deleteTodo, updateTodo, toggleComplete, clearTodos } = todosSlice.actions;

export const selectTodos = state => state.todos.todos;

export default todosSlice.reducer;

// Helper functions to interact with localStorage
function loadTodosFromStorage() {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
}

function saveTodosToStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}
