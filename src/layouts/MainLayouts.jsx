import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import LogOut from '../components/LogOut/LogOut';
import './MainLayouts.scss';

function MainLayouts() {
  const navigate = useNavigate();
  return (
    <div className="plaintiffBlock">
      <div className="plaintiffBlock__inner">
        <button onClick={() => navigate('/mainPlaintiff')}>все иски</button>
        <button onClick={() => navigate('/plaintiffCreate')}>
          Создать черновой иск
        </button>
        <button onClick={() => navigate('/notifPlaintiff')}>Уведомления</button>
        <button onClick={() => navigate('/calTodoPlaintiff')}>
          Календари дел
        </button>
        <button>Календари заседаний</button>
        <button>Архив дел</button>
        <LogOut />
      </div>
      <Outlet />
    </div>
  );
}

export default MainLayouts;
