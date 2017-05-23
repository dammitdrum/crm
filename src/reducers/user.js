import _ from 'lodash'

const initialState = {
  login: '',
  name: '',
  access: '',
  modal: { 
    show: false, 
    mode: 'create',
    user: {
      name: '',
      login: '',
      password: '',
      access: 'manager'
    }
  },
  validateMess: {
    show: false
  },
  users: []
}

const user = (state = _.cloneDeep(initialState), action) => {
  let payload = action.payload
  
  switch (action.type) {
    case 'GET_USERS_SUCCESS':
      return { ...state, 
        users: state.access === 'superAdmin' ? payload : false
      }

    case 'LOGIN_SUCCESS':
      return { ...state, 
        login: payload.login,
        name: payload.name,
        access: payload.access
      }

    case 'AUTH_SUCCESS':
      return { ...state,
        login: payload.login,
        name: payload.name,
        access: payload.access
      }

    case 'LOGOUT_SUCCESS':
      return Object.assign({}, state, initialState)

    case 'CREATE_USER_SUCCESS':
      state.users.push(payload)
      return { ...state, 
        users: state.users.concat(),
        modal: { ...state.modal,
          show: false
        }
      }

    case 'CREATE_USER_FAIL':
      return { ...state, error: payload }

    case 'UPDATE_USER_SUCCESS':
      let updated = state.users.filter(user => user._id !== payload._id)
      updated.push(payload)
      return { ...state, 
        users: updated,
        modal: { ...state.modal,
          show: false
        }
      }

    case 'UPDATE_USER_FAIL':
      return { ...state, error: payload }

    case 'DELETE_USER_SUCCESS':
      return { ...state, 
        users: state.users.filter(user => user._id !== payload)
      }

    case 'DELETE_USER_FAIL':
      return { ...state, error: payload }

    case 'SHOW_USER_MODAL':
      return { ...state,
        modal: { 
          show: payload.show, 
          mode: payload.mode,
          user: payload.user ? payload.user :
            { ...initialState.modal.user }
        },
        validateMess: {
          show: false
        }
      }

    case 'CHANGE_USER_MODAL':
      return { ...state,
        modal: { ...state.modal,
          user: payload
        }
      }

    case 'VALIDATE_USER':
      return { ...state,
        validateMess: payload
      }

    default:
      return state
  }
}

export default user
