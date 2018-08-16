import React from 'react';
import {connect} from "react-redux"
import DisplayOrder from "./DisplayOrder"
import UUID from "uuid"


const OrderList=(props)=>{
  console.log("check filter Orders",props.filterOrders)
  return(<ul>
    {props.filterOrders ? props.filterOrders.map(order=>
    <DisplayOrder order={order} key={UUID()}/>) : null}
  </ul>)
}

function mapStateToProps(state) {
  return {
    filterOrders:state.filterOrders,
  }
}

export default connect(mapStateToProps)(OrderList)
