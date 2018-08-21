import React from 'react';
import Adapter from "./Adapter"
import {connect} from "react-redux"
import UUID from "uuid"
import firebase from "firebase/app"
import "firebase/storage"

const CreateNewItem = (props) => {

  function uploadHandler(event) {
    event.preventDefault()

    const file = props.image_url
    const key = UUID();
    const storageRef = firebase.storage().ref(key + "/" + file.name)

    // upload the file
    storageRef.put(file).then(() => firebase.storage().ref(key).child(file.name).getDownloadURL().then(url => {
      document.getElementById('preview').src = url
      props.getImageUrl(url)
    }))
    // get the file url

  }

  function handleCreateNewItem(event) {
    event.preventDefault()
    console.log("submit")
    const submissionBody = {
      user_id: props.currentUser.id,
      item_name: props.newProductName,
      retail_price: props.retail_price,
      pomo_price: props.pomo_price,
      most_recent_vendor: props.most_recent_vendor,
      created_by: props.currentUser.username,
      order: 0,
      inventory: 0,
      adjustment: 0,
      status: props.status,
      sales: 0,
      forecast_sales_three_months: props.forecast_sales_three_months,
      need_to_order_for_next_three_months: props.need_to_order_for_next_three_months,
      annualized_sales: props.annualized_sales,
      annualized_qty: props.annualized_qty,
      category: props.category,
      image_url: props.image_url,
      last_edited_by: props.currentUser.username,
      last_cost: props.last_cost,
      barcode: props.barcode,
      unit:props.unit,
    }
    const url = "http://localhost:3000/api/v1/products"
    Adapter.fetchRequest(url, submissionBody, "POST").then(() => {
      console.log("good")
      props.addProduct(submissionBody)
      props.history.push("/items")
    })

  }

  return (<div>
    <h1>Create New Item From</h1>
    <form onSubmit={handleCreateNewItem}>
      <label>Item Name:
        <input type="text" value={props.newProductName} onChange={(event) => props.newItemName(event)} required/></label>
      <br></br>
      <label>Retail Price:
        <input type="number" value={props.retail_price} step="0.01" onChange={(event) => props.newRetailPrice(event)} required/></label>
      <br></br>
      <label>Pomo Price:
        <input type="number" value={props.pomo_price} step="0.01" onChange={(event) => props.newPomoPrice(event)} required/></label>
      <br></br>
      <label>Last Cost:
        <input type="number" value={props.last_cost} step="0.01" onChange={(event) => props.newLastCost(event)} required/></label>
      <br></br>
      <label>Most Recent Vendor:
        <input type="text" value={props.most_recent_vendor} onChange={(event) => props.newMostRecentVendor(event)}required/></label>
      <br></br>
      <label>unit:
        <input type="text" value={props.unit} onChange={(event) => props.newProductUnit(event.target.value)}required/></label>
      <br></br>
      <label>Status:
        <input type="text" value={props.status} onChange={(event) => props.newStatus(event)}required/></label>
      <br></br>
      <label>Forecast Sales For The Next 3 Months:
        <input type="text" value={props.forecast_sales_three_months} onChange={(event) => props.newForecast(event)}/></label>
      <br></br>
      <label>Need To Order For The Next 3 Months:
        <input type="text" value={props.need_to_order_for_next_three_months} onChange={(event) => props.newNeedToOrder(event)}/></label>
      <br></br>
      <label>Annualized Sales:
        <input type="text" value={props.annualized_sales} onChange={(event) => props.newAnnualizedSales(event)}/></label>
      <br></br>
      <label>annualized QTY:
        <input type="text" value={props.annualized_qty} onChange={(event) => props.newAnnualizedQty(event)}/></label>
      <br></br>
      <label>Upload Product Image:
        <input type="file" onChange={(event) => props.newImage_url(event)}/></label>
      <button onClick={uploadHandler}>Upload</button>
      <br></br>
      <label>Category:
        <input type="text" value={props.category} onChange={(event) => props.newCategory(event)}required/></label>
      <br></br>
      <label>Barcode:
        <input type="text" value={props.barcode} onChange={(event) => props.newBarcode(event)}required/></label>
      <br></br>
      <input type="submit" value="Create New Item"/>
    </form>
    <img id="preview" src={props.image_url} height="222" width="332" alt="Please Click Upload"/>
  </div>)

}

function mapStateToProps(state) {
  return {
    newProductName: state.newProductName,
    retail_price: state.retail_price,
    pomo_price: state.pomo_price,
    last_cost: state.last_cost,
    most_recent_vendor: state.most_recent_vendor,
    status: state.status,
    forecast_sales_three_months: state.forecast_sales_three_months,
    need_to_order_for_next_three_months: state.need_to_order_for_next_three_months,
    annualized_sales: state.annualized_sales,
    annualized_qty: state.annualized_qty,
    category: state.category,
    image_url: state.image_url,
    barcode: state.barcode,
    currentUser: state.currentUser,
    unit:state.unit,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newItemName: (event) => {
      dispatch({type: "NEW_ITEM_NAME_INPUT", payload: event.target.value})
    },
    newRetailPrice: (event) => {
      dispatch({type: "NEW_RETAIL_PRICE_INPUT", payload: event.target.value})
    },
    newPomoPrice: (event) => {
      dispatch({type: "NEW_POMO_PRICE_INPUT", payload: event.target.value})
    },
    newLastCost: (event) => {
      dispatch({type: "NEW_LAST_COST_INPUT", payload: event.target.value})
    },
    newMostRecentVendor: (event) => {
      dispatch({type: "NEW_VENDOR_INPUT", payload: event.target.value})
    },
    newStatus: (event) => {
      dispatch({type: "NEW_STATUS_INPUT", payload: event.target.value})
    },
    newForecast: (event) => {
      dispatch({type: "NEW_FORECAST_INPUT", payload: event.target.value})
    },
    newNeedToOrder: (event) => {
      dispatch({type: "NEW_NEED_TO_ORDER_INPUT", payload: event.target.value})
    },
    newAnnualizedSales: (event) => {
      dispatch({type: "NEW_ANNUALIZED_SALES_INPUT", payload: event.target.value})
    },
    newAnnualizedQty: (event) => {
      dispatch({type: "NEW_ANNUALIZED_QTY_INPUT", payload: event.target.value})
    },
    newCategory: (event) => {
      dispatch({type: "NEW_CATEGORY_INPUT", payload: event.target.value})
    },
    newImage_url: (event) => {
      dispatch({type: "NEW_IMAGE_INPUT", payload: event.target.files[0]})
    },
    newBarcode: (event) => {
      dispatch({type: "NEW_BARCODE_INPUT", payload: event.target.value})
    },
    getImageUrl: (url) => {
      dispatch({type: "GET_IMAGE_URL", payload: url})
    },
    addProduct: (newProduct) => {
      dispatch({type: "ADD_NEW_PRODUCT", payload: newProduct})
    },
    newProductUnit:(unit) =>{
      dispatch({type: "NEW_PRODUCT_UNIT", payload: unit})
    },
    updateAllProducts:(data)=>{
      dispatch({type: "UPDATE_ALL_PRODUCTS",payload:data})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateNewItem)
