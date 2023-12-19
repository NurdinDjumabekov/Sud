import React from 'react';
import './main.css';

import userIcon from '../../asstes/icons/user-icon.png';
import onOffIcon from '../../asstes/icons/onOff.png';

export default function MainPage() {
  return (
    <div>
      <div className='nav'>
        <img src={userIcon} alt="User Icon" />
        <span>Алтынай</span>
        <img src={onOffIcon} alt="On/Off Icon" />
      </div>
    </div>
  );
}
