import 'whatwg-fetch'

export function setDealState(state) {
	return {
		type: 'SET_DEAL_STATE',
		payload: state
	}
}

export function setDealManager(id, list) {
	return {
		type: 'SET_DEAL_MANAGER',
		payload: { id, list }
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

export function setClient(client) {
	return {
		type: 'SET_CLIENT_TO_DEAL',
		payload: client
	}
}