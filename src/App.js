import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from "react-redux"
import Login from "./login"
import {Route, Switch, withRouter, Link} from 'react-router-dom' //use import { Route, Switch, withRouter } from 'react-router-dom' if needed

class App extends Component {
  render() {
    return (<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        To get started, edit
        <code>src/App.js</code>
        and save to reload.
      </p>
      <Switch>
        <Route path="/login" render={(routerProps) => <Login {...routerProps}/>}/>
      </Switch>
      <Link to="/login">Login</Link>
    </div>);
  }
}

function mapStateToProps(state) {
  return {
    // read state

  }
}

function mapDispatchToProps(dispatch) {
  return {
    //setState use callback function
    // addHeads: (data) => {
    //   dispatch({type: "ADD_HEADS", payload: data})
    // } it will be this.props.addHeads() instead of setState({})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
