import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import { Router, Route, hashHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import './styles/core.scss'
import App from './containers/App'
import Stock from './containers/stock'
import Sales from './containers/sales'
import Orders from './containers/orders'
import Partners from './containers/partners'
import User from './containers/user'


const initialState = {

}

const store = createStore(
	rootReducer,
	initialState,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(thunk)
)

const history = syncHistoryWithStore(hashHistory, store)

if (module.hot) {
	module.hot.accept('./reducers', () => {
		const nextRootReducer = require('./reducers')
		store.replaceReducer(nextRootReducer)
	})
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
    	<Route path="/" component={App}></Route>
    	<Route path="/stock" component={Stock}></Route>
    	<Route path="/sales" component={Sales}></Route>
    	<Route path="/orders" component={Orders}></Route>
    	<Route path="/partners" component={Partners}></Route>
    	<Route path="/user" component={User}></Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
