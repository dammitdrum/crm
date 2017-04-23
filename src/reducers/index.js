import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import header from './header'
import stock from './stock'
import deals from './deals'
import dealDetail from './dealDetail'
import partners from './partners'
import user from './user'

export default combineReducers({
	routing: routerReducer,
	header,
	stock,
	deals,
	dealDetail,
	partners,
	user
})
