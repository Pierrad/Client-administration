// Import the redux-saga/effects
import { push } from 'connected-react-router'
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

  const authResponse = yield call(auth, payload)

  if (authResponse && !authResponse.error) {
    yield put({ type: SET_ME, payload: authResponse.user })
    yield put(push('/dashboard/profile'))
  } else if (authResponse && authResponse.error) {
    yield put({ type: LOGIN_ERROR, payload: authResponse.message })
  }
}


// Export the saga
export default function* todoSaga() {
  yield takeLeading(POST_LOGIN, setAuth)
}