import 'whatwg-fetch'

export function getMenuData() {
	return dispatch => {
		dispatch({
			type: 'GET_MENU_REQUEST',
			payload: null
		})

		fetch('menu.json')
			.then(function(response) {
		    return response.json()
		  }).then(function(res) {
		    dispatch({
	        type: 'GET_MENU_SUCCESS',
	        payload: res
	      })
		  }).catch(function(ex) {
		    dispatch({
	        type: 'GET_MENU_FAIL',
	        payload: ex
	      })
		  })
	}
}