import React,{Fragment} from 'react';
import LogoutButton from "./LogoutButton"
import MenuOption from "./MenuOption"
import {Link} from 'react-router-dom'


const SalesSummary=(props)=>{

const salesTotal=(month)=>{

  const monthlySales=props.sales.filter(sale=>sale.created_at.includes(month))
  const initialValue = 0
  return monthlySales.reduce(function(acc, cur) {
    // eslint-disable-next-line
    return parseInt(acc) + parseInt(cur.qty)
  }, initialValue)
}
  return(
    <Fragment>
    <Link to="/home"><i className="home icon big ui left floated teal"></i></Link>
    <LogoutButton />
    <MenuOption />
    <br></br>
    <br></br>
    <center><h1>Sales Summary By Month (Unit Sales)</h1></center>
    <div className="center-SalesSummary">
    <table className="ui teal table">
  <thead>
    <tr><th>Month</th>
    <th>2017</th>
    <th>2018</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>Jan</td>
      <td>{salesTotal("2017-01")}</td>
      <td>{salesTotal("2018-01")}</td>
    </tr>
    <tr>
      <td>Feb</td>
      <td>{salesTotal("2017-02")}</td>
      <td>{salesTotal("2018-02")}</td>
    </tr>
    <tr>
      <td>Mar</td>
      <td>{salesTotal("2017-03")}</td>
      <td>{salesTotal("2018-03")}</td>
    </tr>
    <tr>
      <td>Apr</td>
      <td>{salesTotal("2017-04")}</td>
      <td>{salesTotal("2018-04")}</td>
    </tr>
    <tr>
      <td>May</td>
      <td>{salesTotal("2017-05")}</td>
      <td>{salesTotal("2018-05")}</td>
    </tr>
    <tr>
      <td>Jun</td>
      <td>{salesTotal("2017-06")}</td>
      <td>{salesTotal("2018-06")}</td>
    </tr>
    <tr>
      <td>Jul</td>
      <td>{salesTotal("2017-07")}</td>
      <td>{salesTotal("2018-07")}</td>
    </tr>
    <tr>
      <td>Aug</td>
      <td>{salesTotal("2017-08")}</td>
      <td>{salesTotal("2018-08")}</td>
    </tr>
    <tr>
      <td>Sep</td>
      <td>{salesTotal("2017-09")}</td>
      <td>{salesTotal("2018-09")}</td>
    </tr>
    <tr>
      <td>Oct</td>
      <td>{salesTotal("2017-10")}</td>
      <td>{salesTotal("2018-10")}</td>
    </tr>
    <tr>
      <td>Nov</td>
      <td>{salesTotal("2017-11")}</td>
      <td>{salesTotal("2018-11")}</td>
    </tr>
    <tr>
      <td>Dec</td>
      <td>{salesTotal("2017-12")}</td>
      <td>{salesTotal("2018-12")}</td>
    </tr>
  </tbody>
</table>
</div>
</Fragment>)
}

export default SalesSummary
