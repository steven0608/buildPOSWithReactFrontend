import React from 'react';
import ToDoList from "./ToDoList"
import {connect} from "react-redux"
import UUID from "uuid"
import Adapter from "./Adapter"


const AllTasks = (props) => {

  function handleDeleteTask(event) {
    console.log(event.target.name)
    console.log("check",props.currentUser.todolists)
    // eslint-disable-next-line
    const newToDoLists = props.currentUser.todolists.filter(toDoList => toDoList.id !== parseInt(event.target.name))
    const UpdateCurrentUser = {...props.currentUser,todolists:newToDoLists}
    props.deleteTask(UpdateCurrentUser)
    const url = "http://localhost:3000/api/v1/todolists/"+event.target.name
    Adapter.deleteRequest(url,"DELETE")
  }


  return(<ul>
    {props.currentUser.todolists.map(todolist => <div key={UUID()}><ToDoList todolist={todolist} name="allTasks" /><button name={todolist.id} onClick={handleDeleteTask}>Delete</button></div>)}
  </ul>)

}

function mapStateToProps(state) {
  return {currentUser: state.currentUser}
}

function mapDispatchToProps(dispatch) {
  return {
    deleteTask: (toDoLists) => {
      dispatch({type: "DELETE_TASK", payload: toDoLists})
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllTasks)
