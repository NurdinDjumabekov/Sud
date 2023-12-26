import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import LogOut from '../components/LogOut/LogOut';
import './MainLayouts.scss';

function MainLayouts() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pages, setPages] = useState([
    {
      id: 1,
      name: 'Все иски',
      path: '/mainPlaintiff',
      bool: true,
    },
    {
      id: 2,
      name: 'Создать черновой иск',
      path: '/plaintiffCreate',
      bool: false,
    },
    {
      id: 3,
      name: 'Уведомления',
      path: '/notifPlaintiff',
      bool: false,
    },
    {
      id: 4,
      name: 'Календари дел',
      path: '/calTodoPlaintiff',
      bool: false,
    },
    {
      id: 5,
      name: 'Календари заседаний',
      path: '/meetingsPlaintiff',
      bool: false,
    },
    {
      id: 6,
      name: 'Архив дел',
      path: '/archive',
      bool: false,
    },
  ]);

  React.useEffect(() => {
    const newPage = pages.map((i) => {
      if (i.path === location.pathname) {
        return {
          ...i,
          bool: true,
        };
      } else {
        return {
          ...i,
          bool: false,
        };
      }
    });
    setPages(newPage);
  }, [location.pathname]);

  return (
    <div className="plaintiffBlock">
      <div className="plaintiffBlock__inner">
        <h1>
          МТС <p>ТПП КР</p>
        </h1>
        {pages?.map((page) => (
          <button
            key={page.id}
            onClick={() => navigate(page.path)}
            className={page.bool ? 'activePage' : ''}
          >
            {page.name}
          </button>
        ))}
        <LogOut />
      </div>
      <Outlet />
    </div>
  );
}

export default MainLayouts;
