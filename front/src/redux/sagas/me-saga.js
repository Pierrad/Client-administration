// Import the redux-saga/effects
import {
  put,
  call,
  takeLeading,
} from 'redux-saga/effects'

// Import all actions and api's
import {
  LOGOUT,
} from '../actions/me-action'

// Import all api's
import {
  logout,
} from '../api/me-api'

import { push } from 'connected-react-router'


// Logout
function* setLogout({ payload }) {
  const authResponse = yield call(logout, payload)
  if (authResponse) {
    yield put(push('/login'))
  }
}


// Export the saga
export default function* todoSaga() {
  yield takeLeading(LOGOUT, setLogout)
}