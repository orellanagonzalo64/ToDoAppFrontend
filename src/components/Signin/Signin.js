import React, { useState } from "react";
import "./Signin.css";
import axios from "axios";

function Signin(props) {
  const [userData, setuserData] = useState({
    email: "",
    password: "",
  });

  const onEmailChange = (event) => {
    setuserData({ ...userData, email: event.target.value });
  };

  const onPasswordChange = (event) => {
    setuserData({ ...userData, password: event.target.value });
  };

  const submitForm = () => {
    axios.post("http://localhost:8800/auth/login", userData).then((result) => {
      if (typeof result === "object") {
        props.loadUser(result.data);
        props.login();
      } else {
        console.log("no logeado");
      }
    }).catch( error => {console.log(error.response.data)});
  };

  return (
    <div className="container">
      <form id="signup">
        <div className="header">
          <h3>Sign in</h3>
        </div>

        <div className="sep"></div>

        <div className="inputs">
          <input
            type="email"
            placeholder="e-mail"
            autoFocus
            onChange={onEmailChange}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={onPasswordChange}
          />

          <a id="submit" href="/#" onClick={submitForm}>
            LOG IN
          </a>
          <a id="submit" href="/#" onClick={() => props.changeForm()}>
            REGISTER
          </a>
        </div>
      </form>
    </div>
  );
}

export default Signin;
