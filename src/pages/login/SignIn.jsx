import React, { useState } from 'react';
import logoSud from '../../asstes/images/sud-login.png';

import './SingIn.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogin } from '../../store/reducers/authSlice';

export default function SignIn() {
  const { typeUser } = useSelector((state) => state.saveDataSlice);

  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const dataLoginPlaintiff = {
    email: 'polina.mumber@gmail.com',
    password: '123123321',
  };

  const dataLoginResp = {
    email: 'sec@gmail.com',
    password: '123456',
  };

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

  React.useEffect(() => {
    localStorage.clear();
  }, []);
  // console.log(login, 'login');

  return (
    <div className="login_block">
      <section>
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={sendLogIn}>
              <h2>Вход</h2>
              <div className="inputbox">
                <input
                  type="email"
                  id="inputLogin"
                  required
                  placeholder="Ваша почта"
                  name="email"
                  onChange={changeInput}
                  value={login.email}
                />
              </div>
              <div className="inputbox">
                <input
                  type="password"
                  required
                  placeholder="Ваш пароль"
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
                  У вас нет аккаунта ? <a href="#">Зарегистрироваться</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
