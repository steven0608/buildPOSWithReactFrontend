import {connect} from "react-redux"
import React, { Component } from 'react';
import Adapter from "./Adapter"

  class DisplayOrder extends Component {

   processReceiving=()=> {
     if (this.props.order.id) {
     let date=0;
     const today = new Date()
       if(today.getMonth()<9){
         if(today.getDate()<10){
           date=today.getFullYear().toString()+"-0" + (today.getMonth()+1).toString()+"-0"+today.getDate().toString()
         }else {
           date=today.getFullYear().toString()+"-0" + (today.getMonth()+1).toString()+"-"+today.getDate().toString()
         }


       }else {
         if (today.getDate()<10) {
           date=today.getFullYear().toString()+"-" + (today.getMonth()+1).toString()+"-0"+today.getDate().toString()
         }else {
           date=today.getFullYear().toString()+"-" + (today.getMonth()+1).toString()+"-"+today.getDate().toString()
         }

       }

     this.props.filterOrders[this.props.filterOrders.indexOf(this.props.order)].on_order=false
     this.props.filterOrders[this.props.filterOrders.indexOf(this.props.order)].received=true
     this.props.filterOrders[this.props.filterOrders.indexOf(this.props.order)].received_by=this.props.currentUser.username
     this.props.filterOrders[this.props.filterOrders.indexOf(this.props.order)].updated_at=date
       this.props.processFilterOrders(this.props.filterOrders)


     this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].on_order=false
     this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].received=true
     this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].received_by=this.props.currentUser.username
     this.props.allOrders[this.props.allOrders.indexOf(this.props.order)].updated_at=date
       this.props.processAllOrders(this.props.allOrders)
       const url="https://limitless-fjord-48119.herokuapp.com/api/v1/orders/"+this.props.order.id
       const submissionBody={
         on_order:false,
         received:true,
         received_by:this.props.currentUser.username
       }
       Adapter.fetchRequest(url,submissionBody,"PATCH").then(()=>{
         const productUrl="https://limitless-fjord-48119.herokuapp.com/api/v1/products/"+this.props.order.product_id
         const currentProduct=this.props.allProducts.find(product=>product.id === this.props.order.product_id)
         const productSubmissionBody={
           order:parseFloat(currentProduct.order)+parseFloat(this.props.order.qty),
           inventory:parseFloat(currentProduct.inventory) + parseFloat(this.props.order.qty),
           last_cost:this.props.order.price,
           most_recent_vendor:this.props.order.vendor_name,
         }


         Adapter.fetchRequest(productUrl,productSubmissionBody,"PATCH")
         this.props.allProducts[this.props.allProducts.indexOf(currentProduct)].order=parseFloat(currentProduct.order)+parseFloat(this.props.order.qty)
         this.props.allProducts[this.props.allProducts.indexOf(currentProduct)].inventory=parseFloat(currentProduct.inventory) + parseFloat(this.props.order.qty)
         this.props.allProducts[this.props.allProducts.indexOf(currentProduct)].last_cost=this.props.order.price
         this.props.allProducts[this.props.allProducts.indexOf(currentProduct)].most_recent_vendor=this.props.order.vendor_name
         this.props.updateAllProducts(this.props.allProducts)
       })
       this.forceUpdate()
}else {
    window.location.reload(true)
}
   }
   render(){

   return(<div className="card">
   <div className="image" id="center-order-card">
   <span></span>
     <h3>{this.props.order.product_name}</h3>
     <center ><img className="ui Mini rounded image" src={this.props.allProducts.find(product=>product.id === this.props.order.product_id).image_url} alt="" height="222" width="332"/></center>
     <div>Quantity:{this.props.order.qty}</div>
     <div>Price:{this.props.order.price}</div>
     <div>Total Dollars:{this.props.order.total_dollars}</div>
     <div>Vendor Name:{this.props.order.vendor_name}</div>
     <div>Order By:{this.props.order.order_by}</div>
     <div>Received By:{this.props.order.received_by}</div>
     <div>Order Created Date:{this.props.order.created_at.slice(0,10)}</div>
     {this.props.order.received ? <h4>Received Already!</h4> : <div><button className="ui teal button" onClick={this.processReceiving}>Click To Confirm Product Received</button></div>}
     </div>
     </div>)
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
     updateAllProducts:(data)=>{
       dispatch({type: "UPDATE_ALL_PRODUCTS",payload:data})
     },
   }
 }


export default connect(mapStateToProps,mapDispatchToProps)(DisplayOrder)
