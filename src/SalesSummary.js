import React from 'react';

const SalesSummary=(props)=>{

const salesTotal=(month)=>{

  const monthlySales=props.sales.filter(sale=>sale.created_at.includes(month))
  const initialValue = 0
  return monthlySales.reduce(function(acc, cur) {
    // eslint-disable-next-line
    return parseInt(acc) + parseInt(cur.qty)
  }, initialValue)
}
  return(<div>
    <h1>Sales Summary By Month (Unit Sales)</h1>
    <div>
    2018
    <ul>
    <li>Jan: {salesTotal("2018-01")}</li>
    <li>Feb: {salesTotal("2018-02")}</li>
    <li>Mar: {salesTotal("2018-03")}</li>
    <li>Apr: {salesTotal("2018-04")}</li>
    <li>May: {salesTotal("2018-05")}</li>
    <li>Jun: {salesTotal("2018-06")}</li>
    <li>Jul: {salesTotal("2018-07")}</li>
    <li>Aug: {salesTotal("2018-08")}</li>
    <li>Sep: {salesTotal("2018-09")}</li>
    <li>Oct: {salesTotal("2018-10")}</li>
    <li>Nov: {salesTotal("2018-11")}</li>
    <li>Dec: {salesTotal("2018-12")}</li>
    </ul>
    </div>

    <div>
    2017
    <ul>
    <li>Jan: {salesTotal("2017-01")}</li>
    <li>Feb: {salesTotal("2017-02")}</li>
    <li>Mar: {salesTotal("2017-03")}</li>
    <li>Apr: {salesTotal("2017-04")}</li>
    <li>May: {salesTotal("2017-05")}</li>
    <li>Jun: {salesTotal("2017-06")}</li>
    <li>Jul: {salesTotal("2017-07")}</li>
    <li>Aug: {salesTotal("2017-08")}</li>
    <li>Sep: {salesTotal("2017-09")}</li>
    <li>Oct: {salesTotal("2017-10")}</li>
    <li>Nov: {salesTotal("2017-11")}</li>
    <li>Dec: {salesTotal("2017-12")}</li>
    </ul>
    </div>

  </div>)
}

export default SalesSummary
