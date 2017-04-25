const initialState = {
  isAuth: false,
  login: 'admin',
  name: 'Админ',
  users: [],
  loaded: false
}

const user = (state = initialState, action) => {
  let payload = action.payload
  
  switch (action.type) {

    case 'GET_USERS_REQUEST':
      return { ...state }

    case 'GET_USERS_SUCCESS':
      return { ...state, 
        users: payload,
        loaded: true
      }

    case 'GET_USER_REQUEST':
      return { ...state, 
        isAuth: true
      }

    default:
      return state
  }
}

export default user
