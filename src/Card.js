import React, {Component} from 'react';
import {Link} from 'react-router-dom'

export default class Card extends Component {

  state = {
    front: true
  }
  clickToView = (event) => {
    event.preventDefault()
    this.setState({
      front: !this.state.front
    })
  }
  render() {

    return (<div>
      <div onClick={this.clickToView}>
        {this.props.product.item_name}
      </div>
      <div>
        {
          this.state.front
            ? <img src={this.props.product.image_url} alt="" height="222" width="332"/>
            : <ul>
                <li>Retail Price: {this.props.product.retail_price}</li>
                <li>Pomo Price: {this.props.product.pomo_price}</li>
                <li>Last Cost: {this.props.product.last_cost}</li>
                <li>Most Recent Vendor: {this.props.product.most_recent_vendor}</li>
                <li>Order: {this.props.product.order}<Link to={"/products/"+this.props.product.id+"/orders"}><img src="https://cdn2.iconfinder.com/data/icons/shopping-e-commerce-2-1/32/Success-Place-Order-Complete-Shopping-Tick-512.png" alt="" height="32" width="42" /></Link></li>
                <li>Inventory on Hand: {this.props.product.inventory}</li>
                <li>Adjustment: {this.props.product.adjustment} <img src="https://sixthsensepos.com/images/POSFeatures/Adjust.jpg" alt="" height="32" width="42" /></li>
                <li>Status: {this.props.product.status}</li>
                <li>Sales: {this.props.product.sales} <img src="https://image.flaticon.com/icons/svg/950/950576.svg" alt="" height="32" width="42"/></li>
                <li>Forecast Sales for the next 3 months: {this.props.product.forecast_sales_three_months}</li>
                <li>Need to order for the next 3 months: {this.props.product.need_to_order_for_next_three_months}</li>
                <li>Annualized Sales: {this.props.product.annualized_sales}</li>
                <li>Annualized QTY: {this.props.product.annualized_qty}</li>
                <li>Category: {this.props.product.category}</li>
                <li>Last Edited by: {this.props.product.last_edited_by}</li>
                <li>Barcode: {this.props.product.barcode}</li>
              </ul>
        }
      </div>
    </div>)
  }
}
