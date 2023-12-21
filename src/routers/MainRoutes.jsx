import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayouts from '../layouts/MainLayouts';
import PlaintiffPage from '../pages/PlaintiffPage/PlaintiffPage';
import MainPage from '../pages/mainpage/MainPage';
import SignIn from '../pages/login/SignIn';
import { useSelector } from 'react-redux';

function MainRoutes() {
  const { input } = useSelector((state) => state.inputSlice);
  console.log(input, 'input');
  return (
    <Routes>
      <Route element={<MainLayouts />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<SignIn />} />
        {/* <Route path="/plaintiff" element={<PlaintiffPage />} /> */}
      </Route>
    </Routes>
  );
}

export default MainRoutes;
