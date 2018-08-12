import React, {Component} from 'react';
import {connect} from "react-redux"
import Navbar from "./Navbar"
import {Link} from 'react-router-dom'
class Adjustment extends Component {

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

export default connect(mapStateToProps, mapDispatchToProps)(Adjustment)
