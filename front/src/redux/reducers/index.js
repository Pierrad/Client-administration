// combineReducers come from redux that used for combining reducers that we just made.
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

// Reducers
import login from './login-reducer'
import me from './me-reducer'
import persist from './persist-reducer'
import register from './register-reducer'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  persist,
  login,
  register,
  me,
})

export default createRootReducer