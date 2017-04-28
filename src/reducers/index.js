import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import header from './header'
import stock from './stock'
import deals from './deals'
import dealDetail from './dealDetail'
import clients from './clients'
import user from './user'
import app from './app'

export default combineReducers({
	routing: routerReducer,
	header,
	stock,
	deals,
	dealDetail,
	clients,
	user,
	app
})
