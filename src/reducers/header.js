const initialState = {
  menu: {
    links: []
  },
  profile: {
    text: 'Админ',
    path: '/user',
    active: false
  }
}

const header = (state = initialState, action) => {

  switch (action.type) {
    case 'GET_MENU_REQUEST':
      return { ...state, 
        menu: {
          loading: true
        } 
      }

    case 'GET_MENU_SUCCESS':
      return { ...state, menu: action.payload }

    case 'GET_MENU_FAIL':
      return { ...state, 
        menu: {
          error: action.payload
        } 
      }

    case '@@router/LOCATION_CHANGE':
      return { ...state, path: action.payload.pathname }

    default:
      return state
  }
}

export default header

