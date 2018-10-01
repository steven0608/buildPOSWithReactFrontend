import React, {Component} from 'react';
import {connect} from 'react-redux';

class Login extends Component {

  getUserFromApi = (user,toDoList) => {
    user.todolists=toDoList
    const userinfo= user

    this.props.handleLogin(userinfo)
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // check this
    // fetch("https://limitless-fjord-48119.herokuapp.com/api/v1/users").then(r => r.json()).then(data => this.getUserFromApi(data))

    const submissionBody ={
      username:this.props.usernameInput,
      password:this.props.passwordInput
    }
    const confi={
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionBody)
    }

    fetch("https://limitless-fjord-48119.herokuapp.com/api/v1/login",confi).then(r=>r.json()).then(data=>{
      // debugger;
        localStorage.setItem('token', data.token)
        this.getUserFromApi(data.user_details,data.todolists)
        this.props.history.push("/home")
}).catch(err => {
			// console.warn(err);
			localStorage.removeItem('token')
			this.props.history.push('/');
		})
    this.props.resetUsernameInput()
    this.props.resetPasswordInput()
    // debugger;

  }


  render() {
    return (
      <div className="ui middle aligned center aligned grid">
      <div className="column" id="centermiddle">
      <h2 className="ui teal image header"><img src="https://pbs.twimg.com/profile_images/747458892058271745/MuP5gYmD.jpg" alt=" " className="image" />
        <div className="content"> Log-in to your account</div>
      </h2>
      <form onSubmit={this.handleSubmit
} className="ui large form">
<div className="ui stacked segment">
<div className="field">
<div className="ui left icon input">
<i className="user icon"></i>
        <input type="text" value={this.props.usernameInput} placeholder="Username" onChange={(event) => this.props.handleUsernameInput(event)} required/>
</div>
</div>
<div className="field">
<div className="ui left icon input">
<i className="lock icon"></i>
        <input type="password" value={this.props.passwordInput} placeholder="Password" onChange={(event) => this.props.handlePasswordInput(event)} required/>
</div>
</div>
<input className="ui fluid large teal submit button"  type="submit" value="Login"/>
      </div>
    </form>
    </div>
    </div>
  )
  }
}
function mapStateToProps(state) {
  return {
    // read state
    usernameInput: state.usernameInput,
    passwordInput: state.passwordInput,
    currentUser: state.currentUser
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
    handleLogin: (user) => {
      dispatch({type: "SET_USER", payload: user})
    },

    resetUsernameInput: () => {
      dispatch({type: "RESET_USERNAME"})
    },
    resetPasswordInput: () => {
      dispatch({type: "RESET_PASSWORD"})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
