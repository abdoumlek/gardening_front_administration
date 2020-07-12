import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import AuthentifiedContent from "./Views/Auth/AuthentifiedContent";
import Login from "./Views/Auth/Login";
import "./App.css";

function App() {
  const [auth, setAuth] = useState<any>(null);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login loginSuccess={(authData) => setAuth(authData)} />
        </Route>
        {auth ? (
          <Route path="*">
            <AuthentifiedContent token={auth.access_token}/>
          </Route>
        ) : null}
        {!auth ? <Redirect from="*" to="/login" /> : null}
        {auth ? <Redirect from="*" to="/" /> : null}
      </Switch>
    </Router>
  );
}

export default App;
