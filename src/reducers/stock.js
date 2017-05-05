import Enum from '../utils/Enum'

const initialState = {
  title: 'Прайс-лист',
  items: [],
  searchQuery: '',
  activeCategory: Enum.defaultCatStock,
  modal: { 
  	show: false, 
  	mode: 'create',
  	item: {
  		name: '',
  		art: '',
  		price: '',
  		category: ''
  	}
  },
  sortBy: { code: 'price', type: 'asc' },
  loading: false,
  loaded: false,
  validateMess: {
    show: false
  }
}

const stock = (state = initialState, action) => {
	let payload = action.payload

	switch (action.type) {
		case 'GET_STOCK_REQUEST':
			return { ...state, loading: true }

		case 'GET_STOCK_SUCCESS':
			return { ...state,
				items: payload,
				loading: false,
				loaded: true
			}

		case 'GET_STOCK_FAIL':
			return { ...state, error: true }

		case 'CREATE_ITEM_SUCCESS':
			state.items.push(payload)
			return { ...state, 
				items: state.items.concat(),
				modal: { ...state.modal,
          show: false
				}
			}

		case 'CREATE_ITEM_FAIL':
			return { ...state}

		case 'UPDATE_ITEM_SUCCESS':
			let updated = state.items.filter(item => item._id !== payload._id)
			updated.push({ ...payload, updating: true })
			return { ...state, 
				items: updated,
				modal: { ...state.modal,
          show: false
				}
			}

		case 'UPDATE_ITEM_FAIL':
			return { ...state}

		case 'STOP_FLASH_UPDATE_ITEM':
			state.items.forEach(item => {
				if (item._id === payload) {
					item.updating = false
				}
			})
			return { ...state, 
				items: state.items.concat()
			}

		case 'DELETE_ITEM_REQUEST':
			state.items.forEach(item => {
				if (item._id === payload) {
					item.deleting = true
				}
			})
			return { ...state,
				items: state.items.concat()
			}

		case 'DELETE_ITEM_SUCCESS':
			return { ...state, 
				items: state.items.filter(item => item._id !== payload)
			}

		case 'DELETE_ITEM_FAIL':
			return { ...state}

		case 'FILTER_STOCK_BY_CATEGORY':
			return { ...state, activeCategory: payload }

		case 'FILTER_STOCK_BY_SEARCH':
			return { ...state, searchQuery: payload }

		case 'SHOW_STOCK_MODAL':
			return { ...state,
				modal: { 
			  	show: payload.show, 
			  	mode: payload.mode,
			  	item: payload.item ? payload.item :
			  		{
				  		name: '',
				  		art: '',
				  		price: '',
				  		category: ''
				  	}
			  },
			  validateMess: {
			    show: false
			  }
			}

		case 'CHANGE_MODAL_ITEM':
			return { ...state,
				modal: { ...state.modal,
          item: payload
        }
			}

		case 'SORT_STOCK_DATA':
			return { ...state, sortBy: payload }

		case 'VALIDATE_ITEM':
      return { ...state,
        validateMess: payload
      }

		default:
      return state
	}
}

export default stock
