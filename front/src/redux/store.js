/**
  @desc createStore is used for creating a store for our redux
  @desc applyMiddleware is used for applying some middleware to redux, in this case we gonna using redux-saga
*/
import { createStore, applyMiddleware } from 'redux' 

// composeWithDevTools is tools that gonna be connecting our application for debugging the redux into the browser
import { composeWithDevTools } from 'redux-devtools-extension'

// This is the middleware that we gonna use redux-saga
import createSagaMiddleware from 'redux-saga'

// This is the root saga that will contain our sagas
import rootSaga from './sagas'

// This will be contain our reducer for the application
import rootReducer from './reducers'

// Router
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

// Redux persist
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web


export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const store = createStore(
  persistedReducer,
  {},
  composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
)

// Run redux-saga
sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store);

export default store