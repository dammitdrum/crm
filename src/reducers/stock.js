import Enum from '../Enum'

const initialState = {
  title: 'Прайс-лист',
  items: [],
  searchQuery: '',
  activeCategory: Enum.defaultCatStock,
  modal: { show: false, mode: 'create'},
  sortBy: { code: 'price', type: 'asc' },
  loading: false,
  loaded: false
}

const stock = (state = initialState, action) => {
	let payload = action.payload
	let items = state.items

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

		case 'CREATE_ITEM_SUCCESS':
			items.push(payload)
			return { ...state, 
				items: items,
				modal: false
			}

		case 'CREATE_ITEM_FAIL':
			return { ...state}

		case 'DELETE_ITEM_SUCCESS':
			return { ...state, 
				items: items.filter(item => item._id !== payload)
			}

		case 'DELETE_ITEM_FAIL':
			return { ...state}

		case 'FILTER_BY_CATEGORY':
			return { ...state, activeCategory: payload }

		case 'FILTER_BY_SEARCH':
			return { ...state, searchQuery: payload }

		case 'SHOW_MODAL':
			return { ...state, modal: payload }

		case 'SORT_DATA':
			return { ...state, sortBy: payload }

		default:
      return state
	}
}

export default stock
