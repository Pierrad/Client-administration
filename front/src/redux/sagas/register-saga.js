// Import the redux-saga/effects
import {
  put,
  call,
  takeLeading,
} from 'redux-saga/effects'

// Import all actions and api's
import {
  SET_LOADING,
  POST_REGISTER,
  REGISTER_ERROR,
} from '../actions/register-action'

// import { SET_ME } from '../actions/me-action'

// Import all api's
import {
  register,
} from '../api/register-api'

import { push } from 'connected-react-router'

// Registration
function* setRegistration({ payload }) {
  yield put({ type: SET_LOADING })

  const authResponse = yield call(register, payload)

  if (authResponse.success) {
    yield put(push('/login'))
  } else if (authResponse && authResponse.error) {
    yield put({ type: REGISTER_ERROR, payload: authResponse.message })
  }

  yield put({ type: POST_REGISTER, payload: authResponse })
}


// Export the saga
export default function* todoSaga() {
  yield takeLeading(POST_REGISTER, setRegistration)
}