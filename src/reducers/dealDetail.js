import Enum from '../utils/Enum'
import _ from 'lodash'

const initialState = {
  state: 'new',
  manager: false,
  modal: { 
    show: false, 
    mode: '',
    sortBy: { code: 'price', type: 'asc' },
    searchQuery: ''
  },
  items: [],
  sum: 0,
  client: false,
  number: '',
  redirect: false,
  validateMess: {
    show: false
  }
}

const dealDetail = (state = _.cloneDeep(initialState), action) => {
  let payload = action.payload

  switch (action.type) {
    case 'LOAD_DEAL_DETAIL':
      return Object.assign({}, state, payload ? payload : _.cloneDeep(initialState))

    case 'SET_DEAL_STATE':
      return { ...state, 
        state: payload
      }

    case 'SET_DEAL_MANAGER':
      return { ...state, 
        manager: payload
      }

    case 'SHOW_DEAL_MODAL':
      return { ...state, modal: payload }

    case 'SEARCH_DEAL_MODAL':
      return { ...state, 
        modal: { ...state.modal,
          searchQuery: payload
        }
      }

    case 'SORT_DEAL_MODAL':
      return { ...state,
        modal: { ...state.modal,
          sortBy: payload
        }
      }

    case 'ADD_ITEM_TO_DEAL':
      state.items.push(payload)
      return { ...state,
        items: state.items.concat()
      }

    case 'REMOVE_ITEM_FROM_DEAL':
      return { ...state,
        items: state.items.filter(item => item._id !== payload)
      }

    case 'SET_ITEM_PRICE_DEAL':
      state.items.forEach(item => {
        if (item._id === payload.id) {
          item.price = +payload.val
        }
      })
      return { ...state,
        items: state.items.concat()
      }

    case 'SET_ITEM_NUMBER_DEAL':
      state.items.forEach(item => {
        if (item._id === payload.id) {
          item.number = +payload.val
        }
      })
      return { ...state,
        items: state.items.concat()
      }

    case 'SET_CLIENT_TO_DEAL':
      return { ...state,
        client: payload
      }

    case 'SET_SUM_DEAL':
      let sum = 0
      state.items.forEach(item => {
        sum += item.price * item.number
      })
      return { ...state,
        sum: sum
      }

    case 'SET_NUMBER_TO_DEAL':
      return { ...state,
        number: payload
      }

    case 'CREATE_DEAL_SUCCESS':
      return { ...state,
        redirect: true
      }

    case 'UPDATE_DEAL_SUCCESS':
      return { ...state,
        redirect: true
      }

    case 'DELETE_DEAL_SUCCESS':
      return { ...state,
        redirect: true
      }

    case 'RESET_REDIRECT':
      return { ...state,
        redirect: false
      }

    case 'VALIDATE_DEAL':
      return { ...state,
        validateMess: payload
      }

    default:
      return state
  }
}

export default dealDetail
