import request from '../utils/request'

export function onLogin(data) {
	return dispatch => {
		dispatch({
      type: 'RESET_DATA'
    })
    request('/login','POST',data)
  	.then(function(res) {
	    dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.user
      })
	  }).catch(function(err) {
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
		request('/auth','POST')
		.then(function(res) {
  		dispatch({
        type: 'AUTH_SUCCESS',
        payload: res.user,
        meta: {
			    socketInit: true
			  }
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

		request('/stock/read')
		.then(function(res) {
	    dispatch({
        type: 'GET_STOCK_SUCCESS',
        payload: res
      })
	    return request('/deals/read')
			.then(function(res) {
		    dispatch({
	        type: 'GET_DEALS_SUCCESS',
	        payload: res
	      })
	    	return request('/clients/read')
				.then(function(res) {
			    dispatch({
		        type: 'GET_CLIENTS_SUCCESS',
		        payload: res
		      })
				  return request('/users/read')
					.then(function(res) {
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
	    dispatch({
        type: 'GET_APP_DATA_FAIL',
        payload: err
      })
	  })
	}
}

export function hideMess() {
	return {
		type: 'HIDE_APP_MESS'
	}
}