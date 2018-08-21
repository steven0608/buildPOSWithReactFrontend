import React,{Fragment} from 'react';
import Adapter from "./Adapter"
import {connect} from "react-redux"

const ToDoList = (props) => {

  function handleTaskCompleted() {
    const listColor = document.getElementById("list" + props.todolist.id)
    const taskButton = document.getElementById(props.todolist.id)
    const submissionBody = {
      task_completed: !props.todolist.task_completed
    }
    const url = "http://localhost:3000/api/v1/todolists/" + props.todolist.id
    Adapter.fetchRequest(url, submissionBody, "PATCH").then(() => {
      props.toDoLists[props.toDoLists.indexOf(props.todolist)].task_completed = !props.todolist.task_completed
      const user_todolist = props.currentUser.todolists.find(toDoList => toDoList.id === props.todolist.id)
      if (user_todolist) {
        props.currentUser.todolists[props.currentUser.todolists.indexOf(user_todolist)].task_completed = props.toDoLists[props.toDoLists.indexOf(props.todolist)].task_completed
        props.updateUserToDoLists(props.currentUser)
      }

      props.updateToDoLists(props.toDoLists)
      if (taskButton.innerText === "Completed") {
        taskButton.innerText = "Not Completed"
        taskButton.style.color = "#ff0000"
        listColor.style.color = "#ff0000"
      } else {
        taskButton.innerText = "Completed"
        taskButton.style.color = "#000066"
        listColor.style.color = "#000066"
      }
    })
  }


  return (
    <Fragment>{!props.name ?
      <Fragment>
      <li id={"list" + props.todolist.id} style={props.todolist.task_completed
        ? {
          color: "#000066"
        }
        : {
          color: "#ff0000"
        }
  }>
      Task From {props.todolist.create_by}
      To {props.todolist.to_username}
      :{props.todolist.message}
      {
        props.name
          ? null
          : <button id={props.todolist.id} style={props.todolist.task_completed
                ? {
                  color: "#000066"
                }
                : {
                  color: "#ff0000"
                }
  } onClick={handleTaskCompleted}>{
                props.todolist.task_completed
                  ? "Completed"
                  : "Not Completed"
              }</button>
      }</li>
      </Fragment>
      :
      <Fragment>
      <div id={"list" + props.todolist.id} className="content">
      <div className="header" >Task To {props.todolist.to_username===props.todolist.create_by ? "Yourself" : props.todolist.to_username}<div style={props.todolist.task_completed
        ? {
          color: "#000066"
        }
        : {
          color: "#ff0000"
        }
  }>{props.todolist.task_completed ? "(Completed)" :"(Not Completed)"}</div></div>
      <div className="description">{props.todolist.message}</div>
      </div>
      </Fragment>
}
</Fragment>
  )

}


// <div class="content">
//      <div class="header">Elliot Fu</div>
//      <div class="description">
//        Elliot Fu is a film-maker from New York.
//      </div>
//    </div>

function mapStateToProps(state) {
  return {toDoLists: state.toDoLists, currentUser: state.currentUser}
}

function mapDispatchToProps(dispatch) {
  return {
    updateToDoLists: (toDoLists) => {
      dispatch({type: "UPDATE_TODOLISTS", payload: toDoLists})
    },
    updateUserToDoLists: (toDoLists) => {
      dispatch({type: "UPDATE_USER_TODOLISTS", payload: toDoLists})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDoList)
