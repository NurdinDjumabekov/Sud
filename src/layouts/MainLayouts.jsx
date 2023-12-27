import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import LogOut from '../components/LogOut/LogOut';
import './MainLayouts.scss';
////// imgsBlack
import myIski from '../asstes/icons/IconPage/me_iski.svg';
import notif from '../asstes/icons/IconPage/notification.svg';
import create from '../asstes/icons/IconPage/create.svg';
import meetingsPlaintiff from '../asstes/icons/IconPage/calendar.svg';
import calTodoPlaintiff from '../asstes/icons/IconPage/calendar2.svg';
import archive from '../asstes/icons/IconPage/archive.svg';
import arrow from '../asstes/icons/IconPage/arrow.svg';
////// imgsWhite
import myIskiWhite from '../asstes/icons/IconPageWhite/me_iski.svg';
import notifWhite from '../asstes/icons/IconPageWhite/notification.svg';
import createWhite from '../asstes/icons/IconPageWhite/create.svg';
import meetingsPlaintiffWhite from '../asstes/icons/IconPageWhite/calendar.svg';
import calTodoPlaintiffWhite from '../asstes/icons/IconPageWhite/calendar2.svg';
import archiveWhite from '../asstes/icons/IconPageWhite/archive.svg';
import arrowWhite from '../asstes/icons/IconPageWhite/arrow.svg';

function MainLayouts() {
  const navigate = useNavigate();
  const location = useLocation();
  const [lookInnerPages, setLookInnerPages] = useState(false);
  const [pages, setPages] = useState([
    {
      id: 1,
      name: 'Все иски',
      path: '/mainPlaintiff',
      bool: true,
      icon: myIski,
      iconWhite: myIskiWhite,
    },
    {
      id: 2,
      name: 'Создать черновик',
      path: '/plaintiffCreate',
      bool: false,
      icon: create,
      iconWhite: createWhite,
    },
    {
      id: 3,
      name: 'Уведомления',
      path: '/notifPlaintiff',
      bool: false,
      icon: notif,
      iconWhite: notifWhite,
      count: true,
    },
    {
      id: 4,
      name: 'Календарь дел',
      path: '/calTodoPlaintiff',
      bool: false,
      icon: meetingsPlaintiff,
      iconWhite: meetingsPlaintiffWhite,
    },
    {
      id: 5,
      name: 'Календарь заседаний',
      path: '/meetingsPlaintiff',
      bool: false,
      icon: calTodoPlaintiff,
      iconWhite: calTodoPlaintiffWhite,
    },
    {
      id: 6,
      name: 'Архив дел',
      path: '/archive',
      bool: false,
      icon: archive,
      iconWhite: archiveWhite,
    },
  ]);

  const [btnList, setBtnList] = useState([
    {
      id: 1,
      name: 'Мои иски',
      bool: true,
    },
    {
      id: 2,
      name: 'Принятые отвественным секретарём',
      bool: false,
    },
    {
      id: 3,
      name: 'Отклонённые отвественным секретарём',
      bool: false,
    },
    {
      id: 4,
      name: 'Принятые председателем',
      bool: false,
    },
    {
      id: 5,
      name: 'Отклонённые председателем',
      bool: false,
    },
  ]);

  const clickBtn = (id) => {
    const newList = btnList.map((item) => {
      return {
        ...item,
        bool: id === item.id ? true : false,
      };
    });
    setBtnList(newList);
  };

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
    if (location.pathname === '/mainPlaintiff') {
      setLookInnerPages(true);
    } else {
      setLookInnerPages(false);
    }
  }, [location.pathname]);

  console.log(btnList, 'btnList');

  return (
    <div className="plaintiffBlock">
      <div className="plaintiffBlock__inner">
        <h1>
          МТС <p>ТПП КР</p>
        </h1>
        {pages?.map((page) => (
          <div key={page.id}>
            <button
              onClick={() => {
                navigate(page.path);
                setLookInnerPages(!lookInnerPages);
              }}
              className={page.bool ? 'activePage' : ''}
            >
              <div>
                <img
                  src={page.bool ? page.iconWhite : page.icon}
                  alt="иконка"
                  className="imgIcon"
                />
                <p>
                  {page.name}
                  {page?.count ? <button className="notifNums">5</button> : ''}
                </p>
              </div>
              {page.id === 1 ? (
                <img
                  src={page.bool ? arrowWhite : arrow}
                  alt="иконка"
                  className={
                    lookInnerPages ? 'activeInnerBtn' : 'noActiveInnerBtn'
                  }
                />
              ) : (
                ''
              )}
            </button>
            {page.id === 1 && lookInnerPages ? (
              <>
                <ul className="plaintiffBlock__inner__pages">
                  {btnList?.map((btn) => (
                    <li key={btn.id}>
                      <button
                        className={btn?.bool ? 'activeBtnsPage' : ''}
                        onClick={() => clickBtn(btn.id)}
                      >
                        {btn.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              ''
            )}
          </div>
        ))}
        <LogOut />
      </div>
      <Outlet />
    </div>
  );
}

export default MainLayouts;
