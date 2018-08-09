import React, {Component} from 'react';
import {connect} from 'react-redux';


class Login extends Component {
  handleSubmit = (event) => {
    event.preventDefault()
    console.log("I will fetch data here")
    this.props.handleLogin(this.props.usernameInput)
    this.props.history.push("/home")
  }

  render() {
    return (<form onSubmit={this.handleSubmit
}>
      <label>User Name:
        <input type="text" value={this.props.usernameInput} onChange={(event) => this.props.handleUsernameInput(event)}/></label>
      <label>Password:
        <input type="password" value={this.props.passwordInput} onChange={(event) => this.props.handlePasswordInput(event)}/></label>
      <input type="submit" value="Login"/>
    </form>)
  }
}
function mapStateToProps(state) {
  return {
    // read state
    usernameInput: state.usernameInput,
    passwordInput: state.passwordInput,
    currentUser:  state.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    //setState use callback function
    // addHeads: (data) => {
    //   dispatch({type: "ADD_HEADS", payload: data})
    // } it will be this.props.addHeads() instead of setState({})
    handleUsernameInput: (event) => {
      dispatch({type: "LOGIN_USERNAME", payload: event.target.value})
    },
    handlePasswordInput: (event) => {
      dispatch({type: "LOGIN_PASSWORD", payload: event.target.value})
    },
    handleLogin: (username) => {
      dispatch({type: "SET_USER", payload: username})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
