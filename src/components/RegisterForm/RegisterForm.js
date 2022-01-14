import axios from "axios";
import React, { useState } from "react";
import "./RegisterForm.css";

function RegisterForm(props) {
  const [userData, setuserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onuserNameChange = (event) => {
    setuserData({ ...userData, username: event.target.value });
  };

  const onEmailChange = (event) => {
    setuserData({ ...userData, email: event.target.value });
  };

  const onPasswordChange = (event) => {
    setuserData({ ...userData, password: event.target.value });
  };

  const submitForm = () => {
    //console.log(userData);
    
    axios.post("http://localhost:8800/auth/register", userData).catch( error => {console.log(error.response.data)});

  };

  return (
    <div className="container">
      <form id="signup">
        <div className="header">
          <h3>Sign Up</h3>
        </div>

        <div className="sep"></div>

        <div className="inputs">
          <input
            type="text"
            value={userData.username}
            placeholder="Username"
            autoFocus
            onChange={onuserNameChange}
          />

          <input
            type="email"
            value={userData.email}
            placeholder="e-mail"
            autoFocus
            onChange={onEmailChange}
          />

          <input
            type="password"
            value={userData.password}
            placeholder="Password"
            onChange={onPasswordChange}
          />

          <a id="submit" href="/#" onClick={submitForm}>
            REGISTER
          </a>
          <a id="submit" href="/#" onClick={() => props.changeForm()}>
            LOG IN
          </a>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
