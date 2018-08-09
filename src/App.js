import React, {Component, Fragment} from 'react';
import './App.css';
import {connect} from "react-redux"
import Login from "./login"
import Navbar from "./Navbar"
import Adjustment from "./Adjustment"
import Chat from "./Chat"
import Idea from "./Idea"
import Item from "./Item"
import Order from "./Order"
import Pos from "./Pos"
import ProfilePage from "./ProfilePage"
import Report from "./Report"
import {Route, Switch, withRouter} from 'react-router-dom' //use import { Route, Switch, withRouter } from 'react-router-dom' if needed

class App extends Component {
  render() {
    return (<Fragment>
      <Route exact path="/" render={(routerProps) => <Login {...routerProps}/>}/>
      <Switch>
        <Route path="/home" component={Navbar}/>
        <Route path="/profile" component={ProfilePage}/>
        <Route path="/reports" component={Report}/>
        <Route path="/pos" component={Pos}/>
        <Route path="/items" component={Item}/>
        <Route path="/chat" component={Chat}/>
        <Route path="/adjustments" component={Adjustment}/>
        <Route path="/orders" component={Order}/>
        <Route path="/ideas" component={Idea}/>
      </Switch>
    </Fragment>)
  }
}
function mapStateToProps(state) {
  return {login: state.login}
}

function mapDispatchToProps(dispatch) {
  return {
    //setState use callback function
    // addHeads: (data) => {
    //   dispatch({type: "ADD_HEADS", payload: data})
    // } it will be this.props.addHeads() instead of setState({})
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
