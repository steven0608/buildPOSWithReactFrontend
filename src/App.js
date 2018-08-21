import React, {Component, Fragment} from 'react';
import './App.css';
import "./style.css"
import {connect} from "react-redux"
import Login from "./login"
import Navbar from "./Navbar"
import Adjustment from "./Adjustment"
import Chat from "./Chat"
// import Idea from "./Idea"
// <Route path="/ideas" component={Idea}/>
import Item from "./Item"
import Order from "./Order"
import Pos from "./Pos"
import ProfilePage from "./ProfilePage"
import Report from "./Report"
import CreateTask from "./Create_Task"
import CreateUser from "./Create_user"
import AllTasks from "./AllTasks"
import CreateNewItem from "./CreateNewItem"
import {Route, Switch, withRouter, Redirect} from 'react-router-dom' //use import { Route, Switch, withRouter } from 'react-router-dom' if needed
import SeeAllOrders from "./SeeAllOrders"
import ProductOrdersList from "./ProductOrdersList"
import EditProduct from "./EditProduct"
import ShowAdjustments from "./ShowAdjustments"
import SalesSummary from "./SalesSummary"

// beautify has issue with exact path

class App extends Component {

  getAllSalesData = (data) => {
    this.props.fetchAllSalesData(data)
  }
  getAllProducts = (data) => {
    this.props.fetchAllProducts(data)
  }

  getAllProductsSales = (data) => {
    this.props.fetchAllProductsSales(data)
  }

  getAllAdjustment = (data) => {
    this.props.fetchAllAdjustments(data)
  }

  getAllOrder = (data) => {
    this.props.fetchAllOrders(data)
  }
  getCurrentUser = (user,toDoList) => {
    user.todolists=toDoList
    const userinfo= user
    this.props.handleLogin(userinfo)
  }
  componentDidMount() {
    fetch("http://localhost:3000/api/v1/products").then(r => r.json()).then(data => this.getAllProducts(data))
    fetch("http://localhost:3000/api/v1/sales_transcations").then(r => r.json()).then(data => this.getAllSalesData(data))
    fetch("http://localhost:3000/api/v1/products_sales").then(r => r.json()).then(data => this.getAllProductsSales(data))
    fetch("http://localhost:3000/api/v1/adjustments").then(r=>r.json()).then(data => this.getAllAdjustment(data))
    fetch("http://localhost:3000/api/v1/orders").then(r=>r.json()).then(data => this.getAllOrder(data))
    let token = localStorage.getItem('token');
    if(token){
      fetch("http://localhost:3000/api/v1/current_user",{
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      }).then(r=>r.json()).then(data=>this.getCurrentUser(data.user_details,data.todolists)).catch(err => {

      			localStorage.removeItem('token')
      			this.props.history.push('/');
      		})
    }
  }
  render() {
    return (<Fragment>

      <Route exact path="/" render={(routerProps) => <Login {...routerProps}/>}/>
      {!localStorage.getItem('token') ? <Redirect to="/" /> : (this.props.currentUser ? this.props.currentUser.role.toLowerCase().includes("cashier") ?
      <Switch>
        <Route path="/home" component={(routerProps) => <Navbar {...routerProps}/>}/>
        <Route path="/profile" component={(routerProps) => <ProfilePage {...routerProps}/>}/>
        <Route path="/pos" component={Pos}/>
        <Route path="/items" component={Item}/>
        <Route path="/chat" component={Chat}/>
        <Route path="/createtask" component={CreateTask}/>
        <Route path="/alltasks" component={AllTasks}/>
      </Switch>
      :
      <Switch>
        <Route path="/home" component={Navbar}/>
        <Route path="/profile" component={(routerProps) => <ProfilePage {...routerProps}/>}/>
        <Route path="/reports" component={Report}/>
        <Route path="/pos" component={Pos}/>
        <Route path="/items" component={Item}/>
        <Route path="/chat" component={Chat}/>
        <Route path="/adjustments" component={Adjustment}/>
        <Route path="/orders" component={Order}/>
        <Route path="/createtask" component={CreateTask}/>
        <Route path="/createuser" component={CreateUser}/>
        <Route path="/alltasks" component={AllTasks}/>
        <Route path="/createnewitems" component={CreateNewItem}/>
        <Route path="/allorders" component={SeeAllOrders}/>
        <Route path="/products/:id/orders" render={(routerProps) => {
							let id = routerProps.match.params.id
              // eslint-disable-next-line
							let ordersList = this.props.allOrders.filter(order => order.product_id === parseInt(id))
							return <ProductOrdersList {...routerProps} orders={ordersList}/>
						}}/>

        <Route path="/products/:id/edit" render={(routerProps) => {
    							let id = routerProps.match.params.id
                  // eslint-disable-next-line
    							let product = this.props.allProducts.find(product => product.id === parseInt(id))
    							return <EditProduct {...routerProps} product={product}/>
    						}}/>
        <Route path="/products/:id/adjustments" render={(routerProps) => {
            	let id = routerProps.match.params.id
                          // eslint-disable-next-line
            	let adjustments = this.props.allAdjustments.filter(adjustment => adjustment.product_id === parseInt(id))
            	return <ShowAdjustments {...routerProps} adjustments={adjustments}/>
            }}/>
            <Route path="/products/:id/sales" render={(routerProps) => {
                	let id = routerProps.match.params.id
                              // eslint-disable-next-line
                	let sales = this.props.allProductsSales.filter(sale => sale.product_id === parseInt(id))
                	return <SalesSummary {...routerProps} sales={sales}/>
                }}/>
      </Switch> : null)
    }
    </Fragment>)
  }
}
function mapStateToProps(state) {
  return {login: state.login,
  allOrders:state.allOrders,
  allProducts:state.allProducts,
  allAdjustments:state.allAdjustments,
  allProductsSales:state.allProductsSales,
  currentUser:state.currentUser,
}
}

function mapDispatchToProps(dispatch) {
  return {
    fetchAllProducts: (data) => {
      dispatch({type: "GET_ALL_PRODUCTS", payload: data})
    },
    fetchAllSalesData: (data) => {
      dispatch({type: "GET_ALL_SALES_DATA", payload: data})
    },
    fetchAllProductsSales:(data) =>{
      dispatch({type: "GET_ALL_PRODUCTS_SALES", payload: data})
    },
    fetchAllAdjustments: (data) =>{
      dispatch({type: "GET_ALL_ADJUSTMENTS", payload: data})
    },
    fetchAllOrders: (data) =>{
      dispatch({type: "GET_ALL_ORDERS", payload: data})
    },
    handleLogin: (user) => {
      dispatch({type: "SET_USER", payload: user})
    },
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
