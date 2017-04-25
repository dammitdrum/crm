
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

export function setAuthTrue() {
	return {
		type: 'GET_USER_REQUEST'
	}
}
