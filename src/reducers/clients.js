const initialState = {
  items: [],
  loaded: false,
  loading: false
}

const clients = (state = initialState, action) => {
  let payload = action.payload
  
  switch (action.type) {

    case 'GET_CLIENTS_REQUEST':
      return { ...state, loading: true }

    case 'GET_CLIENTS_SUCCESS':
      return { ...state, 
        items: payload,
        loading: false,
        loaded: true
      }

    default:
      return state
  }
}

export default clients

