import React from 'react';
import logoSud from '../../asstes/images/sud-login.png';

import './SingIn.scss';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const sendLogIn = () => {
    navigate('/mainPlaintiff');
  };

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
                />
              </div>
              <div className="inputbox">
                <input type="password" required placeholder="Ваш пароль" />
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
