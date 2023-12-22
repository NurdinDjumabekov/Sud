import React from 'react';
import logoSud from '../../asstes/images/sud-login.png';

import './login.css';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const sendLogIn = () => {
    navigate('/main');
  };
  return (
    <div className="login_block">
      <section>
        <div className="form-box">
          <div className="form-value">
            <form onSubmit={sendLogIn}>
              <h2>Login</h2>
              <div className="inputbox">
                <input type="email" required />
                <label for="">Логин</label>
              </div>
              <div className="inputbox">
                <input type="password" required />
                <label for="">Пароль</label>
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
      <script
        type="module"
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
      ></script>
      <script
        nomodule
        src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
      ></script>
    </div>
  );
}
