import Enum from '../utils/Enum'

const initialState = {
  title: 'Создание новой сделки',
  state: 'new',
  users: false,
  manager: false,
  items: []
}

const dealDetail = (state = initialState, action) => {
  let payload = action.payload

  switch (action.type) {

    case 'GET_USERS_REQUEST':
      return { ...state }

    case 'GET_USERS_SUCCESS':
      return { ...state, 
        users: payload
      }

    case 'SET_DEAL_STATE':
      return { ...state, 
        state: payload 
      }

    case 'SET_DEAL_MANAGER':
      return { ...state, 
        manager: _.filter(state.users, (user) => user.login === payload)[0]
      }

    case 'SET_DEAL_MANAGER_DEFAULT':
      return { ...state, 
        manager: payload 
      }

    default:
      return state
  }
}

export default dealDetail
