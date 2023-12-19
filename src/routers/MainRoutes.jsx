import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayouts from '../layouts/MainLayouts';
import PlaintiffPage from '../pages/PlaintiffPage/PlaintiffPage';
import MainPage from '../pages/mainpage/MainPage';

function MainRoutes() {
  return (
    <Routes>
      <Route element={<MainLayouts />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/plaintiff" element={<PlaintiffPage />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
