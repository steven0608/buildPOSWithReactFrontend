import React, { Component } from 'react';
import {connect} from "react-redux"

class ProductSale extends Component {
    state={
      userInput:1
    }

   handleQtyInput=(event)=>{
      // const item=this.props.checkoutItems.find(checkoutItem=>checkoutItem.id === this.props.checkoutItem.id)
      const qtyInput= parseInt(event.target.value)
      this.setState({
        userInput:qtyInput,
      })
        this.props.checkoutItems[this.props.checkoutItems.indexOf(this.props.checkoutItem)].checkoutqty=qtyInput
        this.props.checkoutItems[this.props.checkoutItems.indexOf(this.props.checkoutItem)].totalDollars=this.props.checkoutItem.retail_price*qtyInput
        this.props.checkoutItems[this.props.checkoutItems.indexOf(this.props.checkoutItem)].totalSavings=(this.props.checkoutItem.retail_price-this.props.checkoutItem.pomo_price)*qtyInput
        this.props.addTotal(this.props.checkoutItems)
   }

 render() {
   // console.log("check input",this.props.checkoutItem)
return (<tr>
  <td>{this.props.checkoutItem.item_name}</td>
  <td><input type="number" value={this.state.userInput} onChange={this.handleQtyInput}/></td>
  <td>{this.props.checkoutItem.retail_price}</td>
  <td>{this.props.checkoutItem.pomo_price}</td>
  <td>{this.props.checkoutItem.totalDollars}</td>
  <td>{this.props.checkoutItem.totalSavings}</td>
</tr>)
 }
 }

 function mapStateToProps(state) {
 return{
 checkoutItems:state.checkoutItems,
 }
 }

 function mapDispatchToProps(dispatch) {
 return{
   addTotal: (checkoutItems) =>{
     dispatch({type: "ADD_TOTAL_DOLLARS", payload: checkoutItems})
   },
 }
 }

 export default connect(mapStateToProps,mapDispatchToProps)(ProductSale)
