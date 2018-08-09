import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from "./reducer"
import {Provider} from "react-redux"
import {createStore} from "redux"
import {BrowserRouter as Router} from 'react-router-dom'

let store = createStore(reducer)

ReactDOM.render(<Provider store={store}>
  <Router>
    <App/></Router>
</Provider>, document.getElementById('root'));
registerServiceWorker();
