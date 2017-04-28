import 'whatwg-fetch'

export function createDeal(deal) {
	return dispatch => {
		fetch('/deals/create', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
			body: JSON.stringify(deal)
		}).then(function(res) {
		    return res.json()
		  }).then(function(res) {
		    dispatch({
	        type: 'CREATE_DEAL_SUCCESS',
	        payload: res.item
	      })
		  }).catch(function(err) {
		  	console.log(err)
		    dispatch({
	        type: 'CREATE_DEAL_FAIL',
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
