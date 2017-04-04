const initialState = {
  menu: {
    loading: true
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
      var menu = {
        loading: true
      }
      return { ...state, menu: menu }

    case 'GET_MENU_SUCCESS':
      return { ...state, menu: action.payload }

    case 'GET_MENU_FAIL':
      var menu = {
        error: action.payload
      }
      return { ...state, menu: menu }

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

    case 'CLICK_MENU':
      console.log(action.payload)
    default:
      return state
  }
}

export default header

