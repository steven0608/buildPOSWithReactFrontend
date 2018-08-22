import React, {Component,Fragment} from 'react';
import {Link} from 'react-router-dom'
import LogoutButton from "./LogoutButton"
import {connect} from "react-redux"

class Navbar extends Component {

  render() {

if (!!this.props.history) {
  return (
    <Fragment>
    <LogoutButton />

    <div className="my-center vertical-center">
    {this.props.currentUser.role.toLowerCase().includes("cashier") ?
    <div className="ui massive horizontal divided list">
      <div className="item">
        <Link to="/profile" className="ui small circular image"><img src="https://static.thenounproject.com/png/532943-200.png" alt=""/></Link>
        <div className="content">
    <div className="header">Profile Page</div>
  </div>
      </div>
      <div className="item">
        <Link to="/pos" className="ui small circular image"><img src="https://cdn4.iconfinder.com/data/icons/finance-colored-outline/33/point_of_service-512.png" alt=""/> </Link>
        <div className="content">
    <div className="header">POS</div>
  </div>

      </div>
      <div className="item">
        <Link to="/items" className="ui small circular image"><img src="https://static1.squarespace.com/static/52b6128ce4b067a0f5987a3a/t/531e0c0de4b089910ebb2224/1394478094498/Product_icon.png" alt=""/></Link>
        <div className="content">
    <div className="header">Products</div>
  </div>
      </div>
      <div className="item">
        <Link to="/chat" className="ui small circular image"><img src="https://dyu6wqeoj83rj.cloudfront.net/blog/wp-content/uploads/2017/06/29-06-2017_1-300x300.png" alt=""/></Link>
        <div className="content">
    <div className="header">Chat Room</div>
  </div>
      </div>
    </div>
    :
    <div className="ui massive horizontal divided list">
      <div className="item">
        <Link to="/profile" className="ui small circular image"><img src="https://static.thenounproject.com/png/532943-200.png" alt=""/></Link>
        <div className="content">
    <div className="header">Profile Page</div>
  </div>
      </div>
      <div className="item">
        <Link to="/reports" className="ui small circular image"><img src="https://coolchoices.com/wp-content/uploads/2018/01/cool-choices-verified-energy-reports-icon.png" alt=""/></Link>
        <div className="content">
    <div className="header">Reports</div>
  </div>
      </div>
      <div className="item">
        <Link to="/pos" className="ui small circular image"> <img src="https://cdn4.iconfinder.com/data/icons/finance-colored-outline/33/point_of_service-512.png" alt=""/></Link>
        <div className="content">
    <div className="header">POS</div>
  </div>
      </div>
      <div className="item">
        <Link to="/items" className="ui small circular image"><img src="https://static1.squarespace.com/static/52b6128ce4b067a0f5987a3a/t/531e0c0de4b089910ebb2224/1394478094498/Product_icon.png" alt=""/></Link>
        <div className="content">
    <div className="header">Products</div>
  </div>
      </div>
      <div className="item">
        <Link to="/chat" className="ui small circular image"><img src="https://dyu6wqeoj83rj.cloudfront.net/blog/wp-content/uploads/2017/06/29-06-2017_1-300x300.png" alt=""/></Link>
        <div className="content">
    <div className="header">Chat Room</div>
  </div>
      </div>
      <div className="item">
        <Link to="/adjustments" className="ui small circular image"><img src="https://image.flaticon.com/icons/svg/61/61043.svg" alt=""/></Link>
        <div className="content">
    <div className="header">Adjustment</div>
  </div>
      </div>
      <div className="item">
        <Link to="/orders" className="ui small circular image"><img src="http://www.miracleleaguect.org/files/Order%2BRaw%2BFood%2BIndulgence.png" alt=""/></Link>
        <div className="content">
    <div className="header">Order</div>
  </div>
      </div>
    </div>
  }
  </div>
</Fragment>
)
}else {
  return (
    <Fragment>
    <div className="my-center" onMouseLeave={this.props.offNavBar}>
    {this.props.currentUser.role.toLowerCase().includes("cashier") ?
    <div className="ui massive horizontal divided list centered">
      <div className="item">
        <Link to="/profile" className="ui tiny circular image"> <img src="https://static.thenounproject.com/png/532943-200.png" alt=""/></Link>
        <p>Profile Page</p>

      </div>

      <div className="item">
        <Link to="/pos" className="ui tiny circular image"><img src="https://cdn4.iconfinder.com/data/icons/finance-colored-outline/33/point_of_service-512.png" alt=""/> </Link>
        <p>POS</p>

      </div>

      <div className="item">
        <Link to="/items" className="ui tiny circular image"><img src="https://static1.squarespace.com/static/52b6128ce4b067a0f5987a3a/t/531e0c0de4b089910ebb2224/1394478094498/Product_icon.png" alt=""/></Link>
        <p>Products</p>
      </div>

      <div className="item">
        <Link to="/chat" className="ui tiny circular image"><img src="https://dyu6wqeoj83rj.cloudfront.net/blog/wp-content/uploads/2017/06/29-06-2017_1-300x300.png" alt=""/></Link>
        <p>Chat Room</p>
      </div>
    </div>
    :
    <div className="ui massive horizontal divided list">
      <div className="item">
        <Link to="/profile" className="ui tiny circular image"><img src="https://static.thenounproject.com/png/532943-200.png" alt=""/></Link>
        <p>Profile Page</p>
      </div>
      <div className="item">
        <Link to="/reports" className="ui tiny circular image"><img src="https://coolchoices.com/wp-content/uploads/2018/01/cool-choices-verified-energy-reports-icon.png" alt=""/></Link>
        <p>Reports</p>
      </div>

      <div className="item">
        <Link to="/pos" className="ui tiny circular image"> <img src="https://cdn4.iconfinder.com/data/icons/finance-colored-outline/33/point_of_service-512.png" alt=""/></Link>
        <p>POS</p>
      </div>
      <div className="item">
        <Link to="/items" className="ui tiny circular image"><img src="https://static1.squarespace.com/static/52b6128ce4b067a0f5987a3a/t/531e0c0de4b089910ebb2224/1394478094498/Product_icon.png" alt=""/></Link>
        <p>Products</p>
  </div>
      <div className="item">
        <Link to="/chat" className="ui tiny circular image"><img src="https://dyu6wqeoj83rj.cloudfront.net/blog/wp-content/uploads/2017/06/29-06-2017_1-300x300.png" alt=""/></Link>
        <p>Chat Room</p>
      </div>
      <div className="item">
        <Link to="/adjustments" className="ui tiny circular image"><img src="https://image.flaticon.com/icons/svg/61/61043.svg" alt=""/></Link>
        <p>Adjustment</p>
      </div>
      <div className="item">
        <Link to="/orders" className="ui tiny circular image"><img src="http://www.miracleleaguect.org/files/Order%2BRaw%2BFood%2BIndulgence.png" alt=""/></Link>
        <p>Order</p>
      </div>
    </div>
  }
  </div>
</Fragment>)
}
  }
}

function mapStateToProps(state) {
  return{
    currentUser:state.currentUser,
    homePageNav:state.homePageNav,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    offNavBar: () => {
      dispatch({type: "NO_SHOW_NAV_BAR"})
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)


// <div className="item">
//   <Link to="/ideas">Ideas</Link>
// </div>
