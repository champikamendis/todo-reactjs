import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  addTodos,
  favouriteTodos,
  removeTodos,
  updateTodos,
  fetchTodos,
} from "../redux/reducer";
import TodoItem from "./TodoItem";
import { AnimatePresence, motion } from "framer-motion";
import { fetchMyTodos } from "../utils/api";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
    removeTodo: (id) => dispatch(removeTodos(id)),
    updateTodo: (obj) => dispatch(updateTodos(obj)),
    favouriteTodo: (id) => dispatch(favouriteTodos(id)),
  };
};

const DisplayTodos = (props) => {
  const [sort, setSort] = useState("active");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    fetchMyTodos().then((todos) => {
      setTodoList(todos);
    })
  }, [])

  return (
    <div className="displaytodos">
      <div className="buttons">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("active")}
        >
          Active
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("favourite")}
        >
          Favourite
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSort("all")}
        >
          All
        </motion.button>
      </div>
      <ul>
        <AnimatePresence>
          {todoList.length > 0 && sort === "active"
            ? todoList.map((item) => {
                return (
                  item.favourite !== true && (
                    <TodoItem
                      key={item._id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      favouriteTodo={props.favouriteTodo}
                    />
                  )
                );
              })
            : null}
          {/* for favourite items */}
          {todoList.length > 0 && sort === "favourite"
            ? todoList.map((item) => {
                return (
                  item.favourite === true && (
                    <TodoItem
                      key={item._id}
                      item={item}
                      removeTodo={props.removeTodo}
                      updateTodo={props.updateTodo}
                      favouriteTodo={props.favouriteTodo}
                    />
                  )
                );
              })
            : null}
          {/* for all items */}
          {todoList.length > 0 && sort === "all"
            ? todoList.map((item) => {
                return (
                  <TodoItem
                    key={item._id}
                    item={item}
                    removeTodo={props.removeTodo}
                    updateTodo={props.updateTodo}
                    favouriteTodo={props.favouriteTodo}
                  />
                );
              })
            : null}
        </AnimatePresence>
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);