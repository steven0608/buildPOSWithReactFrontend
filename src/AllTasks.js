import React,{Fragment} from 'react';
import ToDoList from "./ToDoList"
import {connect} from "react-redux"
import UUID from "uuid"
import Adapter from "./Adapter"
import {Link} from 'react-router-dom'
import LogoutButton from "./LogoutButton"
import MenuOption from "./MenuOption"


const AllTasks = (props) => {

  function handleDeleteTask(event) {
    console.log(event.target.name)
    console.log("check", props.currentUser.todolists)
    // eslint-disable-next-line
    const newToDoLists = props.currentUser.todolists.filter(toDoList => toDoList.id !== parseInt(event.target.name))
    const UpdateCurrentUser = {
      ...props.currentUser,
      todolists: newToDoLists
    }
    props.deleteTask(UpdateCurrentUser)
    const url = "http://localhost:3000/api/v1/todolists/" + event.target.name
    Adapter.deleteRequest(url, "DELETE")
  }



  return (
    <Fragment>
    <Link to="/home"><i className="home icon big ui left floated teal"></i></Link>
    <LogoutButton />
    <MenuOption />

    <ul className="ui cards">
    {
      props.currentUser.todolists.map(todolist => <div className="card" key={UUID()}><ToDoList todolist={todolist} name="allTasks"/>
        <button className="ui bottom attached button" name={todolist.id} onClick={handleDeleteTask}><i class="trash alternate icon"></i> Delete</button>
      </div>)
    }
  </ul>
</Fragment>)

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

export default connect(mapStateToProps, mapDispatchToProps)(AllTasks)
