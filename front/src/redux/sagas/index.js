import { spawn } from 'redux-saga/effects'

// Sagas
import loginSaga from './login-saga'
import registerSaga from './register-saga'
import meSaga from './me-saga'

// Export the root saga
export default function* rootSaga() {
  yield spawn(registerSaga)
  yield spawn(loginSaga)
  yield spawn(meSaga)
}