import React from "react";
import "./Task.css";
import { Draggable } from "react-beautiful-dnd";

function Task(props) {
  return (
    <div>
      <Draggable
        key={props.item.id}
        draggableId={props.item.id}
        index={props.index}
      >
        {(provided,snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}

              style={{
                userSelect: "none",
                padding: 5,
                margin: "0 0 8px 0",
                minHeight: "50px",
                backgroundColor: snapshot.isDragging
                  ? "#ffcc81"
                  : "#ffcc81",
                color: "white",
                borderRadius: "5px",
                ...provided.draggableProps.style
              }}

           
            >
              <p className="desc">{props.item.desc}</p>
              <button onClick={() => props.deleteTask(props.item)} className="button">
                X
              </button>
            </div>
          );
        }}
      </Draggable>
    </div>
  );
}

export default Task;
