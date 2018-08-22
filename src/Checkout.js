import React from 'react';
import {connect} from "react-redux"
import Adapter from "./Adapter"
const Checkout = (props) => {

  function handleReceipt() {
    // console.log("checkout")
    if (props.customerPay - props.checkoutTotalDollar >= 0) {
      alert("Your change: " + (
      props.customerPay - props.checkoutTotalDollar).toFixed(2))
    }
    fetch("http://localhost:3000/api/v1/sales_transcations").then(r => r.json()).then(data => {
      // debugger;
      const findTranscations = data.find(transcation => transcation.user_id === props.currentUser.id && transcation.total_saving === null)
      const currentTransactionId = findTranscations.id
      const url = "http://localhost:3000/api/v1/products_sales"

      let allItemSales=[]
      const today = new Date()
      props.checkoutItems.forEach(item => {

        let submissionBody = {
          sales_transcation_id: currentTransactionId,
          product_id: item.id,
          qty: item.checkoutqty,
          total: item.totalDollars,
          total_saving: item.totalSavings,
          product_name: item.item_name,
          retail_price: item.retail_price,
          pomo_price: item.pomo_price
        }


          if(today.getMonth()<10){
            const date=today.getFullYear().toString()+"-0" + (today.getMonth()+1).toString()+"-"+today.getDate().toString()
                    submissionBody.created_at=date
                    props.addItemSale(submissionBody)
                    allItemSales.push(submissionBody)
          }else {
            const date=today.getFullYear().toString()+"-" + (today.getMonth()+1).toString()+"-"+today.getDate().toString()
                  submissionBody.created_at=date
                  props.addItemSale(submissionBody)
                  allItemSales.push(submissionBody)
          }


        const productUrl="http://localhost:3000/api/v1/products/"+item.id
        let productSubmissionBody = {
          inventory:item.inventory-item.checkoutqty,
          sales:parseFloat(item.sales)+parseFloat(item.checkoutqty)
        }

        props.allProducts[props.allProducts.indexOf(item)].inventory=item.inventory-item.checkoutqty
        props.allProducts[props.allProducts.indexOf(item)].sales=parseFloat(item.sales)+parseFloat(item.checkoutqty)
        props.updateAllProducts(props.allProducts)
        Adapter.fetchRequest(productUrl, productSubmissionBody, "PATCH")
        return Adapter.fetchRequest(url, submissionBody, "POST")

      })


      const transcationUrl = "http://localhost:3000/api/v1/sales_transcations/" + currentTransactionId
      const updateTransaction = {
        total: props.checkoutTotalDollar,
        total_saving: props.checkoutTotalSaving,
        cash_from_customer: props.customerPay,
        change_to_customer: (props.checkoutTotalDollar - props.customerPay).toFixed(2)
      }

      Adapter.fetchRequest(transcationUrl, updateTransaction, "PATCH")
      updateTransaction.products_sales=allItemSales

      if(today.getMonth()<10){
        const date=today.getFullYear().toString()+"-0" + (today.getMonth()+1).toString()+"-"+today.getDate().toString()
                updateTransaction.created_at=date
                props.addProductSale(updateTransaction)
      }else {
        const date=today.getFullYear().toString()+"-" + (today.getMonth()+1).toString()+"-"+today.getDate().toString()
              updateTransaction.created_at=date
              props.addProductSale(updateTransaction)
      }
    }).then(() => {
      props.resetCheckoutItems()
      props.resetCheckoutTotalDollar()
      props.resetCheckoutTotalSaving()
      props.resetProcessCheckout()
      props.resetCustomerPay()
      props.disableDeleteButton()
    })

  }

  function handlePaymentInput(event) {
    props.handleCustomerPay(event.target.value)
  }
  return (<tfoot>
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
      <td>{
          "$" + (
          (props.customerPay - props.checkoutTotalDollar).toFixed(2))
        }</td>
        <td><input className="positive ui button" type="button" value="Print Receipt" onClick={handleReceipt}style={(props.customerPay-props.checkoutTotalDollar)>=0 ? {display:"block"} : {display:"none"}}/></td>
    </tr>
  </tfoot>)
}

function mapStateToProps(state) {
  return {checkoutTotalDollar: state.checkoutTotalDollar,
    checkoutTotalSaving: state.checkoutTotalSaving,
     customerPay: state.customerPay,
     currentUser: state.currentUser,
      checkoutItems: state.checkoutItems,
      allProducts:state.allProducts,
    }
}

function mapDispatchToProps(dispatch) {
  return {
    handleCustomerPay: (amount) => {
      dispatch({type: "HANDLE_CUSTOMER_PAY", payload: amount})
    },
    resetCheckoutItems: () => {
      dispatch({type: "RESET_CHECKOUT_ITEMS"})
    },
    resetCheckoutTotalDollar: () => {
      dispatch({type: "RESET_CHECKOUT_TOTAL"})
    },
    resetCheckoutTotalSaving: () => {
      dispatch({type: "RESET_CHECKOUT_SAVING"})
    },
    resetProcessCheckout: () => {
      dispatch({type: "RESET_PROCESS_CHECKOUT"})
    },
    resetCustomerPay: () => {
      dispatch({type: "RESET_CUSTOMER_PAY"})
    },
    updateAllProducts:(data)=>{
      dispatch({type: "UPDATE_ALL_PRODUCTS",payload:data})
    },
    disableDeleteButton: () => {
      dispatch({type: "DISABLE_DELETE_BUTTON"})
    },
    addProductSale:(data)=>{
      dispatch({type: "ADD_PRODUCT_SALE",payload:data})
    },
    addItemSale:(data)=>{
      dispatch({type: "ADD_ITEM_SALE",payload:data})
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
