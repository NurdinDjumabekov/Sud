import React, { useState } from 'react';
import './main.css';

import userIcon from '../../asstes/icons/user-icon.png';
import onOffIcon from '../../asstes/icons/onOff.png';
import TableLawsuit from '../../components/TableLawsuit';
import PlaintiffPage from '../PlaintiffPage/PlaintiffPage';

export default function MainPage() {
  const [btnList, setBtnList] = useState([
    {
      id: 1,
      name: 'Мои иски',
      bool: false,
      components: <TableLawsuit />,
    },
    {
      id: 2,
      name: 'Мои иски',
      bool: false,
    },
  ]);

  const [indexComp, setIndexComp] = useState(0);

  const clickBtn = (id) => {
    const newList = btnList.map((item) => {
      return {
        ...item,
        bool: id === item.id ? !item.bool : false,
      };
    });

    setBtnList(newList);
    const activeIndex = newList.findIndex((item) => item.bool);
    setIndexComp(activeIndex);
  };

  const [plaintiff, setPlaintiff] = useState(false);

  return (
    <>
      {!plaintiff ? (
        <div className="main">
          <div className="nav_footer">
            <div className="nav">
              {/* <img src={userIcon} alt="User Icon" /> */}
              <span>Алтынай</span>
              <img src={onOffIcon} alt="On/Off Icon" />
            </div>
            <div className="table_container">
              <div className="create_isk_btn">
                <button onClick={() => setPlaintiff(true)}>
                  + Создать черновой иск
                </button>
              </div>
              <ul className="tabs_ul">
                {btnList?.map((btn) => (
                  <li key={btn.id}>
                    <button
                      className={btn?.bool ? 'activeBtn' : 'disableBtn'}
                      onClick={() => clickBtn(btn.id)}
                    >
                      {btn.name}
                    </button>
                  </li>
                ))}
              </ul>
              <>{btnList?.[indexComp]?.components}</>
            </div>
            <div className="footer_block">
              <span>Администратор 4/-270.00</span>
            </div>
          </div>
        </div>
      ) : (
        <PlaintiffPage />
      )}
    </>
  );
}
