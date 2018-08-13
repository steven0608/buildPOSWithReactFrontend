import React, {Component} from 'react';
import Navbar from "./Navbar"
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import ToDoList from "./ToDoList"
import UUID from "uuid"


class ProfilePage extends Component {

  addTodoList = (data) => {
    // console.log("checking",data)
    console.log("username", this.props.currentUser)
    const user_Todolists = data.filter(todolist => {
      return todolist.to_username.toLowerCase() === this.props.currentUser.username.toLowerCase()
    })
    this.props.showToDoLists(user_Todolists)

    // console.log("to do List", user_Todolists)
  }
  componentDidMount() {
    fetch("http://localhost:3000//api/v1/todolists").then(r => r.json()).then(data => this.addTodoList(data))
  }

  handleCreateTask = () => {

    this.props.history.push("/createtask")
  }

  handleCreateUser = () => {
    this.props.history.push("/createuser")
  }

  handleAllTasks = () => {
    this.props.history.push("/alltasks")
  }
  render() {
    // console.log("Check to do list", this.props.toDoLists)
    return (<div>
      <Link to="/home">Home</Link>
      <Navbar/>
      Hi,User!
      <p>Quote of the week: {this.props.currentUser.quote}</p>
      <h3>Task</h3>
      <input type="button" value="Create New Task" onClick={this.handleCreateTask}/>
      <input type="button" value="Create New User" onClick={this.handleCreateUser}/>
      <input type="button" value="Tasks Created" onClick={this.handleAllTasks}/>

      <ul>
        {this.props.toDoLists.map(todolist => <ToDoList todolist={todolist} key={UUID()}/>)}

      </ul>
    </div>)
  }
}
function mapStateToProps(state) {
  return {currentUser: state.currentUser, toDoLists: state.toDoLists}
}

function mapDispatchToProps(dispatch) {
  return {
    showToDoLists: (toDoLists) => {
      dispatch({type: "SHOW_TODOLISTS", payload: toDoLists})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
