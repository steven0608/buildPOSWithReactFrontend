import React, {Fragment} from 'react';
import {connect} from "react-redux"
import Navbar from "./Navbar"

//
const MenuOption = (props)=>{

  return(<Fragment>
    <div className="ui animated center floated teal button" tabIndex="0" onMouseOver={props.ShowNavBar} >
  <div className="visible content">Next</div>
  <div className="hidden content">
    <i className="right arrow icon"></i>
  </div>
  </div>
{props.showNavBar ? <Navbar/> :null}
</Fragment>
)

}

function mapStateToProps(state) {
  return {
    showNavBar: state.showNavBar,

   }
}

function mapDispatchToProps(dispatch) {
  return {
    ShowNavBar: () => {
      dispatch({type: "SHOW_NAV_BAR",})
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MenuOption);
