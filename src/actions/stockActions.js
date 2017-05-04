import 'whatwg-fetch'

export function createItem(item) {
	return dispatch => {
		fetch('/stock/create', {
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
	        type: 'CREATE_ITEM_SUCCESS',
	        payload: res.item
	      })
		  }).catch(function(err) {
		  	console.log(err)
		    dispatch({
	        type: 'CREATE_ITEM_FAIL',
	        payload: err
	      })
		  })
	}
}

export function updateItem(item) {
	return dispatch => {
		fetch('/stock/update/' + item._id, {
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
	        type: 'UPDATE_ITEM_SUCCESS',
	        payload: res.item
	      })
	      setTimeout(() => {
	      	dispatch({
		        type: 'STOP_FLASH_UPDATE_ITEM',
		        payload: item._id
		      })
	      }, 2000)
		  }).catch(function(err) {
		  	console.log(err)
		    dispatch({
	        type: 'UPDATE_ITEM_FAIL',
	        payload: err
	      })
		  })
	}
}

export function deleteItem(id) {
	return dispatch => {
		dispatch({
      type: 'DELETE_ITEM_REQUEST',
      payload: id
    })

		fetch('/stock/delete/'+id, {
			method: 'DELETE'
		}).then(function() {
		    dispatch({
	        type: 'DELETE_ITEM_SUCCESS',
	        payload: id
	      })
		  }).catch(function(err) {
		  	console.log(err)
		    dispatch({
	        type: 'DELETE_ITEM_FAIL',
	        payload: err
	      })
		  })
	}
}


export function filterByCategory(category) {
	return {
		type: 'FILTER_STOCK_BY_CATEGORY',
		payload: category
	}
}

export function filterBySearch(query) {
	return {
		type: 'FILTER_STOCK_BY_SEARCH',
		payload: query
	}
}

export function showModal(params) {
	return {
		type: 'SHOW_STOCK_MODAL',
		payload: params
	}
}

export function changeModalItem(item) {
	return {
		type: 'CHANGE_MODAL_ITEM',
		payload: item
	}
}

export function sortData(sortBy) {
	return {
		type: 'SORT_STOCK_DATA',
		payload: sortBy
	}
}

export function validate(state, mess) {
	return {
		type: 'VALIDATE_STOCK',
		payload: {
			validateState: state,
			validateMess: mess
		}
	}
}