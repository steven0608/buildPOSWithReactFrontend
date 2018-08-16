// import React from 'react';
import {connect} from "react-redux"

// const DisplayOrder = (props) => {
//
//   function processReceiving() {
//     console.log("try this",props.filterOrders[props.filterOrders.indexOf(props.order)].received)
//     props.filterOrders[props.filterOrders.indexOf(props.order)].on_order=false
//     props.filterOrders[props.filterOrders.indexOf(props.order)].received=true
//       props.processFilterOrders(props.filterOrders)
//
//
//     props.allOrders[props.allOrders.indexOf(props.order)].on_order=false
//     props.allOrders[props.allOrders.indexOf(props.order)].received=true
//       props.processAllOrders(props.allOrders)
//
//
//   }
//   return(<li>
//     <p>Product Name:{props.order.product_name}</p>
//     <p><img src={props.allProducts.find(product=>product.id === props.order.product_id).image_url} alt="" height="222" width="332"/></p>
//     <p>Quantity:{props.order.qty}</p>
//     <p>Price:{props.order.price}</p>
//     <p>Total Dollars:{props.order.total_dollars}</p>
//     <p>Vendor Name:{props.order.vendor_name}</p>
//     <p>Order By:{props.order.order_by}</p>
//     <p>Received By:{props.order.received_by}</p>
//     <p>Order Created Date:{props.order.created_at.slice(0,10)}</p>
//     <p>Click To Confirm Product Received:{props.order.received ? "Received Already!" : <button onClick={processReceiving}>On Order</button> }</p>
//     </li>)
// }

// function mapStateToProps(state) {
//   return {
//     currentUser: state.currentUser,
//     allProducts:state.allProducts,
//     filterOrders:state.filterOrders,
//     allOrders:state.allOrders,
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     inputFilterOption: (data) => {
//       dispatch({type: "ORDER_RADIO_BUTTON", payload: data})
//     },
//     processFilterOrders: (data) => {
//       dispatch({type: "UPDATE_FILTER_ORDERS", payload: data})
//     },
//     processAllOrders: (data) => {
//       dispatch({type: "UPDATE_ALL_ORDERS", payload: data})
//     },
//   }
// }

import React, { Component } from 'react';

  class DisplayOrder extends Component {

   processReceiving=()=> {
     console.log("try this",this.props.filterOrders[this.props.filterOrders.indexOf(this.props.order)].received)
     this.props.filterOrders[this.props.filterOrders.indexOf(this.props.order)].on_order=false
     this.props.filterOrders[this.props.filterOrders.indexOf(this.props.order)].received=true
       this.props.processFilterOrders(this.props.filterOrders)


     this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].on_order=false
     this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].received=true
       this.props.processAllOrders(this.props.allOrders)
       this.forceUpdate()

   }
   render(){
   return(<li>
     <p>Product Name:{this.props.order.product_name}</p>
     <p><img src={this.props.allProducts.find(product=>product.id === this.props.order.product_id).image_url} alt="" height="222" width="332"/></p>
     <p>Quantity:{this.props.order.qty}</p>
     <p>Price:{this.props.order.price}</p>
     <p>Total Dollars:{this.props.order.total_dollars}</p>
     <p>Vendor Name:{this.props.order.vendor_name}</p>
     <p>Order By:{this.props.order.order_by}</p>
     <p>Received By:{this.props.order.received_by}</p>
     <p>Order Created Date:{this.props.order.created_at.slice(0,10)}</p>
     <p>Click To Confirm Product Received:{this.props.order.received ? "Received Already!" : <button onClick={this.processReceiving}>On Order</button> }</p>
     </li>)
     }
 }

 function mapStateToProps(state) {
   return {
     currentUser: state.currentUser,
     allProducts:state.allProducts,
     filterOrders:state.filterOrders,
     allOrders:state.allOrders,
   }
 }

 function mapDispatchToProps(dispatch) {
   return {
     inputFilterOption: (data) => {
       dispatch({type: "ORDER_RADIO_BUTTON", payload: data})
     },
     processFilterOrders: (data) => {
       dispatch({type: "UPDATE_FILTER_ORDERS", payload: data})
     },
     processAllOrders: (data) => {
       dispatch({type: "UPDATE_ALL_ORDERS", payload: data})
     },
   }
 }


export default connect(mapStateToProps,mapDispatchToProps)(DisplayOrder)
