import React, { useState } from "react";
import logoSud from "../../asstes/images/sud-login.png";
/// delete

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
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    localStorage.clear();
  }, []);
  // console.log(login, 'login');

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

// import { Preview, print } from "react-html2pdf";
// import "./styles.css";

// export default function App() {
//   return (
//     <>
//       <Preview id={"jsx-template"}>
//         <div>
//           <div
//             style={{
//               backgroundColor: "white",
//               color: "black",
//               display: "grid",
//               gridTemplateColumns: "20% 60% 20%",
//               height: "100px"
//             }}
//           >
//             <div>
//               <h1>1</h1>
//             </div>
//             <div>
//               <div>
//                 Transportador: 49.871.213/0001-88 - IC TRANSPORTES LTDA.
//                 SUMARÉ-SP
//               </div>
//             </div>
//             <div>
//               <h1>3</h1>
//             </div>
//           </div>
//         </div>
//       </Preview>
//       <button onClick={() => print("a", "jsx-template")}> print</button>
//     </>
//   );
// }
