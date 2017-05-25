import _ from 'lodash'

const initialState = {
  isAuth: false,
  loading: false,
  loaded: false,
  toLogin: false,
  showMess: false
}

const app = (state = _.cloneDeep(initialState), action) => {
  let payload = action.payload

  switch (action.type) {
    case 'RESET_DATA':
      return Object.assign({}, state, initialState)

    case 'LOGIN_SUCCESS':
      return { ...state,
        isAuth: true,
        toLogin: false
      }

    case 'LOGIN_FAIL':
      return { ...state }

    case 'AUTH_REQUEST':
      return { ...state,
        toLogin: false
      }

    case 'AUTH_SUCCESS':
      return { ...state,
        isAuth: true
      }

    case 'AUTH_FAIL':
      return { ...state,
        isAuth: false,
        toLogin: true
      }

    case 'GET_APP_DATA_REQUEST':
      return { ...state, 
        loading: true 
      }

    case 'GET_APP_DATA_SUCCESS':
      return { ...state,
        loading: false,
        loaded: true
      }

    case 'GET_APP_DATA_FAIL':
      return { ...state,
        error: payload
      }

    case 'LOGOUT_SUCCESS':
      return { ...state,
        isAuth: false,
        toLogin: true
      }

    case 'EXTERNAL_CHANGED_APP_DATA':
      return { ...state,
        showMess: true
      }

    case 'HIDE_APP_MESS':
      return { ...state,
        showMess: false
      }

    default:
      return state
  }
}

export default app
