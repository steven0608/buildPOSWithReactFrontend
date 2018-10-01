import React, {Component} from 'react';
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import UUID from "uuid"
import MenuOption from "./MenuOption"
import LogoutButton from "./LogoutButton"
import Download from "./Download"
import DisplayProductSale from "./DisplayProductSale"

class Report extends Component {

  filterData = (event) => {
    event.preventDefault()
  //
  //   if(this.props.dateRangeTo.slice(0, 4) === this.props.dateRangeFrom.slice(0, 4)){
  //
  //     // console.log(this.props.allProductsSales)
  //   const reportDatamonth = this.props.allProductsSales.filter(data => {
  //     return data.created_at.slice(0, 4) === this.props.dateRangeFrom.slice(0, 4) && data.created_at.slice(5, 7) >= this.props.dateRangeFrom.slice(5, 7) && data.created_at.slice(5, 7) <= this.props.dateRangeTo.slice(5, 7)})
  //     console.log(reportDatamonth)
  //
  //
  //   const reportData = reportDatamonth.filter(data => !((data.created_at.slice(8, 10) > this.props.dateRangeTo.slice(8, 10) && data.created_at.slice(5, 7)===this.props.dateRangeTo.slice(5, 7)) || (data.created_at.slice(8, 10) < this.props.dateRangeFrom.slice(8, 10) && data.created_at.slice(5, 7)===this.props.dateRangeFrom.slice(5, 7))))
  //     console.log(reportData)
  //   // debugger;
  //   this.props.filterSalesData(reportData)
  //
  // }else{
  //
  //   const reportDataYear = this.props.allProductsSales.filter(data => data.created_at.slice(0, 4) >= this.props.dateRangeFrom.slice(0, 4) && data.created_at.slice(0, 4) <= this.props.dateRangeTo.slice(0, 4))
  //   const reportData = reportDataYear.filter(data=>!(data.created_at.slice(0, 4) === this.props.dateRangeTo.slice(0, 4) && data.created_at.slice(5, 7) > this.props.dateRangeTo.slice(5, 7) && data.created_at.slice(8, 10) > this.props.dateRangeTo.slice(8, 10)))
  //   this.props.filterSalesData(reportData)
  //
  // }

  if(new Date(this.props.dateRangeFrom)<= new Date(this.props.dateRangeTo)){
        const reportData = this.props.allProductsSales.filter(sale=>new Date(sale.created_at.slice(0,10))<=new Date(this.props.dateRangeTo) && new Date(sale.created_at.slice(0,10))>=new Date(this.props.dateRangeFrom))
        this.props.filterSalesData(reportData)

  }else {
    const reportData = []
    this.props.filterSalesData(reportData)
  }
  }
  render() {
    return (<div>
      <Link to="/home"><i className="home icon big ui left floated teal"></i></Link>
      <LogoutButton />
      <MenuOption />
      <div className="ui teal button"><Link to="/dashboard">See Dashboard</Link></div>
      <form onSubmit={this.filterData} className="center-SalesSummary">
        <label>From&nbsp;&nbsp;<input type="text" placeholder="YYYY-MM-DD" value={this.props.dateRangeFrom} onChange={(event) => this.props.changeDataRangeFrom(event)} required/></label>
        <label>&nbsp;&nbsp;To&nbsp;&nbsp;<input type="text" placeholder="YYYY-MM-DD" value={this.props.dateRangeTo} onChange={(event) => this.props.changeDataRangeTo(event)} required/></label>
        <input type="submit" value="Get Sales Data"/>
      </form>
      <Download />
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
                  <th>Transaction Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.props.reportData.map(product => <DisplayProductSale productSale={product} key={UUID()}/>)
                }
              </tbody>
            </table>
            </div>
      }
    </div>)
  }
}

function mapStateToProps(state) {
  return {allProductsSales: state.allProductsSales, dateRangeFrom: state.dateRangeFrom, dateRangeTo: state.dateRangeTo, reportData: state.reportData}
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
