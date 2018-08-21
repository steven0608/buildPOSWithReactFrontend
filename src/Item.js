import React, {Component} from 'react';
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import Card from "./Card"
import UUID from "uuid"
import LogoutButton from "./LogoutButton"
import MenuOption from "./MenuOption"

class Item extends Component {

  createNewItem = () => {
    this.props.history.push("/createnewitems")
  }

  handleSearchItem = (event)=>{
    const searchInput = event.target.value
    this.props.handleSearchItemInput(searchInput)
    const items = this.props.allProducts.filter(product => product.category.toLowerCase().includes(searchInput.toLowerCase()) || product.item_name.toLowerCase().includes(searchInput.toLowerCase()) )
    this.props.searchItem(items)
  }


  render() {

    return (<div>
      <Link to="/home"><i className="home icon big ui left floated teal"></i></Link>
      <LogoutButton />
      <MenuOption />
      <button onClick={this.createNewItem} className="ui teal button">Create New Item</button>
      <br></br>
      <br></br>
      <div className="ui big search" id="search-Item">
      <div className="ui icon input">
      <input type="text" value={this.props.searchItemInput} onChange={this.handleSearchItem} placeholder="Search items by name or category name" size="45"/>
      <i className="search icon"></i>
    </div>
    </div>

      <div className="ui four cards" id="create-small-margin">
          {this.props.searchItemsList.length === 0 ? this.props.allProducts.map(product => <Card product={product} key={UUID()}/>) :
            this.props.searchItemsList.map(product => <Card product={product} key={UUID()}/>)
        }
      </div>
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
