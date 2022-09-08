import { createSlice } from "@reduxjs/toolkit";
import { fetchMyTodos, addTodo, deleteTodo, updateTodo } from "../utils/api";

const initialState = [];

const addTodoReducer = createSlice({
  name: "todos",
  initialState,
  
  reducers: {
    
    //Adding todos
    addTodos: (state, action) => {
      addTodo(action.payload.item, action.payload.id)
      state.push(action.payload);

      return state;
    },

    //remove todos
    removeTodos: (state, action) => {
      deleteTodo(action.payload);

      return state.filter((item) => item.id !== action.payload);
    },

    //update todos
    updateTodos: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          updateTodo(action.payload.id, action.payload.item)

          return {
            ...todo,
            item: action.payload.item,
          };
        }

        return todo;
      });
    },

    //favourite
    favouriteTodos: (state, action) => {
      return state.map((todo) => {
        if (todo.id === action.payload) {
          if (todo.favourite) {

            return {
              ...todo,
              favourite: false,
            };
          }

          return {
            ...todo,
            favourite: true,
          };
        }

        return todo;
      });
    },
  },
});

export const {
  addTodos,
  removeTodos,
  updateTodos,
  favouriteTodos,
  fetchTodos,
} = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;
