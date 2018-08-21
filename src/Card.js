import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {connect} from "react-redux"

 class Card extends Component {

  state = {
    front: true
  }

  orderTotal = ()=>{
    const productOrders=this.props.allOrders.filter(order=> order.product_id === this.props.product.id)
    const initialOrder = 0
    return productOrders.reduce(function(acc, cur) {
      // eslint-disable-next-line
      return parseInt(acc) + parseInt(cur.qty)
    }, initialOrder)
  }




onOrder =() => {
  const productOrders=this.props.allOrders.filter(order=> order.product_id === this.props.product.id && order.on_order)
  const initialOrder = 0
  return productOrders.reduce(function(acc, cur) {
    // eslint-disable-next-line
    return parseInt(acc) + parseInt(cur.qty)
  }, initialOrder)
}

  clickToView = (event) => {
    event.preventDefault()
    this.setState({
      front: !this.state.front
    })
  }
  render() {

    return (<div className="card">
      <div className="image">
        {
          this.state.front
            ? <img className="ui medium rounded image" src={this.props.product.image_url} alt=""/>
            : <ul>
                <li>Retail Price: {this.props.product.retail_price}</li>
                <li>Pomo Price: {this.props.product.pomo_price}</li>
                <li>Last Cost: {this.props.product.last_cost}</li>
                <li>Unit:{this.props.product.unit}</li>
                <li>Most Recent Vendor: {this.props.product.most_recent_vendor}</li>
                <li>Total Order: {this.orderTotal()}   <Link to={"/products/"+this.props.product.id+"/orders"}><img src="https://cdn2.iconfinder.com/data/icons/shopping-e-commerce-2-1/32/Success-Place-Order-Complete-Shopping-Tick-512.png" alt="" height="32" width="42" className="ui rounded image" /></Link></li>
                <li>On Order: {this.onOrder()}</li>
                <li>Received: {this.props.product.order}</li>
                <li>Inventory on Hand: {this.props.product.inventory}</li>
                <li>Adjustment: {this.props.product.adjustment} <Link to={"/products/"+this.props.product.id+"/adjustments"}><img src="https://sixthsensepos.com/images/POSFeatures/Adjust.jpg" alt="" height="32" width="42" className="ui rounded image" /></Link></li>
                <li>Status: {this.props.product.status}</li>
                <li>Sales: {this.props.product.sales} <Link to={"/products/"+this.props.product.id+"/sales"}><img src="https://image.flaticon.com/icons/svg/950/950576.svg" alt="" height="32" width="42" className="ui rounded image"/></Link></li>
                <li>Forecast Sales for the next 3 months: {this.props.product.forecast_sales_three_months}</li>
                <li>Need to order for the next 3 months: {this.props.product.need_to_order_for_next_three_months}</li>
                <li>Annualized Sales: {this.props.product.annualized_sales}</li>
                <li>Annualized QTY: {this.props.product.annualized_qty}</li>
                <li>Category: {this.props.product.category}</li>
                <li>Last Edited by: {this.props.product.last_edited_by}</li>
                <li>Barcode: {this.props.product.barcode}</li>
                <button><Link to={"/products/"+this.props.product.id+"/edit"}>Click To Edit</Link></button>
              </ul>
        }
      </div>
      <div onClick={this.clickToView} className="ui animated big teal button" tabIndex="0">
        <div className="visible content"> {this.props.product.item_name}</div>
        <div className="hidden content">
          <i className="right arrow icon"></i>Click to flip
        </div>
      </div>
    </div>)
  }
}

function mapStateToProps(state) {
  return {
    allOrders:state.allOrders,
    allAdjustments:state.allAdjustments,
    allProductsSales:state.allProductsSales,
  }
}

export default connect(mapStateToProps)(Card)
