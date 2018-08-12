import React, {Component} from 'react';
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import Navbar from "./Navbar"
class Order extends Component {

  render() {

    return (<div>
      <Link to="/home">Home</Link>
      <Navbar/>
      Hi,User!
    </div>)
  }
}

function mapStateToProps() {}

function mapDispatchToProps() {}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
