import React, {Component} from 'react';
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import Navbar from "./Navbar"
import Adapter from "./Adapter"
import ProductSale from "./ProductSale"
import UUID from "uuid"


class Pos extends Component {

state={
  customerPay:"",
}

  handlePaymentInput = (event) => {
    this.setState({
      customerPay:event.target.value
    })
  }

  currentTransaction = () => {
    const url="http://localhost:3000/api/v1/sales_transcations"
    const submissionBody={
      user_id:1,
    }
    Adapter.fetchRequest(url,submissionBody,"POST")

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
    <tfoot>

    </tfoot>
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
}
}

function mapDispatchToProps(dispatch) {
return{
  addCurrentTransaction: (transcations_id) =>{
    dispatch({type: "ADD_TRANSACTION_ID", payload: transcations_id})
  },
  handlecheckoutItemInput: (event) =>{
    dispatch({type: "CHECKOUT_ITEM_INPUT", payload: event.target.value})
  },
  addCheckoutItem: (item) =>{
    dispatch({type: "ADD_CHECKOUT_ITEM", payload: item})
  },
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Pos)



// <tr>
//   <td></td>
//   <td></td>
//   <td></td>
//   <td>Sum</td>
//   <td>{this.props.checkoutTotalDollar}</td>
//   <td>{this.props.checkoutTotalSaving}</td>
// </tr>
// <tr>
//   <td></td>
//   <td></td>
//   <td></td>
//   <td>You pay</td>
//   <td><input type="text" value={this.state.customerPay} onChange={this.handlePaymentInput}/></td>
// </tr>
// <tr>
//   <td></td>
//   <td></td>
//   <td></td>
//   <td>Change</td>
//   <td>{"$"+(this.props.checkoutTotalDollar - this.state.customerPay)}</td>
// </tr>
