import React, {Component} from 'react';
import {connect} from "react-redux"
import Navbar from "./Navbar"
import {Link} from 'react-router-dom'
import Adapter from "./Adapter"


class Adjustment extends Component {



  handleAdjustmentBarcode = (event)=>{
      this.props.searchBarcodeAdjustment(event.target.value)
      // eslint-disable-next-line
      const adjustmentProduct=this.props.allProducts.find(product=>product.barcode === parseInt(event.target.value))
      if(adjustmentProduct){
        this.props.createAdjustmentProduct(adjustmentProduct)
      }else{
        this.props.createAdjustmentProduct("")
      }
  }

  handleAdjustment = (event)=>{
    event.preventDefault()
    const url= "http://localhost:3000/api/v1/adjustments"
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
      const productUrl="http://localhost:3000/api/v1/products/"+this.props.adjustmentProduct.id
      const productSubmissionBody={
        // eslint-disable-next-line
        inventory:(parseInt(this.props.adjustmentProduct.inventory)+parseInt(this.props.adjustmentQty)),
        // eslint-disable-next-line 
        adjustment:(parseInt(this.props.adjustmentProduct.adjustment)+parseInt(this.props.adjustmentQty)),
      }
      Adapter.fetchRequest(productUrl,productSubmissionBody,"PATCH")
    }).then(()=>{
        this.props.createAdjustmentProduct("")
        this.props.searchBarcodeAdjustment("")
        this.props.adjustQty("")
        this.props.adjustmentReason("")
    })
  }

  render() {

    return (<div>
      <Link to="/home">Home</Link>
      <Navbar/>
      Hi,User!
      <h1>Create Adjustment</h1>
      <form onSubmit={this.handleAdjustment}>
      <label>Barcode:<input type="text" value={this.props.adjustmentBarcode} onChange={this.handleAdjustmentBarcode}/></label>
      <p><img src={this.props.adjustmentProduct.image_url} alt=""/></p>
      <p>Product Name: {this.props.adjustmentProduct.item_name}</p>
      <p>Last Cost: {this.props.adjustmentProduct.last_cost}</p>
      <p>Total Cost Dollars:{(this.props.adjustmentProduct.last_cost*this.props.adjustmentQty) ? this.props.adjustmentProduct.last_cost*this.props.adjustmentQty : null }</p>
      <label>Qty to adjust: <input type="text" value={this.props.adjustmentQty} onChange={(event)=>this.props.adjustQty(event.target.value)}/></label><br></br>
      <label>Reason Code: <input type="text" value={this.props.adjustmenntReasonCode} onChange={(event)=>this.props.adjustmentReason(event.target.value)}/></label><br></br>
      <input type="submit" value="Create Adjustment"/>
      <br></br>
      </form>
      <br></br>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Adjustment)
