import 'whatwg-fetch'

export function logout() {
	return dispatch => {

		fetch('/logout',{
			method: 'POST',
			credentials: 'same-origin'
		}).then(function(res) {
		    dispatch({
	        type: 'LOGOUT_SUCCESS'
	      })
		  }).catch(function(err) {
		  	console.log(err)
		    dispatch({
	        type: 'LOGOUT_FAIL',
	        payload: err
	      })
		  })
	}
}

export function createUser(item) {
	return dispatch => {
		fetch('/users/create', {
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
	        type: 'CREATE_USER_SUCCESS',
	        payload: res.item
	      })
		  }).catch(function(err) {
		  	console.log(err)
		    dispatch({
	        type: 'CREATE_USER_FAIL',
	        payload: err
	      })
		  })
	}
}

export function updateUser(item) {
	return dispatch => {
		fetch('/users/update/' + item._id, {
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
	        type: 'UPDATE_USER_SUCCESS',
	        payload: res.item
	      })
		  }).catch(function(err) {
		  	console.log(err)
		    dispatch({
	        type: 'UPDATE_USER_FAIL',
	        payload: err
	      })
		  })
	}
}

export function deleteUser(id) {
	return dispatch => {

		fetch('/users/delete/'+id, {
			method: 'DELETE'
		}).then(function() {
		    dispatch({
	        type: 'DELETE_USER_SUCCESS',
	        payload: id
	      })
		  }).catch(function(err) {
		  	console.log(err)
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