import React, {Component} from 'react';
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import Adapter from "./Adapter"
import ProductSale from "./ProductSale"
import UUID from "uuid"
import Checkout from "./Checkout"
import LogoutButton from "./LogoutButton"
import MenuOption from "./MenuOption"


class Pos extends Component {

  currentTransaction = () => {
    this.props.disableDeleteButton()
    const url = "https://limitless-fjord-48119.herokuapp.com/api/v1/sales_transcations"
    const submissionBody = {
      user_id: this.props.currentUser.id
    }
    Adapter.fetchRequest(url, submissionBody, "POST")
    this.props.checkout()

    let initialTotalDollar = 0
    let totalCheckoutDollars = this.props.checkoutItems.reduce(function(acc, cur) {

      return acc + parseFloat(cur.totalDollars)
    }, initialTotalDollar).toFixed(2)
    this.props.addtotalDollars(totalCheckoutDollars)

    let initialTotalSaving = 0
    let totalCheckoutSavings = this.props.checkoutItems.reduce(function(acc, cur) {
      return acc + parseFloat(cur.totalDollars)
    }, initialTotalSaving).toFixed(2)
    this.props.addtotalSavings(totalCheckoutSavings)

  }

  handleAddToCart = (event) => {
    event.preventDefault()
    // eslint-disable-next-line
    const addedItem = this.props.allProducts.find(product => product.barcode == this.props.checkoutItemInput || product.item_name === this.props.checkoutItemInput)
    // debugger;
    if (addedItem && this.props.checkoutItems.indexOf(addedItem) === -1) {
      addedItem.checkoutqty = 1
      addedItem.totalDollars = addedItem.pomo_price
      addedItem.totalSavings = addedItem.retail_price - addedItem.pomo_price
      // console.log("check Value",addedItem.retail_price-addedItem.pomo_price)
      this.props.addCheckoutItem(addedItem)
      this.props.resetInput()
    }

  }

  render() {

    return (<div>
      <Link to="/home"><i className="home icon big ui left floated teal"></i></Link>
      <LogoutButton />
      <MenuOption />
      <br></br>
      <br></br>
      <form onSubmit={this.handleAddToCart}>
      <label><a className="ui label large teal"><i className="add icon"></i>Add Items:</a>
          <div className="ui input"><input type="text" value={this.props.checkoutItemInput} placeholder="Enter barcode or Name" onChange={(event) => this.props.handlecheckoutItemInput(event)}/></div></label>
        <input className="positive ui button" type="submit" value="add to cart"/>
      </form>
      <br></br>
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
        {
          this.props.processCheckout
            ? <Checkout/>
            : null
        }
        <tbody>
          {
            this.props.checkoutItems.map(product =>< ProductSale checkoutItem = {
              product
            }
            key = {
              UUID()
            } />)
          }
        </tbody>
      </table>
      <br></br>
      <div className="ui left action input">
      <button className="ui teal labeled icon button" onClick={this.currentTransaction}>
      <i className="cart icon"></i>
      Checkout</button>
      </div>
    </div>)
  }
}



function mapStateToProps(state) {
  return {
    currentTransactionId: state.currentTransactionId,
    checkoutItemInput: state.checkoutItemInput,
    allProducts: state.allProducts,
    checkoutItems: state.checkoutItems,
    checkoutTotalDollar: state.checkoutTotalDollar,
    checkoutTotalSaving: state.checkoutTotalSaving,
    processCheckout: state.processCheckout,
    currentUser: state.currentUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handlecheckoutItemInput: (event) => {
      dispatch({type: "CHECKOUT_ITEM_INPUT", payload: event.target.value})
    },
    addCheckoutItem: (item) => {
      dispatch({type: "ADD_CHECKOUT_ITEM", payload: item})
    },
    checkout: () => {
      dispatch({type: "CHECKOUT"})
    },
    addtotalDollars: (totalCheckout) => {
      dispatch({type: "TOTAL_CHECKOUT_DOLLARS", payload: totalCheckout})
    },
    addtotalSavings: (totalSaving) => {
      dispatch({type: "TOTAL_CHECKOUT_SAVING", payload: totalSaving})
    },
    resetInput: () => {
      dispatch({type: "RESET_INPUT"})
    },
    disableDeleteButton: () => {
      dispatch({type: "DISABLE_DELETE_BUTTON"})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pos)
