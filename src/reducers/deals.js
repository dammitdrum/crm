import Enum from '../utils/Enum'
import _ from 'lodash'

const initialState = {
  title: 'Сделки',
  items: [],
  searchQuery: '',
  filterClients: [],
  activeState: Enum.defaultStateDeals,
  sortBy: { code: 'date', type: 'desc' },
  loading: false,
  loaded: false
}

const deals = (state = _.cloneDeep(initialState), action) => {
  let payload = action.payload

  switch (action.type) {
    case 'RESET_DATA':
      return Object.assign({}, state, initialState)

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

    case 'CREATE_DEAL_SUCCESS':
      state.items.push(payload)
      return { ...state,
        items: state.items.concat()
      }

    case 'CREATE_DEAL_FAIL':
      return { ...state, error: payload }

    case 'UPDATE_DEAL_SUCCESS':
      let updated = state.items.filter(item => item._id !== payload._id)
      updated.push(payload)
      return { ...state,
        items: updated
      }

    case 'UPDATE_DEAL_FAIL':
      return { ...state, error: payload }

    case 'DELETE_DEAL_SUCCESS':
      return { ...state, 
        items: state.items.filter(item => item._id !== payload)
      }

    case 'DELETE_DEAL_FAIL':
      return { ...state, error: payload }

    case 'FILTER_DEALS_BY_STATE':
      return { ...state, activeState: payload }

    case 'FILTER_DEALS_BY_CLIENT':
      state.filterClients.push(payload)
      return { ...state, 
        filterClients: state.filterClients.concat() 
      }

    case 'CLEAR_FILTER_BY_CLIENT':
      return { ...state, 
        filterClients: state.filterClients.filter(client => client._id !== payload)
      }

    case 'FILTER_DEALS_BY_SEARCH':
      return { ...state, searchQuery: payload }

    case 'SORT_DEALS_DATA':
      return { ...state, sortBy: payload }

    default:
      return state
  }
}

export default deals
