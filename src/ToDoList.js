import React from 'react';

 const ToDoList = (props)=>{
   console.log("check my list",props.todolist)
   console.log("eh",props.todolist.task_completed)
return(
  <li style={
props.todolist.task_completed ?
{color: "#000066"}
:
{color: "#ff0000"} 
}> Task From {props.todolist.create_by}: {props.todolist.message}</li>
)

}

export default ToDoList
