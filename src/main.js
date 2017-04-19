import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import _ from 'lodash'

import './styles/core.scss'
import App from './containers/App'
import Stock from './containers/stock'
import Deals from './containers/deals'
import Partners from './containers/partners'
import User from './containers/user'
import Login from './containers/login'
import Home from './containers/home'
import NotFound from './containers/notFound'

const initialState = {

}

const middleware = [thunk]

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
        <IndexRoute component={Home}/>
      	<Route path="/stock" component={Stock}/>
      	<Route path="/deals" component={Deals}/>
      	<Route path="/partners" component={Partners}/>
      	<Route path="/user" component={User}/>
      </Route>
      <Route path="/login" component={Login}/>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('root')
)

