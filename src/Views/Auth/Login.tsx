import React, { FC, useState } from "react";
import "./Login.css";
import axios from "axios";
import { useHistory } from "react-router";

type loginParams = {
  loginSuccess: (any) => void;
};
const Login: FC<loginParams> = ({ loginSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  const attemptLogin = (email, password) => {
    setLoading(true);
    axios
      .post("https://plantes-et-jardins-back.herokuapp.com/api/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        loginSuccess(response.data);
        history.push({ pathname: "/" });
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-component-parent center-element">
      <div className="container bg-gradient-primary login-component-child">
        <div className="row">
          <div className="col-12 col-md-6 center-element text-center right-border">
            <h1>Plantes & jardins Admin</h1>
          </div>
          <div className="col-12 col-md-6">
            <label>Email</label>
            <div className="input-group mb-3">
              <input
                value={email}
                onChange={(htmlElement) => setEmail(htmlElement.target.value)}
                placeholder="Email"
                type="text"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <label>password</label>
            <div className="input-group mb-3">
              <input
                value={password}
                onChange={(htmlElement) =>
                  setPassword(htmlElement.target.value)
                }
                placeholder="Nom du produit"
                type="password"
                className="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <div className="w-100 text-center mt-5">
              <button
                type="button"
                onClick={() => attemptLogin(email, password)}
                className="btn btn-success"
              >
                {loading && (
                  <span className="min-width-button">
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  </span>
                )}
                {!loading && <span>Se connecter</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
