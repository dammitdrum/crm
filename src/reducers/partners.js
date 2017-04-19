const initialState = {
  
}

const partners = (state = initialState, action) => {

  switch (action.type) {
    case 'GET_PARTNERS_REQUEST':
      return { ...state, 
        menu: {
          loading: true
        } 
      }

    default:
      return state
  }
}

export default partners

