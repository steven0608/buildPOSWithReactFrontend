import React from 'react';
import {connect} from "react-redux"
import Adapter from "./Adapter"
const Checkout = (props)=>{

function handleReceipt() {
  console.log("checkout")
  if(props.customerPay-props.checkoutTotalDollar>=0){
    alert("Your change: "+(props.customerPay-props.checkoutTotalDollar))
  }
fetch("http://localhost:3000/api/v1/sales_transcations").then(r=>r.json()).then(data=>{
  // debugger;
  const findTranscations=data.find(transcation=> transcation.user_id===props.currentUser.id && transcation.total_saving === null)
  const currentTransactionId=findTranscations.id
  const url = "http://localhost:3000/api/v1/products_sales"
  console.log(props.checkoutItems)
  props.checkoutItems.forEach(item=>{
    let submissionBody={
      sales_transcation_id:currentTransactionId,
      product_id:item.id,
      qty:item.checkoutqty,
      total:item.totalDollars,
      total_saving:item.totalSavings,
    }
return Adapter.fetchRequest(url,submissionBody,"POST")
  })
  const transcationUrl="http://localhost:3000/api/v1/sales_transcations/"+currentTransactionId
  const updateTransaction={
    total:props.checkoutTotalDollar,
    total_saving:props.checkoutTotalSaving,
    cash_from_customer:props.customerPay,
    change_to_customer:props.checkoutTotalDollar-props.customerPay,
  }
  Adapter.fetchRequest(transcationUrl,updateTransaction,"PATCH")
}).then(()=>{
  props.resetCheckoutItems()
  props.resetCheckoutTotalDollar()
  props.resetCheckoutTotalSaving()
  props.resetProcessCheckout()
  props.resetCustomerPay()
})

}









  function handlePaymentInput(event) {
    props.handleCustomerPay(event.target.value)
  }
  return(
    <tfoot>
    <tr>
    <td></td>
    <td></td>
    <td></td>
    <td>Sum</td>
    <td>{props.checkoutTotalDollar}</td>
    <td>{props.checkoutTotalSaving}</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td>You pay</td>
    <td><input type="text" value={props.customerPay} onChange={handlePaymentInput}/></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
    <td>Change</td>
    <td>{"$"+(props.customerPay-props.checkoutTotalDollar)}</td>
    <td><input type="button" value="Print Receipt" onClick={handleReceipt}style={(props.customerPay-props.checkoutTotalDollar)>=0 ? {display:"block"} : {display:"none"}}/></td>
  </tr>

</tfoot>)
}

function mapStateToProps(state) {
return{
checkoutTotalDollar:state.checkoutTotalDollar,
checkoutTotalSaving:state.checkoutTotalSaving,
customerPay:state.customerPay,
currentUser:state.currentUser,
checkoutItems:state.checkoutItems,
}
}

function mapDispatchToProps(dispatch) {
return{
  handleCustomerPay: (amount) =>{
    dispatch({type: "HANDLE_CUSTOMER_PAY", payload: amount})
  },
  resetCheckoutItems: () =>{
    dispatch({type: "RESET_CHECKOUT_ITEMS"})
  },
  resetCheckoutTotalDollar: () =>{
    dispatch({type: "RESET_CHECKOUT_TOTAL"})
  },
  resetCheckoutTotalSaving: () =>{
    dispatch({type: "RESET_CHECKOUT_SAVING"})
  },
  resetProcessCheckout: () =>{
    dispatch({type: "RESET_PROCESS_CHECKOUT"})
  },
  resetCustomerPay: () =>{
    dispatch({type: "HANDLE_CUSTOMER_PAY"})
  },
}
}



export default connect(mapStateToProps, mapDispatchToProps)(Checkout);