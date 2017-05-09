const initialState = {
  menu: {
    links: []
  }
}

const header = (state = initialState, action) => {

  switch (action.type) {
    case 'GET_MENU_SUCCESS':
      return { ...state, menu: action.payload }

    case 'GET_MENU_FAIL':
      return { ...state, 
        menu: {
          error: action.payload
        } 
      }

    default:
      return state
  }
}

export default header

