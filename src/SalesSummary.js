import React,{Fragment} from 'react';
import LogoutButton from "./LogoutButton"
import MenuOption from "./MenuOption"
import {Link} from 'react-router-dom'
import {BarChart} from 'react-easy-chart';


const SalesSummary=(props)=>{

function allSaleData() {
  const mydata=[...{},{
    x: '2017-Jan',
    y: salesTotal("2017-01"),color: '#f48642'
  },
  {
    x: '2018-Jan',
    y: salesTotal("2018-01"),color: '#f48642'
  },
  {
    x: '2017-Feb',
    y: salesTotal("2017-02"),color: '#41f471'
  },
  {
    x: '2018-Feb',
    y: salesTotal("2018-02"),color: '#41f471'
  },
  {
    x: '2017-Mar',
    y: salesTotal("2017-03"),color: '#163084'
  },
  {
    x: '2018-Mar',
    y: salesTotal("2018-03"),color: '#163084'
  },
  {
    x: '2017-Apr',
    y: salesTotal("2017-04"),color: '#431584'
  },
  {
    x: '2018-Apr',
    y: salesTotal("2018-04"),color: '#431584'
  },
  {
    x: '2017-May',
    y: salesTotal("2017-05"),color: '#93384f'
  },
  {
    x: '2018-May',
    y: salesTotal("2018-05"),color: '#93384f'
  },
  {
    x: '2017-Jun',
    y: salesTotal("2017-06"),color: '#3076a8'
  },
  {
    x: '2018-Jun',
    y: salesTotal("2018-06"),color: '#3076a8'
  },
  {
    x: '2017-Jul',
    y: salesTotal("2017-07"),color: '#5b5408'
  },
  {
    x: '2018-Jul',
    y: salesTotal("2018-07"),color: '#5b5408'
  },
  {
    x: '2017-Aug',
    y: salesTotal("2017-08"),color: '#3c0144'
  },
  {
    x: '2018-Aug',
    y: salesTotal("2018-08"),color: '#3c0144'
  },
  {
    x: '2017-Sep',
    y: salesTotal("2017-09"),color: '#440024'
  },
  {
    x: '2018-Sep',
    y: salesTotal("2018-09"),color: '#440024'
  },
  {
    x: '2017-Oct',
    y: salesTotal("2017-10"),color: '#b81cdb'
  },
  {
    x: '2018-Oct',
    y: salesTotal("2018-10"),color: '#b81cdb'
  },
  {
    x: '2017-Nov',
    y: salesTotal("2017-11"),color: '#1c88db'
  },
  {
    x: '2018-Nov',
    y: salesTotal("2018-11"),color: '#1c88db'
  },
  {
    x: '2017-Dec',
    y: salesTotal("2017-12"),color: '#1ccedb'
  },
  {
    x: '2018-Dec',
    y: salesTotal("2018-12"),color: '#1ccedb'
  }
]

return mydata
}

const salesTotal=(month)=>{

  const monthlySales=props.sales.filter(sale=>sale.created_at.includes(month))
  const initialValue = 0
  return monthlySales.reduce(function(acc, cur) {
    // eslint-disable-next-line
    return parseFloat(acc) + parseFloat(cur.qty)
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
<center><BarChart axisLabels={{x: 'Month 2018 vs 2017', y: 'Units Sales'}}
axes
grid
colorBars
height={750}
width={1650}
data={allSaleData()}/></center>
</Fragment>)
}

export default SalesSummary
