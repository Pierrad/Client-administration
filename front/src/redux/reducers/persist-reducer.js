import { REHYDRATE } from 'redux-persist/lib/constants'; 

// Define your state here
const initialState = {
  loading: false,
  persistedState: {}
}

// This export default will control your state for your application
const reducer = (state = initialState, {type, payload}) => {
  switch(type){
    case REHYDRATE:
      return { ...state, persistedState: payload };
    default:
      return state;
  }
}

export default reducer;
