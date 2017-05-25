import request from '../utils/request'

export function createItem(item) {
	return dispatch => {
		request('/stock/create', 'POST', item)
		.then(function(res) {
	    dispatch({
        type: 'CREATE_ITEM_SUCCESS',
        payload: res.item,
        meta: {
			    socket: {
			      channel: 'change:data'
			    }
			  }
      })
	  }).catch(function(err) {
	    dispatch({
        type: 'CREATE_ITEM_FAIL',
        payload: err
      })
	  })
	}
}

export function updateItem(item) {
	return dispatch => {
		request('/stock/update/' + item._id, 'PUT', item)
		.then(function(res) {
	    dispatch({
        type: 'UPDATE_ITEM_SUCCESS',
        payload: res.item,
        meta: {
			    socket: {
			      channel: 'change:data'
			    }
			  }
      })
      setTimeout(() => {
      	dispatch({
	        type: 'STOP_FLASH_UPDATE_ITEM',
	        payload: item._id,
	        meta: {
				    socket: {
				      channel: 'change:data'
				    }
				  }
	      })
      }, 2000)
	  }).catch(function(err) {
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
		request('/stock/delete/' + id, 'DELETE')
		.then(function() {
	    dispatch({
        type: 'DELETE_ITEM_SUCCESS',
        payload: id,
        meta: {
			    socket: {
			      channel: 'change:data'
			    }
			  }
      })
	  }).catch(function(err) {
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

export function validate(mess) {
	return {
		type: 'VALIDATE_ITEM',
		payload: mess
	}
}