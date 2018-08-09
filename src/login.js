import React, {Component} from 'react';
import {connect} from 'react-redux';

class login extends Component {
  handleSubmit = (event) => {
    event.preventDefault()
    console.log("I will fetch data here")
  }

  render() {
    return (<form>
      <label>User Name:
        <input type="text" value={this.props.usernameInput} onChange={(event) => this.props.handleUsernameInput(event)}/></label>
      <label>Password:
        <input type="password" value={this.props.passwordInput} onChange={(event) => this.props.handlePasswordInput(event)}/></label>
      <input type="submit" value="Login" onClick={this.handleSubmit}/>
    </form>)
  }
}
function mapStateToProps(state) {
  return {
    // read state
    usernameInput: state.usernameInput,
    passwordInput: state.passwordInput
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(login)
