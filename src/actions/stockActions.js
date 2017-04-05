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
		  })
			.then(function(res) {
		    console.log(res)
		    dispatch({
	        type: 'GET_STOCK_SUCCESS',
	        payload: res
	      })
		  }).catch(function(err) {
		  	console.log(res)
		    dispatch({
	        type: 'GET_STOCK_FAIL',
	        payload: err
	      })
		  })
	}
}