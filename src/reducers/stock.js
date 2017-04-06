import _ from 'lodash'

const initialState = {
  title: 'Склад',
  items: [],
  categories: [],
  fetch: false
}

const stock = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_STOCK_REQUEST':
			return { ...state, loading: true, fetch: true }

		case 'GET_STOCK_SUCCESS':
			return { ...state,
				items: action.payload,
				categories: _.uniqBy(action.payload, 'category').map((item) => item.category),
				loaded: true,
				fetch: true
			}

		case 'GET_STOCK_FAIL':
			return { ...state, error: true, fetch: true }

		default:
      return state
	}
}

export default stock
