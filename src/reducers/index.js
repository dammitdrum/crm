import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import header from './header'
import stock from './stock'
import deals from './deals'

export default combineReducers({
	routing: routerReducer,
	header,
	stock,
	deals
})
