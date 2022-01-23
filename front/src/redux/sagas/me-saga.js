// Import the redux-saga/effects
import {
  put,
  call,
  takeLeading,
} from 'redux-saga/effects'

// Import all actions and api's
import {
  DELETE,
  GET_ME,
  LOGOUT,
  SET_ME,
} from '../actions/me-action'

// Import all api's
import {
  deleteAccount,
  getUser,
  logout,
} from '../api/me-api'


// Get Me
function* getMe({ payload }) {
  const authResponse = yield call(getUser, payload)

  if (authResponse && !authResponse.error) {
    const user = { ...authResponse.user, token: payload.token }
    yield put({ type: SET_ME, payload: user })
  } else if (authResponse && authResponse.error) {
    window.location.href = `/login`
  }
}

// Logout
function* disconnect() {
  const authResponse = yield call(logout)

  if (authResponse && !authResponse.error) {
    yield put({ type: LOGOUT })
    window.location.href = `/login`
  }
}

// Delete Account
function* deleteAcc({ payload }) {
  const authResponse = yield call(deleteAccount, payload)

  if (authResponse && !authResponse.error) {
    yield put({ type: DELETE })
    window.location.href = `/`
  }
}


// Export the saga
export default function* todoSaga() {
  yield takeLeading(GET_ME, getMe)
  yield takeLeading(LOGOUT, disconnect)
  yield takeLeading(DELETE, deleteAcc)
}