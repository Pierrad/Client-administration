// Import the redux-saga/effects
import {
  put,
  call,
  takeLeading,
} from 'redux-saga/effects'

// Import all actions and api's
import {
  SET_LOADING,
  POST_LOGIN,
  LOGIN_ERROR,
} from '../actions/login-action'

import { SET_ME } from '../actions/me-action'

// Import all api's
import {
  auth,
} from '../api/login-api'


// Authentification
function* setAuth({ payload }) {
  yield put({ type: SET_LOADING })

  const productAppURL = process.env.REACT_APP_PRODUCT_URL

  const authResponse = yield call(auth, payload)

  if (authResponse && !authResponse.error) {
    yield put({ type: SET_ME, payload: authResponse.user })
    window.location.href = `${productAppURL}/dashboard?id=${authResponse.user._id}&token=${authResponse.user.token.token}`
  } else if (authResponse && authResponse.error) {
    yield put({ type: LOGIN_ERROR, payload: authResponse.message })
  }
}


// Export the saga
export default function* todoSaga() {
  yield takeLeading(POST_LOGIN, setAuth)
}