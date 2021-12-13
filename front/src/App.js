import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConnectedRouter } from "connected-react-router";

import Login from './pages/login'
import Register from './pages/register'

import Header from "./components/Header";

import { lightTheme } from './theme/themes'

import store, { history, persistor } from './redux/store'


function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <Header />
          <Switch>
            <Route path="/" exact component={() => window.location.href = `${process.env.REACT_APP_PRODUCT_URL}`} />
            <Route path="/login" exact component={() => <Login />}/>
            <Route path="/register" exact component={() => <Register/>}/>
          </Switch>
        </ConnectedRouter>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
