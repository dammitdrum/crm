const initialState = {
  isAuth: true
}

const user = (state = initialState, action) => {

  switch (action.type) {
    case 'GET_USER_REQUEST':
      return { ...state, 
        menu: {
          loading: true
        } 
      }

    default:
      return state
  }
}

export default user

