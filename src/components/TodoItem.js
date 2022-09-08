import { motion } from "framer-motion";
import React, { useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoClose, IoHeartOutline } from "react-icons/io5";

const TodoItem = (props) => {
  
  const { item, updateTodo, removeTodo, favouriteTodo } = props;

  const inputRef = useRef(true);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const update = (id, value, e) => {
    if (e.which === 13) {
      //here 13 is key code for enter key
      updateTodo({ id, item: value });
      inputRef.current.disabled = true;
    }
  };
  return (
    <motion.li
      initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
      animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
      whileHover={{
        scale: 0.9,
        transition: { type: "spring", duration: 0.1 },
      }}
      exit={{
        x: "-60vw",
        scale: [1, 0],
        transition: { duration: 0.5 },
        backgroundColor: "rgba(255,0,0,1)",
      }}
      key={item._id}
      className="card"
    >
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.name}
        onKeyPress={(e) => update(item._id, inputRef.current.value, e)}
      />
      <div className="btns">
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => changeFocus()}
        >
          {" "}
          <AiFillEdit />{" "}
        </motion.button>
        {item.favourite !== true && (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9, fill: 'Background' }}
            style={{ color: "black" }}
            onClick={() => {
              favouriteTodo(item._id);
              window.location.reload(false)
            }}
          >
            <IoHeartOutline />
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={() => {
            removeTodo(item._id);
            window.location.reload(false);
          }}
        >
          {" "}
          <IoClose />
        </motion.button>{" "}
      </div>
      {item.favourite && <span className="favourite" onClick={() => favouriteTodo(item._id)}> Fav </span>}
    </motion.li>
  );
};

export default TodoItem;
