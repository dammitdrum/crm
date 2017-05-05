import 'whatwg-fetch'

export function loadDeal(deal) {
	return {
		type: 'LOAD_DEAL_DETAIL',
		payload: deal
	}
}

export function setDealState(state) {
	return {
		type: 'SET_DEAL_STATE',
		payload: state
	}
}

export function setDealManager(manager) {
	return {
		type: 'SET_DEAL_MANAGER',
		payload: manager
	}
}

export function showModal(params) {
	return {
		type: 'SHOW_DEAL_MODAL',
		payload: params
	}
}

export function searchModal(query) {
	return {
		type: 'SEARCH_DEAL_MODAL',
		payload: query
	}
}

export function sortModal(sortBy) {
	return {
		type: 'SORT_DEAL_MODAL',
		payload: sortBy
	}
}

export function addItem(item) {
	return {
		type: 'ADD_ITEM_TO_DEAL',
		payload: item
	}
}

export function removeItem(id) {
	return {
		type: 'REMOVE_ITEM_FROM_DEAL',
		payload: id
	}
}

export function setItemPrice(val, id) {
	return {
		type: 'SET_ITEM_PRICE_DEAL',
		payload: { val, id }
	}
}

export function setItemNumber(val, id) {
	return {
		type: 'SET_ITEM_NUMBER_DEAL',
		payload: { val, id }
	}
}

export function setDealClient(client) {
	return {
		type: 'SET_CLIENT_TO_DEAL',
		payload: client
	}
}

export function setDealSum() {
	return {
		type: 'SET_SUM_DEAL'
	}
}

export function setDealNumber(number) {
	return {
		type: 'SET_NUMBER_TO_DEAL',
		payload: number
	}
}

export function validate(mess) {
	return {
		type: 'VALIDATE_DEAL',
		payload: mess
	}
}