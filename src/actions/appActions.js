import 'whatwg-fetch'

export function onLogin(data) {
	return dispatch => {
		fetch('/login', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
		    'Content-Type': 'application/json'
		  },
		  credentials: 'same-origin',
			body: JSON.stringify(data)
		}).then(function(res) {
		    return res.json()
		  }).then(function(res) {
		    dispatch({
	        type: 'LOGIN_SUCCESS',
	        payload: res.user
	      })
		  }).catch(function(err) {
		  	console.log(err)
		    dispatch({
	        type: 'LOGIN_FAIL',
	        payload: err
	      })
		  })
	}
}

export function auth(data) {
	return dispatch => {
		dispatch({
			type: 'AUTH_REQUEST'
		})

		fetch('/auth', {
			method: 'POST',
			credentials: 'same-origin'
		}).then(function(res) {
		    return res.json()
		  }).then(function(res) {
	  		dispatch({
	        type: 'AUTH_SUCCESS',
	        payload: res.user
	      })
		  }).catch(function(err) {
		    dispatch({
	        type: 'AUTH_FAIL'
	      })
		  })
	}
}

export function loadData() {
	return dispatch => {
		dispatch({
			type: 'GET_APP_DATA_REQUEST'
		})

		fetch('/stock/read')
			.then(function(res) {
		    return res.json()
		  }).then(function(res) {
		    dispatch({
	        type: 'GET_STOCK_SUCCESS',
	        payload: res
	      })
	      return fetch('/deals/read')
					.then(function(res) {
				    return res.json()
				  }).then(function(res) {
				    dispatch({
			        type: 'GET_DEALS_SUCCESS',
			        payload: res
			      })
			    	return fetch('/clients/read')
							.then(function(res) {
						    return res.json()
						  }).then(function(res) {
						    dispatch({
					        type: 'GET_CLIENTS_SUCCESS',
					        payload: res
					      })
				    	return fetch('/users/read')
								.then(function(res) {
							    return res.json()
							  }).then(function(res) {
							    dispatch({
						        type: 'GET_USERS_SUCCESS',
						        payload: res
						      })
						      dispatch({
						        type: 'GET_APP_DATA_SUCCESS'
						      })
						    })
					  	})
					})
		  }).catch(function(err) {
		  	console.log(err)
		    dispatch({
	        type: 'GET_APP_DATA_FAIL',
	        payload: err
	      })
		  })
	}
}



