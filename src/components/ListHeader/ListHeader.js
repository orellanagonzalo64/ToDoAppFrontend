import React from "react";
import "./ListHeader.css";

function ListHeader(props) {
  return (
    <div>
      <h1>{props.list.name}</h1>
      {props.list.name === "To do" ? (
        <div>
          {" "}
          <button onClick={props.addTask} className="button8">Add Task</button>
          <input
            value={props.text}
            placeholder="Enter new task"
            className="campo"
            type="text"
            onChange={props.onInput}
          ></input>
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
}

export default ListHeader;
