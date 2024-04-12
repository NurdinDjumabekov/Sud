import React, { useState } from "react";

import "./SingIn.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../../store/reducers/authSlice";
import CLOUDS from "vanta/src/vanta.net";
import { useEffect } from "react";
import logo from "../../asstes/images/logo2.png";

export default function SignIn() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sendLogIn = (e) => {
    e.preventDefault();
    dispatch(authLogin({ dataLogin: login, navigate }));
  };

  const changeInput = (e) => {
    e.preventDefault();
    if (e.target.value.includes("'") || e.target.value.includes("`")) {
      return;
    }
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    CLOUDS({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      color: 0x89d8fc,
      scaleMobile: 1.0,
      points: 20.0,
      maxDistance: 17.0,
      spacing: 16.0,
    });
    localStorage.clear();
  }, []);

  return (
    <div className="vantaMain" id="vanta">
      <section>
        <div className="mainLogIn">
          <div className="form-box">
            <div className="form-value">
              <form onSubmit={sendLogIn}>
                <div className="blockLogo">
                  <img src={logo} alt="logo" />
                </div>
                {/* <h2>Вход</h2> */}
                <div className="inputbox">
                  <input
                    type="email"
                    id="inputLogin"
                    required
                    placeholder="Email"
                    name="email"
                    onChange={changeInput}
                    value={login.email}
                  />
                </div>
                <div className="inputbox">
                  <input
                    type="password"
                    required
                    placeholder="Пароль"
                    name="password"
                    onChange={changeInput}
                    value={login.password}
                  />
                </div>
                <button className="login_enter" type="submit">
                  Войти
                </button>
                <div className="register">
                  <p>
                    <a href="#">Зарегистрироваться</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
