import React, {Component,Fragment} from 'react';
import Navbar from "./Navbar"
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import ToDoList from "./ToDoList"
import UUID from "uuid"
import Adapter from "./Adapter"


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

  handleSubmitQuote=(event)=>{
    event.preventDefault()
    const url="http://localhost:3000/api/v1/users/"+this.props.currentUser.id
    const submissionBody={
      quote:this.props.quoteInput
    }
    Adapter.fetchRequest(url,submissionBody,"PATCH").then(()=>{
      console.log("check",this.props.currentUser.quote)
      console.log(this.props.quoteInput)
      // debugger;

        this.props.currentUser.quote=this.props.quoteInput
        this.props.updateCurrentUser(this.props.currentUser)
        this.props.handleEditOption()
    })
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
      <div>Quote of the week: {!this.props.showEditQuoteField ? <Fragment>{this.props.currentUser.quote ? this.props.currentUser.quote : "empty" }<input type="button" value="edit" onClick={this.props.handleEditOption}/></Fragment> :
        <Fragment><form onSubmit={this.handleSubmitQuote}><input type="text" value={this.props.quoteInput} onChange={(event)=>this.props.handleQuoteInput(event.target.value)} placeholder="Please enter your quote"/>
          <input type="submit" value="Update" /></form>
        </Fragment>
    }</div>
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
  return {
    currentUser: state.currentUser,
     toDoLists: state.toDoLists,
     showEditQuoteField:state.showEditQuoteField,
     quoteInput:state.quoteInput,
   }
}

function mapDispatchToProps(dispatch) {
  return {
    showToDoLists: (toDoLists) => {
      dispatch({type: "SHOW_TODOLISTS", payload: toDoLists})
    },
    handleEditOption: () => {
      dispatch({type: "SHOW_EDIT_QUOTE_FIELD"})
    },
    handleQuoteInput: (data) => {
      dispatch({type: "UPDATE_QUOTE_INPUT",payload: data})
    },
    updateCurrentUser: (data) => {
      dispatch({type: "UPDATE_QUOTE_FOR_CURRENT_USER",payload: data})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
