import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Adapter from "./Adapter"

// don't need chatid in our db since username is unique
class CreateUser extends Component {

  handleCreateUserSubmit = (event) => {
    event.preventDefault()
    console.log("I will fetch", this.props.currentUser)

    let submissionBody = {
      username: this.props.newUser_username,
      created_by_username: this.props.currentUser.username,
      created_by_userID: this.props.currentUser.id,
      password: this.props.newUser_password,
      role: this.props.newUser_role,
      status: this.props.newUser_status,
    }

    const url = "http://localhost:3000/api/v1/users"
    Adapter.fetchRequest(url, submissionBody, "POST")
    this.props.history.push("/profile")
  }

  render() {
    return (<Fragment>
      <h2>Create a User</h2>
      <form onSubmit={this.handleCreateUserSubmit}>
        <label>Username:<input type="text" value={this.props.newUser_username} onChange={(event) => this.props.handleNewUserUsernameInput(event)} required/></label>

        <label>password:<input type="password" value={this.props.newUser_password} onChange={(event) => this.props.handleNewUserPasswordInput(event)} required/></label>

        <label>Role:<input type="text" value={this.props.newUser_role} onChange={(event) => this.props.handleNewUserRoleInput(event)} required/></label>

        <label>Status:<input type="text" value={this.props.newUser_status} onChange={(event) => this.props.handleNewUserStatusInput(event)}required/></label>

        <input type="submit" value="Create User"/>
      </form>
    </Fragment>)
  }
}

function mapStateToProps(state) {
  return {currentUser: state.currentUser, newUser_username: state.newUser_username, newUser_password: state.newUser_password, newUser_role: state.newUser_role, newUser_status: state.newUser_status}
}

function mapDispatchToProps(dispatch) {
  return {
    handleNewUserUsernameInput: (event) => {
      dispatch({type: "NEW_USER_USERNAME_INPUT", payload: event.target.value})
    },
    handleNewUserPasswordInput: (event) => {
      dispatch({type: "NEW_USER_PASSWORD_INPUT", payload: event.target.value})
    },
    handleNewUserRoleInput: (event) => {
      dispatch({type: "NEW_USER_ROLE_INPUT", payload: event.target.value})
    },
    handleNewUserStatusInput: (event) => {
      dispatch({type: "NEW_USER_STATUS_INPUT", payload: event.target.value})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)
