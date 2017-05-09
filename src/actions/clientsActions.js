import 'whatwg-fetch'

export function createItem(item) {
	return dispatch => {
		fetch('/clients/create', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
			body: JSON.stringify(item)
		}).then(function(res) {
		    return res.json()
		  }).then(function(res) {
		    dispatch({
	        type: 'CREATE_CLIENT_SUCCESS',
	        payload: res.item
	      })
		  }).catch(function(err) {
		  	console.log(err)
		    dispatch({
	        type: 'CREATE_CLIENT_FAIL',
	        payload: err
	      })
		  })
	}
}

export function updateItem(item) {
	return dispatch => {
		fetch('/clients/update/' + item._id, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
			body: JSON.stringify(item)
		}).then(function(res) {
		    return res.json()
		  }).then(function(res) {
		    dispatch({
	        type: 'UPDATE_CLIENT_SUCCESS',
	        payload: res.item
	      })
		  }).catch(function(err) {
		  	console.log(err)
		    dispatch({
	        type: 'UPDATE_CLIENT_FAIL',
	        payload: err
	      })
		  })
	}
}

export function deleteItem(id) {
	return dispatch => {

		fetch('/clients/delete/'+id, {
			method: 'DELETE'
		}).then(function() {
		    dispatch({
	        type: 'DELETE_CLIENT_SUCCESS',
	        payload: id
	      })
		  }).catch(function(err) {
		  	console.log(err)
		    dispatch({
	        type: 'DELETE_CLIENT_FAIL',
	        payload: err
	      })
		  })
	}
}

export function filterBySearch(query) {
	return {
		type: 'FILTER_CLIENTS_BY_SEARCH',
		payload: query
	}
}

export function showModal(params) {
	return {
		type: 'SHOW_CLIENT_MODAL',
		payload: params
	}
}

export function changeModalItem(item) {
	return {
		type: 'CHANGE_CLIENT_MODAL',
		payload: item
	}
}

export function sortData(sortBy) {
	return {
		type: 'SORT_CLIENTS_DATA',
		payload: sortBy
	}
}

export function validate(mess) {
	return {
		type: 'VALIDATE_CLIENT',
		payload: mess
	}
}
