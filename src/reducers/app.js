
const initialState = {
  isAuth: true,
  loading: false,
  loaded: false
}

const app = (state = initialState, action) => {
  let payload = action.payload

  switch (action.type) {

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

    default:
      return state
  }
}

export default app
