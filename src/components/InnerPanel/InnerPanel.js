import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import ListHeader from "../ListHeader/ListHeader";
import Task from "../Task/Task";
import "./InnerPanel.css";
import axios from "axios";

function InnerPanel(props) {
  const onDragEnd = async (result, columns, setLists) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      let copiesLists = [...columns];
      copiesLists[source.droppableId].items = sourceItems;
      copiesLists[destination.droppableId].items = destItems;

      let listsBackend = await axios(
        "http://localhost:8800/lists/" + props.userData._id
      );

      let sendBack = listsBackend.data;
      sendBack.lists = copiesLists;

      const result = await axios.put(
        "http://localhost:8800/lists/" + props.userData._id,
        sendBack
      );
      setLists(copiesLists);

      localStorage.setItem("lists", JSON.stringify(copiesLists));
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      let copiesLists = [...columns];
      copiesLists[source.droppableId].items = copiedItems;

      let listsBackend = await axios(
        "http://localhost:8800/lists/" + props.userData._id
      );

      let sendBack = listsBackend.data;
      sendBack.lists = copiesLists;

      

      const result = await axios.put(
        "http://localhost:8800/lists/" + props.userData._id,
        sendBack.lists
      );
      
      setLists(copiesLists);
      localStorage.setItem("lists", JSON.stringify(copiesLists));
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios(
          "http://localhost:8800/lists/" + props.userData._id
        );

        setLists(result.data.lists);
      } catch (err) {
        console.log(err);

        const empylists = [
          {
            idList: uuidv4(),
            name: "To do",
            items: [],
          },
          {
            idList: uuidv4(),
            name: "In Progress",
            items: [],
          },
          {
            idList: uuidv4(),
            name: "Done",
            items: [],
          },
        ];

        try {
          let toBack = { userId: props.userData._id, lists: empylists };
          
          const result = await axios.post(
            "http://localhost:8800/lists/",
            toBack
          );
          setLists(empylists);
        } catch (err) {
          console.log(err);
        }
      }
    }
    fetchData();
  }, [props.userData._id]);

  const [text, setText] = useState("");

  const [lists, setLists] = useState([]);

  const deleteTask = async (task) => {
    //Recorrer el array de lists, dentro de cada lista borrar el elemento que coincida con task

    let newTasksArray = [];

    

    for (let i = 0; i < lists.length; i++) {
      newTasksArray[i] = lists[i].items.filter((t) => {
        return t !== task;
      });
    }

    let newLists = lists;

    for (let i = 0; i < lists.length; i++) {
      
      newLists[i].items = newTasksArray[i];
    }

    let clonado = [...newLists];

    let listsBackend = await axios(
      "http://localhost:8800/lists/" + props.userData._id
    );

    let sendBack = listsBackend.data;
    sendBack.lists = clonado;

    

    const result = await axios.put(
      "http://localhost:8800/lists/" + props.userData._id,
      sendBack
    );

    setLists(clonado);
    localStorage.setItem("lists", JSON.stringify(clonado));
  };

  const addTask = async () => {
    if (text !== "") {
      const newTasks0 = [...lists[0].items, { id: uuidv4(), desc: text }];
      const newLists = lists;
      newLists[0].items = newTasks0;

      let listsBackend = await axios(
        "http://localhost:8800/lists/" + props.userData._id
      );

      let sendBack = listsBackend.data;
      sendBack.lists = newLists;

      const result = await axios.put(
        "http://localhost:8800/lists/" + props.userData._id,
        sendBack
      );
      setLists(newLists);
      localStorage.setItem("lists", JSON.stringify(newLists));
    }

    setText("");
  };

  const onInput = (e) => {
    setText(e.target.value);
  };

  return lists.length !== 0 ? (
    <div>
     
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, lists, setLists)}
      >
        <div className="text">
          <button className="myButton" onClick={props.logout}>Log out</button>
        </div>
        <div className="Lists">
         
          {Object.entries(lists).map(([listId, list], index) => {
            return (
              <div key={listId} className="column">
                <ListHeader
                  addTask={addTask}
                  text={text}
                  list={list}
                  onInput={onInput}
                />
                <Droppable droppableId={listId} key={listId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "#E5D3B8"
                            : "#FFEBCD",
                          padding: 4,
                          width: "auto",
                          minHeight: 500,
                          borderRadius: "5px",
                        }}
                      >
                        {list.items.map((item, index) => {
                          return (
                            <Task
                              index={index}
                              item={item}
                              key={item.id}
                              listId={listId}
                              deleteTask={deleteTask}
                            />
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}

export default InnerPanel;
