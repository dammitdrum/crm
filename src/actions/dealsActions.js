import 'whatwg-fetch'

export function getData() {
	return dispatch => {
		dispatch({
			type: 'GET_DEALS_REQUEST'
		})

		fetch('/deals/read')
			.then(function(res) {
		    return res.json()
		  }).then(function(res) {
		    dispatch({
	        type: 'GET_DEALS_SUCCESS',
	        payload: res
	      })
		  }).catch(function(err) {
		  	console.log(err)
		    dispatch({
	        type: 'GET_DEALS_FAIL',
	        payload: err
	      })
		  })
	}
}

export function filterByCategory(category) {
	return {
		type: 'FILTER_BY_CATEGORY',
		payload: category
	}
}

export function filterBySearch(query) {
	return {
		type: 'FILTER_BY_SEARCH',
		payload: query
	}
}

export function sortData(sortBy) {
	return {
		type: 'SORT_DATA',
		payload: sortBy
	}
}