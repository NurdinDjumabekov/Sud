/////style
import "./SingIn.scss";

//// helpers
import CLOUDS from "vanta/src/vanta.net";

////hooks
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

////img
import logo from "../../asstes/images/logo2.png";

////fns
import { authLogin } from "../../store/reducers/authSlice";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, setLogin] = useState({ email: "", password: "" });

  const sendLogIn = (e) => {
    e.preventDefault();
    dispatch(authLogin({ dataLogin: login, navigate }));
    ////// логинизация
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
      scaleMobile: 1.0,
      color: 0x3f53ff,
      backgroundColor: 0x200d41,
    });
  }, []);

  return (
    <div className="vantaMain" id="vanta">
      <form onSubmit={sendLogIn}>
        <div className="blockLogo">
          <img src={logo} alt="logo" />
        </div>

        <div className="inputBlock">
          <i className="fas fa-user"></i>
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

        <div className="inputBlock">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            required
            placeholder="Пароль"
            name="password"
            onChange={changeInput}
            value={login.password}
          />
        </div>

        <button className="actionBtn" type="submit">
          Войти
        </button>
        <div className="register">
          <p>Зарегистрироваться</p>
        </div>
      </form>
    </div>
  );
}
