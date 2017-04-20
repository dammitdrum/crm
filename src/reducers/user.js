const initialState = {
  isAuth: false
}

const user = (state = initialState, action) => {

  switch (action.type) {
    case 'GET_USER_REQUEST':
      return { ...state, 
        isAuth: true
      }

    default:
      return state
  }
}

export default user
