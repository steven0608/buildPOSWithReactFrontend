import React, {Component} from 'react';
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import Navbar from "./Navbar"
import Adapter from "./Adapter"
import ProductSale from "./ProductSale"
import UUID from "uuid"
import Checkout from "./Checkout"

class Pos extends Component {

  currentTransaction = () => {
    const url="http://localhost:3000/api/v1/sales_transcations"
    const submissionBody={
      user_id: this.props.currentUser.id,
    }
    Adapter.fetchRequest(url,submissionBody,"POST")
    this.props.checkout()

    let initialTotalDollar=0
    let totalCheckoutDollars = this.props.checkoutItems.reduce(function (acc,cur) {
      return acc+cur.totalDollars
    },initialTotalDollar)
    this.props.addtotalDollars(totalCheckoutDollars)

    let initialTotalSaving=0
    let totalCheckoutSavings = this.props.checkoutItems.reduce(function (acc,cur) {
      return acc+cur.totalSavings
    },initialTotalSaving)
    this.props.addtotalSavings(totalCheckoutSavings)


  }

  handleAddToCart=(event)=>{
    event.preventDefault()
    const addedItem = this.props.allProducts.find(product => product.barcode===this.props.checkoutItemInput || product.item_name===this.props.checkoutItemInput)
    // debugger;
    if(addedItem && this.props.checkoutItems.indexOf(addedItem)===-1 ){
      addedItem.checkoutqty = 1
      addedItem.totalDollars=addedItem.pomo_price
      addedItem.totalSavings=addedItem.retail_price-addedItem.pomo_price
      // console.log("check Value",addedItem.retail_price-addedItem.pomo_price)
      this.props.addCheckoutItem(addedItem)
      this.props.resetInput()
    }

  }
  render() {

    return (<div>
      <Link to="/home">Home</Link>
      <Navbar/>
      Hi,User!<br></br>
      <form onSubmit={this.handleAddToCart}>
      <label>Add Items: <input type="text" value={this.props.checkoutItemInput} onChange={(event) => this.props.handlecheckoutItemInput(event)}/></label>
      <input type="submit" value="add to cart"/>
      </form>
      <table>
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
    {this.props.processCheckout ?
      <Checkout />
      :
      null
    }
    <tbody>
      {this.props.checkoutItems.map(product=><ProductSale checkoutItem={product} key={UUID()} />)}
    </tbody>
  </table>
  <button onClick={this.currentTransaction}>Checkout</button>
    </div>)
  }
}

function mapStateToProps(state) {
return{
currentTransactionId:state.currentTransactionId,
checkoutItemInput:state.checkoutItemInput,
allProducts:state.allProducts,
checkoutItems:state.checkoutItems,
checkoutTotalDollar:state.checkoutTotalDollar,
checkoutTotalSaving:state.checkoutTotalSaving,
processCheckout:state.processCheckout,
currentUser:state.currentUser,
}
}

function mapDispatchToProps(dispatch) {
return{
  handlecheckoutItemInput: (event) =>{
    dispatch({type: "CHECKOUT_ITEM_INPUT", payload: event.target.value})
  },
  addCheckoutItem: (item) =>{
    dispatch({type: "ADD_CHECKOUT_ITEM", payload: item})
  },
  checkout:()=>{
    dispatch({type: "CHECKOUT"})
  },
  addtotalDollars:(totalCheckout) =>{
    dispatch({type: "TOTAL_CHECKOUT_DOLLARS", payload: totalCheckout})
  },
  addtotalSavings:(totalSaving) =>{
    dispatch({type: "TOTAL_CHECKOUT_SAVING", payload: totalSaving})
  },
  resetInput:() =>{
    dispatch({type: "RESET_INPUT"})
  },
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Pos)
