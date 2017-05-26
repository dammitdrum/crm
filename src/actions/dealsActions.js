import request from '../utils/request'

export function createDeal(deal) {
	return dispatch => {
		request('/deals/create', 'POST', deal)
		.then(function(res) {
	    dispatch({
        type: 'CREATE_DEAL_SUCCESS',
        payload: res.item,
        meta: {
			    socket: {
			      channel: 'change:data'
			    }
			  }
      })
      dispatch({
        type: 'RESET_REDIRECT'
      })
	  }).catch(function(err) {
	    dispatch({
        type: 'CREATE_DEAL_FAIL',
        payload: err
      })
	  })
	}
}

export function saveDeal(deal) {
	return dispatch => {
		request('/deals/update/' + deal._id, 'PUT', deal)
		.then(function(res) {
	    dispatch({
        type: 'UPDATE_DEAL_SUCCESS',
        payload: res.item,
        meta: {
			    socket: {
			      channel: 'change:data'
			    }
			  }
      })
      dispatch({
        type: 'RESET_REDIRECT'
      })
	  }).catch(function(err) {
	    dispatch({
        type: 'UPDATE_DEAL_FAIL',
        payload: err
      })
	  })
	}
}

export function deleteDeal(id) {
	return dispatch => {
		request('/deals/delete/' + id, 'DELETE')
		.then(function() {
	    dispatch({
        type: 'DELETE_DEAL_SUCCESS',
        payload: id,
        meta: {
			    socket: {
			      channel: 'change:data'
			    }
			  }
      })
      dispatch({
        type: 'RESET_REDIRECT'
      })
	  }).catch(function(err) {
	  	console.log(err)
	    dispatch({
        type: 'DELETE_DEAL_FAIL',
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

export function filterByClient(client) {
	return {
		type: 'FILTER_DEALS_BY_CLIENT',
		payload: client
	}
}

export function clearClient(id) {
	return {
		type: 'CLEAR_FILTER_BY_CLIENT',
		payload: id
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