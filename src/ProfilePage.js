import React, {Component,Fragment} from 'react';
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import ToDoList from "./ToDoList"
import UUID from "uuid"
import Adapter from "./Adapter"
import LogoutButton from "./LogoutButton"
import MenuOption from "./MenuOption"

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
      <Link to="/home"><i className="home icon big ui left floated teal"></i></Link>
      <LogoutButton />
      <MenuOption />
      <br/>
      <h2 >Hi,{this.props.currentUser.username}!</h2>
      <div className="ui teal large message">Quote of the week: {!this.props.showEditQuoteField ? <Fragment>{this.props.currentUser.quote ? this.props.currentUser.quote : "empty" }  <input  className="ui small teal button" type="button" value="edit" onClick={this.props.handleEditOption}/></Fragment> :
        <Fragment> <form onSubmit={this.handleSubmitQuote}className="ui action input" > <input type="text" value={this.props.quoteInput} onChange={(event)=>this.props.handleQuoteInput(event.target.value)} placeholder="Please enter your quote"/>
          <input className="ui small teal button" type="submit" value="Update" /></form>
        </Fragment>
    }</div>
      <br/>
      <br/>
      <input type="button" value="Create New Task"  className="ui small teal button" onClick={this.handleCreateTask}/>
      {this.props.currentUser.role.toLowerCase().includes("cashier") ? null : <input type="button" value="Create New User" className="ui small teal button" onClick={this.handleCreateUser}/>}
      <input type="button" value="Tasks Created" className="ui small teal button" onClick={this.handleAllTasks}/>
      <div class="ui message">
        <div class="header">
            To Do List
        </div>
      <ul className="list">
        {this.props.toDoLists.map(todolist => <ToDoList todolist={todolist} key={UUID()}/>)}

      </ul>
      </div>
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
