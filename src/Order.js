import React, {Component} from 'react';
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import LogoutButton from "./LogoutButton"
import MenuOption from "./MenuOption"
import Adapter from "./Adapter"


class Order extends Component {

  handleSeeAllOrders = (event)=>{
    this.props.history.push("/allorders")
  }

  createOpenOrder=(event)=> {
    event.preventDefault()
    const url="https://limitless-fjord-48119.herokuapp.com/api/v1/orders"
    const submissionBody={
      product_id:this.props.orderProduct.id,
      product_name:this.props.orderProduct.item_name,
      qty:this.props.orderQty,
      price:this.props.orderPrice,
      vendor_name:this.props.orderVendor,
      user_id:this.props.currentUser.id,
      order_by:this.props.currentUser.username,
      on_order:true,
      received:false,
      received_by:"Not Yet",
      total_dollars:this.props.orderPrice*this.props.orderQty,
    }


    Adapter.fetchRequest(url,submissionBody,"POST").then(()=>{
        const today = new Date()
          if(today.getMonth()<9){
            if (today.getDate()<10) {
              const date=today.getFullYear().toString()+"-0" + (today.getMonth()+1).toString()+"-0"+today.getDate().toString()
                      submissionBody.created_at=date
              this.props.addNewOrder(submissionBody)
              this.props.createOrderProduct("")
              this.props.searchBarcodeOrder("")
              this.props.placeOrderQTY("")
              this.props.placeOrderPrice("")
              this.props.placeOrderVendor("")
            } else {
              const date=today.getFullYear().toString()+"-0" + (today.getMonth()+1).toString()+"-"+today.getDate().toString()
                      submissionBody.created_at=date
              this.props.addNewOrder(submissionBody)
              this.props.createOrderProduct("")
              this.props.searchBarcodeOrder("")
              this.props.placeOrderQTY("")
              this.props.placeOrderPrice("")
              this.props.placeOrderVendor("")
            }

          }else {
            if (today.getDate()<10) {
              const date=today.getFullYear().toString()+"-" + (today.getMonth()+1).toString()+"-0"+today.getDate().toString()
                    submissionBody.created_at=date
              this.props.addNewOrder(submissionBody)
              this.props.createOrderProduct("")
              this.props.searchBarcodeOrder("")
              this.props.placeOrderQTY("")
              this.props.placeOrderPrice("")
              this.props.placeOrderVendor("")
            } else {
              const date=today.getFullYear().toString()+"-" + (today.getMonth()+1).toString()+"-"+today.getDate().toString()
                    submissionBody.created_at=date
              this.props.addNewOrder(submissionBody)
              this.props.createOrderProduct("")
              this.props.searchBarcodeOrder("")
              this.props.placeOrderQTY("")
              this.props.placeOrderPrice("")
              this.props.placeOrderVendor("")
            }

          }


    })

  }

  handleBarcode = (event)=>{
    // console.log("barcode",this.props.allProducts)
    this.props.searchBarcodeOrder(event.target.value)
    // eslint-disable-next-line
    const orderProduct=this.props.allProducts.find(product=>parseInt(product.barcode) === parseInt(event.target.value))
    if(orderProduct){
      this.props.createOrderProduct(orderProduct)
    }else{
      this.props.createOrderProduct("")
    }
  }

  render() {
      // console.log("check",this.props.allProducts)
    return (<div>
      <Link to="/home"><i className="home icon big ui left floated teal"></i></Link>
      <LogoutButton />
      <MenuOption />

      <input className="ui teal button" type="button" value="See All Orders" onClick={this.handleSeeAllOrders}/>
      <h1>Create Order</h1>
      <form onSubmit={this.createOpenOrder}>
      <label>Barcode:<input type="text" value={this.props.orderBarcode} onChange={this.handleBarcode} required/></label><br></br>
      <p><img className="ui medium rounded image" src={this.props.orderProduct.image_url} alt=""/></p>
      <p>Product ID:{this.props.orderProduct.id}</p>
      <p>Product Name:{this.props.orderProduct.item_name}</p>
      <p><label>Quantity:<input type="number" value={this.props.orderQty} onChange={(event)=>this.props.placeOrderQTY(event.target.value) } required/></label></p>
      <p><label>Price:<input type="number" value={this.props.orderPrice} step="0.01" onChange={(event)=>this.props.placeOrderPrice(event.target.value)} required/></label></p>
      <p>Total Dollars:{this.props.orderQty*this.props.orderPrice}</p>
      <p><label>Vendor Name:<input type="text" value={this.props.orderVendor} onChange={(event)=>this.props.placeOrderVendor(event.target.value)} required/></label></p>
      <input  type="submit" value="Create Open Order"/>
      </form>
    </div>)
  }
}

function mapStateToProps(state) {
  return{
    allProducts:state.allProducts,
    orderProduct:state.orderProduct,
    orderBarcode:state.orderBarcode,
    orderQty:state.orderQty,
    orderPrice:state.orderPrice,
    orderVendor:state.orderVendor,
    currentUser:state.currentUser,
    allOrders:state.allOrders,
  }
}

function mapDispatchToProps(dispatch) {
return{
  createOrderProduct: (data) => {
    dispatch({type: "CREATE_ORDER_PRODUCT", payload: data})
  },
  searchBarcodeOrder: (data) => {
    dispatch({type: "SEARCH_BARCODE", payload: data})
  },

  placeOrderQTY: (data) => {
    dispatch({type: "PLACE_ORDER_QTY", payload: data})
  },
  placeOrderPrice: (data) => {
    dispatch({type: "PLACE_ORDER_PRICE", payload: data})
  },
  placeOrderVendor: (data) => {
    dispatch({type: "PLACE_ORDER_VENDOR", payload: data})
  },
  addNewOrder: (data) => {
    dispatch({type: "ADD_NEW_ORDER", payload: data})
  },
}

}

export default connect(mapStateToProps, mapDispatchToProps)(Order)
