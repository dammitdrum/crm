import _ from 'lodash'

const initialState = {
  title: 'Склад',
  items: [],
  categories: []
}

const stock = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_STOCK_REQUEST':
			return { ...state, loading: true }

		case 'GET_STOCK_SUCCESS':
			return { ...state,
				items: action.payload,
				loaded: true
			}

		case 'GET_STOCK_FAIL':
			return { ...state, error: true }

		default:
      return state
	}
}

export default stock
