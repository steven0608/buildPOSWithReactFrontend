import React, {Component} from 'react';
import {connect} from "react-redux"
import MenuOption from "./MenuOption"
import LogoutButton from "./LogoutButton"
import Adapter from "./Adapter"
import {Link} from 'react-router-dom'



class Adjustment extends Component {



  handleAdjustmentBarcode = (event)=>{
      this.props.searchBarcodeAdjustment(event.target.value)
      // eslint-disable-next-line
      const adjustmentProduct=this.props.allProducts.find(product=>parseInt(product.barcode) === parseInt(event.target.value))
      if(adjustmentProduct){
        this.props.createAdjustmentProduct(adjustmentProduct)
      }else{
        this.props.createAdjustmentProduct("")
      }
  }

  handleAdjustment = (event)=>{
    event.preventDefault()
    const url= "https://limitless-fjord-48119.herokuapp.com/api/v1/adjustments"
    const submissionBody={
      reason_code:this.props.adjustmenntReasonCode,
      product_id:this.props.adjustmentProduct.id,
      product_name:this.props.adjustmentProduct.item_name,
      qty_to_adjust:this.props.adjustmentQty,
      user_id:this.props.currentUser.id,
      created_by:this.props.currentUser.username,
      total_dollars:this.props.adjustmentQty*this.props.adjustmentProduct.last_cost
    }
    Adapter.fetchRequest(url,submissionBody,"POST").then(()=>{
      const productUrl="https://limitless-fjord-48119.herokuapp.com/api/v1/products/"+this.props.adjustmentProduct.id
      const productSubmissionBody={

        inventory:(parseFloat(this.props.adjustmentProduct.inventory)+parseFloat(this.props.adjustmentQty)).toFixed(2),

        adjustment:(parseFloat(this.props.adjustmentProduct.adjustment)+parseFloat(this.props.adjustmentQty)).toFixed(2),
      }
      // console.log("check",this.props.allProducts.indexOf(this.props.adjustmentProduct))
      // eslint-disable-next-line
      this.props.allProducts[this.props.allProducts.indexOf(this.props.adjustmentProduct)].inventory=(parseFloat(this.props.adjustmentProduct.inventory)+parseFloat(this.props.adjustmentQty)).toFixed(2)
      // eslint-disable-next-line
      this.props.allProducts[this.props.allProducts.indexOf(this.props.adjustmentProduct)].adjustment=(parseFloat(this.props.adjustmentProduct.adjustment)+parseFloat(this.props.adjustmentQty)).toFixed(2)
      this.props.updateAllProducts(this.props.allProducts)
      Adapter.fetchRequest(productUrl,productSubmissionBody,"PATCH")
    }).then(()=>{
        const today = new Date()
        if(today.getMonth()<9){
          if(today.getDate()<10){
            const date=today.getFullYear().toString()+"-0" + (today.getMonth()+1).toString()+"-0"+today.getDate().toString()
                    submissionBody.created_at=date
                    // console.log("check this",submissionBody)
                    this.props.updateAllAdjustments(submissionBody)
                    this.props.createAdjustmentProduct("")
                    this.props.searchBarcodeAdjustment("")
                    this.props.adjustQty("")
                    this.props.adjustmentReason("")

          }else {
            const date=today.getFullYear().toString()+"-0" + (today.getMonth()+1).toString()+"-"+today.getDate().toString()
                    submissionBody.created_at=date
                    // console.log("check this",submissionBody)
                    this.props.updateAllAdjustments(submissionBody)
                    this.props.createAdjustmentProduct("")
                    this.props.searchBarcodeAdjustment("")
                    this.props.adjustQty("")
                    this.props.adjustmentReason("")
          }
        }else {
          if(today.getDate()<10){
            const date=today.getFullYear().toString()+"-" + (today.getMonth()+1).toString()+"-0"+today.getDate().toString()
                  submissionBody.created_at=date
                  this.props.updateAllAdjustments(submissionBody)
                  console.log("check this",submissionBody)
                  this.props.createAdjustmentProduct("")
                  this.props.searchBarcodeAdjustment("")
                  this.props.adjustQty("")
                  this.props.adjustmentReason("")
          }else {
            const date=today.getFullYear().toString()+"-" + (today.getMonth()+1).toString()+"-"+today.getDate().toString()
                  submissionBody.created_at=date
                  this.props.updateAllAdjustments(submissionBody)
                  console.log("check this",submissionBody)
                  this.props.createAdjustmentProduct("")
                  this.props.searchBarcodeAdjustment("")
                  this.props.adjustQty("")
                  this.props.adjustmentReason("")
          }

        }
    })
  }

  render() {

    return (<div>
      <Link to="/home"><i className="home icon big ui left floated teal"></i></Link>
      <LogoutButton />
      <MenuOption />

      <h1>Create Adjustment</h1>
      <form onSubmit={this.handleAdjustment}>
      <label>Barcode:<input type="text" value={this.props.adjustmentBarcode} onChange={this.handleAdjustmentBarcode} required/></label>
      <p><img className="ui medium rounded image" src={this.props.adjustmentProduct.image_url} alt=""/></p>
      <p>Product Name: {this.props.adjustmentProduct.item_name}</p>
      <p>Last Cost: {this.props.adjustmentProduct.last_cost}</p>
      <p>Total Cost Dollars:{(this.props.adjustmentProduct.last_cost*this.props.adjustmentQty) ? this.props.adjustmentProduct.last_cost*this.props.adjustmentQty : null }</p>
      <p><label>Qty to adjust: <input type="number" step="0.01" value={this.props.adjustmentQty} onChange={(event)=>this.props.adjustQty(event.target.value)} required/></label></p>
      <p><label>Reason Code: <input type="text" value={this.props.adjustmenntReasonCode} onChange={(event)=>this.props.adjustmentReason(event.target.value)}required/></label></p>
      <input type="submit" value="Create Adjustment"/>
      </form>
    </div>)
  }
}

function mapStateToProps(state) {
  return{
    adjustmentProduct:state.adjustmentProduct,
    adjustmentBarcode:state.adjustmentBarcode,
    allProducts:state.allProducts,
    adjustmentQty:state.adjustmentQty,
    adjustmenntReasonCode:state.adjustmenntReasonCode,
    currentUser:state.currentUser,
  }
}

function mapDispatchToProps(dispatch) {
  return{
    createAdjustmentProduct: (data) => {
      dispatch({type: "CREATE_ADJUSTMENT_PRODUCT", payload: data})
    },
    searchBarcodeAdjustment:(data) => {
      dispatch({type: "SEARCH_BARCODE_ADJUSTMENT", payload: data})
    },
    adjustQty:(data) => {
      dispatch({type: "ADJUST_QTY", payload: data})
    },
    adjustmentReason:(data) => {
      dispatch({type: "REASON_CODE", payload: data})
    },
    updateAllProducts:(data)=>{
      dispatch({type: "UPDATE_ALL_PRODUCTS",payload:data})
    },
    updateAllAdjustments:(data)=>{
      dispatch({type: "ADD_ADJUSTMENT_ALL",payload:data})
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Adjustment)
