import React, {Component} from 'react';
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import Navbar from "./Navbar"
import Card from "./Card"
class Item extends Component {


createNewItem=()=>{
  this.props.history.push("/createnewitems")
}
  render() {

    return (<div>
      <Link to="/home">Home</Link>
      <Navbar/>
      <button onClick={this.createNewItem}>Create New Item</button>
    <ul>
    <li>
    {this.props.allProducts.map(product=>
      <Card product={product} key={product.barcode}/>)}
    </li>
    </ul>
    </div>)
  }
}

function mapStateToProps(state) {
return{
  allProducts:state.allProducts
}
}

export default connect(mapStateToProps)(Item)
