import request from '../utils/request'

export function logout() {
	return dispatch => {
		request('/logout', 'POST')
		.then(function(res) {
	    dispatch({
        type: 'LOGOUT_SUCCESS'
      })
	  }).catch(function(err) {
	    dispatch({
        type: 'LOGOUT_FAIL',
        payload: err
      })
	  })
	}
}

export function createUser(user) {
	return dispatch => {
		request('/users/create', 'POST', user)
		.then(function(res) {
	    dispatch({
        type: 'CREATE_USER_SUCCESS',
        payload: res.item
      })
	  }).catch(function(err) {
	    dispatch({
        type: 'CREATE_USER_FAIL',
        payload: err
      })
	  })
	}
}

export function updateUser(user) {
	return dispatch => {
		request('/users/update/' + user._id, 'PUT', user)
		.then(function(res) {
	    dispatch({
        type: 'UPDATE_USER_SUCCESS',
        payload: res.item
      })
	  }).catch(function(err) {
	    dispatch({
        type: 'UPDATE_USER_FAIL',
        payload: err
      })
	  })
	}
}

export function deleteUser(id) {
	return dispatch => {
		request('/users/delete/' + id, 'DELETE')
		.then(function() {
	    dispatch({
        type: 'DELETE_USER_SUCCESS',
        payload: id
      })
	  }).catch(function(err) {
	    dispatch({
        type: 'DELETE_USER_FAIL',
        payload: err
      })
	  })
	}
}

export function showModal(params) {
	return {
		type: 'SHOW_USER_MODAL',
		payload: params
	}
}

export function changeUserModal(item) {
	return {
		type: 'CHANGE_USER_MODAL',
		payload: item
	}
}


export function validate(mess) {
	return {
		type: 'VALIDATE_USER',
		payload: mess
	}
}