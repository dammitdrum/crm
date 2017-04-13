import Enum from '../Enum'

const initialState = {
  title: 'Сделки',
  items: [],
  searchQuery: '',
  activeCategory: Enum.defaultCatStock,
  modal: { show: false, mode: 'create'},
  sortBy: { code: 'price', type: 'asc' },
  loading: false,
  loaded: false
}

const deals = (state = initialState, action) => {
  let payload = action.payload

  switch (action.type) {
    case 'GET_DEALS_REQUEST':
      return { ...state, loading: true }

    case 'GET_DEALS_SUCCESS':
      return { ...state,
        items: payload,
        loading: false,
        loaded: true
      }

    case 'GET_DEALS_FAIL':
      return { ...state, error: true }

    case 'FILTER_BY_CATEGORY':
      return { ...state, activeCategory: payload }

    case 'FILTER_BY_SEARCH':
      return { ...state, searchQuery: payload }

    case 'SORT_DATA':
      return { ...state, sortBy: payload }

    default:
      return state
  }
}

export default deals
