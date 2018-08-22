import React, { Component } from 'react';
import UUID from "uuid"
import firebase from "firebase/app"
import "firebase/storage"
import Adapter from "./Adapter"
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import MenuOption from "./MenuOption"
import LogoutButton from "./LogoutButton"

class EditProduct extends Component {

  state={
    item_name:this.props.product.item_name,
    retail_price:this.props.product.retail_price,
    pomo_price:this.props.product.pomo_price,
    last_cost:this.props.product.last_cost,
    most_recent_vendor:this.props.product.most_recent_vendor,
    unit:this.props.product.unit,
    status:this.props.product.status,
    forecast_sales_three_months:this.props.product.forecast_sales_three_months,
    need_to_order_for_next_three_months:this.props.product.need_to_order_for_next_three_months,
    annualized_sales:this.props.product.annualized_sales,
    annualized_qty:this.props.product.annualized_qty,
    category:this.props.product.category,
    barcode:this.props.product.barcode,
    image_url:this.props.product.image_url,
  }

  newItem_Name = (event)=> {
    this.setState({
      item_name:event.target.value,
    })
  }
  newRetailPrice = (event) =>{
    this.setState({
      retail_price:event.target.value,
    })
  }


  newPomoPrice = (event) => {
    this.setState({
      pomo_price:event.target.value,
    })
  }

  newLastCost=(event)=>{
    this.setState({
      last_cost:event.target.value,
    })
  }

  newMostRecentVendor=(event)=> {
    this.setState({
      most_recent_vendor:event.target.value,
    })

  }

  newProductUnit=(event)=> {
    this.setState({
      unit:event.target.value,
    })

  }

  newStatus =(event)=> {
    this.setState({
      status:event.target.value,
    })

  }

  newForecast=(event)=>{
    this.setState({
      forecast_sales_three_months:event.target.value,
    })
  }




  newNeedToOrder=(event)=>{
    this.setState({
need_to_order_for_next_three_months:event.target.value,
    })
  }

  newAnnualizedSales=(event)=>{
    this.setState({
      annualized_sales:event.target.value,
    })
  }

  newAnnualizedQty=(event)=>{
    this.setState({
      annualized_qty:event.target.value,
    })
  }



  newCategory=(event)=>{
    this.setState({
      category:event.target.value,
    })
  }

  newBarcode=(event)=>{
    this.setState({
      barcode:event.target.value,
    })
  }


newImage_url=(event)=>{
  this.setState({
    image_url:event.target.files[0],
  })
}


uploadHandler=(event)=>{
  event.preventDefault()
  const file = this.state.image_url
  const key = UUID();
  const storageRef = firebase.storage().ref(key + "/" + file.name)

  // upload the file
  storageRef.put(file).then(() => firebase.storage().ref(key).child(file.name).getDownloadURL().then(url => {
    document.getElementById('preview').src = url
    this.setState({
      image_url: url,
    })
  }))
}


handleEditedItem=(event)=>{
  event.preventDefault()
  const submissionBody = {
    item_name: this.state.item_name,
    retail_price: this.state.retail_price,
    pomo_price: this.state.pomo_price,
    most_recent_vendor: this.state.most_recent_vendor,
    status: this.state.status,
    forecast_sales_three_months: this.state.forecast_sales_three_months,
    need_to_order_for_next_three_months: this.state.need_to_order_for_next_three_months,
    annualized_sales: this.state.annualized_sales,
    annualized_qty: this.state.annualized_qty,
    category: this.state.category,
    image_url: this.state.image_url,
    last_edited_by: this.props.currentUser.username,
    last_cost: this.state.last_cost,
    barcode: this.state.barcode,
    unit:this.state.unit,
  }
  const url = "http://localhost:3000/api/v1/products"+this.props.product.id
  Adapter.fetchRequest(url, submissionBody, "PATCH").then(() => {
    this.props.allProducts[this.props.allProducts.indexOf(this.props.product)].item_name= this.state.item_name
    this.props.allProducts[this.props.allProducts.indexOf(this.props.product)].retail_price= this.state.retail_price
    this.props.allProducts[this.props.allProducts.indexOf(this.props.product)].pomo_price= this.state.pomo_price
    this.props.allProducts[this.props.allProducts.indexOf(this.props.product)].most_recent_vendor= this.state.most_recent_vendor
    this.props.allProducts[this.props.allProducts.indexOf(this.props.product)].status= this.state.status
    this.props.allProducts[this.props.allProducts.indexOf(this.props.product)].forecast_sales_three_months= this.state.forecast_sales_three_months
    this.props.allProducts[this.props.allProducts.indexOf(this.props.product)].need_to_order_for_next_three_months= this.state.need_to_order_for_next_three_months
    this.props.allProducts[this.props.allProducts.indexOf(this.props.product)].annualized_sales= this.state.annualized_sales
    this.props.allProducts[this.props.allProducts.indexOf(this.props.product)].annualized_qty= this.state.annualized_qty
    this.props.allProducts[this.props.allProducts.indexOf(this.props.product)].category= this.state.categor
    this.props.allProducts[this.props.allProducts.indexOf(this.props.product)].image_url= this.state.image_url
    this.props.allProducts[this.props.allProducts.indexOf(this.props.product)].last_edited_by= this.props.currentUser.username
    this.props.allProducts[this.props.allProducts.indexOf(this.props.product)].last_cost= this.state.last_cost
    this.props.allProducts[this.props.allProducts.indexOf(this.props.product)].barcode= this.state.barcode
    this.props.allProducts[this.props.allProducts.indexOf(this.props.product)].unit= this.state.unit
    this.props.updateToAllProducts(this.props.allProducts)
    this.props.history.push("/items")
  })

}

