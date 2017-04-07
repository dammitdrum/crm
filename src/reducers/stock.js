import Enum from '../Enum'

const initialState = {
  title: 'Склад',
  items: [],
  filtered: [],
  category: Enum.defaultCatStock,
  loading: false,
  loaded: false
}

const stock = (state = initialState, action) => {
	let payload = action.payload

	switch (action.type) {
		case 'GET_STOCK_REQUEST':
			return { ...state, loading: true }

		case 'GET_STOCK_SUCCESS':
			return { ...state,
				items: payload,
				loading: false,
				loaded: true
			}

		case 'GET_STOCK_FAIL':
			return { ...state, error: true }

		case 'FILTER_BY_CATEGORY':
			return { ...state, 
				filtered: payload.items, 
				category: payload.category 
			}
		default:
      return state
	}
}

export default stock
