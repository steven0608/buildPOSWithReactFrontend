import React from 'react';
import {connect} from "react-redux"
import OrderList from "./OrderList"


const SeeAllOrders=(props)=>{


function handleRadioButton(event) {
  console.log("just want to check")
  props.inputFilterOption(event.target.value)
  if(event.target.value === "All Order"){
      props.filterOrderList(props.allOrders)

  }else if (event.target.value === "On Order") {
    const onOrders=props.allOrders.filter(order=>order.on_order)
    props.filterOrderList(onOrders)

  }else if (event.target.value === "Received") {
    const received=props.allOrders.filter(order=>order.received)
    props.filterOrderList(received)
  }
}

function handleSubmitOrderSearch(event) {
  event.preventDefault()
  if(props.filterOption === "All Order"){
    const filterByall=props.allOrders.filter(order=>order.product_name === props.ordersSearchInput)
    props.filterOrderList(filterByall)

  }else if (props.filterOption === "On Order") {
    const filterByOnOrder=props.allOrders.filter(order=> order.on_order && order.product_name === props.ordersSearchInput)
    props.filterOrderList(filterByOnOrder)
  }else if (props.filterOption === "Received") {
    const filterByReceived=props.allOrders.filter(order=> order.received && order.product_name === props.ordersSearchInput)
    props.filterOrderList(filterByReceived)
  }else {
    const filterByall=props.allOrders.filter(order=>order.product_name === props.ordersSearchInput)
    props.filterOrderList(filterByall)
  }

}
  return(<div>
      <form onSubmit={handleSubmitOrderSearch}>
      <div onChange={handleRadioButton}>
      <label><input type="radio" value="All Order" name="All Order" checked={props.filterOption === "All Order"}/>All Order</label>
      <label><input type="radio" value="On Order" name="On Order" checked={props.filterOption === "On Order"}/>On Order</label>
      <label><input type="radio" value="Received" name="Received" checked={props.filterOption === "Received"}/>Received</label>
      </div>
      <input type="text" value={props.ordersSearchInput} onChange={(event)=>props.inputOrdersSearch(event.target.value)} placeholder="search by item name" />
      <input type="submit" value="Search"/>
      </form>
      <OrderList />
    </div>)
}


function mapStateToProps(state) {
  return {
    allOrders: state.allOrders,
    filterOrders:state.filterOrders,
    filterOption:state.filterOption,
    ordersSearchInput:state.ordersSearchInput,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    inputFilterOption: (data) => {
      dispatch({type: "ORDER_RADIO_BUTTON", payload: data})
    },
    inputOrdersSearch:(data) => {
      dispatch({type: "SEARCH_ORDER_INPUT", payload: data})
    },
    filterOrderList: (data) => {
      dispatch({type: "FILTER_ORDERS_LIST", payload: data})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeeAllOrders)