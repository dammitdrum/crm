import 'whatwg-fetch'

export function getStockData() {
	return dispatch => {
		dispatch({
			type: 'GET_STOCK_REQUEST',
			payload: null
		})

		fetch('/stock/read')
			.then(function(response) {
		    return response.json()
		  }).then(function(res) {
		    dispatch({
	        type: 'GET_STOCK_SUCCESS',
	        payload: res
	      })
		  }).catch(function(err) {
		  	console.log(err)
		    dispatch({
	        type: 'GET_STOCK_FAIL',
	        payload: err
	      })
		  })
	}
}

export function filterByCategory(items, category) {
	return {
		type: 'FILTER_BY_CATEGORY',
		payload: { items, category }
	}
}