 render() {
return (<div>
  <Link to="/home"><i className="home icon big ui left floated teal"></i></Link>
  <LogoutButton />
  <MenuOption />
  <h1>Edit Item From</h1>
  <form onSubmit={this.handleEditedItem}>
    <p><label>Item Name:
      <input type="text" value={this.state.item_name} onChange={this.newItem_Name} required/></label>
    </p>
    <p><label>Retail Price:
      <input type="number" value={this.state.retail_price}  step="0.01" onChange={this.newRetailPrice} required/></label>
    </p>
    <p><label>Pomo Price:
      <input type="number" value={this.state.pomo_price} step="0.01" onChange={this.newPomoPrice} required/></label>
    </p>
    <p><label>Last Cost:
      <input type="number" value={this.state.last_cost} step="0.01" onChange={this.newLastCost}required/></label>
    </p>
    <p><label>Most Recent Vendor:
      <input type="text" value={this.state.most_recent_vendor} onChange={this.newMostRecentVendor}required/></label>
    </p>
    <p><label>unit:
      <input type="text" value={this.state.unit} onChange={this.newProductUnit}required/></label>
    </p>
    <p><label>Status:
      <input type="text" value={this.state.status} onChange={this.newStatus}required/></label>
    </p>
    <p><label>Forecast Sales For The Next 3 Months:
      <input type="text" value={this.state.forecast_sales_three_months} onChange={this.newForecast}/></label>
    </p>
    <p><label>Need To Order For The Next 3 Months:
      <input type="text" value={this.state.need_to_order_for_next_three_months} onChange={this.newNeedToOrder}/></label>
    </p>
    <p><label>Annualized Sales:
      <input type="text" value={this.state.annualized_sales} onChange={this.newAnnualizedSales}/></label>
    </p>
    <p><label>annualized QTY:
      <input type="text" value={this.state.annualized_qty} onChange={this.newAnnualizedQty}/></label>
    </p>
      <p><label>Upload Product Image:
    <input type="file" onChange={this.newImage_url}/></label>
    <button onClick={this.uploadHandler} className="ui tiny teal button">Upload</button>
    </p>
    <p><label>Category:
      <input type="text" value={this.state.category} onChange={this.newCategory}required/></label>
    </p>
    <p><label>Barcode:
      <input type="text" value={this.state.barcode} onChange={this.newBarcode}required/></label>
    </p>
    <input type="submit" value="Update Item"/>
  </form>
  <img id="preview" src={this.state.image_url} height="222" width="332" alt="Please Click Upload"/>
</div>)
 }
 }

 function mapStateToProps(state) {
   return {
     allProducts: state.allProducts,
     currentUser:state.currentUser,
 }
 }

 function mapDispatchToProps(dispatch) {
   return {
     updateToAllProducts: (data) => {
       dispatch({type: "GET_ALL_PRODUCTS", payload: data})
     },
   }
 }


export default connect(mapStateToProps,mapDispatchToProps)(EditProduct)
