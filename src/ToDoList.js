import React from 'react';
import Adapter from "./Adapter"


const ToDoList = (props) => {

function handleTaskCompleted(){
  const listColor=document.getElementById("list"+props.todolist.id)
  const taskButton = document.getElementById(props.todolist.id)
  const submissionBody={
    task_completed:!props.todolist.task_completed
  }
  const url = "http://localhost:3000/api/v1/todolists/"+props.todolist.id
  Adapter.fetchRequest(url,submissionBody,"PATCH")
  if (taskButton.innerText === "Completed"){
    taskButton.innerText="Not Completed"
    taskButton.style.color="#ff0000"
    listColor.style.color="#ff0000"
  }else {
    taskButton.innerText="Completed"
    taskButton.style.color="#000066"
    listColor.style.color="#000066"
  }

}

  return (<li id={"list"+props.todolist.id} style={props.todolist.task_completed
      ? {
        color: "#000066"
      }
      : {
        color: "#ff0000"
      }
} >
    Task From {props.todolist.create_by}: {props.todolist.message} <button id={props.todolist.id} style={props.todolist.task_completed
        ? {
          color: "#000066"
        }
        : {
          color: "#ff0000"
        }
  } onClick={handleTaskCompleted}>{props.todolist.task_completed ? "Completed" : "Not Completed"}</button></li>)

}

export default ToDoList
