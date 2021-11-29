import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link, Switch } from "react-router-dom";
import Home from './pages/home'
import Login from './pages/login'

function App() {
  return (
    <BrowserRouter>
      <h1>Welcome to the web site page!</h1>
      <Switch>
        <Route path="/" exact component={() => <Home />} />
        <Route path="/login" exact element={() => <Login />}/>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
