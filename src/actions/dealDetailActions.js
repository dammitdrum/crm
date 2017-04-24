import 'whatwg-fetch'

export function getUsers() {
	return dispatch => {
		dispatch({
			type: 'GET_USERS_REQUEST'
		})

		fetch('/users/read')
			.then(function(res) {
		    return res.json()
		  }).then(function(res) {
		    dispatch({
	        type: 'GET_USERS_SUCCESS',
	        payload: res
	      })
		  }).catch(function(err) {
		  	console.log(err)
		    dispatch({
	        type: 'GET_USERS_FAIL',
	        payload: err
	      })
		  })
	}
}

export function setDealState(state) {
	return {
		type: 'SET_DEAL_STATE',
		payload: state
	}
}

export function setDealManager(id) {
	return {
		type: 'SET_DEAL_MANAGER',
		payload: id
	}
}

export function setDealManagerDefault(user) {
	return {
		type: 'SET_DEAL_MANAGER_DEFAULT',
		payload: user
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