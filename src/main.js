import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import socketMiddleware from './utils/socketMiddleware'
import io from 'socket.io-client'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import _ from 'lodash'

import './styles/core.scss'
import App from './components/app'
import Stock from './components/stock/'
import Deals from './components/deals/'
import DealDetail from './components/dealDetail'
import Clients from './components/clients/'
import User from './components/user/'
import Login from './components/login'
import Home from './components/home'
import NotFound from './components/notFound'

const initialState = {

}

const middleware = [thunk, socketMiddleware(io.connect())]

const enhancers = []

let composeEnhancers = compose


const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
if (typeof composeWithDevToolsExtension === 'function') {
  composeEnhancers = composeWithDevToolsExtension
}

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware),
    ...enhancers
  )
)
store.asyncReducers = {}

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const reducers = require('./reducers').default
    store.replaceReducer(reducers(store.asyncReducers))
  })
}

const history = syncHistoryWithStore(hashHistory, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
    	<Route path="/" component={App}>
        <IndexRedirect to='stock'/>
      	<Route path="/stock" component={Stock}/>
      	<Route path="/deals" component={Deals}/>
        <Route path="/deals/user/:login" component={Deals}/>
        <Route path="/deals/create" component={DealDetail}/>
        <Route path="/deals/edit/:id" component={DealDetail}/>
      	<Route path="/clients" component={Clients}/>
      	<Route path="/user" component={User}/>
      </Route>
      <Route path="/login" component={Login}/>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('root')
)

