import 'whatwg-fetch'

export function getData() {
	return dispatch => {
		dispatch({
			type: 'GET_CLIENTS_REQUEST'
		})

		fetch('/clients/read')
			.then(function(res) {
		    return res.json()
		  }).then(function(res) {
		    dispatch({
	        type: 'GET_CLIENTS_SUCCESS',
	        payload: res
	      })
		  }).catch(function(err) {
		  	console.log(err)
		    dispatch({
	        type: 'GET_CLIENTS_FAIL',
	        payload: err
	      })
		  })
	}
}

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