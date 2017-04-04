import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import header from './header'
import stock from './stock'

export default combineReducers({
	routing: routerReducer,
	header,
	stock
})
