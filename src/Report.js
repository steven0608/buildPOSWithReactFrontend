import React, {Component} from 'react';
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import Navbar from "./Navbar"
import DisplayData from "./DisplayData"
import UUID from "uuid"

class Report extends Component {

filterData = (event) => {
  event.preventDefault()
  // do once more filter for years
  const reportDatamonth= this.props.allSalesData.filter(data=>
    data.created_at.slice(0,4)>=this.props.dateRangeFrom.slice(0,4) && data.created_at.slice(0,4)<=this.props.dateRangeTo.slice(0,4) && data.created_at.slice(5,7)>=this.props.dateRangeFrom.slice(5,7) && data.created_at.slice(5,7)<=this.props.dateRangeTo.slice(5,7)
)
const reportData = reportDatamonth.filter(data=>
!(data.created_at.slice(5,7)===this.props.dateRangeTo.slice(5,7) && data.created_at.slice(8,10)>this.props.dateRangeTo.slice(8,10))
)

  this.props.filterSalesData(reportData)
}
  render() {
    return (<div>
      <Link to="/home">Home</Link>
      <Navbar/>
      <form onSubmit={this.filterData}>
      <label>From<input type="text" placeholder="YYYY-MM-DD" value={this.props.dateRangeFrom} onChange={(event)=>this.props.changeDataRangeFrom(event)}/></label>
      <label>To<input type="text" placeholder="YYYY-MM-DD" value={this.props.dateRangeTo} onChange={(event)=> this.props.changeDataRangeTo(event)}/></label>
      <input type="submit" value="Get Sales Data"/>
      </form>
      {this.props.reportData.length===0 ? null : <table>
    <thead>
      <tr>
        <th>Product Name</th>
        <th>Quantity</th>
        <th>Selling Price</th>
        <th>Pomo Price</th>
        <th>Total</th>
        <th>Saving</th>
      </tr>
    </thead>
    <tbody>
    {this.props.reportData.map(saleTransaction=><DisplayData data={saleTransaction} key={UUID()}/>)}
    </tbody>
  </table>}
    </div>
  )
}
}

function mapStateToProps(state) {
  return{
    allSalesData:state.allSalesData,
    dateRangeFrom:state.dateRangeFrom,
    dateRangeTo:state.dateRangeTo,
    reportData:state.reportData,
  }
}

function mapDispatchToProps(dispatch) {
  return{
    changeDataRangeFrom: (event) => {
      dispatch({type: "CHANGE_DATE_RANGE_FROM", payload: event.target.value})
    },
    changeDataRangeTo: (event) => {
      dispatch({type: "CHANGE_DATE_RANGE_TO", payload: event.target.value})
    },
    filterSalesData: (data) => {
      dispatch({type: "FILTER_SALES_DATA", payload: data})
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report)
