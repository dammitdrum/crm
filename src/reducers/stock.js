import Enum from '../Enum'

const initialState = {
  title: 'Склад',
  items: [],
  searchQuery: '',
  activeCategory: Enum.defaultCatStock,
  isOpenCreateModal: false,
  sortBy: { code: 'price', type: 'asc' },
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

		case 'CREATE_ITEM_REQUEST':
			return { ...state}

		case 'CREATE_ITEM_SUCCESS':
			return { ...state, 
				items: state.items.push(payload),
				isOpenCreateModal: false
			}

		case 'CREATE_ITEM_FAIL':
			return { ...state}

		case 'FILTER_BY_CATEGORY':
			return { ...state, activeCategory: payload }

		case 'FILTER_BY_SEARCH':
			return { ...state, searchQuery: payload }

		case 'SHOW_CREATE_MODAL':
			return { ...state, isOpenCreateModal: payload }

		case 'SORT_STOCK_DATA':
			return { ...state, sortBy: payload }

		default:
      return state
	}
}

export default stock
