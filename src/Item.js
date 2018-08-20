import React, {Component} from 'react';
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import Navbar from "./Navbar"
import Card from "./Card"
import UUID from "uuid"

class Item extends Component {

  createNewItem = () => {
    this.props.history.push("/createnewitems")
  }

  handleSearchItem = (event)=>{
    const searchInput = event.target.value
    this.props.handleSearchItemInput(searchInput)
    const items = this.props.allProducts.filter(product => product.category.toLowerCase() === searchInput.toLowerCase() || product.item_name.toLowerCase() === searchInput.toLowerCase() )
    this.props.searchItem(items)
  }
  render() {

    return (<div>
      <Link to="/home">Home</Link>
      <Navbar/>
      <button onClick={this.createNewItem}>Create New Item</button>
      <input tupe="text" value={this.props.searchItemInput} onChange={this.handleSearchItem}/>
      <ul>
        <li>
          {this.props.searchItemsList.length === 0 ? this.props.allProducts.map(product => <Card product={product} key={UUID()}/>) :
            this.props.searchItemsList.map(product => <Card product={product} key={UUID()}/>)
        }
        </li>
      </ul>
    </div>)
  }
}

function mapStateToProps(state) {
  return {allProducts: state.allProducts,
  searchItemInput:state.searchItemInput,
  searchItemsList:state.searchItemsList,
}
}

function mapDispatchToProps(dispatch) {
  return{
    handleSearchItemInput: (data) => {
      dispatch({type: "ITEM_SEARCH_INPUT", payload: data})
    },
    searchItem: (data) => {
      dispatch({type: "ITEM_SEARCH_OUTCOME", payload: data})
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Item)
