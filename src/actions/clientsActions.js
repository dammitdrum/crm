import request from '../utils/request'

export function createItem(item) {
	return dispatch => {
		request('/clients/create', 'POST', item)
		.then(function(res) {
	    dispatch({
        type: 'CREATE_CLIENT_SUCCESS',
        payload: res.item,
        meta: {
			    socket: {
			      channel: 'change:data'
			    }
			  }
      })
	  }).catch(function(err) {
	    dispatch({
        type: 'CREATE_CLIENT_FAIL',
        payload: err
      })
	  })
	}
}

export function updateItem(client) {
	return dispatch => {
		request('/clients/update/' + client._id, 'PUT', client)
		.then(function(res) {
	    dispatch({
        type: 'UPDATE_CLIENT_SUCCESS',
        payload: res.item,
        meta: {
			    socket: {
			      channel: 'change:data'
			    }
			  }
      })
	  }).catch(function(err) {
	    dispatch({
        type: 'UPDATE_CLIENT_FAIL',
        payload: err
      })
	  })
	}
}

export function deleteItem(id) {
	return dispatch => {
		request('/clients/delete/' + id, 'DELETE')
		.then(function() {
	    dispatch({
        type: 'DELETE_CLIENT_SUCCESS',
        payload: id,
        meta: {
			    socket: {
			      channel: 'change:data'
			    }
			  }
      })
	  }).catch(function(err) {
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
