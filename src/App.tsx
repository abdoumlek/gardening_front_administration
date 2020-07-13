import React, { useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import AfterAuthLoading from "./Components/LoadingScreen/AfterAuthLoading";
import Login from "./Views/Auth/Login";
import "./App.css";

function App() {
  const [auth, setAuth] = useState<any>(null);
  const AuthentifiedContent = lazy(() =>
    import("./Views/Auth/AuthentifiedContent")
  );
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login loginSuccess={(authData) => setAuth(authData)} />
        </Route>
        {auth ? (
          <Route path="*">
            <Suspense fallback={<AfterAuthLoading />}>
              <AuthentifiedContent token={auth.access_token} />
            </Suspense>
          </Route>
        ) : null}
        {!auth ? <Redirect from="*" to="/login" /> : null}
        {auth ? <Redirect from="*" to="/" /> : null}
      </Switch>
    </Router>
  );
}

export default App;
