import React, {Component} from 'react';
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import DisplayData from "./DisplayData"
import UUID from "uuid"
import MenuOption from "./MenuOption"
import LogoutButton from "./LogoutButton"

class Report extends Component {

  filterData = (event) => {
    event.preventDefault()

    if(this.props.dateRangeTo.slice(0, 4) === this.props.dateRangeFrom.slice(0, 4)){
    const reportDatamonth = this.props.allSalesData.filter(data => data.created_at.slice(0, 4) >= this.props.dateRangeFrom.slice(0, 4) && data.created_at.slice(0, 4) <= this.props.dateRangeTo.slice(0, 4) && data.created_at.slice(5, 7) >= this.props.dateRangeFrom.slice(5, 7) && data.created_at.slice(5, 7) <= this.props.dateRangeTo.slice(5, 7))
    const reportData = reportDatamonth.filter(data => !(data.created_at.slice(5, 7) === this.props.dateRangeTo.slice(5, 7) && data.created_at.slice(8, 10) > this.props.dateRangeTo.slice(8, 10)))
    this.props.filterSalesData(reportData)
  }else{
    const reportDataYear = this.props.allSalesData.filter(data => data.created_at.slice(0, 4) >= this.props.dateRangeFrom.slice(0, 4) && data.created_at.slice(0, 4) <= this.props.dateRangeTo.slice(0, 4))
    const reportData = reportDataYear.filter(data=>!(data.created_at.slice(0, 4) === this.props.dateRangeTo.slice(0, 4) && data.created_at.slice(5, 7) > this.props.dateRangeTo.slice(5, 7) && data.created_at.slice(8, 10) > this.props.dateRangeTo.slice(8, 10)))
    this.props.filterSalesData(reportData)
  }

  }
  render() {
    return (<div>
      <Link to="/home"><i className="home icon big ui left floated teal"></i></Link>
      <LogoutButton />
      <MenuOption />
      <form onSubmit={this.filterData} className="center-SalesSummary">
        <label>From&nbsp;&nbsp;<input type="text" placeholder="YYYY-MM-DD" value={this.props.dateRangeFrom} onChange={(event) => this.props.changeDataRangeFrom(event)} required/></label>
        <label>&nbsp;&nbsp;To&nbsp;&nbsp;<input type="text" placeholder="YYYY-MM-DD" value={this.props.dateRangeTo} onChange={(event) => this.props.changeDataRangeTo(event)} required/></label>
        <input type="submit" value="Get Sales Data"/>
      </form>
      {
        this.props.reportData.length === 0
          ? null
          :
          <div className="center-SalesSummary">
          <table className="ui teal table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Selling Price</th>
                  <th>Pomo Price</th>
                  <th>Total</th>
                  <th>Saving</th>
                  <th>Transcation Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.reportData.map(saleTransaction =>< DisplayData data = {
                    saleTransaction
                  }
                  key = {
                    UUID()
                  } />)
                }
              </tbody>
            </table>
            </div>
      }
    </div>)
  }
}

function mapStateToProps(state) {
  return {allSalesData: state.allSalesData, dateRangeFrom: state.dateRangeFrom, dateRangeTo: state.dateRangeTo, reportData: state.reportData}
}

function mapDispatchToProps(dispatch) {
  return {
    changeDataRangeFrom: (event) => {
      dispatch({type: "CHANGE_DATE_RANGE_FROM", payload: event.target.value})
    },
    changeDataRangeTo: (event) => {
      dispatch({type: "CHANGE_DATE_RANGE_TO", payload: event.target.value})
    },
    filterSalesData: (data) => {
      dispatch({type: "FILTER_SALES_DATA", payload: data})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
