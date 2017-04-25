import Enum from '../utils/Enum'

const initialState = {
  title: 'Создание новой сделки',
  state: 'new',
  manager: false,
  modal: { 
    show: false, 
    mode: '',
    sortBy: { code: 'price', type: 'asc' },
    searchQuery: ''
  },
  items: [],
  client: false
}

const dealDetail = (state = initialState, action) => {
  let payload = action.payload

  switch (action.type) {

    case 'SET_DEAL_STATE':
      return { ...state, 
        state: payload 
      }

    case 'SET_DEAL_MANAGER':
      return { ...state, 
        manager: _.find(payload.list, (manager) => manager.login === payload.id)
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
        items: state.items,
        modal: { ...state.modal,
          show: false
        }
      }

    case 'SET_CLIENT_TO_DEAL':
      return { ...state,
        client: payload,
        modal: { ...state.modal,
          show: false
        }
      }

    default:
      return state
  }
}

export default dealDetail
