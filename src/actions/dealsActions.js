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

export function filterByState(state) {
	return {
		type: 'FILTER_DEALS_BY_STATE',
		payload: state
	}
}

export function filterBySearch(query) {
	return {
		type: 'FILTER_DEALS_BY_SEARCH',
		payload: query
	}
}

export function sortData(sortBy) {
	return {
		type: 'SORT_DEALS_DATA',
		payload: sortBy
	}
}
