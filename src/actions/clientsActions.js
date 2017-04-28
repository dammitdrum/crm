import 'whatwg-fetch'

export function filterByCategory(category) {
	return {
		type: 'FILTER_STOCK_BY_CATEGORY',
		payload: category
	}
}

export function filterBySearch(query) {
	return {
		type: 'FILTER_STOCK_BY_SEARCH',
		payload: query
	}
}

export function showModal(params) {
	return {
		type: 'SHOW_STOCK_MODAL',
		payload: params
	}
}

export function sortData(sortBy) {
	return {
		type: 'SORT_STOCK_DATA',
		payload: sortBy
	}
}