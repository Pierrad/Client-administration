import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={() => <Home />} />
        <Route path="/login" exact component={() => <Login />}/>
        <Route path="/register" exact component={() => <Register/>}/>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
