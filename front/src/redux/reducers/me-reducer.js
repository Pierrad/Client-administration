import { 
  SET_ME,
  GET_ME,
  LOGOUT,
} from '../actions/me-action'

// Define your state here
const initialState = {
  loading: false,
  me: {},
}

// This export default will control your state for your application
const reducer = (state = initialState, {type, payload}) => {
  switch(type) {
    // Set loading
    case SET_ME:
      return {
        ...state,
	      me: payload
      }
    case GET_ME:
      return {
        ...state,
        loading: true
      }
    case LOGOUT:
      return {
        ...state,
        me: {},
        portfolio: {}
      }
    // Return default state if you didn't match any case
    default:
      return state
  }
}

export default reducer;