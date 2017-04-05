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

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

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
    console.log(action.payload)
      return { ...state, 
        menu: {
          error: action.payload
        } 
      }

    case LOCATION_CHANGE:
      let menu = state.menu
      let profile = state.profile
      let path = action.payload.pathname

      profile.active = false;
      menu.links.forEach(link => {
        link.active = false
        if (link.path === path) {
          link.active = true
        }
      })
      if (profile.path === path) {
        profile.active = true;
      }
      return { ...state, menu: menu, profile: profile }
      
    default:
      return state
  }
}

export default header

