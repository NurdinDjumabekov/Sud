import React, { useState } from 'react';
import './main.css';
import userIcon from '../../asstes/icons/user-icon.png';
import onOffIcon from '../../asstes/icons/onOff.png';
import PlaintiffPage from '../PlaintiffPage/PlaintiffPage';
import { useNavigate } from 'react-router-dom';
import TableLawsuit from '../../components/TableLawsuit/TableLawsuit';

export default function MainPage() {
  const navigate = useNavigate();
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

  return (
    <div className="main">
      <div className="nav_footer">
        {/* <div className="nav">
            <span>Алтынай</span>
            <img src={onOffIcon} alt="On/Off Icon" />
          </div> */}
        <div className="table_container">
          <ul className="tabs_ul">
            {btnList?.map((btn) => (
              <li key={btn.id}>
                <button
                  className={btn?.bool ? 'activeBtns' : ''}
                  onClick={() => clickBtn(btn.id)}
                >
                  {btn.name}
                </button>
              </li>
            ))}
          </ul>
          <TableLawsuit />
        </div>
        {/* <div className="footer_block">
            <span>Администратор 4/-270.00</span>
          </div> */}
      </div>
    </div>
  );
}
