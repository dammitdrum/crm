import Enum from '../utils/Enum'

const initialState = {
  title: 'Сделки',
  deals: [],
  searchQuery: '',
  activeState: Enum.defaultStateDeals,
  sortBy: { code: 'date', type: 'asc' },
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
        deals: payload,
        loading: false,
        loaded: true
      }

    case 'GET_DEALS_FAIL':
      return { ...state, error: true }

    case 'CREATE_DEAL_SUCCESS':
      state.deals.push(payload)
      return { ...state,
        deals: state.deals.concat()
      }

    case 'CREATE_DEAL_FAIL':
      return { ...state }

    case 'FILTER_DEALS_BY_STATE':
      return { ...state, activeState: payload }

    case 'FILTER_DEALS_BY_SEARCH':
      return { ...state, searchQuery: payload }

    case 'SORT_DEALS_DATA':
      return { ...state, sortBy: payload }

    default:
      return state
  }
}

export default deals
