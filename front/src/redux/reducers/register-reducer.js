import { 
  REGISTER_ERROR,
  SET_LOADING,
} from '../actions/register-action'

// Define your state here
const initialState = {
  loading: false,
  error: ''
}

// This export default will control your state for your application
const reducer = (state = initialState, {type, payload}) => {
  switch(type) {
    // Set loading
    case SET_LOADING:
      return {
        ...state,
	      loading: true
      }
    case REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      }
    // Return default state if you didn't match any case
    default:
      return state
  }
}

export default reducer;