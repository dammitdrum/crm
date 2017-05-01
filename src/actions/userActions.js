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