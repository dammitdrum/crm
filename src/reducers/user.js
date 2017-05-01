
const initialState = {
  login: '',
  name: '',
  access: '',
  users: []
}

const user = (state = initialState, action) => {
  let payload = action.payload
  
  switch (action.type) {

    case 'GET_USERS_SUCCESS':
      return { ...state, 
        users: payload
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

    default:
      return state
  }
}

export default user
