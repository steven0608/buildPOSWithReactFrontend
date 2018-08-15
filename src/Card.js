import React, {Component} from 'react';

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

    return (<div onClick={this.clickToView}>
      <div >
        {this.props.product.item_name}
      </div>
      <div>
        {
          this.state.front
            ? <img src={this.props.product.image_url} alt=""/>
            : <ul>
                <li>Retail Price: {this.props.product.retail_price}</li>
                <li>Pomo Price: {this.props.product.pomo_price}</li>
                <li>Last Cost: {this.props.product.last_cost}</li>
                <li>Most Recent Vendor: {this.props.product.most_recent_vendor}</li>
                <li>Order: {this.props.product.order}</li>
                <li>Inventory on Hand: {this.props.product.inventory}</li>
                <li>Adjustment: {this.props.product.adjustment}</li>
                <li>Status: {this.props.product.status}</li>
                <li>Sales: {this.props.product.sales}</li>
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
