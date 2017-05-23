const initialState = {
  items: [],
  searchQuery: '',
  modal: { 
    show: false, 
    mode: 'create',
    item: {
      name: '',
      fullName: '',
      contact: '',
      person: ''
    }
  },
  sortBy: { code: 'name', type: 'asc' },
  validateMess: {
    show: false
  }
}

const clients = (state = _.cloneDeep(initialState), action) => {
  let payload = action.payload
  
  switch (action.type) {
    case 'RESET_DATA':
      return Object.assign({}, state, initialState)

    case 'GET_CLIENTS_SUCCESS':
      return { ...state, 
        items: payload
      }

    case 'GET_CLIENTS_FAIL':
      return { ...state, error: true }

    case 'CREATE_CLIENT_SUCCESS':
      state.items.push(payload)
      return { ...state, 
        items: state.items.concat(),
        modal: { ...state.modal,
          show: false
        }
      }

    case 'CREATE_CLIENT_FAIL':
      return { ...state, error: payload }

    case 'UPDATE_CLIENT_SUCCESS':
      let updated = state.items.filter(item => item._id !== payload._id)
      updated.push(payload)
      return { ...state, 
        items: updated,
        modal: { ...state.modal,
          show: false
        }
      }

    case 'UPDATE_CLIENT_FAIL':
      return { ...state, error: payload }

    case 'DELETE_CLIENT_SUCCESS':
      return { ...state, 
        items: state.items.filter(item => item._id !== payload)
      }

    case 'DELETE_CLIENT_FAIL':
      return { ...state, error: payload }

    case 'FILTER_CLIENTS_BY_SEARCH':
      return { ...state, searchQuery: payload }

    case 'SHOW_CLIENT_MODAL':
      return { ...state,
        modal: { 
          show: payload.show, 
          mode: payload.mode,
          item: payload.item ? payload.item :
            {
              name: '',
              fullName: '',
              contact: '',
              person: ''
            }
        },
        validateMess: {
          show: false
        }
      }

    case 'CHANGE_CLIENT_MODAL':
      return { ...state,
        modal: { ...state.modal,
          item: payload
        }
      }

    case 'SORT_CLIENTS_DATA':
      return { ...state, sortBy: payload }

    case 'VALIDATE_CLIENT':
      return { ...state,
        validateMess: payload
      }
    default:
      return state
  }
}

export default clients

