import React, { FC, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

type loginParams = {
  loginSuccess: (any) => void;
};
const Login: FC<loginParams> = ({ loginSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const history = useHistory();
  const attemptLogin = (email, password) => {
    axios
      .post("https://plantes-et-jardins-back.herokuapp.com/api/users/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        loginSuccess(response.data);
        history.push({ pathname: "/" });
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <h1>Se connecter</h1>
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
          onChange={(htmlElement) => setPassword(htmlElement.target.value)}
          placeholder="Nom du produit"
          type="password"
          className="form-control"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
        />
      </div>
      <button
        type="button"
        onClick={() => attemptLogin(email, password)}
        className="btn btn-success"
      >
        Se connecter
      </button>
    </div>
  );
};

export default Login;
