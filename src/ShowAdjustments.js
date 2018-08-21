import React from 'react';
import {connect} from "react-redux"
import DisplayAdjustment from "./DisplayAdjustment"
import UUID from "uuid"
import {Link} from 'react-router-dom'
import MenuOption from "./MenuOption"
import LogoutButton from "./LogoutButton"



const ShowAdjustments = (props)=> {

  function handleSearch(event) {
    props.handleAdjustmentSearchInput(event.target.value)
    const showAdjustments=props.allAdjustments.filter(adjustment=>adjustment.reason_code.toLowerCase().includes(event.target.value.toLowerCase()))
    props.handleFilterAdjustment(showAdjustments)
  }

    return(<div>
      <Link to="/home"><i className="home icon big ui left floated teal"></i></Link>
      <LogoutButton />
      <MenuOption />
      <span></span>
      <input type="text" value={props.adjustmentSearchInput} placeholder="Search by reason code" onChange={(event)=> handleSearch(event)}/>
      <ul>
      {props.adjustmentSearchInput ? props.filterAdjustment.map(adjustment=><DisplayAdjustment adjustment={adjustment} key={UUID()}/>) :
        props.adjustments.map(adjustment=><DisplayAdjustment adjustment={adjustment} key={UUID()}/>)
    }
      </ul>
      </div>)
}

function mapStateToProps(state) {
  return {
    allAdjustments:state.allAdjustments,
    adjustmentSearchInput:state.adjustmentSearchInput,
    filterAdjustment:state.filterAdjustment
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleAdjustmentSearchInput: (data) => {
      dispatch({type: "HANDLE_SEARCH_ADJUSTMENT", payload: data})
    },
    handleFilterAdjustment: (data) => {
      dispatch({type: "HANDLE_FILTER_ADJUSTMENT", payload: data})
    }

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShowAdjustments);
