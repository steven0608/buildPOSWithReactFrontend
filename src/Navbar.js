import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class Navbar extends Component {

  render() {

    return (<div>
      <ul>
        <li><Link to="/profile">Profile Page</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/pos">POS</Link></li>
        <li><Link to="/items">Items</Link></li>
        <li><Link to="/chat">Chat Room</Link></li>
        <li><Link to="/adjustments">Adjustment</Link></li>
        <li><Link to="/orders">Order</Link></li>
        <li><Link to="/ideas">Ideas</Link></li>
      </ul>
    </div>)
  }
}

export default Navbar
