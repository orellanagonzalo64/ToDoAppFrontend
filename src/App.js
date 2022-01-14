import "./App.css";
import TopPanel from "./components/TopPanel/TopPanel";
import InnerPanel from "./components/InnerPanel/InnerPanel";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import Signin from "./components/Signin/Signin";
import React, { useState } from "react";

function App() {
  const [isLogged, setisLogged] = useState(false);
  const [showRegisterForm, setshowRegisterForm] = useState(true);
  const [userData, setuserData] = useState(null);

  const login = () => {
    setisLogged(true);
  };

  const logout = () => {
    setuserData(null);
    setisLogged(false);
  };

  const changeForm = () => {
    setshowRegisterForm(!showRegisterForm);
  };

  const loadUser = (user) => {
    setuserData(user);
  };

  return (
    <div className="App red">
      <TopPanel />
      {isLogged ? (
        <InnerPanel logout={logout} userData={userData} />
      ) : showRegisterForm ? (
        <RegisterForm changeForm={changeForm} />
      ) : (
        <Signin changeForm={changeForm} login={login} loadUser={loadUser} />
      )}
    </div>
  );
}

export default App;
