import React from 'react';
import './LogOut.scss';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const navigate = useNavigate();
  return (
    <button className="logout" onClick={() => navigate('/')}>
      Выйти
    </button>
  );
};

export default LogOut;
