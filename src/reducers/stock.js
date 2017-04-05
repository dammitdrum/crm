//import uniqBy from 'lodash-es'
import fp from 'lodash/fp';
const _ = fp();

const initialState = {
  title: 'Склад',
  items: [],
  categories: [],
  fetch: false
}

const stock = (state = initialState, action) => {
	switch (action.payload) {
		case 'GET_STOCK_REQUEST':
			return { ...state, loading: true, fetch: true }

		case 'GET_STOCK_SUCCESS':
			console.log(action.payload)
			return { ...state,
				items: action.payload,
				categories: _.uniqBy(action.payload, 'category'),
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
